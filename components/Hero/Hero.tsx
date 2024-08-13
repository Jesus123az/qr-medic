"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import SignUpModal from "../SignUpModal/SignUpModal"
import { useModalStore } from "@/store/modal/ModalStore"
import oldGuy from "@/assets/old-man.png"
import { useEffect } from "react"
import axios from "axios"
import { useUserStore } from "@/store/user/userStore"

const Hero = () => {
  const {setUser} =  useUserStore()
  const {showSignUpModal, setShowSignUpModal, setShowSignInModal} = useModalStore(state=>state)
  
  const handleSignOut = async ()=>{
    try{
      await axios.post("/api/logout")
      setUser(null)
    }catch(err){
      console.error(err)
    }
  }
  
  useEffect(()=>{
    handleSignOut()
  },[])
  
  return (    
    <div className="hero-container h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-x-24 px-4 lg:px-0">
      { showSignUpModal && <SignUpModal />}
      <div className="hero-text text-center lg:text-left">
        <h2 className="text-3xl lg:text-5xl font-bold text-[#7D9F0C]">Welcome to</h2>
        <h2 className="text-4xl lg:text-6xl italic mt-4 font-semibold text-[#1A4E68]">
          QR MEDIC
        </h2>
      </div>
      <div className="hero-card flex flex-col lg:flex-row items-center gap-8 lg:gap-x-8 bg-white shadow-lg rounded-[42px] py-8 lg:py-10 px-6 lg:px-9 max-w-[95%] lg:max-w-none">
          <Image
            className="overflow-hidden rounded-[60px] w-[200px] h-[200px] lg:w-[254px] lg:h-[245px] object-cover"
            src={oldGuy}
            alt="avatar"
            width={254}
            height={245}
          />
        <div className="text flex flex-col gap-y-6 pt-4 text-center lg:text-left">
          <p className="text-2xl lg:text-[44px] leading-tight lg:leading-[57px] font-bold">
            Connecting to <br /> your{" "}
            <span className="text-[#7D9F0C]">care</span> with <br /> a
            simple scan{" "}
          </p>
          <div className="button-group flex flex-col lg:flex-row gap-4 lg:gap-x-4">
            <Button 
              onClick={()=>setShowSignUpModal(true)} 
              className="bg-white text-[#7D9F0C] border-2 hover:bg-white text-lg lg:text-xl font-semibold border-[#7D9F0C] w-full lg:w-auto"
            >
              Get Started now
            </Button>
            <Button 
              onClick={()=>setShowSignInModal(true)} 
              className="bg-[#CCEAEF] text-[#2AA1B7] border-2 hover:bg-[#CCEAEF] text-lg lg:text-xl font-semibold border-[#2AA1B7] w-full lg:w-auto"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero