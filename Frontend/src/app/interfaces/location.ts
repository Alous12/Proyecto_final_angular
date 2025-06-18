import { Character } from "./character";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  presentCharacters: Character[];
  url: string;
  created: string | Date;
}
