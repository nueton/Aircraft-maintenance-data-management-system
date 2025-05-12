"use client";

import { useEffect, useRef, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import LoginInput from "@/components/InputArea/LoginInput";
import { cn } from "@/helpers/cn";
import { AxiosError } from "axios";

export default function Login() {
  const hasMounted = useRef(false);
  const [state, setState] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loginLoading, setloginLoading] = useState(false);
  const [errorlogin, setErrorlogin] = useState("");

  const [accessToken, setAccessToken] = useState({
    accessToken: "",
    refreshToken: "",
    refreshTokenExpiryTime: "",
  });

  const [decorationError, setDecorationError] = useState({
    buttonHeight: "mt-14",
    divHeight: "h-[400px]",
  });

  const [requireInput, setRequireInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    // setState(true);
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (typeof window !== "undefined") {
        if (localStorage.getItem("nameIdentifier") !== null) {
          router.push(`task`);
        }
        setState(true);
      }
    }
  }, []);

  async function Login() {
    //return to inital state if not first attempt
    setDecorationError({
      ...decorationError,
      buttonHeight: "mt-14",
      divHeight: "h-[400px]",
    });
    setErrorlogin("");
    setRequireInput("");

    //check
    if (user.username == "" || user.password == "") {
      setRequireInput("Please input username and password");
      setDecorationError({
        ...decorationError,
        buttonHeight: "mt-8",
        divHeight: "h-[420px]",
      });
      return;
    }
    setloginLoading(true);
    //check loading state
    await delay();
    try {
      //Create Access token
      const res = await myapi.post("/Auth/login", user);
      if (res.status !== 200) {
        setErrorlogin("Create Token Error");
        setloginLoading(false);
        return;
      }
      if (res.data == true) {
        router.push(`/login/${encodeURIComponent(user.username)}`);
        return;
      }
      setAccessToken(res.data);
      //The first time that code run setstate didn't work, but post reponse, so set again to ensure data
      if (accessToken.accessToken == "") {
        accessToken.accessToken = String(Object.values(res.data)[0]);
        accessToken.refreshToken = String(Object.values(res.data)[1]);
      }
      //Get Refresh Time
      const res2 = await myapi.get(
        `/Auth/refresh/${Object.values(jwtDecode(accessToken.accessToken))[1]}`
      );
      if (res2.status !== 200) {
        setErrorlogin("Get Expiry Time Error");
        setloginLoading(false);
        return;
      }
      accessToken.refreshTokenExpiryTime = String(res2.data);
      //Convert Json and store key to local storage
      convertJsonAndStoreData();
      //finish loading
      setloginLoading(false);
      //push to task page
      router.push(`/task`);
    } catch (err) {
      const error = err as AxiosError;
      setErrorlogin(String(error.response?.data));
      setloginLoading(false);
      setDecorationError({
        ...decorationError,
        buttonHeight: "mt-8",
        divHeight: "h-[420px]",
      });
    }
  }

  function convertJsonAndStoreData() {
    const jsonData = jwtDecode(accessToken.accessToken);
    localStorage.setItem("name", Object.values(jsonData)[0]);
    localStorage.setItem("nameIdentifier", Object.values(jsonData)[1]);
    localStorage.setItem("role", Object.values(jsonData)[2]);
    localStorage.setItem("accessToken", accessToken.accessToken);
    localStorage.setItem("refreshToken", accessToken.refreshToken);
    localStorage.setItem(
      "refreshTokenExpiryTime",
      accessToken.refreshTokenExpiryTime
    );
    if (localStorage.getItem("role") == "admin") {
      localStorage.setItem("path", `/Task/checked`);
      localStorage.setItem("pathName", "CHECKED");
    } else if (localStorage.getItem("role") == "user") {
      localStorage.setItem(
        "path",
        `/Task/allTask/${localStorage.getItem("nameIdentifier")}`
      );
      localStorage.setItem("pathName", "TASKS");
    } else if (localStorage.getItem("role") == "inspector") {
      localStorage.setItem(
        "path",
        `/Task/inspectorAllTask/${localStorage.getItem("nameIdentifier")}`
      );
      localStorage.setItem("pathName", "TASKS");
    }
  }

  function checkInput() {
    if (user.password !== "" && user.username !== "" && requireInput) {
      decorationError.buttonHeight = "mt-14";
      decorationError.divHeight = "h-[400px]";
    } else if ((user.password == "" || user.username == "") && requireInput) {
      decorationError.buttonHeight = "mt-8";
      decorationError.divHeight = "h-[420px]";
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div
        className={cn(
          "flex flex-col border-[1.5px] items-center border-gray-900 w-[400px] rounded-2xl transition-all",
          decorationError.divHeight
        )}
      >
        {!state ? (
          <>
            <div className="h-full content-center text-xl font-semibold">
              Loading...
            </div>
          </>
        ) : (
          <>
            <span className="text-3xl font-semibold text-center pt-16 pb-10">
              WELCOME
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
              style={
                user.username == "" && requireInput ? "border-red-500" : ""
              }
            />
            <LoginInput
              onTextChange={(password) => {
                setUser((pre) => ({ ...pre, password }));
                if (user.password !== password) {
                  user.password = password;
                }
                checkInput();
              }}
              placeHolder="Password"
              style={
                user.password == "" && requireInput
                  ? "border-red-500 mt-16"
                  : "mt-16"
              }
            />
            {/* check if error has message */}
            {errorlogin != "" ? (
              <span className="mt-6 font-semibold text-red-500">
                {errorlogin}
              </span>
            ) : (
              <></>
            )}
            {requireInput && (user.password == "" || user.username == "") ? (
              <span className="mt-6 font-semibold text-red-500">
                {requireInput}
              </span>
            ) : (
              <></>
            )}
            <button
              className={cn(
                "w-4/5 border-[1.5px] border-gray-900 py-2 rounded-full cursor-pointer transition duration-100 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed disabled:border-gray-400 disabled:hover:scale-100 disabled:font-semibold",
                decorationError.buttonHeight
              )}
              onClick={Login}
              disabled={loginLoading}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
