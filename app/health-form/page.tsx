"use client";
import {  useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { User } from "lucide-react";
import qrLogo from "@/assets/qr-logo.png"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"




import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUserStore } from "@/store/user/userStore";
import { useRouter } from "next/navigation";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

const HealthForm = () => {
  const router = useRouter()
  const {user, setUser}= useUserStore();
  const [profile, setProfile] = useState<string | null>(null);
  const [accountDelPass, setAccountDelPass] = useState<string | null>(null);
  const contactSchema = z.object({
    name: z.string().min(3, {message: "Name cannot have less than 3 characters"}).max(20,{ message : "Name cannot exceed 20 charactes."}),
    number: z.string().regex(/^\d{10}$/, { message: "Invalid phone number. (Number should have 10 characters) " }),
  });
  const allergySchema = z.object({
    name: z.string().min(3, {message: "Allergy name cannot have less than 3 characters"}).max(20,{ message : "Allergy name cannot exceed 20 charactes."}),
  });
  const medicationSchema = z.object({
    name: z.string().min(3, {message: "Medication name cannot have less than 3 characters"}).max(25,{ message : "Medication name cannot exceed 20 charactes."}),
  });
  const medicalConditionSchema = z.object({
    name: z.string().min(3, {message: "Condition name cannot have less than 3 characters"}).max(20,{ message : "Condition name cannot exceed 20 charactes."}),
  });

  const healthFormSchema = z.object({
    legalName: z.string().min(3, {message: "Name cannot have less than 3 characters"}).max(20,{ message : "Name cannot exceed 20 charactes."}),
    age: z.string().min(0).max(130),
    harmfulMedicalConditions: z.array(medicalConditionSchema),
    harmfulMedications: z.array(medicationSchema),
    allergies: z.array(allergySchema),
    doNotResusitate: z.boolean(),
    profileImage: z.string().nullable(),
    seizureDisorder: z.boolean(),
    missingOrgans: z.boolean(),
    bloodType: z.string(),
    emergencyContacts: z.array(contactSchema),
    doctorContacts: z.array(contactSchema),
  });
  type FormFields = z.infer<typeof healthFormSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(healthFormSchema),
    defaultValues: {
      legalName: "",
    age: "",
    harmfulMedicalConditions: [{ name: "" }],
    harmfulMedications: [{ name: "" }],
    allergies: [{ name: "" }],
    doNotResusitate: false,
    profileImage: null,
    seizureDisorder: false,
    missingOrgans: false,
    emergencyContacts: [{ name: "", number: "" }],
    doctorContacts: [{ name: "", number: "" }],
    },
  });

  const {
    fields: medicalConditionFields,
    append: appendMedicalCondition,
    remove: removeMedicalCondition,
  } = useFieldArray({
    control: form.control,
    name: "harmfulMedicalConditions",
  });

  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication,
  } = useFieldArray({
    control: form.control,
    name: "harmfulMedications",
  });

  const {
    fields: allergyFields,
    append: appendAllergy,
    remove: removeAllergy,
  } = useFieldArray({
    control: form.control,
    name: "allergies",
  });

  const {
    fields: emergencyFields,
    append: appendEmergency,
    remove: removeEmergency,
  } = useFieldArray({
    control: form.control,
    name: "emergencyContacts",
  });

  const {
    fields: doctorContactsFields,
    append: appendDoctorContacts,
    remove: removeDoctorContacts,
  } = useFieldArray({
    control: form.control,
    name: "doctorContacts",
  });

  const onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof healthFormSchema>
  ) => {
    try{
      if(!profile){
        alert("Please upload a Profile Picture!")
        return
      }
      if(!form.getValues("bloodType") || (form.getValues("bloodType").length < 1)){
        alert("Please select your blood group")
        return
      }
      if(user){
        if(user.healthInfo){
          const response = await axios.put(`/api/healthInfo/${user._id}`, values)  
          if(response.status!== 200){
            throw new Error("Error occured")
          }
          router.push("/qr-code")
        }
        else{

          const response = await axios.post(`/api/healthInfo/${user._id}`, values)
          if(response.status!== 200){
            throw new Error("Error occured")
          }
          setUser({...user, healthInfo: response.data._id})
          router.push("/qr-code")
        }
      }
      }catch(err){
      console.error(err)
    }
  };

  const getQRCodeTracked = async ()=>{
    try{
      const QRCodeStyling = (await import('qr-code-styling')).default;
      if(!user || user.qrCodeGenerated) return

      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        image: qrLogo.src,
        data: `https://ar.qrmedic.org/ar-app?id=${user?._id}`,
        dotsOptions: {
          color: "#072138",
          type: "rounded"
        },
        cornersSquareOptions:{
          color: "#A20601",
          type: "extra-rounded"
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 0
        }
      });
      const qrBlob = await qrCode.getRawData("png")
      if(!qrBlob) return
      const formData = new FormData();
      formData.append('image', qrBlob, `qrcode.png`);
      const response = await axios.post(`https://ar.qrmedic.org/process-image/${user?._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if(response.status!==200){
        throw new Error("error getting image tracked")
      }
      setUser({...user, qrCodeGenerated: true})      
    }catch(err){
      console.error(err)
    }
  }


  const handleDelete = async () => {
    try {
      const response = await axios.post(`/api/users/${user?._id}`, {accountDelPass});
      if(response.status === 200){
        setTimeout(()=>{
          setUser(null);
          router.push("/");
        },300)
      }else{
        throw new Error("There was an error deleting the account")
      }
    } catch (err) {
      alert("Incorrect Password");
      console.error(err);
    }
  };


  const getHealthInfo  = async()=>{
    try{
      if(user?.healthInfo){
        const response = await axios.get(`/api/healthInfo/${user.healthInfo}`);
        const healthInfo = response.data;
        form.reset(healthInfo);
        // Update profile image state if it exists
        if (healthInfo.profileImage) {
          setProfile(healthInfo.profileImage);
        }
      }
    }catch(err){
      console.error(err)
    }
  }


  useEffect(()=>{
    if(user){
      getHealthInfo();
      getQRCodeTracked();
    }
  },[user])
  useEffect(()=>{
    if(user){
      getHealthInfo();
    }
  },[])

  return (
    <div className="md:px-[10%] py-8 bg-[#CBE9EF]  flex flex-col justify-center items-center">
      <h1 className="text-[30px] font-bold">Medical Form</h1>
      <p className="font-medium">It only takes two easy steps!</p>
      <div className="form-container mt-20  bg-white w-[90%] shadow-lg px-3 md:px-28 py-10 rounded-[31px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <div className="step1 md:flex justify-between">
                <div className="flex flex-col">
        <h1 className=" text-3xl font-bold">Step 1</h1>
        <div className="flex gap-x-5 mt-5 h-full ">
          <div className="hidden md:flex flex-col h-full justify-between items-center py-1">
            <div className="min-w-5 min-h-5 border-2 border-[#14264C] rounded-full"></div>
            <div className="min-w-[1px] max-w-[1px] min-h-5 bg-[#D1D1D1] rounded-full h-[70%]"></div>
            <div className="min-w-5 min-h-5 border-2 border-[#14264C] rounded-full"></div>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl font-medium">Enter your legally authorized name</h3>
              <FormField
                    control={form.control}
                    name={`legalName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input maxLength={20} className="border-2 border-[#7D9F0C] bg-white md:w-96 mt-5"  placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                    </div>
              <h3 className="text-xl mt-8 md:mt-0 font-medium">Upload your Photo for Verification</h3>
              </div>
              </div>
              </div>
              <div className="flex flex-col items-center gap-y-5">
                <div className="w-40 h-40 bg-[#C0E4EB] rounded-3xl border-2 border-[#88CBD7] flex justify-center items-center">
                {profile?
                <Image className="max-w-full max-h-full" width={160} height={160} src={profile} alt="" />
                :
                <User className="w-16 h-16 text-[#88CBD7]" />
              }
                </div>
                <CldUploadButton
            uploadPreset="qrmedic"
            onSuccess={(result) => {
              form.setValue(
                "profileImage",
                typeof result.info === "object" ? result.info.secure_url : null
              );
              setProfile(
                typeof result.info === "object" ? result.info.secure_url : null
              );
            }}
            options={{
              sources: ["local", "camera"],
              clientAllowedFormats: ['jpeg', 'jpg', 'png'],
              cropping: true,
              croppingAspectRatio: 1,
              maxFiles: 1,
              multiple: false,
            }}
            className="bg-[#1A4E68] hover:bg-[#102f3f] rounded-xl text-white px-5 py-2"
          >Upload Photo</CldUploadButton>
              </div>
                    </div>
                    <div className="min-h-[1px] min-w-full bg-[#D1D1D1] my-20"></div>
                    <h1 className=" text-3xl font-bold ">Step 2</h1>
                    <h3 className="text-xl font-medium mt-5">
                    Enter your latest medical information below
              </h3>
              <div className="flex gap-x-28 my-7">
                    <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Type</FormLabel>
                  <FormControl>
                    <Select  onValueChange={(value) => field.onChange(value)} value={field.value || undefined}>
                      <SelectTrigger className=" border-2 border-[#7D9F0C] bg-white">
                        <SelectValue  className="placeholder:text-gray-300" placeholder="Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group, index) => (
                          <SelectItem key={index} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                    <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                  <Input type="number" min={0} max={130} className="border-2 border-[#7D9F0C] bg-white" placeholder="Age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
              <h3 className="text-xl font-medium">
              Provide a list of medical conditions that may pose serious health risks or be life-threatening
              </h3>
              <div className="flex flex-col gap-y-4">
              {medicalConditionFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-x-5">
                  <FormField
                    control={form.control}
                    name={`harmfulMedicalConditions.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Medical Condition {index + 1}</FormLabel> */}
                        <FormControl>
                          <Input maxLength={20} className="border-2 border-[#7D9F0C] mt-7 bg-white" placeholder={"Condition " + (index+1)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index !== 0 && (
                    <Button
                    className="bg-[#1A4E68] hover:bg-[#102f3f]"
                      type="button"
                      onClick={() => removeMedicalCondition(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              </div>
              <Button
                className={`mt-4 bg-[#1A4E68] hover:bg-[#102f3f] ${form.getValues("harmfulMedicalConditions").length<5? "" : "hidden"}`}
                type="button"
                onClick={() =>{
                  if(form.getValues("harmfulMedicalConditions").length<5){
                    appendMedicalCondition({ name: "" })
                  }else{
                    alert("You cannot add more than 5 conditions")
                  }
                  }
                } 
              >
                Add 1 More
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-medium">
                {" "}
                Provide a list of medications that may pose serious health risks or be life-threatening
              </h3>
              {medicationFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-x-5">
                  <FormField
                    control={form.control}
                    name={`harmfulMedications.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Medication {index + 1}</FormLabel> */}
                        <FormControl>
                          <Input maxLength={25} className="border-2 border-[#7D9F0C] mt-7 bg-white" placeholder={"Medication " + (index+1)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index !== 0 && (
                    <Button
                    className="bg-[#1A4E68] hover:bg-[#102f3f]"
                      type="button"
                      onClick={() => removeMedication(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className={`mt-4 bg-[#1A4E68] hover:bg-[#102f3f] ${form.getValues("harmfulMedications").length<5? "" : "hidden"}`}
                type="button"
                onClick={() =>{
                  if(form.getValues("harmfulMedications").length<5){
                    appendMedication({ name: "" })
                  }else{
                    alert("You cannot add more than 5 medications")
                  }
                  }
                } 
              >
                Add 1 More
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-medium">
                {" "}
                Provide a list of allergies that may pose serious health risks or be life-threatening
              </h3>
              {allergyFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-x-5">
                  <FormField
                    control={form.control}
                    name={`allergies.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Allergy {index + 1}</FormLabel> */}
                        <FormControl>
                          <Input maxLength={20} className="border-2 border-[#7D9F0C] mt-7 bg-white" placeholder={"Allergy " + (index+1)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index !== 0 && (
                    <Button className="bg-[#1A4E68] hover:bg-[#102f3f]" type="button" onClick={() => removeAllergy(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className={`mt-4 bg-[#1A4E68] hover:bg-[#102f3f] ${form.getValues("allergies").length<5? "" : "hidden"}`}
                type="button"
                onClick={() =>{
                  if(form.getValues("allergies").length<5){
                    appendAllergy({ name: "" })
                  }else{
                    alert("You cannot add more than 5 allergies")
                  }
                  }
                } 
              >
                Add 1 More
              </Button>
            </div>
            <FormField
              control={form.control}
              name="doNotResusitate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-medium">Do you have a Do-Not-Resuscitate order</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={(value) => field.onChange(value === "true")} defaultValue={field.value ? "true" : "false"}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem  value="true" />
                        <Label htmlFor="true">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem  value="false" />
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
              name="seizureDisorder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-medium">Do you have a Seizure disorder</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={(value) => field.onChange(value === "true")} defaultValue={field.value ? "true" : "false"}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem  value="true" />
                        <Label htmlFor="true">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem  value="false" />
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
              name="missingOrgans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-medium">Do you have any missing organs</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={(value) => field.onChange(value === "true")} defaultValue={field.value ? "true" : "false"}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="organs-true" value="true" />
                        <Label htmlFor="organs-true">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="organs-false" value="false" />
                        <Label htmlFor="organs-false">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h3 className="text-4xl font-medium">Emergency Contacts</h3>
              {emergencyFields.map((field, index) => (
                <div key={field.id} className="md:flex gap-x-6 items-end mt-4">
                  <FormField
                    control={form.control}
                    name={`emergencyContacts.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-medium">
                        Contact Name
                        </FormLabel>
                        <FormControl>
                          <Input maxLength={20} className="border-2 w-[18rem] border-[#7D9F0C] bg-white" placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`emergencyContacts.${index}.number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-medium">
                         Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input maxLength={20} className="border-2 w-[18rem] border-[#7D9F0C] bg-white" placeholder="Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index === 1 && (
                    <Button
                    className="bg-[#1A4E68] hover:bg-[#102f3f]"
                      type="button"
                      onClick={() => removeEmergency(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {emergencyFields.length < 3 && (
                <Button
                  className="mt-4 bg-[#1A4E68] hover:bg-[#102f3f]"
                  type="button"
                  onClick={() =>{ 
                    const emer = form.getValues("emergencyContacts");
                    const lastValue = emer[emer.length-1];
                    if(lastValue.name.length>0 && lastValue.number.length>0){
                      appendEmergency({ name: "", number: "" })}}
                    }
                >
                  Add 1 More
                </Button>
              )}
            </div>
            <div className="">
              <h3 className="text-4xl font-medium">Doctor Contacts</h3>
              {doctorContactsFields.map((field, index) => (
                <div key={field.id} className="md:flex gap-x-6 items-end mt-4">
                  <FormField
                    control={form.control}
                    name={`doctorContacts.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-medium">Doctor&apos;s Name</FormLabel>
                        <FormControl>
                          <Input maxLength={20} className="border-2 w-[18rem] border-[#7D9F0C] bg-white" placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`doctorContacts.${index}.number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-medium">Doctor&apos;s Number </FormLabel>
                        <FormControl>
                          <Input maxLength={20} className="border-2 w-[18rem] border-[#7D9F0C] bg-white"
                            type="tel"
                            placeholder="Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index === 1 && (
                    <Button
                    className="bg-[#1A4E68] hover:bg-[#102f3f]"
                      type="button"
                      onClick={() => removeDoctorContacts(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {doctorContactsFields.length < 3 && (
                <Button
                  className="mt-4 bg-[#1A4E68] hover:bg-[#102f3f]"
                  type="button"
                  onClick={() =>{ 
                    const doc = form.getValues("doctorContacts");
                    const lastValue = doc[doc.length-1];
                    if(lastValue.name.length>0 && lastValue.number.length>0){
                      appendDoctorContacts({ name: "", number: "" })}}
                    }
                >
                  Add 1 More
                </Button>
              )}
            </div>
            <div className="flex gap-4 flex-wrap">
            <Button className={`${form.formState.isSubmitting && "cursor-wait"} bg-white border-2 border-[#7D9F0C] text-[1.4rem] font-bold px-12 py-6 text-[#7D9F0C] hover:bg-white`}
             disabled={form.formState.isSubmitting}
             type="submit"
             >
              Generate QR Code
            </Button>

    <AlertDialog>
  <AlertDialogTrigger className={`${form.formState.isSubmitting && "cursor-wait"} bg-white border-2 rounded-md border-[#F05656] text-[1.4rem] font-bold px-12 py-2 text-[#F05656] hover:bg-white`} type="button">Delete Account</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-xl  text-red-600">Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription className="text-lg text-red-600">
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers. <br /> <br />Enter your password to continue:
      </AlertDialogDescription>

      <Input onChange={(e)=>setAccountDelPass(e.target.value)} type="password"></Input>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="bg-white">Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} className="bg-[#F05656] hover:bg-[#F05656]">Delete Account</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</div>
    
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HealthForm;
