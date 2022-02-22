import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PodbookCategory } from "./PodbookCategory";
import { User } from "./User";

@Entity()
export class Podbook {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    bannerImage: string

    @Column({ nullable: false })
    bannerTitle: string

    @Column({ nullable: false })
    description: string 

    @Column({ nullable: false })
    audio: string

    @ManyToOne(type => PodbookCategory)
    @JoinColumn()
    category: PodbookCategory

    @ManyToOne(type => User)
    @JoinColumn()
    user_owner: User
}
