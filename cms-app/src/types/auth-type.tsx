import z from "zod";

export interface ICredentials {
  username: string;
  password: string;
}

// after login response
export interface ILoginResponse {
  // data: {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
  // }
}

// validation rules
export const loginDTO = z.object({
  // username: z.email("Invalid email format").nonempty("Email is required"),
  username: z.string().nonempty("Username is required"),
  password: z.string().min(8, "Password must have atleast 8 characters"),
});

export interface IAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}


export interface IUserDetail {
  id: number;
  firstName: string,
  lastName: string,
  maidenName: string,
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
    address: IAddress
  };
  role: string,
}