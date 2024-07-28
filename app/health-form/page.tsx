"use client";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const HealthForm = () => {
  const formSchema = z.object({
    harmfulMedicalConditions: z.array(z.string()),
    harmfulMedications:  z.array(z.string()),
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
    <div className="px-[10%]  py-20 flex flex-col justify-center items-center">
      <div className="form-container w-[90%] shadow-lg px-10 py-4 rounded-lg">
        <h1 className="text-center text-3xl font-bold">Health Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="harmfulMedicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List of Medical Conditions that can harm or kill you?</FormLabel>
                  <FormControl>
                    <Input placeholder="example: xyz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="harmfulMedicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List of Medications that can harm or kill you, might not do well with or without?</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="example: xyz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harmfulMedicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List of Allergies that can harm or kill you?</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="example: xyz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harmfulMedicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have a Do Not Resuscitate order?</FormLabel>
                  <FormControl>
                    <RadioGroup defaultValue="false">
                      <div  className="flex items-center space-x-2">
                      <RadioGroupItem id="true"  value="true"/>
                      <Label htmlFor="true">Yes</Label>
                      </div>
                      <div  className="flex items-center space-x-2">
                      <RadioGroupItem id="false"  value="false" />
                      <Label htmlFor="false">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harmfulMedicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have a Seizure disorder?</FormLabel>
                  <FormControl>
                    <RadioGroup defaultValue="false">
                      <div  className="flex items-center space-x-2">
                      <RadioGroupItem id="true"  value="true"/>
                      <Label htmlFor="true">Yes</Label>
                      </div>
                      <div  className="flex items-center space-x-2">
                      <RadioGroupItem id="false"  value="false" />
                      <Label htmlFor="false">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harmfulMedicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have any missing organs?</FormLabel>
                  <FormControl>
                    <RadioGroup defaultValue="false">
                      <div  className="flex items-center space-x-2">
                      <RadioGroupItem id="true"  value="true"/>
                      <Label htmlFor="true">Yes</Label>
                      </div>
                      <div  className="flex items-center space-x-2">
                      <RadioGroupItem id="false"  value="false" />
                      <Label htmlFor="false">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">
              Generate QR Code
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HealthForm;
