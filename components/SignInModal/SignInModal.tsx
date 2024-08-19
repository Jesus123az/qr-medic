import React, { useState, FormEvent } from 'react';
import { useModalStore } from '@/store/modal/ModalStore';
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
import axios from 'axios';
import { useUserStore } from '@/store/user/userStore';
import { useRouter } from 'next/navigation';

const SignInModal = () => {
  const {setUser} = useUserStore(state=>state)
  const {setShowSignInModal, setShowSignUpModal} = useModalStore(state=>state)
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email({
      message: "Enter a valid email",
    }),
    password: z.string().min(6, {
      message: "Password should be at least 6 characters"
    })
  });
  const onClose =()=>setShowSignInModal(false)


  type FormFields = z.infer<typeof formSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),

  });
  
  const onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof formSchema>
  ) => {

    try {
      const response = await axios.post("/api/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
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
      
      alert("Wrong email or password");
      console.error(e);
      // Handle error, e.g., show a notification to the user
    }
  };

  return (
    <div className="fixed z-30 inset-0 bg-cyan-100 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white z-30 rounded-3xl p-8 w-full max-w-md shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="absolute top-4 right-4 flex items-center">
          <span className="text-sm text-gray-600 mr-2">Don&apos;t have an account?</span>
          <button onClick={()=>{
            setShowSignUpModal(true)
            setShowSignInModal(false)
          }} className="bg-[#1A4E68] text-white text-sm py-1 px-3 rounded-md hover:bg-cyan-800 transition duration-300">
            Sign up
          </button>
        </div>
        <div className="mt-12 mb-8">
          <h2 className="text-3xl font-bold text-center text-navy-800">Welcome Back!</h2>
          <p className="text-gray-600 text-center mt-2">Enter your details below</p>
        </div>
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
                  <Input type="password"  placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} className="w-full bg-white border-[#7D9F0C] text-[#7D9F0C] border-2 hover:bg-white" type="submit">Login</Button>
        </form>
      </Form>
      </div>
    </div>
  );
};

export default SignInModal;