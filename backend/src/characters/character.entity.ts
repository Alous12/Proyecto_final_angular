import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { Location } from '../locations/location.entity';
import { Episode } from 'src/episodes/episode.entity';

@Entity('characters')
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

  @ManyToOne(() => Location, { eager: true }) // carga automáticamente la ubicación
  @JoinColumn({ name: 'origin_id' })
  origin: Location;

  @ManyToOne(() => Location, { eager: true })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ length: 500 })
  image: string;

  @ManyToMany(() => Episode, (episode) => episode.characters, { eager: true })
  @JoinTable({
    name: 'character_episodes', // tabla intermedia
    joinColumn: { name: 'character_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'episode_id', referencedColumnName: 'id' },
  })
  episodes: Episode[];

  @Column({ length: 500 })

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}