import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('episodes') // nombre real de la tabla en MySQL
export class Episode {
  @PrimaryColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'air_date', length: 100 })
  airDate: string;

  @Column({ name: 'episode_code', length: 20 })
  episodeCode: string;

  @Column({ length: 500 })
  url: string;

  @Column()
  created: Date;
}
