import oldLady from "@/assets/old-lady.png";
import Image from "next/image";
import step1 from "@/assets/step-1.png"
import step2 from "@/assets/step-2.png"
import step3 from "@/assets/step-3.png"
import mobile from "@/assets/mobile.png"
import aid from "@/assets/aid.png"
import process from "@/assets/process.png"
import vitals from "@/assets/vitals.png"
import Hero from "@/components/Hero/Hero";
import { Suspense, useEffect } from "react";
const steps = [
  {
    number: 1,
    text: "Fill the Form",
    image: step1,
  },
  {
    number: 2,
    text: "Generate QR Code",
    image: step2,
  },
  {
    number: 3,
    text: "Scan the code",
    image: step3,
  },
]

const Home = () => {
  return (
    <div>
      <div className="flex  bg-[#CBE9EF] justify-between items-center h-[500px]">
        <div className="min-w-[3%] bg-[#B9E2EB] rounded-tr-3xl  h-full"></div>
        <Hero />
        <div className="min-w-[3%] bg-[#B9E2EB] rounded-tl-3xl  h-full"></div>
      </div>
      <div className="about-us bg-[#CBE9EF] mx-[3%] flex flex-col items-center">
        <div className="border-t-2 border-[#88CBD7] py-12 w-[95%] flex flex-col items-center">
          <h1 className="text-6xl font-bold pb-7 ">About us</h1>
          <div className="min-w-[50%] bg-[#88CBD7] h-[2px]"></div>
          <div className="about-us-card bg-white rounded-[42px]  w-[43rem] mt-7 flex gap-x-7 p-9 items-center py shadow-2xl">
            <p className="about-us-text text-2xl font-normal">
              At <span className="font-semibold">QR Medic</span>, our mission is
              to enhance the <span className="font-semibold">safety</span> and{" "}
              <span className="font-semibold">well-being</span> of
              <span className="font-semibold"> elderly individuals</span> by
              transforming their medical information into easily accessible
              <span className="font-medium text-[#7D9F0C]"> QR codes.</span>{" "}
              Through advanced augmented reality, we ensure{" "}
              <span className="font-semibold">critical health details</span> are
              instantly available in emergency situations,{" "}
              <span className="font-semibold">providing peace of mind</span> for
              seniors and their caregivers.
            </p>
            <Image
              src={oldLady}
              width={200}
              height={200}
              alt="old-lady-avatar"
            />
          </div>
        </div>
      </div>
      <div className="how-to-use flex py-20 gap-x-11 justify-center">
        <h2 className="text-6xl font-semibold">
          How to
          <br />
          <span className="text-8xl"> Use </span>
        </h2>
        <div className="flex gap-x-12">
          {steps.map(({number, image, text})=>
          <div key={number} className="w-52 pl-7 py-3 rounded-3xl bg-white  relative" >
            <div className="text text-xl italic font-medium w-1/2">
            <span className=" text-[#7D9F0C]">STEP {number}</span>
            <p className="mt-5">{text}</p>
            </div>
            <div className={`absolute  ${number===3?"-right-12 top-0":"-right-7  top-7"} ${number===2 && "bg-[#DBEF99] rounded-xl -rotate-6"}`}>
            <Image className={number===2?"rotate-6":""} src={image} alt="step" width={number===3?150:100} height={100} />
            </div>
          </div>
          )}
        </div>
      </div>
      <Suspense fallback={<div>Loading....</div>}>
      <div style={{backgroundImage: `url(/bg.png)`}} className="services mx-[3%] flex py-16 justify-center gap-x-48 bg-[#CBE9EF]">
        
        <h2 className="text-6xl font-medium">We <br />
          <span className="text-8xl font-semibold">Provide</span></h2>
        <div className="cards flex flex-col gap-y-10">
          <div  className="w-[28rem] relative h-[5.5rem] flex px-6 pt-3 rounded-3xl bg-white" >
            <div style={{boxShadow: "1.53px 12.21px 56.93px -2.91px #E4F1BA inset"}} className="flex justify-center items-center w-28 h-28 absolute z-20 rounded-full  bg-white -top-3">
              <Image src={process} width={70} height={70} alt="step-image" /></div>
            <p className="absolute right-20 font-normal text-center text-2xl">Simple  <span className="italic font-semibold"> 2 step </span> <br /> registration process</p>

          </div>
          <div  className="w-[28rem] relative h-[5.5rem] flex px-6 pt-3 rounded-3xl bg-white" >
            <div style={{boxShadow: "1.53px 12.21px 56.93px -2.91px #E4F1BA inset"}} className="flex justify-center items-center w-28 h-28 absolute z-20 rounded-full  bg-white -top-3 right-6">
              <Image src={vitals} width={70} height={70} alt="step-image" /></div>
            <p className="absolute left-10 font-normal text-center text-2xl">Instant Access to your <br /> <span className="italic font-semibold">Vital Information</span> <br /></p>

          </div>
          <div  className="w-[28rem] relative h-[5.5rem] flex px-6 pt-3 rounded-3xl bg-white" >
            <div style={{boxShadow: "1.53px 12.21px 56.93px -2.91px #E4F1BA inset"}} className="flex justify-center items-center w-28 h-28 absolute z-20 rounded-full  bg-white -top-3">
              <Image src={mobile} width={70} height={70} alt="step-image" /></div>
            <p className="absolute right-10 font-normal text-center text-2xl">Companion <span className="italic font-semibold"> mobile app </span> <br /> for efficient use</p>

          </div>
          <div  className="w-[28rem] relative h-[5.5rem] flex px-6 pt-3 rounded-3xl bg-white" >
            <div style={{boxShadow: "1.53px 12.21px 56.93px -2.91px #E4F1BA inset"}} className="flex justify-center items-center w-28 h-28 absolute z-20 rounded-full  bg-white -top-3 right-6">
              <Image src={aid} width={70} height={70} alt="step-image" /></div>
            <p className="absolute left-14 font-normal text-center text-2xl">Access  <span className="italic font-semibold"> First aid </span> <br /> instructional videos</p>

          </div>
         
        </div>

      </div>
      </Suspense>
    </div>
  );
};

export default Home;
