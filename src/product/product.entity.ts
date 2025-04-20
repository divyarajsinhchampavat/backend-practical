import { IsArray } from "class-validator";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  @IsArray()
  image: string[]; 

  @Column({ unique: true })
  productCode: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  @Column()
  manufacturerDate: Date;

  @Column()
  expiryDate: Date;

  @ManyToOne(() => User, user => user.products)
  owner: User;

  @Column({ default: 'active' })
  status: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;
}