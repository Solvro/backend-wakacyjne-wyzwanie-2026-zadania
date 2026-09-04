import { Exclude, Expose } from "class-transformer"


@Exclude()
export class ParticipantResponseDto {

    
    @Expose()
    firstName!:string

   
    @Expose()
    lastName!:string

    @Expose()
    email!:string

    @Expose()
    dateJoined!: string

    @Expose()
    tripId!:number

}
