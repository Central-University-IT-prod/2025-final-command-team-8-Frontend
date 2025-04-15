import {z} from 'zod'

interface UserData{
    firstname: any,
    lastname: any,
    email: any,
    password: any,
}

const registerUserDataScheme = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
})

export const ValidateUserData = (user : UserData) : boolean =>{
    console.log(registerUserDataScheme.parse(user))
    return true
}