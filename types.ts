export enum ViewState {
  HOME = 'HOME',
  MEASUREMENTS = 'MEASUREMENTS',
  DESIGN_STUDIO = 'DESIGN_STUDIO',
  MARKETPLACE = 'MARKETPLACE',
  TRAINING = 'TRAINING',
  SOCIAL = 'SOCIAL'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  vendorId?: string;
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