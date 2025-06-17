import { Episode } from "./episode";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episodes: Episode[];
  url: string;
  created: string | Date;
}

