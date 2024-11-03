import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-indigo-500 text-3xl font-bold">
      Protected
      <UserButton
        afterSwitchSessionUrl="/"
      />
      <ModeToggle />
    </div>
  );
}
