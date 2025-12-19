export enum ViewState {
  HOME = 'HOME',
  MEASUREMENTS = 'MEASUREMENTS',
  DESIGN_STUDIO = 'DESIGN_STUDIO',
  MARKETPLACE = 'MARKETPLACE',
  TRAINING = 'TRAINING',
  SOCIAL = 'SOCIAL',
  ADMIN_PANEL = 'ADMIN_PANEL',
  FABRIC_GUIDE = 'FABRIC_GUIDE'
}

export interface ProductHistory {
  date: string;
  action: string;
  details: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  vendorId?: string;
  history?: ProductHistory[];
  stockStatus?: 'IN_STOCK' | 'SOLD_OUT';
}

export interface MeasurementProfile {
  height?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  bodyShape?: string;
  aiAnalysis?: string;
}

export interface DesignProject {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: number;
}

export interface SocialPost {
  id: string;
  user: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export type UserRole = 'ADMIN' | 'VENDOR' | 'USER' | 'SUPER_ADMIN' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface SiteConfig {
  heroImage: string;
  heroAspectRatio: string;
  galleryImages: { url: string; ratio: string }[];
}