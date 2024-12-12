import { TComponentCategoryEnum } from "./../zodObject/index";
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
export type ProjectStatus = "ACTIVE" | "INACTIVE";
export interface IProject {
  id: string;
  name?: string;
  imageUrl?: string;
  createdAt: string;
  status: ProjectStatus;
}
export interface IComponent {
  id: string;
  name?: string;
  imageUrl?: string;
  createdAt: string;
  status: ProjectStatus;
  category: TComponentCategoryEnum;
}
export interface IComponentBody {
  id: string;
  name?: string;
  imageUrl?: string;
  html: string;
  css: string;
  category: TComponentCategoryEnum;
}
