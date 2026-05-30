import z from "zod";

export const LoginSchema = z.object({
  username: z.string().nonempty().nonoptional(),
  password: z.string().nonempty().nonoptional(),
});

export const UserRegisterSchema = z.object({
  firstName: z.string().min(2).max(20).nonempty("First Name is required"),
  maidenName: z.string().nullable(),
  lastName: z.string().min(2).max(20).nonempty("Last Name is required"),
  email: z.email().nonempty("Email is required"),
  username: z.string().min(3).max(25).nonempty("Username is required"),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\\0-9])(?=.*[\W-_]).{8,25}$/, "Password does not follow strong password rule."),
  confirmPassword: z.string().nonempty(),
  phone: z.string().nullable(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and confirm password does not match", 
  path: ['confirmPassword']
})

export type IUserRegisterDetail = z.infer<typeof UserRegisterSchema> & {
  image?: {
    originalName: string;
    filename: string;
    size: number;
    destination: string;
  };
};
// Seeder run