import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column('simple-array') // URLs de residentes separados por comas
  residents: string[];

  @Column({ length: 500 })
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}