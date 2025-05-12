import React, { useEffect, useState } from "react";
import SideButton from "../button/SideButton";
import StopIcon from "@/assets/icons/StopIcon";
import Supervisorpanel from "../rolePanel/Supervisorpanel";
import Adminpanel from "../rolePanel/Adminpanel";
import Userpanel from "../rolePanel/Userpanel";
import InspectorPanel from "../rolePanel/InspectorPanel";

function Sidepanel() {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      setRole(localStorage.getItem("role") || "");
    }
  }, []);

  //all user
  function Logout() {
    localStorage.clear();
    window.location.href = "/login";
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  function checkRole() {
    if (role == "supervisor") {
      return <Supervisorpanel />;
    } else if (role == "admin") {
      return <Adminpanel />;
    } else if (role == "user") {
      return <Userpanel />;
    } else if (role == "inspector") {
      return <InspectorPanel />;
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
