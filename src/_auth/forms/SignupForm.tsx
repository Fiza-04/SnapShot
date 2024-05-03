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
import {
  useSignInAccount,
  useCreateUserAccount,
} from "@/lib/react-query/queryAndMutation";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof SignupValidation>) {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        return toast({
          title: "Sign Up failed. Please Try Again!",
        });
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({
          title: "Something went wrong. Please login to your new account!",
        });
        // navigate("/sign-in");

        // return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Sign Up failed. Please try again!" });
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
          {/* <div className=" md:flex md:space-x-3"> */}
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
          {/* <FormField
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
            /> */}
          {/* </div> */}
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
