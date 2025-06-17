import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'characters' }) // Esto asegura el nombre exacto de la tabla
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100 })
  status: string;

  @Column({ length: 100 })
  species: string;

  @Column({ length: 100, nullable: true })
  type?: string;

  @Column({ length: 100 })
  gender: string;

  @Column({ type: 'simple-json' })
  origin: { name: string; url: string };

  @Column({ type: 'simple-json' })
  location: { name: string; url: string };

  @Column({ length: 500 })
  image: string;

  @Column({ type: 'simple-array' }) // guarda como 'url1,url2,...'
  episode: string[];

  @Column({ length: 500 })
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
