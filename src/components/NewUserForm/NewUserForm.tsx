import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookstate } from "@hookstate/core";
import { useForm } from "react-hook-form";
import { ToastOptions, toast } from "react-toastify";
import * as z from "zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { API_URL } from "@/constants";
import globalState, { IGlobalState } from "@/state/state";
import { postRequestWithHeaders } from "@/helpers/postRequest";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  Email: z.string().email({
    message: "Invalid email",
  }),
  Password: z.string().min(5, {
    message: "Password must be at least 5 characters",
  }),
  Role: z.enum(["manager", "user"], {
    errorMap: () => ({ message: "Invalid role" }),
  }),
});

interface IRegisterRequest {
  Email: string;
  Password: string;
  Role: "manager" | "user";
}

interface IRegisterResponse {
  message: string;
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

const NewUserForm = (): JSX.Element => {
  const { userData } = useHookstate<IGlobalState>(globalState).get();

  const {
    data,
    trigger: register,
    isMutating: isLoading,
  } = useSWRMutation(
    {
      url: `${API_URL}/admin/register`,
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
    postRequestWithHeaders<IRegisterRequest, IRegisterResponse>
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
      Role: "manager",
    },
  });

  const [togglePasswordVisibility, setTogglePasswordVisibility] =
    useState(false);

  const onFormSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    await register(values, {
      onSuccess: () => {
        toastSuccess(data?.message ?? "", {
          autoClose: 2000,
        });

        form.reset();
      },

      onError: (error) => {
        if (error instanceof Error) {
          toastError(error.message);
        } else {
          toastError("Something went wrong. Please try again later.");
        }
      },
    });
  };

  const onTogglePasswordVisibilityButtonClick = (): void => {
    setTogglePasswordVisibility((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onFormSubmit)}>
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

        <FormField
          control={form.control}
          name="Role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manager" id="r1" />
                    <Label htmlFor="r1">Manager</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="r2" />
                    <Label htmlFor="r2">User</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>Select user's role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          disabled={isLoading}
        >
          Register
        </Button>
      </form>
    </Form>
  );
};

export default NewUserForm;
