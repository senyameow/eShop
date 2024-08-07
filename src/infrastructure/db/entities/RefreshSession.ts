import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity('refreshsessions')
export class RefreshSession {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id' })
    user!: number

    @Column({
        type: 'uuid',
        nullable: false
    })
    refreshToken!: string;

    @Column({
        type: 'bigint',
        nullable: false
    })
    expiresIn!: number

    @Column({
        type: 'text',
        nullable: false
    })
    fingerprint!: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt!: number;
}