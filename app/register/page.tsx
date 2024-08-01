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
import { CldUploadButton } from "next-cloudinary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
     const registerUserSchema = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        profilePicture: z.string(),
        password: z.string().min(4),
        confirmPassword: z.string().min(4),
    }).superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ['confirmPassword']
        });
      }
    });

  type FormFields = z.infer<typeof registerUserSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(registerUserSchema),

  });

  const onSubmit: SubmitHandler<FormFields> = (
    values: z.infer<typeof registerUserSchema>
  ) => {
    console.log(values);
  };
  return (
    <div className="px-[20%]  py-20 flex flex-col justify-center items-center">
      <div className="form-container w-[50%] shadow-lg px-10 py-4 rounded-lg">
      <h1 className="text-center text-3xl font-bold">Register</h1>
      <div className="flex gap-x-5">
      <label >Upload Profile Picture</label>
      <CldUploadButton  options={{sources: ["local"], maxFiles: 1, multiple: false, }} className="bg-black text-white px-5 py-2" uploadPreset="" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input type="password"  placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password"  placeholder="Repeat Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">Register</Button>
        </form>
      </Form>
      </div>
    </div>
  );
};

export default Register;
