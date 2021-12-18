import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    category: string

    @Column({ nullable: false })
    audio: string
}
