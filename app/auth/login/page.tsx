import { LoginForm } from "@/components/login-form";
import Navbar from "@/components/navbar";

export default function Page() {
  return (
    <div className="">
      <Navbar />
      <div className="w-full max-w-sm mx-auto my-16">
        <LoginForm />
      </div>
    </div>
  );
}
