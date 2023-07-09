import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provider')
export class Provider {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 11 })
  ruc: string;

  @Column({ type: 'varchar' })
  business_name: string;

  @Column({ type: 'varchar' })
  representative: string;

  @Column({ type: 'varchar' })
  sector: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;
}
