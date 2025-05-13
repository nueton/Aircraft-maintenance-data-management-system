import { myapi } from "@/services/myapi";
import React, { useEffect, useState } from "react";

type HeaderpanelProps = {
  children: React.ReactNode;
};

function Headerpanel({ children }: HeaderpanelProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (localStorage.length !== 0) {
      getFullName(String(localStorage.getItem("nameIdentifier")));
    }
  }, []);

  async function getFullName(id: string) {
    const res = await myapi.get(`/Auth/fullName/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setName(res.data);
  }

  return (
    <div className="absolute inset-0 left-80 transition-all">
      <div className="flex justify-end items-end w-full pr-10 h-16 text-lg">
        <span className="text-gray-700 mr-2">Welcome, </span>
        <span className="text-blue-600">{name}</span>
      </div>
      <div className="p-10">{children}</div>
    </div>
  );
}

export default Headerpanel;
