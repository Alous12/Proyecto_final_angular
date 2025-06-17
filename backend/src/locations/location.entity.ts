import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('locations') // nombre de la tabla en MySQL
export class Location {
  @PrimaryColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  type: string;

  @Column({ length: 255 })
  dimension: string;

  @Column({ length: 500 })
  url: string;

  @Column()
  created: Date;
}
