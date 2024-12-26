export interface IExperience {
  _id: string;
  title: string;
  description: string;
  company: string;
  companyLogo: string;
  startDate: Date;
  endDate: Date;
  companyWebsite: string;
  activities: string[];
  location: string;
  isDeleted?: boolean;
}
