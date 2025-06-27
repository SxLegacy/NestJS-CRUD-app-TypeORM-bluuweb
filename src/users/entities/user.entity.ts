import { Role } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column(  )
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false }) //codrr maneja el hide password de otra forma revisar alla
    password: string;

    @Column({ default: Role.USER, type: 'enum', enum: Role,  })
    role:string;

    @DeleteDateColumn(  )
    deleteAt: Date;

}
