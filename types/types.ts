export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
export type ProjectStatus = "ACTIVE" | "INACTIVE";
export interface IProject {
  id: string;
  name?: string;
  createdAt: string;
  status: ProjectStatus;
}
