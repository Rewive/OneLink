import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  User = 1,
  Mentor = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: Role.User })
  role: Role;

  @Column({ nullable: true })
  activationToken: string;
}
