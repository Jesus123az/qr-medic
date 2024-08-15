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
import { useUserStore } from "@/store/user/userStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { showSignInModal, setShowSignInModal } = useModalStore();
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post("/api/logout");
      setUser(null);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-[#CBE9EF] pb-7">
      {showSignInModal && <SignInModal />}
      <nav className="flex justify-between items-center px-5 py-4 md:py-6 text-[#14264C]">
        <Link className="flex items-center" href={"/"}>
          <Image width={70} height={70} src={logo} alt="logo" />
          <h1 className="text-2xl md:text-4xl font-semibold">QR MEDIC</h1>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-x-7 text-xl md:text-2xl font-medium">
          {user ? (
            <>
              <li>
                <Link className="hover:underline" href={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={"/health-form"}>
                  Medical Form
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={"/qr-code"}>
                  QR Code
                </Link>
              </li>
            </>
          ) : (
            <>
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
                <ScrollLink
                  className="cursor-pointer hover:underline"
                  to="how-to-use"
                  duration={500}
                  smooth={true}
                >
                  How To Use
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  className="cursor-pointer hover:underline"
                  to="services"
                  duration={500}
                  smooth={true}
                >
                  Services
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  className="cursor-pointer hover:underline"
                  to="contact"
                  duration={500}
                  smooth={true}
                >
                  Contact Us
                </ScrollLink>
              </li>
            </>
          )}
        </ul>

        {/* Account and Language Selection */}
        <ul className="hidden md:flex gap-x-5 text-xl md:text-2xl font-medium">
          <li>
            <Select defaultValue="english">
              <SelectTrigger className="w-[120px] md:w-[150px] text-lg md:text-xl">
                <SelectValue
                  className="text-lg md:text-2xl"
                  placeholder="Select Language"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  <SelectItem className="text-lg" value="english">
                    English EN
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </li>
          <li>
            {user ? (
              <div className="flex gap-x-4 items-center">
              <Button
                className="text-lg rounded-2xl py-2 px-4 font-medium bg-white hover:bg-white text-[#14264C]"
              >
                {user.name} <User />
              </Button>
              <span onClick={handleSignOut} className="hover:underline cursor-pointer text-lg font-medium">Log Out</span>
              </div>
            ) : (
              <Button
                onClick={() => setShowSignInModal(true)}
                className="text-lg rounded-2xl py-2 px-4 font-medium bg-white hover:bg-white text-[#14264C]"
              >
                Account Login <User />
              </Button>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-y-4 px-5">
          <ul className="flex flex-col gap-y-4 text-xl font-medium">
            {user ? (
              <>
                <li>
                  <Link className="hover:underline" href={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href={"/health-form"}>
                    Medical Form
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href={"/qr-code"}>
                    QR Code
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <ScrollLink
                    className="cursor-pointer hover:underline"
                    activeClass="underline text-[#7D9F0C]"
                    to="about-us"
                    duration={500}
                    smooth={true}
                    onClick={toggleMobileMenu}
                  >
                    About Us
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    className="cursor-pointer hover:underline"
                    to="how-to-use"
                    duration={500}
                    smooth={true}
                    onClick={toggleMobileMenu}
                  >
                    How To Use
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    className="cursor-pointer hover:underline"
                    to="services"
                    duration={500}
                    smooth={true}
                    onClick={toggleMobileMenu}
                  >
                    Services
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    className="cursor-pointer hover:underline"
                    to="contact"
                    duration={500}
                    smooth={true}
                    onClick={toggleMobileMenu}
                  >
                    Contact Us
                  </ScrollLink>
                </li>
              </>
            )}
          </ul>
          <ul className="flex flex-col gap-y-4 text-xl font-medium">
            <li>
              <Select defaultValue="english">
                <SelectTrigger className="w-full text-lg md:text-xl">
                  <SelectValue
                    className="text-lg md:text-2xl"
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
              {user ? (
                <div className="flex flex-col gapy-5">
                <Button
                  className="text-lg rounded-2xl py-2 px-4 font-medium bg-white hover:bg-white text-[#14264C]"
                >
                  {user.name} <User />
                </Button>
              <span onClick={handleSignOut} className="hover:underline cursor-pointer text-lg font-medium">Log Out</span>
              </div>
            ) : (
                <Button
                  onClick={() => setShowSignInModal(true)}
                  className="text-lg rounded-2xl py-2 px-4 font-medium bg-white hover:bg-white text-[#14264C]"
                >
                  Account Login <User />
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
