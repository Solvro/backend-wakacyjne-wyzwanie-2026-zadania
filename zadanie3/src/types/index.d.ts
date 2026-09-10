
declare global{
    namespace Express{
        interface User{
        
            id: number,
            email: string,
            password: string,
            date_of_birth: Date
        }
    }
}

export{};