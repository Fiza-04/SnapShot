import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import {
  useSignInAccount,
  usecreateUserAccount,
} from "@/lib/react-query/queryAndMutation";

const SignupForm = () => {
  const { toast } = useToast();
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    usecreateUserAccount();

  const { mutateAsync: signInAccount, isLoading: isSigningIn } =
    useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values);
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign Up failed. Please Try Again!",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign In failed. Please Try Again!" });
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center sm:420">
        <img
          src="../../../public/assets/images/logo_main(2).png"
          alt="logo"
          className="w-40 mb-3"
        />

        <h2 className="text-white">Create a New Account</h2>
        <p className="text-gray-400 font-light small-medium md:base-regular">
          To use Snapshot, Please enter your details below
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col space-y-5 gap-4 w-full mt-2 "
        >
          {/* <div className=" md:flex md:space-x-3"> */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-error" />
              </FormItem>
            )}
          />
          {/* </div> */}
          {/*
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div> */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage className="shad-error" />
              </FormItem>
            )}
          />
          <div className=" md:flex md:space-x-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>

                  <FormMessage className="shad-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-error" />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="shad-button">
            {isCreatingAccount ? (
              <div className="flex">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-white font-extralight text-center">
            Already have an account?
            <Link to="/sign-in" className="text-indigo-400 font-normal pl-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
