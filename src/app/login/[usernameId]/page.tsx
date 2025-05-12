"use client";

import { useEffect, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { redirect, useRouter, useParams } from "next/navigation";
import { cn } from "@/helpers/cn";
import { AxiosError } from "axios";

import RegisterError from "@/components/ShowError/RegisterError";
import LoginInput from "@/components/InputArea/LoginInput";

export default function RegisterPassword() {
  const { usernameId } = useParams<{ usernameId: string }>();
  const [userCheckingLoading, setUserCheckingloading] = useState(true);

  const [user, setUser] = useState({
    username: decodeURIComponent(usernameId),
    password: "",
  });
  const [checkPassword, setCheckPassword] = useState({ text: "" });
  const [errorCheckPassword, setErrorCheckPassword] = useState("");
  const [samePassword, setSamePassword] = useState(true);

  const [createPasswordLoading, setCreatePasswordLoading] = useState(false);
  const [errorCreatePassword, setErrorCreatePassword] = useState("");

  const [decorationError, setDecorationError] = useState({
    buttonHeight: "mt-16",
    divHeight: "h-[500px]",
  });

  const [requireInput, setRequireInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (usernameId) {
      CheckingUser(decodeURIComponent(usernameId));
    }
  }, [usernameId]);

  async function CheckingUser(id: string) {
    setUserCheckingloading(true);
    await delay();
    try {
      //get created username from id in task
      const res = await myapi.get(`/Auth/checkUsername/${id}`);
      if (res.status !== 200) {
        setUserCheckingloading(false);
        return;
      }
      if (res.data == false) {
        router.push(`/login`);
      }
      setUserCheckingloading(false);
    } catch (error) {
      console.error(error);
      setUserCheckingloading(false);
    }
  }

  async function createPasswordFunction() {
    //password check
    if (errorCheckPassword) {
      return;
    }
    //return to inital state if not first attempt
    setDecorationError({
      ...decorationError,
      buttonHeight: "mt-16",
      divHeight: "h-[500px]",
    });
    setErrorCreatePassword("");
    setRequireInput("");
    //check
    if (user.password == "") {
      setRequireInput("Please input password");
      setDecorationError({
        ...decorationError,
        buttonHeight: "mt-10",
        divHeight: "h-[520px]",
      });
      return;
    }
    setCreatePasswordLoading(true);
    //check loading state
    await delay();
    try {
      //
      const res = await myapi.put("/Auth/registerPassword", user);
      if (res.status !== 200) {
        setErrorCreatePassword("Create Password Error");
        setCreatePasswordLoading(false);
        return;
      }
      setCreatePasswordLoading(false);
      //push to task page
      router.push(`/login`);
    } catch (err) {
      const error = err as AxiosError;
      setErrorCreatePassword(String(error.response?.data));
      setRequireInput("Please input username and password");
      setCreatePasswordLoading(false);
      setDecorationError({
        ...decorationError,
        buttonHeight: "mt-10",
        divHeight: "h-[520px]",
      });
    }
  }

  function checkPasswordFunction() {
    setErrorCreatePassword("");
    //set require for the first time before register
    if (user.password !== checkPassword.text) {
      setErrorCheckPassword("Password didn't match");
      decorationError.buttonHeight = "mt-10";
      decorationError.divHeight = "h-[520px]";
      setSamePassword(false);
    } else {
      setErrorCheckPassword("");
      decorationError.buttonHeight = "mt-16";
      decorationError.divHeight = "h-[500px]";
      setSamePassword(true);
    }
  }

  //protect login at the same time
  if (localStorage.getItem("nameIdentifier") != null) {
    redirect(`task`);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div
        className={cn(
          "flex flex-col border-[1.5px] items-center border-gray-900 w-[400px] rounded-2xl transition-all",
          decorationError.divHeight
        )}
      >
        {userCheckingLoading ? (
          <span className="text-xl font-semibold h-full content-center">
            Loading...
          </span>
        ) : (
          <>
            <span className="text-3xl font-semibold text-center pt-16 pb-16">
              REGISTER
            </span>
            <div className="flex flex-col justify-start w-4/5">
              <span className="font-semibold">USERNAME</span>
              <span className="mt-4">{decodeURIComponent(usernameId)}</span>
            </div>
            <LoginInput
              onTextChange={(password) => {
                setUser((pre) => ({ ...pre, password }));
                if (user.password !== password) {
                  user.password = password;
                }
                checkPasswordFunction();
              }}
              placeHolder="Password"
              style={
                user.password == "" && requireInput
                  ? "border-red-500 mt-8"
                  : "mt-8"
              }
            />
            <LoginInput
              onTextChange={(password) => {
                setCheckPassword((pre) => ({ ...pre, password }));
                if (checkPassword.text !== password) {
                  checkPassword.text = password;
                }
                checkPasswordFunction();
              }}
              placeHolder="Confirm Password"
              style={
                checkPassword.text == "" && requireInput
                  ? "border-red-500 mt-10"
                  : "mt-10"
              }
            />
            {/* check if error has message */}
            {errorCreatePassword ? (
              <RegisterError label={errorCreatePassword} />
            ) : (
              <></>
            )}
            {requireInput && user.password == "" && samePassword == true ? (
              <RegisterError label={requireInput} />
            ) : (
              <></>
            )}
            {errorCheckPassword && !(requireInput && samePassword == false) ? (
              <RegisterError label={errorCheckPassword} />
            ) : (
              <></>
            )}
            <button
              className={cn(
                "w-4/5 border-[1.5px] border-gray-900 py-2 rounded-full cursor-pointer transition duration-100 ease-in-out hover:scale-105 disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed disabled:border-gray-500 disabled:hover:scale-100 disabled:font-semibold",
                decorationError.buttonHeight
              )}
              onClick={createPasswordFunction}
              disabled={createPasswordLoading}
            >
              Login
            </button>
            <span
              className="text-center pt-16 text-blue-700 underline cursor-pointer"
              onClick={() => router.push(`/login`)}
            >
              Return to login
            </span>
          </>
        )}
      </div>
    </div>
  );
}
