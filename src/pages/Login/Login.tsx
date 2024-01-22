import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "@uidotdev/usehooks";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { ToastOptions, toast } from "react-toastify";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { API_URL, ROUTES } from "@/constants";
import { postRequest } from "@/helpers/postRequest";
import { UserData } from "@/types/user-data.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formScheme = z.object({
  Email: z.string().email({
    message: "Invalid email",
  }),
  Password: z.string().min(5, {
    message: "Password must be at least 5 characters",
  }),
});

interface ILoginRequest {
  Email: string;
  Password: string;
}

interface ILoginResponse {
  message: string;
  token: string;
  role: string;
}

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
} satisfies ToastOptions;

const toastSuccess = (message: string, options?: ToastOptions): void => {
  toast.success(message, {
    ...toastConfig,
    ...options,
  });
};

const toastError = (message: string, options?: ToastOptions): void => {
  toast.error(message, {
    ...toastConfig,
    ...options,
  });
};

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const { trigger: login, isMutating: isLoading } = useSWRMutation(
    `${API_URL}/login`,
    postRequest<ILoginRequest, ILoginResponse>
  );

  const [userData, setUserData] = useSessionStorage<UserData>(
    "user-data",
    null
  );

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const [togglePasswordVisibility, setTogglePasswordVisibility] =
    useState(false);

  const onFormSubmit = async (
    values: z.infer<typeof formScheme>
  ): Promise<void> => {
    await login(values, {
      onSuccess: (data) => {
        setUserData({
          jwt: data?.token,
          role: data?.role,
        });

        toastSuccess(data?.message, {
          autoClose: 2000,
        });
        form.reset();

        setTimeout(() => {
          navigate(ROUTES.DASHBOARD, { replace: true });
        }, 2000);
      },

      onError: (error) => {
        if (error instanceof Error) {
          toastError(error.message + " Check your email and password.");
        } else {
          toastError("Something went wrong. Please try again later.");
        }
      },
    });
  };

  const onTogglePasswordVisibilityButtonClick = (): void => {
    setTogglePasswordVisibility((prev) => !prev);
  };

  useEffect(() => {
    if (userData?.jwt) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, []);

  return (
    <div className="flex  h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/diamond.png"
          alt="Luxury Hotels"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onFormSubmit)}
          >
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@mail.com"
                      {...field}
                      type="email"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Enter your working email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-2">
                      <Input
                        placeholder="12345"
                        {...field}
                        type={togglePasswordVisibility ? "text" : "password"}
                        disabled={isLoading}
                      />

                      <Button
                        disabled={isLoading}
                        onClick={onTogglePasswordVisibilityButtonClick}
                        type="button"
                        size="icon"
                        variant="outline"
                      >
                        {togglePasswordVisibility ? (
                          <EyeClosedIcon />
                        ) : (
                          <EyeOpenIcon />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
