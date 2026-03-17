export interface Video {
  id: string;
  title: string;
  author: string;
  views: string;
  postedAt: string;
  duration: string;
  thumbnail: string;
  category: string;
  icon: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
