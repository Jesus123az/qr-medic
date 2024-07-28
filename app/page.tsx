import Link from "next/link";

const Home = () => {
  return (
    <div >
      <div>Home</div>
      <Link href={"/health-form"}>HealthForm</Link><br />
      <Link href={"/login"}>Login</Link>
    </div>
  );
};

export default Home;
