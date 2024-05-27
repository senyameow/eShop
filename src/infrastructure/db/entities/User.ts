import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @ManyToOne(
        () => Role,
        role => role.user
    )
    role!: Role

    @Column({ nullable: true })
    age!: number;

    @Column({ nullable: true, length: 20 })
    firstName!: string;

    @Column({ nullable: true, length: 20 })
    lastName!: string;
}