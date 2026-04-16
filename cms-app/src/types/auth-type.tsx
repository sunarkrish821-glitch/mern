import z from "zod";

export interface ICredentials {
    username: string;
    password: string;
}


// after login logic will be added later
export interface ILoginResponse {
    // data: {
          id: number,
          username: string,
          email: string,
          firstName: string,
          lastName: string,
          gender: string,
          image: string,
          accessToken: string, // JWT accessToken (for backward compatibility) in response and cookies
          refreshToken: string // refreshToken in response and cookies
}
   


export const loginDTO = z.object({
    // username: z.email("Invalid email address").nonempty("Username is required"),
    username: z.string().nonempty("Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});



export interface IAddress {
 address: string, 
        city: string,
        state: string,
        stateCode: string,
        postalCode: string,
        coordinates: {
            lat: number,
            lng: number,
        },
        country: string,
}



export interface IUserDetail {
    id: number,
    firstName:string,
    lastName: string,
    maidenName:string,
    gender: string,
    email: string,
    phone: string,
    username: string,
    birthDate: string,
    image: string,
    address: IAddress,
     university: string,
     
    company: {
        department: string,
        name: string,
        title: string,
        address: IAddress,
    };
    role: string,
}


