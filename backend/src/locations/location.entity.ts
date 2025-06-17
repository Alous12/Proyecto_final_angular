import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Character } from '../characters/character.entity';

@Entity({ name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100 })
  type: string;

  @Column({ length: 100 })
  dimension: string;

  // Relación inversa: personajes que tienen esta location como ORIGIN
  @OneToMany(() => Character, (character) => character.origin)
  bornCharacters: Character[];

  // Relación inversa: personajes que tienen esta location como LOCATION
  @OneToMany(() => Character, (character) => character.location)
  presentCharacters: Character[];

  @Column({ length: 500 })
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
