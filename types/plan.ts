// export interface Plan {
//   name: string;
//   location: string;
//   startDate: string;
//   endDate: string;
//   status: string;
//   image: string;
// }

export interface Plan {
  id?: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "completed" | "ongoing";
  notes?: string;
  image?: string;
    favorite?: boolean;

}


