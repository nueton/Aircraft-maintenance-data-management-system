import React from "react";
import SideButton from "../button/SideButton";
import { useRouter } from "next/navigation";
import HomeIcon from "@/assets/icons/HomeIcon";
import AddIcon from "@/assets/icons/AddIcon";
import SandGlassIcon from "@/assets/icons/SandGlassIcon";

function Userpanel() {
  const router = useRouter();
  //store path api with current user id that get processed task, then reload to get api with new path if stay in the same path(task)
  function taskInprogress() {
    localStorage.setItem(
      "path",
      `/Task/inProgress/${localStorage.getItem("nameIdentifier")}`
    );
    localStorage.setItem("pathName", "IN PROGRESS");
    if (window.location.pathname !== "/task") {
      router.push(`/task`);
    } else {
      location.reload();
    }
  }
  //store path api with current user id that get all task, then reload to get api with new path if stay in the same path(task)
  function taskAll() {
    localStorage.setItem(
      "path",
      `/Task/allTask/${localStorage.getItem("nameIdentifier")}`
    );
    localStorage.setItem("pathName", "TASKS");
    if (window.location.pathname !== "/task") {
      router.push(`/task`);
    } else {
      location.reload();
    }
  }

  return (
    <>
      <SideButton onClick={taskAll}>
        <HomeIcon style="w-10" />
        <span className="flex-1 text-left pl-5">Tasks</span>
        <AddIcon style="w-10" />
      </SideButton>
      <SideButton onClick={taskInprogress}>
        <SandGlassIcon style="w-10" />
        <span className="flex-1 text-left pl-5">In progress</span>
      </SideButton>
    </>
  );
}

export default Userpanel;
