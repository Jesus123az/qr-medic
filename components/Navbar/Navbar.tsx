"use client";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SignInModal from "../SignInModal/SignInModal";
import { useModalStore } from "@/store/modal/ModalStore";

const Navbar = () => {
  const { showSignInModal, setShowSignInModal } = useModalStore(
    (state) => state
  );
  return (
    <header className="bg-[#CBE9EF] pb-7">
      {showSignInModal && <SignInModal />}
      <nav className="flex text-[#14264C] justify-between px-5  items-center">
        <Link className="flex  items-center" href={"/"}>
          <Image width={70} height={70} src={"/logo.png"} alt="logo" />
          <h1 className="text-4xl font-semibold">QR MEDIC</h1>
        </Link>
        <ul className="flex gap-x-7 text-2xl font-medium">
          <li>
            <ScrollLink
              className="cursor-pointer hover:underline"
              activeClass="underline text-[#7D9F0C]"
              to="about-us"
              duration={500}
              smooth={true}
            >
              About Us
            </ScrollLink>
          </li>
          <li>
            <ScrollLink className="cursor-pointer hover:underline" to="how-to-use" duration={500} smooth={true}>
              How To Use
            </ScrollLink>
          </li>
          <li>
            <ScrollLink className="cursor-pointer hover:underline" to="services" duration={500} smooth={true}>
              Services
            </ScrollLink>
            </li>
            <li>
            <ScrollLink className="cursor-pointer hover:underline" to="contact" duration={500} smooth={true}>
              Contact Us
            </ScrollLink>
          </li>
        </ul>
        <ul className="flex gap-x-5 text-2xl font-medium">
          <li>
            {" "}
            <Select defaultValue="english">
              <SelectTrigger className="w-[150px] text-xl">
                <SelectValue
                  className="text-2xl"
                  placeholder="Select Language"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  <SelectItem className="text-lg" value="english">
                    English EN
                  </SelectItem>
                  <SelectItem className="text-lg" value="french">
                    French FR
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </li>
          <li>
            {/* <Link href={"/login"}> */}
            <Button
              onClick={() => setShowSignInModal(true)}
              className="text-lg rounded-2xl py-2 px-4 font-medium  bg-white hover:bg-white text-[#14264C]"
            >
              Account Login <User />
            </Button>
            {/* </Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
