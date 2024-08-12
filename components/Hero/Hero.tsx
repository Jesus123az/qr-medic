"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import SignUpModal from "../SignUpModal/SignUpModal"
import { useModalStore } from "@/store/modal/ModalStore"
const Hero = () => {
  const {showSignUpModal, setShowSignUpModal, setShowSignInModal} = useModalStore(state=>state)
  return (    
    <div className="hero-container  h-full flex items-center gap-x-24">
      { showSignUpModal && <SignUpModal />}
          <div className="hero-text">
            <h2 className="text-5xl font-bold text-[#7D9F0C]">Welcome to </h2>
            <h2 className="text-6xl italic mt-4 font-semibold text-[#1A4E68]">
              QR MEDIC
            </h2>
          </div>
          <div className="hero-card flex items-center gap-x-8 bg-white shadow-lg rounded-[42px] py-10 px-9">
            <div className="avatar rounded-[40px] shadow-[6.64px_7.38px_11.81px_-7.38px_#00000040]">
              <Image
                className="overflow-hidden rounded-[60px]"
                src={"/avatar-1.png"}
                alt="avatar"
                width={254}
                height={245}
              />
            </div>
            <div className="text flex flex-col gap-y-6 pt-4">
              <p className="text-[44px] leading-[57px] font-bold">
                Connecting to <br /> your{" "}
                <span className="text-[#7D9F0C]">care</span> with <br /> a
                simple scan{" "}
              </p>
              <div className="button-group flex gap-x-4">
                <Button onClick={()=>setShowSignUpModal(true)} className="bg-white text-[#7D9F0C] border-2 hover:bg-white text-xl font-semibold border-[#7D9F0C]">
                  Get Started now
                </Button>
                <Button onClick={()=>setShowSignInModal(true)} className="bg-[#CCEAEF] text-[#2AA1B7] border-2 hover:bg-[#CCEAEF] text-xl font-semibold border-[#2AA1B7]">
                  {" "}
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Hero