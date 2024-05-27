import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { USER_ROLE } from "../../../core/domain/User/UserRole";
import { User } from './User'

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        default: USER_ROLE.USER,
        type: 'enum',
        enum: USER_ROLE
    })
    name!: string

    @OneToMany(
        () => User,
        user => user.role
    )
    user!: User

}