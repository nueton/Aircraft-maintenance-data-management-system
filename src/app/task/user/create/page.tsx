"use client";

import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppFormPanel from "@/components/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTextInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import Link from "next/link";
import moment from "moment";

import { useEffect, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import { AxiosError } from "axios";
import { cn } from "@/helpers/cn";

type User = {
  username: string;
  role: string;
  rank: string;
  name: string;
  surname: string;
  userId: string;
  createUserId: string;
};

export default function CreateUser() {
  //post repair report
  const [user, setUser] = useState<User>({
    username: "",
    role: "",
    rank: "",
    name: "",
    surname: "",
    userId: "",
    createUserId: "",
  });
  const [createUsertLoading, setCreateUserLoading] = useState(false);
  const [errorCreateUser, setErrorCreateUser] = useState("");
  const statusUpdate = [
    {
      id: 1,
      name: "user",
      rank: ["จ.ต.", "จ.ท.", "จ.อ.", "พ.อ.ต.", "พ.อ.ท.", "พ.อ.อ."],
    },
    {
      id: 2,
      name: "inspector",
      rank: ["พ.อ.อ."],
    },
    {
      id: 3,
      name: "admin",
      rank: ["จ.ต.", "จ.ท.", "จ.อ.", "พ.อ.ต.", "พ.อ.ท.", "พ.อ.อ."],
    },
    {
      id: 4,
      name: "supervisor",
      rank: ["ร.ต.", "ร.ท.", "ร.อ.", "น.ต.", "น.ท.", "น.อ."],
    },
  ];
  //require area
  const [requireInput, setRequireInput] = useState("");
  //invalide email form
  const [emailCheck, setEmailCheck] = useState(true);
  const [emailAlertText, setEmailAlertText] = useState("");

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function CheckDate() {
    if (localStorage.length == 0) {
      router.push("/login");
      return;
    }
    try {
      const res = await myapi.get(
        `/Auth/refresh/${localStorage.getItem("nameIdentifier")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      localStorage.setItem("refreshTokenExpiryTime", res.data);
      const checking =
        new Date(moment(Date.now()).toISOString()) >
        new Date(String(localStorage.getItem("refreshTokenExpiryTime")));
      if (localStorage.getItem("name") == null || checking) {
        localStorage.clear();
        router.push("/login");
        return false;
      } else if (localStorage.getItem("role") !== "admin") {
        router.back();
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createUser() {
    const dateCheck = await CheckDate();
    if (dateCheck == false) {
      return;
    }
    //second attempt
    setRequireInput("");
    setErrorCreateUser("");
    //check require
    if (
      emailCheck == false ||
      user.username == "" ||
      user.role == "" ||
      user.rank == "" ||
      user.name == "" ||
      user.surname == "" ||
      user.userId == ""
    ) {
      setRequireInput("Require Input");
      return;
    }
    //start to post api
    const createdUserId = localStorage.getItem("nameIdentifier");
    if (createdUserId) user.createUserId = createdUserId;
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
          <AppFormPanel label="DETAIL">
            <div className="flex">
              {/* rank */}
              <div className="flex flex-col h-20 text-lg mr-2">
                <label className="uppercase">RANK</label>
                <div className="mt-4">
                  <Menu>
                    <MenuButton
                      className={cn(
                        "flex items-center h-9 w-44 self-center pl-5 pr-3 text-lg font-medium text-center rounded-lg",
                        requireInput !== "" && user.rank == ""
                          ? "border-red-500 border-2 animate-headShake text-red-500 stroke-red-500"
                          : "text-gray-900 border-gray-900 border stroke-gray-900"
                      )}
                    >
                      <span className="flex-1 mr-1 capitalize">
                        {user.rank == "" ? "Select rank" : user.rank}
                      </span>
                      <DropdownIcon />
                    </MenuButton>
                    <MenuItems
                      anchor="bottom"
                      className={
                        requireInput !== "" && user.rank == ""
                          ? "w-44 mt-3 border border-red-500 rounded-lg text-lg text-red-500 text-center bg-white capitalize"
                          : "w-44 mt-3 border border-gray-300 rounded-lg text-lg text-center bg-white capitalize"
                      }
                    >
                      {statusUpdate
                        .find((c) => c.name == user.role)
                        ?.rank.filter((c) => c !== user.rank)
                        .map((c) => {
                          return (
                            <div
                              key={c}
                              onClick={() => {
                                setUser({
                                  ...user,
                                  rank: c,
                                });
                              }}
                            >
                              <MenuItem>
                                <a className="block data-[focus]:bg-gray-100 py-2 capitalize">
                                  {c}
                                </a>
                              </MenuItem>
                            </div>
                          );
                        })}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              {/* name */}
              <AppTetxtInput
                label="NAME"
                value={user.name}
                onTextChange={(name) => {
                  setUser((pre) => ({ ...pre, name }));
                }}
                inputAlert={
                  requireInput !== "" && user.name == "" ? true : false
                }
              />
            </div>
            {/* surname */}
            <AppTetxtInput
              label="SURNAME"
              value={user.surname}
              onTextChange={(surname) => {
                setUser((pre) => ({ ...pre, surname }));
              }}
              inputAlert={
                requireInput !== "" && user.surname == "" ? true : false
              }
            />
            {/* username */}
            <AppTetxtInput
              label="USERNAME(GMAIL)"
              value={user.username}
              onTextChange={(username) => {
                setUser((pre) => ({ ...pre, username }));
                checkEmailFormat();
              }}
              inputAlert={
                (requireInput !== "" && user.username == "") ||
                emailCheck == false
                  ? true
                  : false
              }
              emailAlert={emailAlertText}
            />
            <div className="flex">
              {/* role */}
              <div className="flex flex-col h-20 text-lg mr-2">
                <label className="uppercase">ROLE</label>
                <div className="mt-4">
                  <Menu>
                    <MenuButton
                      className={cn(
                        "flex items-center h-9 w-52 self-center pl-5 pr-3 text-lg font-medium text-center rounded-lg",
                        requireInput !== "" && user.role == ""
                          ? "border-red-500 border-2 animate-headShake text-red-500 stroke-red-500"
                          : "text-gray-900 border-gray-900 border stroke-gray-900"
                      )}
                    >
                      <span className="flex-1 mr-1 capitalize">
                        {user.role == "" ? "Select Role" : user.role}
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
                      {statusUpdate
                        .filter((c) => c.name !== user.role)
                        .map((c) => {
                          return (
                            <div
                              key={c.id}
                              onClick={() => {
                                setUser({
                                  ...user,
                                  role: String(c.name),
                                  rank: "",
                                });
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
              {/* userid */}
              <AppTetxtInput
                label="USER ID"
                value={user.userId}
                onTextChange={(userId) => {
                  setUser((pre) => ({ ...pre, userId }));
                }}
                inputAlert={
                  requireInput !== "" && user.userId == "" ? true : false
                }
              />
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
