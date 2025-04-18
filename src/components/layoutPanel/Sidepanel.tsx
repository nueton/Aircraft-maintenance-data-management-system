import React from "react";
import SideButton from "../button/SideButton";
import StopIcon from "@/assets/icons/StopIcon";
import { redirect } from "next/navigation";
import Supervisorpanel from "../rolePanel/Supervisorpanel";
import Adminpanel from "../rolePanel/Adminpanel";
import Userpanel from "../rolePanel/Userpanel";

function Sidepanel() {
  //all user
  function Logout() {
    localStorage.clear();
    redirect(`/login`);
  }

  function checkRole() {
    if (localStorage.getItem("role") == "supervisor") {
      return <Supervisorpanel />;
    } else if (localStorage.getItem("role") == "admin") {
      return <Adminpanel />;
    } else if (localStorage.getItem("role") == "user") {
      return <Userpanel />;
    }
  }

  return (
    <div className="pt-32 absolute w-80 transition-all left-0 top-0 bottom-0 flex flex-col">
      <div className="flex-1">{checkRole()}</div>
      <div className="h-24">
        <SideButton onClick={Logout}>
          <StopIcon style="w-10" />
          <span className="flex-1 text-left pl-5">Log out</span>
        </SideButton>
      </div>
    </div>
  );
}

export default Sidepanel;
