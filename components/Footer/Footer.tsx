"use client"
import { Link as ScrollLink } from "react-scroll";
import facebook from "@/assets/Facebook.png"
import twitter from "@/assets/Twitter.png"
import instagram from "@/assets/Instagram.png"
import Image from "next/image";


const Footer = () => {
  return (
    <footer style={{background: "linear-gradient(115.49deg, #2AA1B7 -3.97%, #1A4E68 107.48%)"}}
     className=" contact  text-white p-8"
     >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-6 md:mb-0 flex flex-col items-center">
            <div className="flex items-center">
          <Image src="/logo.png" width={80} height={80} alt="QR Medic Logo" className=" mb-4" />
          <h3 className="font-semibold text-4xl text-[#14264C]">QR MEDIC</h3>
            </div>
          <p className="text-md ">&copy; 2024 QR Medic, Inc.</p>
          <div className="flex justify-end mt-4 space-x-4">
            <a href="#" aria-label="Instagram" className="text-white hover:text-gray-200">
              <Image className="bg-white rounded-full" src={facebook} width={42} height={42} alt="social-media-link" />
            </a>
            <a href="#" aria-label="Facebook" className="text-white hover:text-gray-200">
              <Image src={twitter} width={42} height={42} alt="social-media-link" />
            </a>
            <a href="#" aria-label="Twitter" className="text-white hover:text-gray-200">
              <Image className="bg-white rounded-full" src={instagram} width={42} height={42} alt="social-media-link" />
            </a>
          </div>
        </div>
        

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
          <div>
            <h4 className="font-bold text-2xl mb-3">Contact Us</h4>
            <p className="font-medium text-xl">+12345556657</p>
            <p className="font-medium text-xl">Mon-Fri</p>
          </div>
          <div>
            <h4 className="font-bold text-2xl mb-3">Company</h4>
            <ul>
              <li><ScrollLink to="about-us" duration={500} smooth={true} className="hover:underline cursor-pointer font-medium text-xl">About Us</ScrollLink></li>
              <li><ScrollLink to="how-to-use" duration={500} smooth={true} className="hover:underline cursor-pointer font-medium text-xl">How to Use</ScrollLink></li>
              <li><ScrollLink to="services" duration={500} smooth={true} className="hover:underline cursor-pointer font-medium text-xl">Services</ScrollLink></li>
              <li><ScrollLink to="footer"  duration={500} smooth={true} className="hover:underline cursor-pointer font-medium text-xl">Contact Us</ScrollLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-2xl mb-3">Customer</h4>
            <ul>
              <li><span onClick={()=>{}} className="hover:underline cursor-pointer font-medium text-xl" >Account</span></li>
              <li><span onClick={()=>{}} className="hover:underline cursor-pointer font-medium text-xl" >Log in</span></li>
              <li><span onClick={()=>{}} className="hover:underline cursor-pointer font-medium text-xl" >Sign up</span></li>
              <li><span onClick={()=>{}} className="hover:underline cursor-pointer font-medium text-xl" >Download QR code</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 md:mt-0 text-right">
          <p className="text-2xl font-medium">Still have a query?</p>
          <a  href="mailto:qrmedic@gmail.com" className="hover:underline text-2xl font-medium">qrmedic@gmail.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
