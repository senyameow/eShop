import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    age!: number;

    @Column({ nullable: true, length: 20 })
    firstName!: string;

    @Column({ nullable: true, length: 20 })
    lastName!: string;
}