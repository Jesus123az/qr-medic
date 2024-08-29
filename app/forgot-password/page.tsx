"use client";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { sendPasswordResetLink } from "@/utils/firebase/firebaseUtils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
const ForgotPassword = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetLink(email);
      toast({
        title: "Email sent successfully",
        description: "Please check you emails to reset your password.",
      });
      setEmail("");
    } catch (err) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "An error occurred while sending the email." + err,
      });
    }
  };
  return (
    <div className="h-svh bg-[#CBE9EF] pt-5 px-[11%] text-center">
      <h1 className="text-3xl font-bold ">Forgot Password</h1>
      <p className="text-lg  mt-5">
        Enter your email and we will send you a reset link shortly:
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:justify-center gap-y-5 md:gap-y-0  md:flex-row gap-x-3 mt-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            className=" max-w-96  "
            type="email"
          />
          <Button type="submit">Send Email</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
