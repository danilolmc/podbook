import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    photo: string

    @Column({ nullable: false })
    bio: string

    @Column({ nullable: false })
    backgroundPhoto: string

    @OneToOne(type => User)
    @JoinColumn()
    user_owner: User
}
