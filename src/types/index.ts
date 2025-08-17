// Component Props Interfaces
export interface TechStack {
  category: string;
  icon: string;
  gradient: string;
  border: string;
  titleColor: string;
  technologies: Technology[];
}

export interface Technology {
  name: string;
  color: string;
}

export interface Project {
  slug: string;
  data: {
    title: string;
    description: string;
    date: Date;
    featured?: boolean;
    status?: 'active' | 'maintenance' | 'deprecated' | 'planning';
    technologies?: string[];
    github?: string;
    demo?: string;
    image?: string;
  };
}

export interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    publishDate: Date;
    featured?: boolean;
    draft?: boolean;
    tags?: string[];
    author?: string;
    image?: string;
  };
}

// Component Props
export interface AboutSkillsProps {
  techStack: TechStack[];
}

export interface FeaturedProjectsProps {
  projects: Project[];
}

export interface RecentBlogProps {
  posts: BlogPost[];
}

export interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

// Social Links
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

// Navigation
export interface NavItem {
  name: string;
  href: string;
  current?: boolean;
  external?: boolean;
}

// Utility Types
export type ProjectStatus = 'active' | 'maintenance' | 'deprecated' | 'planning';
export type Theme = 'light' | 'dark' | 'system';