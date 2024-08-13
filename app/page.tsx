import oldLady from "@/assets/old-lady.png";
import Image from "next/image";
import step1 from "@/assets/step-1.png";
import step2 from "@/assets/step-2.png";
import step3 from "@/assets/step-3.png";
import mobile from "@/assets/mobile.png";
import aid from "@/assets/aid.png";
import process from "@/assets/process.png";
import vitals from "@/assets/vitals.png";
import Hero from "@/components/Hero/Hero";
import { Suspense } from "react";

const steps = [
  { number: 1, text: "Fill the Form", image: step1 },
  { number: 2, text: "Generate QR Code", image: step2 },
  { number: 3, text: "Scan the code", image: step3 },
];

const Home = () => {
  return (
    <div className="overflow-x-hidden">
     <div className="flex  bg-[#CBE9EF] justify-between items-center md:h-[500px]">
        <div className="min-w-[3%] bg-[#B9E2EB] rounded-tr-3xl  h-full"></div>
        <Hero />
        <div className="min-w-[3%] bg-[#B9E2EB] rounded-tl-3xl  h-full"></div>
      </div>

      <div className="about-us bg-[#CBE9EF] mx-[3%] flex flex-col items-center">
        <div className="border-t-2 border-[#88CBD7] py-12 w-[95%] flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold pb-7 text-center">About us</h1>
          <div className="w-[80%] md:min-w-[50%] bg-[#88CBD7] h-[2px]"></div>
          <div className="about-us-card bg-white rounded-[42px] w-full max-w-[43rem] mt-7 flex flex-col-reverse md:flex-row gap-7 p-6 md:p-9 items-center shadow-2xl">
            <p className="about-us-text text-lg md:text-2xl font-normal">
              At <span className="font-semibold">QR Medic</span>, our mission is to <span className="font-semibold">empower individuals</span> who are unable to help themselves during critical moments. Through advanced Augmented Reality technology, we ensure <span className="font-semibold">critical health details are instantly available in emergency situations.</span> Our commitment is to enhance personal security and offer peace of mind for individuals and their caregivers when it's needed most.
            </p>
            <Image src={oldLady} width={200} height={200} alt="old-lady-avatar" className="w-40 md:w-auto" />
          </div>
        </div>
      </div>

      <div className="how-to-use flex flex-col md:flex-row py-12 md:py-20 gap-8 md:gap-x-11 justify-center items-center">
        <h2 className="text-4xl md:text-6xl font-semibold text-center md:text-left">
          How to<br />
          <span className="text-6xl md:text-8xl">Use</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-x-12">
          {steps.map(({ number, image, text }) => (
            <div key={number} className="w-full md:w-52 pl-7 py-3 rounded-3xl bg-white relative">
              <div className="text text-xl italic font-medium w-1/2">
                <span className="text-[#7D9F0C]">STEP {number}</span>
                <p className="mt-5">{text}</p>
              </div>
              <div className={`absolute ${number === 3 ? "-right-12 top-0" : "-right-7 top-7"} ${number === 2 && "bg-[#DBEF99] rounded-xl -rotate-6"}`}>
                <Image className={number === 2 ? "rotate-6" : ""} src={image} alt="step" width={number === 3 ? 150 : 100} height={100} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Suspense fallback={<div>Loading....</div>}>
        <div style={{ backgroundImage: `url(/bg.png)` }} className="services mx-[3%] flex flex-col md:flex-row py-12 md:py-16 justify-center items-center gap-8 md:gap-x-48 bg-[#CBE9EF]">
          <h2 className="text-4xl md:text-6xl font-medium text-center md:text-left">
            We <br />
            <span className="text-6xl md:text-8xl font-semibold">Provide</span>
          </h2>
          <div className="cards flex flex-col gap-y-10 w-full max-w-[28rem]">
            {[
              { icon: process, text: "Simple <span class='italic font-semibold'>2 step</span><br />registration process" },
              { icon: vitals, text: "Instant Access to your<br /><span class='italic font-semibold'>Vital Information</span>" },
              { icon: mobile, text: "Efficient information<br /><span class='italic font-semibold'>display in AR</span>" },
              { icon: aid, text: "Access <span class='italic font-semibold'>First aid</span><br />instructional videos" },
            ].map((item, index) => (
              <div key={index} className="w-full relative h-[5.5rem] flex px-6 pt-3 rounded-3xl bg-white">
                <div style={{ boxShadow: "1.53px 12.21px 56.93px -2.91px #E4F1BA inset" }} className={`flex justify-center items-center w-28 h-28 absolute z-20 rounded-full bg-white -top-3 ${index % 2 === 1 ? 'right-6' : ''}`}>
                  <Image src={item.icon} width={70} height={70} alt="step-image" />
                </div>
                <p className={`absolute ${index % 2 === 1 ? 'left-10' : 'right-10'} font-normal text-center text-lg md:text-2xl`} dangerouslySetInnerHTML={{ __html: item.text }}></p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#B7E1EB] mx-[3%] py-5 flex flex-col items-center gap-y-5">
          {[
            "https://www.youtube.com/embed/vBWWleBSW6A?si=4ZwrjE9YkoYd5o80",
            "https://www.youtube.com/embed/_OVgpGkyiQ0?si=tzWJ5axfXV4S2AZ0",
            "https://www.youtube.com/embed/jJWfHHqfSbk?si=HM2zi-yy0XZ3-yo_",
            "https://www.youtube.com/embed/Plse2FOkV4Q?si=HPlVE_xzqfregeNm"
          ].map((src, index) => (
            <div key={index} className="w-full max-w-[560px]">
              <div className="relative pb-[56.25%]">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={src} 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;