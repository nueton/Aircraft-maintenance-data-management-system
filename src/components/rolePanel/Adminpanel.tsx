import React from "react";
import SideButton from "../button/SideButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CorrectIcon from "@/assets/icons/CorrectIcon";
import CrossIcon from "@/assets/icons/CrossIcon";
import UserIcon from "@/assets/icons/UserIcon";

function Adminpanel() {
  const router = useRouter();
  //store new api path for checked task
  function taskCheck() {
    localStorage.setItem("path", `/Task/checked`);
    localStorage.setItem("pathName", "CHECKED");
    if (window.location.pathname !== "/task") {
      router.push(`/task`);
    } else {
      router.refresh();
    }
  }
  //store new api path for processed task
  function taskNotChecked() {
    localStorage.setItem("path", `/Task/inProgress`);
    localStorage.setItem("pathName", "NOT CHECKED");
    if (window.location.pathname !== "/task") {
      router.push(`/task`);
    } else {
      router.refresh();
    }
  }
  return (
    <>
      <SideButton onClick={taskCheck}>
        <CorrectIcon style="w-10" />
        <span className="flex-1 text-left pl-5">Checked</span>
      </SideButton>

      <SideButton onClick={taskNotChecked}>
        <CrossIcon style="w-10" />
        <span className="flex-1 text-left pl-5">Not Checked</span>
      </SideButton>

      <Link href={`/task/user`}>
        <SideButton>
          <UserIcon style="w-10" />
          <span className="flex-1 text-left pl-5">Manage User</span>
        </SideButton>
      </Link>
    </>
  );
}

export default Adminpanel;
