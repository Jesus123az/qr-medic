"use client"
import { useModalStore } from '@/store/modal/ModalStore';
import React, { useState, FormEvent } from 'react';
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
import axios from "axios"
import { useUserStore } from "@/store/user/userStore";
import { useRouter } from "next/navigation";



const SignUpModal = () => {
  const {setUser} = useUserStore()
  const {setShowSignUpModal, setShowSignInModal} = useModalStore(state=>state)
  const router = useRouter();
  const registerUserSchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
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
  type FormFields = z.infer<typeof registerUserSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const  onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof registerUserSchema>
  ) => {
    try{
      console.log(values)
      const response = await axios.post("/api/users",values)
      if (response.status !== 200) {
        alert("Wrong email or password");
        throw new Error("Login failed");
      }
      const user = response.data;
      // Set the user state in Zustand
      setUser(user);    // Redirect to the desired page after login
      onClose();
      router.push("/health-form");
    } catch (e) {
      console.error(e);
      // Handle error, e.g., show a notification to the user
    }
  };

  const onClose = ()=>setShowSignUpModal(false)

  return (
    <div className="fixed z-30 inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white  z-30 rounded-lg px-8 py-2 w-full max-w-md shadow-lg overflow-scroll no-scrollbar">
        <div className="flex justify-between  items-center ">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className='flex gap-x-5 items-center'>
              <span>Already have an account?</span>
              <Button onClick={()=>{
                setShowSignInModal(true)
                setShowSignUpModal(false)
          }}  className='px-2 py-0 h-7'>Log In</Button>
            </div>
        </div>
        <div className='flex flex-col  items-center'>
        <h2 className="text-2xl font-bold text-black">Get Started!</h2>
        <p className="text-gray-600 ">Enter your details below</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
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
            <Button disabled={form.formState.isSubmitting} className="w-full bg-white text-[#7D9F0C] border-[#7D9F0C] border-2 hover:bg-white" type="submit">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpModal;