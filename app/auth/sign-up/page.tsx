import Navbar from "@/components/navbar";
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="">
      <Navbar />
      <div className="w-full max-w-sm mx-auto my-16">
        <SignUpForm />
      </div>
    </div>
  );
}
