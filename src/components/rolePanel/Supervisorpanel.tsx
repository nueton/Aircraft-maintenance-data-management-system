import React from "react";
import SideButton from "../button/SideButton";
import Link from "next/link";
import HomeIcon from "@/assets/icons/HomeIcon";

function Supervisorpanel() {
  return (
    <Link href={`/task`}>
      <SideButton>
        <HomeIcon style="w-10" />
        <span className="flex-1 text-left pl-5">Tasks</span>
      </SideButton>
    </Link>
  );
}

export default Supervisorpanel;
