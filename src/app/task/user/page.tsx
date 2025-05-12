"use client";

import SearchIcon from "@/assets/icons/SearchIcon";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import moment from "moment";
import ActionButton from "@/components/button/ActionButton";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import StatusTags from "@/components/Tag/StatusTags";
import TableUserErrorShow from "@/components/TableError/TableUserErrorShow";
import Link from "next/link";
import FileIcon from "@/assets/icons/FileIcon";

import React, { useEffect, useState } from "react";
import { cn } from "@/helpers/cn";
import { AxiosError } from "axios";
import { myapi } from "@/services/myapi";
import { delay } from "../../../libs/delay";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

type User = {
  id: string;
  username: string;
  userId: string;
  role: string;
  passwordHash: string;
  resetPassword: string;
  resetPasswordExpiryTime: Date;
};

type ResetPassword = {
  id: string;
  resetPasswordId: string;
};

export default function UserHome() {
  //check date
  const [check, setCheck] = useState(false);

  //get users from api
  const [users, setUser] = useState<User[]>([]);
  const [getUserkLoading, setGetUserLoading] = useState(false);
  const [errorLoadUserss, setErrorLoadUsers] = useState("");

  //result constant
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [query, setQuery] = useState({ data: "" });

  //reset password
  const [resetPassword, setResetPassword] = useState<ResetPassword>({
    id: "",
    resetPasswordId: "",
  });
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [errorResetPassword, setErrorResetPassword] = useState("");

  //create for disable button
  const [createLoading, setCreateLoading] = useState(false);

  //Table
  const TableHeads = [
    { id: 1, label: "USERNAME" },
    { id: 2, label: "STATUS" },
    { id: 3, label: "PASSWORD" },
    { id: 4, label: "RESET PASSWORD" },
    { id: 5, label: "RESET" },
    { id: 6, label: "" },
  ];

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (check) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  useEffect(() => {
    if (query.data == "") {
      setSearchResult(users);
    } else {
      setSearchResult(
        users.filter((user) => user.username.includes(query.data))
      );
    }
  }, [query, users]);

  async function CheckDate() {
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
      if (checking) {
        localStorage.clear();
        router.push("/login");
        setCheck(false);
        return false;
      } else if (localStorage.getItem("role") !== "admin") {
        router.push("/task");
        setCheck(false);
        return false;
      } else {
        setCheck(true);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsers() {
    const checkDate = await CheckDate();
    if (checkDate == false) {
      return;
    }
    setGetUserLoading(true);
    await delay();
    try {
      //get api with user
      const res = await myapi.get(`/Auth/allUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorLoadUsers("Error loading users");
        setGetUserLoading(false);
        return;
      }
      setUser(res.data);
      setGetUserLoading(false);
    } catch (error) {
      console.error(error);
      setErrorLoadUsers("Error Loading users");
      setGetUserLoading(false);
    }
  }

  async function resetPasswordFunction() {
    //second attempt
    setErrorResetPassword("");
    //set error message
    if (resetPassword.id == localStorage.getItem("nameIdentifier")) {
      setErrorResetPassword(
        "You can't reset password account that currently use"
      );
      return;
    }
    //start to put api
    setResetPasswordLoading(true);
    await delay();
    try {
      //post api
      const res = await myapi.put(`/Auth/resetPassword`, resetPassword, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorResetPassword("Error reset password");
        setResetPasswordLoading(false);
        return;
      }
      setResetPasswordLoading(false);
      getUsers();
    } catch (err) {
      const error = err as AxiosError;
      setErrorResetPassword(String(error.response?.data));
      setResetPasswordLoading(false);
    }
  }

  //Button create click
  function createOnlick() {
    router.push(`/task/user/create`);
    setCreateLoading(true);
  }

  return (
    <div>
      <HeaderDisplay label="USERS">
        {errorResetPassword ? (
          <span className="mt-4 font-semibold text-red-500">
            {errorResetPassword}
          </span>
        ) : (
          <></>
        )}
      </HeaderDisplay>
      <div className="flex w-full min-w-[90rem] pt-1">
        <input
          className="border-y-[0.1rem] border-l-[0.1rem] rounded-l-2xl text-lg border-gray-900 py-2 pl-4 w-full focus:outline-none"
          type="search"
          placeholder="Username"
          onChange={(c) => {
            setQuery({ ...query, data: c.target.value });
            if (query.data !== c.target.value) {
              query.data = c.target.value;
            }
            setErrorResetPassword("");
          }}
        />

        <div className="flex justify-center place-items-center border-[0.1rem] border-l-0 px-4 border-gray-900 rounded-e-2xl stroke-gray-900 stroke-2">
          <SearchIcon />
        </div>
        <ActionButton
          label="Create"
          iconRight={<AddCreateIcon />}
          onClick={createOnlick}
          disableButton={createLoading}
        />
      </div>

      <div className="border-[0.1rem] rounded-2xl border-gray-900 min-w-[90rem] overflow-hidden w-full mt-10">
        <table className="flex flex-col w-full overflow-x-auto">
          <thead className="">
            <tr className="flex h-16">
              {TableHeads.map((c) => {
                const styleHeader =
                  c.id === 1
                    ? "min-w-80 flex-none"
                    : c.id == 6
                    ? "min-w-[5.75rem] flex-none"
                    : "";
                return (
                  <th
                    key={c.id}
                    className={cn(
                      "flex flex-1 min-w-64 text-lg font-semibold",
                      styleHeader
                    )}
                  >
                    <button className="flex m-auto">
                      <span className="">{c.label}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="w-full max-h-[35rem] overflow-y-scroll overflow-x-hidden">
            {getUserkLoading ? (
              <TableUserErrorShow label="Loading..." />
            ) : errorLoadUserss ? (
              <TableUserErrorShow label={errorLoadUserss} />
            ) : (
              searchResult.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="flex text-center h-16 hover:bg-slate-100 text-base"
                  >
                    <td className="flex justify-start items-center pl-8 min-w-80 text-left">
                      {user.username}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64 capitalize">
                      <StatusTags status={user.role} />
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      {user.passwordHash !== "" ? (
                        <StatusTags status="haspassword" />
                      ) : (
                        <StatusTags status="nothaspassword" />
                      )}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      {user.passwordHash !== "" ? (
                        "-"
                      ) : dayjs(Date.now()) <
                        dayjs(user.resetPasswordExpiryTime) ? (
                        user.resetPassword
                      ) : (
                        <span className="font-semibold">
                          Please Reset Password
                        </span>
                      )}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      <ActionButton
                        label="Reset Password"
                        style={
                          errorResetPassword && user.id == resetPassword.id
                            ? "border-red-500 border-2 py-1 px-4 rounded-full"
                            : "py-1 px-4 rounded-full"
                        }
                        styleTextSize={
                          errorResetPassword && user.id == resetPassword.id
                            ? "text-red-500 font-semibold text-base"
                            : "text-base"
                        }
                        disableButton={resetPasswordLoading}
                        onClick={() => {
                          setResetPassword({
                            id: user.id,
                            resetPasswordId: String(
                              localStorage.getItem("nameIdentifier")
                            ),
                          });
                          if (resetPassword.id !== user.id) {
                            resetPassword.id = user.id;
                            resetPassword.resetPasswordId = String(
                              localStorage.getItem("nameIdentifier")
                            );
                          }
                          resetPasswordFunction();
                        }}
                      />
                    </td>
                    <td className="flex justify-center items-center h-16 min-w-20 cursor-pointer">
                      <Link href={`/task/user/${user.userId}`}>
                        <FileIcon />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
