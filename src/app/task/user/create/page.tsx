"use client";

import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppFormPanel from "@/components/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTextInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import Link from "next/link";
import moment from "moment";

import { useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { redirect, useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import { AxiosError } from "axios";

type User = {
  username: string;
  role: string;
};

export default function CreateUser() {
  //post repair report
  const [user, setUser] = useState<User>({
    username: "",
    role: "",
  });
  const [createUsertLoading, setCreateUserLoading] = useState(false);
  const [errorCreateUser, setErrorCreateUser] = useState("");
  //select status
  const [selectStatusId, setselectStatusId] = useState({ id: 0 });
  const statusUpdate = [
    {
      id: 1,
      name: "user",
    },
    {
      id: 2,
      name: "admin",
    },
    {
      id: 3,
      name: "supervisor",
    },
  ];
  const selectStatusName =
    selectStatusId.id !== 0
      ? statusUpdate.find((c) => c.id === selectStatusId.id)?.name
      : "Select Status";
  //require area
  const [requireInput, setRequireInput] = useState("");
  //invalide email form
  const [emailCheck, setEmailCheck] = useState(true);
  const [emailAlertText, setEmailAlertText] = useState("");

  const router = useRouter();

  async function createUser() {
    //second attempt
    setRequireInput("");
    setErrorCreateUser("");
    //check require
    if (emailCheck == false || user.username == "" || user.role == "") {
      setRequireInput("Require Input");
      return;
    }
    //start to post api
    setCreateUserLoading(true);
    //check loading
    await delay();
    try {
      //post api
      const res = await myapi.post("/Auth/registerUsername", user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorCreateUser(
          "We can't process your request. Please submit again."
        );
        setCreateUserLoading(false);
        return;
      }
      setCreateUserLoading(false);
      router.push("/task/user");
      return;
    } catch (err) {
      const error = err as AxiosError;
      if (error.status == 400) {
        setErrorCreateUser(String(error.response?.data));
      }
      setCreateUserLoading(false);
    }
  }

  //check email
  function checkEmailFormat() {
    if (errorCreateUser) {
      setErrorCreateUser("");
    }
    const check =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (check.test(user.username)) {
      setEmailAlertText("");
      setEmailCheck(true);
    } else {
      setEmailAlertText("Please input email in email format");
      setEmailCheck(false);
    }
  }

  //check token and expire time
  if (
    localStorage.getItem("name") == null ||
    new Date(moment(Date.now()).toISOString()) >
      new Date(String(localStorage.getItem("refreshTokenExpiryTime")))
  ) {
    localStorage.clear();
    redirect(`/login`);
  } else if (localStorage.getItem("role") !== "admin") {
    redirect(`/login`);
  }

  return (
    <div className="flex flex-col h-[85vh]">
      <HeaderDisplay label="CREATE USER">
        {errorCreateUser ? (
          <span className="mt-4 font-semibold text-red-500">
            {errorCreateUser}
          </span>
        ) : (
          <></>
        )}
        {requireInput !== "" && (user.username == "" || user.role == "") ? (
          <span className="mt-4 font-semibold text-red-500">
            {requireInput}
          </span>
        ) : (
          <></>
        )}
      </HeaderDisplay>

      <div className="overflow-auto">
        <div className="w-full">
          <AppFormPanel label="">
            <AppTetxtInput
              label="USERNAME"
              value={user.username}
              onTextChange={(username) => {
                setUser((pre) => ({ ...pre, username }));
                checkEmailFormat();
              }}
              style={
                (requireInput !== "" && user.username == "") ||
                emailCheck == false
                  ? "border-red-500 border-2"
                  : ""
              }
              emailAlert={emailAlertText}
            />
            <div className="flex flex-col h-20 text-lg">
              <label className="uppercase">ROLE</label>
              <div className="mt-4">
                <Menu>
                  <MenuButton
                    className={
                      requireInput !== "" && user.role == ""
                        ? "flex items-center h-9 w-52 self-center pl-5 pr-3 text-lg font-medium text-center text-red-500 border-red-500 border-2 rounded-full stroke-red-500"
                        : "flex items-center h-9 w-52 self-center pl-5 pr-3 text-lg font-medium text-center text-gray-900 border-gray-900 border rounded-full stroke-gray-900"
                    }
                  >
                    <span className="flex-1 mr-1 capitalize">
                      {selectStatusName}
                    </span>
                    <DropdownIcon />
                  </MenuButton>
                  <MenuItems
                    anchor="bottom"
                    className={
                      requireInput !== "" && user.role == ""
                        ? "w-52 mt-3 border border-red-500 rounded-lg text-lg text-red-500 text-center bg-white capitalize"
                        : "w-52 mt-3 border border-gray-300 rounded-lg text-lg text-center bg-white capitalize"
                    }
                  >
                    {statusUpdate.map((c) => {
                      return (
                        <div
                          key={c.id}
                          onClick={() => {
                            setselectStatusId({ ...selectStatusId, id: c.id });
                            setUser({
                              ...user,
                              role: String(c.name),
                            });
                            if (user.role !== c.name) {
                              user.role = c.name;
                            }
                          }}
                        >
                          <MenuItem>
                            <a className="block data-[focus]:bg-gray-100 py-2 capitalize">
                              {c.name}
                            </a>
                          </MenuItem>
                        </div>
                      );
                    })}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </AppFormPanel>
        </div>
      </div>
      {/*button*/}
      <div className="mt-16 flex justify-end">
        <Link href={`/task/user`}>
          <ActionButton label="Cancel" />
        </Link>
        <ActionButton
          label="Create"
          iconRight={<AddCreateIcon />}
          disableButton={createUsertLoading}
          onClick={createUser}
        />
      </div>
    </div>
  );
}
