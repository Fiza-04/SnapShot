import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queryAndMutation";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount } = useSignInAccount();

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof SigninValidation>) {
    try {
      console.log("were in");
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      console.log("session", session);
      if (!session) {
        return toast({
          title: "Sign in Failed. Please Try Again!",
        });
      }

      const isLoggedIn = await checkAuthUser();
      console.log({ isLoggedIn });

      if (isLoggedIn) {
        form.reset();

        console.log("Navigating");
        navigate("/");
      } else {
        toast({ title: "Sign In failed. Please try again!" });
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center sm:w-420">
        <img
          src="/assets/images/logo_main(2).png"
          alt="logo"
          className="w-40 mb-3"
        />

        <h2 className="text-white">Login In to your Account</h2>
        <p className="text-gray-400 font-light small-medium md:base-regular">
          Welcome back! Please enter your details.
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
            {isUserLoading ? (
              <div className="flex">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-white font-extralight text-center">
            Don't have an account?
            <Link to="/sign-up" className="text-indigo-400 font-normal pl-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
