"use client";

import { useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/helpers/cn";
import { AxiosError } from "axios";

import RegisterError from "@/components/ShowError/RegisterError";
import LoginInput from "@/components/InputArea/LoginInput";

export default function RegisterPassword() {
  const [user, setUser] = useState({
    username: "",
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
    if (user.username == "" || user.password == "") {
      setRequireInput("Please input username and password");
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
    if (user.password !== checkPassword.text && !requireInput) {
      setErrorCheckPassword("Password didn't match");
      decorationError.buttonHeight = "mt-10";
      decorationError.divHeight = "h-[520px]";
      setSamePassword(false);
    }
    //username has input, but password didn't match
    else if (
      user.password !== checkPassword.text &&
      requireInput &&
      user.username !== ""
    ) {
      setErrorCheckPassword("Password didn't match");
      decorationError.buttonHeight = "mt-10";
      decorationError.divHeight = "h-[520px]";
      setSamePassword(false);
    }
    //username doesn't have input, and password didn't match with comfirm password. Require is the first priority
    else if (
      user.password !== checkPassword.text &&
      requireInput &&
      user.username == ""
    ) {
      setErrorCheckPassword("");
      decorationError.buttonHeight = "mt-10";
      decorationError.divHeight = "h-[520px]";
      setSamePassword(false);
    }
    //username doesn't have input, and password match with comfirm password so it didn't need matched alert
    else if (
      user.password == checkPassword.text &&
      requireInput &&
      user.username == ""
    ) {
      setErrorCheckPassword("");
      decorationError.buttonHeight = "mt-10";
      decorationError.divHeight = "h-[520px]";
      setSamePassword(true);
    }
    //password doesn't have input, and password match with comfirm password so it didn't need matched alert
    else if (
      user.password == checkPassword.text &&
      requireInput &&
      user.password == "" &&
      user.username !== ""
    ) {
      setErrorCheckPassword("");
      decorationError.buttonHeight = "mt-10";
      decorationError.divHeight = "h-[520px]";
      setSamePassword(true);
    } else {
      setErrorCheckPassword("");
      decorationError.buttonHeight = "mt-16";
      decorationError.divHeight = "h-[500px]";
      setSamePassword(true);
    }
  }

  function checkInput() {
    setErrorCreatePassword("");
    if (
      user.password !== "" &&
      user.username !== "" &&
      samePassword == true &&
      requireInput
    ) {
      decorationError.buttonHeight = "mt-16";
      decorationError.divHeight = "h-[500px]";
    } else if (
      (user.password == "" || user.username == "" || samePassword == false) &&
      requireInput
    ) {
      decorationError.buttonHeight = "mt-10";
      decorationError.divHeight = "h-[520px]";
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
        <span className="text-3xl font-semibold text-center pt-16 pb-10">
          REGISTER
        </span>
        <LoginInput
          onTextChange={(username) => {
            setUser((pre) => ({ ...pre, username }));
            if (user.username !== username) {
              user.username = username;
            }
            checkInput();
          }}
          placeHolder="Username"
          style={user.username == "" && requireInput ? "border-red-500" : ""}
        />
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
              ? "border-red-500 mt-16"
              : "mt-16"
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
              ? "border-red-500 mt-16"
              : "mt-16"
          }
        />
        {/* check if error has message */}
        {errorCreatePassword ? (
          <RegisterError label={errorCreatePassword} />
        ) : (
          <></>
        )}
        {requireInput &&
        (user.username == "" ||
          (user.password == "" && samePassword == true)) ? (
          <RegisterError label={requireInput} />
        ) : (
          <></>
        )}
        {errorCheckPassword &&
        !(requireInput && user.username == "" && samePassword == false) ? (
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
      </div>
    </div>
  );
}
