"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const formSchema = z.object({
    email: z.string().email({
      message: "Enter a valid email",
    }),
    password: z.string().min(8, {
      message: "Password should be at least 8 characters"
    })
  });

  type FormFields = z.infer<typeof formSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),

  });

  const onSubmit: SubmitHandler<FormFields> = (
    values: z.infer<typeof formSchema>
  ) => {
    console.log(values);
  };
  return (
    <div className="px-[20%]  py-20 flex flex-col justify-center items-center">
      <div className="form-container w-96 shadow-lg px-10 py-4 rounded-lg">
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password"  placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    </div>
  );
};

export default Login;
