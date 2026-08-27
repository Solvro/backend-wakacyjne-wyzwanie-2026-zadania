import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TripResponseDto{

    @Expose()
    id!:number;
    
    @Expose()
    destination!: string | null;
    
    @Expose()
    description!:string;
    
    @Expose()
    startDate!: string;

    @Expose()
    endDate!:string;

    @Expose()
     budget!:number;
}