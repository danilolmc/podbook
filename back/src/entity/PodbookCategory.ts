import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PodbookCategory{
    
    @PrimaryGeneratedColumn()
    cat_id: number;

    @Column({nullable: false})
    name: string;
}