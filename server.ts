import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Mock Data
  const categories = [
    { id: "programming", name: "Programming", icon: "Code" },
    { id: "gate", name: "GATE Prep", icon: "GraduationCap" },
    { id: "core", name: "Core CS", icon: "Cpu" },
    { id: "design", name: "System Design", icon: "GitBranch" },
    { id: "devops", name: "Cloud & DevOps", icon: "Cloud" },
  ];

  const videos = [
    {
      id: "1",
      title: "DSA Mastery: Trees, Graphs & Dynamic Programming",
      author: "Code With Professional",
      views: "450K",
      postedAt: "2 days ago",
      duration: "45:12",
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop",
      category: "programming",
      icon: "Network",
      tags: ["Placement Focus"]
    },
    {
      id: "2",
      title: "Advanced Python & Java: Backend Engineering",
      author: "Dev Hub Academy",
      views: "210K",
      postedAt: "1 week ago",
      duration: "1:20:45",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
      category: "programming",
      icon: "Terminal",
      tags: ["Placement Focus"]
    },
    {
      id: "3",
      title: "Big-O Notation & Competitive Programming Basics",
      author: "Tech Interview Prep",
      views: "88K",
      postedAt: "3 days ago",
      duration: "15:10",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
      category: "programming",
      icon: "Database",
      tags: ["Placement Focus"]
    },
    {
      id: "4",
      title: "Operating Systems: Process Synchronization & CPU Scheduling",
      author: "GATE Scholars Hub",
      views: "120K",
      postedAt: "1 month ago",
      duration: "24:30",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      category: "gate",
      icon: "Settings2",
      tags: ["CS & IT Core"]
    },
    {
      id: "5",
      title: "Computer Networks: TCP/IP Model & Routing Protocols",
      author: "Network Engineering Pro",
      views: "95K",
      postedAt: "5 days ago",
      duration: "32:15",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop",
      category: "gate",
      icon: "Globe",
      tags: ["CS & IT Core"]
    },
    {
      id: "6",
      title: "Discrete Mathematics: Propositional Logic & Graph Theory",
      author: "Math for Engineers",
      views: "150K",
      postedAt: "2 weeks ago",
      duration: "11:05",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd48a579a?q=80&w=1000&auto=format&fit=crop",
      category: "gate",
      icon: "Calculator",
      tags: ["CS & IT Core"]
    }
  ];

  // API Routes
  app.get("/api/categories", (req, res) => {
    res.json(categories);
  });

  app.get("/api/videos", (req, res) => {
    const { category, search } = req.query;
    let filteredVideos = videos;

    if (category && category !== "all") {
      filteredVideos = filteredVideos.filter(v => v.category === category);
    }

    if (search) {
      const searchLower = (search as string).toLowerCase();
      filteredVideos = filteredVideos.filter(v => 
        v.title.toLowerCase().includes(searchLower) || 
        v.author.toLowerCase().includes(searchLower)
      );
    }

    res.json(filteredVideos);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
