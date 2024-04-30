import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";

const SigninForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    console.log(values);
    // const existingUser = await getUserAccount(values);
  }

  const isLoading = true;
  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center sm:420">
        <img
          src="../../../public/assets/images/logo_main(2).png"
          alt="logo"
          className="w-40 mb-3"
        />

        <h2 className="text-white">Sign IN to your account</h2>
        <p className="text-gray-400 font-light small-medium md:base-regular">
          To Login to Snapshot, Please enter your details below
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col space-y-5 gap-4 w-full mt-2 "
        >
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

          <Button type="submit" className="shad-button">
            {isLoading ? (
              <div className="flex">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign IN"
            )}
          </Button>
          <p className="text-white font-extralight text-center">
            New to SnapShot?
            <Link to="/sign-up" className="text-indigo-400 font-normal">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
