export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  date: string;
  category: "city" | "sunset" | "other";
  categories?: ("city" | "sunset" | "other")[]; // Multiple categories support
  camera?: string;
  lens?: string;
  settings?: string;
  description: string;
  featured?: boolean;
}