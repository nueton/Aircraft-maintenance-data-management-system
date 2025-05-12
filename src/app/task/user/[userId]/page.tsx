"use client";

import ActionButton from "@/components/button/ActionButton";
import AppFormPanel from "@/components/AppFormPanel";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import Link from "next/link";
import moment from "moment";

import { useEffect, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { useRouter, useParams } from "next/navigation";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import dayjs from "dayjs";
import { AxiosError } from "axios";
import LeftIcon from "@/assets/icons/LeftIcon";

type User = {
  id: string;
  username: string;
  passwordHash: string;
  role: string;
  rank: string;
  name: string;
  surname: string;
  userId: string;
  resetPassword: string;
  resetPasswordExpiryTime: Date;
  createdTime: Date;
  resetTime: Date;
};

type ResetPassword = {
  id: string;
  resetPasswordId: string;
};

export default function DetailUser() {
  //check date
  const [check, setCheck] = useState(false);

  //post repair report
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    passwordHash: "",
    role: "",
    rank: "",
    name: "",
    surname: "",
    userId: "",
    resetPassword: "",
    resetPasswordExpiryTime: new Date(),
    createdTime: new Date(),
    resetTime: new Date(),
  });
  const [UserLoading, setUserLoading] = useState(false);
  const [errorUser, setErrorUser] = useState("");

  const [admin, setAdmin] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);

  //reset password
  const [reset, setReset] = useState<ResetPassword>({
    id: "",
    resetPasswordId: "",
  });
  const [resetLoading, setResetLoading] = useState(false);

  const TimeNow = Date.now();

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (check && userId) {
      getUser(userId);
      getAdminName(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  useEffect(() => {
    if (user.id !== "") {
      setReset({
        id: user.id,
        resetPasswordId: String(localStorage.getItem("nameIdentifier")),
      });
    }
  }, [user.id]);

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

  //get user
  async function getUser(id: string) {
    setUserLoading(true);
    await delay();
    try {
      //get created username from id in task
      const res = await myapi.get(`/Auth/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorUser("Error Loading");
        setUserLoading(false);
        return;
      }
      setUser(res.data);
      setUserLoading(false);
    } catch (error) {
      console.error(error);
      setErrorUser("Error Loading");
      setUserLoading(false);
    }
  }

  //get user
  async function getAdminName(id: string) {
    setAdminLoading(true);
    await delay();
    try {
      //get created username from id in task
      const res = await myapi.get(`/Auth/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setAdminLoading(false);
        return;
      }
      setAdmin(res.data);
      setAdminLoading(false);
    } catch (error) {
      console.error(error);

      setAdminLoading(false);
    }
  }

  async function resetPassword() {
    const checkDate = await CheckDate();
    if (checkDate == false) {
      return;
    }
    setResetLoading(true);
    await delay();
    try {
      const res = await myapi.put(`/Auth/resetPassword`, reset, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setResetLoading(false);
        return;
      }
      setResetLoading(false);
      getUser(userId);
      getAdminName(userId);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setResetLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[85vh]">
      {UserLoading || resetLoading || adminLoading ? (
        <>
          <HeaderDisplay label="USER" />
          <span>Loading....</span>
        </>
      ) : errorUser ? (
        <>
          <HeaderDisplay label="USER" />
          <span>Error Loading</span>
        </>
      ) : (
        <>
          <HeaderDisplay label="User" />
          <div className="overflow-auto">
            <div className="w-full">
              <AppFormPanel label="DETAIL">
                <div className="grid grid-cols-2 gap-5">
                  <ShowTextInput
                    label="ชื่อ - นามสกุล"
                    content={user.rank + user.name + " " + user.surname}
                  />
                  <ShowTextInput label="USER ID" content={user.userId} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <ShowTextInput label="ROLE" content={user.role} />
                  <ShowTextInput
                    label="USERNAME(GMAIL)"
                    content={user.username}
                  />
                </div>
                <ShowTextInput
                  label="PASSWORD"
                  content={
                    user.passwordHash !== ""
                      ? "Has password"
                      : "Doesn't have password"
                  }
                />
                {user.passwordHash == "" ? (
                  <div className="grid grid-cols-2 gap-5">
                    <ShowTextInput
                      label="RESET PASSWORD"
                      content={
                        dayjs(TimeNow) < dayjs(user.resetPasswordExpiryTime)
                          ? user.resetPassword
                          : "Please Reset Password"
                      }
                    />
                    <ShowTextInput
                      label="RESET PASSWORD EXPIRATION"
                      content={
                        dayjs(TimeNow) < dayjs(user.resetPasswordExpiryTime)
                          ? dayjs(user.resetPasswordExpiryTime).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : "Please Reset Password"
                      }
                    />
                  </div>
                ) : (
                  <></>
                )}
              </AppFormPanel>
            </div>
            <div className="w-full mt-14">
              <AppFormPanel label="INFORMATION">
                <div className="grid grid-cols-2 gap-5">
                  <ShowTextInput label="สร้างโดย" content={admin[0]} />
                  <ShowTextInput
                    label="สร้างเมื่อ"
                    content={dayjs(user.createdTime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  />
                </div>
                {admin[1] !== "" ? (
                  <div className="grid grid-cols-2 gap-5">
                    <ShowTextInput
                      label="รีเซ็ตรหัสผ่านโดย"
                      content={admin[1]}
                    />
                    <ShowTextInput
                      label="รีเซ็ตรหัสผ่านเมื่อ"
                      content={dayjs(user.resetTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </AppFormPanel>
            </div>
          </div>
        </>
      )}
      {/*button*/}
      <div className="mt-16 flex justify-end">
        <Link href={`/task/user`}>
          <ActionButton iconLeft={<LeftIcon />} label="Return" />
        </Link>
        <ActionButton
          label="Reset Password"
          disableButton={
            UserLoading ||
            adminLoading ||
            resetLoading ||
            (user.passwordHash == "" &&
              dayjs(TimeNow) < dayjs(user.resetPasswordExpiryTime)) ||
            user.id == localStorage.getItem("nameIdentifier")
          }
          onClick={() => resetPassword()}
        />
      </div>
    </div>
  );
}
