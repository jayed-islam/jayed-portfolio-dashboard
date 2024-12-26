export interface IProject {
  _id: string;
  title: string;
  description: string;
  infos: string[];
  technologies: string[];
  liveUrl?: string;
  frontendRepoUrl?: string;
  backendRepoUrl?: string;
  image: string;
  category: string;
  status: string;
  startDate: Date;
  endDate: Date;
  isPublished: boolean;
}

export type IPagination = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};
