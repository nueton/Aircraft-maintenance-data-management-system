"use client";

import SearchIcon from "@/assets/icons/SearchIcon";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import moment from "moment";
import ActionButton from "@/components/button/ActionButton";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import StatusTags from "@/components/Tag/StatusTags";
import TableUserErrorShow from "@/components/TableError/TableUserErrorShow";

import React, { useEffect, useState } from "react";
import { cn } from "@/helpers/cn";
import { AxiosError } from "axios";
import { myapi } from "@/services/myapi";
import { delay } from "../../../libs/delay";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  role: string;
  passwordHash: string;
};

type ResetPassword = {
  request: string;
};

export default function UserHome() {
  //get users from api
  const [users, setUser] = useState<User[]>([]);
  const [getUserkLoading, setGetUserLoading] = useState(false);
  const [errorLoadUserss, setErrorLoadUsers] = useState("");

  //result constant
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [query, setQuery] = useState({ data: "" });

  //reset password
  const [resetPassword, setResetPassword] = useState<ResetPassword>({
    request: "",
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
  ];

  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (query.data == "") {
      setSearchResult(users);
    } else {
      setSearchResult(
        users.filter((user) => user.username.includes(query.data))
      );
    }
  }, [query, users]);

  async function getUsers() {
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
    if (resetPassword.request == localStorage.getItem("name")) {
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
        params: {
          request: resetPassword.request,
        },
      });
      if (res.status !== 200) {
        console.log("can't reset");
        setErrorResetPassword("Error reset password");
        setResetPasswordLoading(false);
        return;
      }
      setResetPasswordLoading(false);
      location.reload();
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
                  c.id === 1 || c.id === 4 ? "min-w-96 flex-none" : "";
                return (
                  <th
                    key={c.id}
                    className={cn(
                      "flex flex-1 min-w-64 text-lg font-semibold",
                      styleHeader
                    )}
                  >
                    <button className="flex m-auto">
                      <span className="pr-3">{c.label}</span>
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
                    key={user.username}
                    className="flex text-center h-16 hover:bg-slate-100 text-base"
                  >
                    <td className="flex justify-start items-center pl-8 min-w-96 text-left">
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
                      <ActionButton
                        label="Reset Password"
                        style={
                          errorResetPassword &&
                          user.username == resetPassword.request
                            ? "border-red-500 border-2 py-1 px-4 rounded-full"
                            : "py-1 px-4 rounded-full"
                        }
                        styleTextSize={
                          errorResetPassword &&
                          user.username == resetPassword.request
                            ? "text-red-500 font-semibold text-base"
                            : "text-base"
                        }
                        disableButton={resetPasswordLoading}
                        onClick={() => {
                          setResetPassword({
                            ...resetPassword,
                            request: user.username,
                          });
                          if (resetPassword.request !== user.username) {
                            resetPassword.request = user.username;
                          }
                          resetPasswordFunction();
                        }}
                      />
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
