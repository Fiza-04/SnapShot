import * as z from "zod";

// 2. Define a submit handler.
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  // lastName: z.string(),
  username: z.string().min(2, { message: "Username is too short" }),
  email: z.string().email({ message: "Enter valid email address" }),
  password: z.string().min(8, { message: "Must be atleast 8 characters" }),
  // confirm_password: z.string().min(8, { message: "Password does not match" }),
});

export const SigninValidation = z.object({
  email: z.string().email({ message: "Incorrect email" }),
  password: z.string().min(8, { message: "Incorrect Password" }),
});

export const PostValidation = z.object({
  caption: z.string({ message: "Add a Caption" }).max(2200),
  file: z.custom<File[]>(),
  location: z.string({ message: "Add a location" }).min(2).max(100),
  tags: z.string({ message: "Add some tags" }),
});
