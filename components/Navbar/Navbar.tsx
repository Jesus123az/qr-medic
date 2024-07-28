import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between px-20 py-5">
      <Link href={"/"}>
        <h1 className="text-4xl font-bold">MedAR</h1>
      </Link>
      <ul className="flex gap-x-5">
        <Link href={"/login"}><li>Login</li></Link>
        <Link href={"/register"}><li>Register</li></Link>
        <Link href={"/health-form"}><li>Health Form</li></Link>
      </ul>
    </div>
  );
};

export default Navbar;
