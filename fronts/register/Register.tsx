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
import Image from "next/image";
import { useState } from "react";
import axios from "axios"
import { useUserStore } from "@/store/user/userStore";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const isLoggedIn = useUserStore(state=>state.isLoggedIn)
  const registerUserSchema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      profileImage: z.string().nullable(),
      password: z.string().min(4),
      confirmPassword: z.string().min(4),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    });

  const [profilePic, setProfilePic] = useState<string | null>(null);
  type FormFields = z.infer<typeof registerUserSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      profileImage: null,
      firstName: "",
      lastName: "",
      password: "",
    },
  });

 
  const  onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof registerUserSchema>
  ) => {
    try{
      console.log(values)
      const response = await axios.post("/api/users",values)
      
    }catch(err){
      console.error(err)
    }
  };
  return (
    <div className="px-[20%]  py-20 flex flex-col justify-center items-center">
      <div className="form-container w-[50%] shadow-lg px-10 py-4 rounded-lg">
        <h1 className="text-center text-3xl font-bold">Register</h1>
        <div className="flex gap-x-5">
          <label>Upload Profile Picture</label>
          <CldUploadButton
            uploadPreset="med-ar"
            onSuccess={(result) => {
              form.setValue(
                "profileImage",
                typeof result.info === "object" ? result.info.secure_url : null
              );
              setProfilePic(
                typeof result.info === "object" ? result.info.secure_url : null
              );
            }}
            options={{
              sources: ["local"],
              clientAllowedFormats: ['jpeg', 'jpg', 'png'],
              cropping: true,
              maxFiles: 1,
              multiple: false,
            }}
            className="bg-black text-white px-5 py-2"
          />
        </div>
        <div className="w-96">
          <Image width={200} height={200} src={profilePic?profilePic:""} alt="profile-pic" />
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
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="Repeat Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
