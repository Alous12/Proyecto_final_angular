import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'episodes' })
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100 })
  air_date: string;

  @Column({ length: 20 })
  episode: string; // Ej: S01E01

  @Column('simple-array') // URLs de personajes separados por comas
  characters: string[];

  @Column({ length: 500 })
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}