import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, } from "typeorm";

@Entity()
export class Cat {
    
    //@PrimaryGeneratedColumn() otra opcion aunque menos detallada
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    // @Column()
    // breed: string; se suplanta con la instancia breed

    @DeleteDateColumn()  //eliminación logica para saber cuando fue eliminado 
    deleteAt: Date;

    @ManyToOne( ()=> Breed ,(breed)=> breed.id, {
        eager: true, //trae las razas al hacer findOne
    })
    breed: Breed;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email',  })
    user: User; //la columna no se va a llamar user, pero designo tipo user aqui xq la funcion flecha esta referenciando User para extraer el email que va a venir desde service.

    @Column()
    userEmail: string;
}
