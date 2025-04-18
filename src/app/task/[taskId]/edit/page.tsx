"use client";

import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import ShowDetailInput from "@/components/ShowArea/ShowDetailInput";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import Link from "next/link";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import dayjs from "dayjs";
import moment from "moment";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { delay } from "@/libs/delay";
import { myapi } from "@/services/myapi";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  code: string;
  createdTimeTask: Date;
  designSpecification: string;
  inspector: string;
  jch: string;
  originalAffiliation: string;
  problem: string;
  taskStatus: number;
  system: string;
  worker: string;
  createdUserId: string;
  changeStatusUserId: string;
};

export default function TaskEditPage() {
  //task id, get task
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task>({
    id: 0,
    code: "",
    createdTimeTask: new Date(),
    designSpecification: "",
    inspector: "",
    jch: "",
    originalAffiliation: "",
    problem: "",
    taskStatus: 0,
    system: "",
    worker: "",
    createdUserId: "",
    changeStatusUserId: "",
  });
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTask, setErrorLoadTask] = useState("");
  //select status
  const [selectStatusId, setselectStatusId] = useState({ id: 0 });
  const statusUpdate = [
    {
      id: 2,
      name: "Approved Task",
    },
    {
      id: 3,
      name: "Waiting for submit repair",
    },
    {
      id: 6,
      name: "Rejected",
    },
  ];
  const selectStatusName =
    selectStatusId.id !== 0
      ? statusUpdate.find((c) => c.id === selectStatusId.id)?.name
      : "Select Status";
  //username that create task
  const [username, setUsername] = useState("");
  const [getUsernameLoading, setGetUsernameLoading] = useState(false);
  const [errorLoadUsername, setErrorLoadUsername] = useState("");
  //save loading
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorSaveLoading, setErrorSaveLoading] = useState("");
  //check input
  const [requiredInput, setRequiredInput] = useState("");

  const router = useRouter();

  //get task from api
  useEffect(() => {
    if (taskId) {
      getTask(Number(taskId));
    }
  }, [taskId]);

  //use id from task to find created username from user db
  useEffect(() => {
    if (task.createdUserId) {
      getUsername(String(task.createdUserId));
    }
  }, [task.createdUserId]);

  async function saveTask() {
    //For second attempt
    setErrorSaveLoading("");
    setRequiredInput("");
    //select status or not
    if (selectStatusId.id === 0) {
      setRequiredInput("Please select status");
      return;
    }
    //input changed status user
    const changeStatusUserId = localStorage.getItem("nameIdentifier");
    if (changeStatusUserId) task.changeStatusUserId = changeStatusUserId;
    //start to use api
    setSaveLoading(true);
    //check loading
    await delay();
    try {
      //put api
      const res = await myapi.put(`/task/${task.id}`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorSaveLoading(
          "We can't process your request. Please submit again."
        );
        setSaveLoading(false);
        return;
      }
      setSaveLoading(false);
      router.push(`/task/${task.id}`);
    } catch (error) {
      console.error(error);
      setErrorSaveLoading(
        "We can't process your request. Please submit again."
      );
      setSaveLoading(false);
    }
  }

  //get detail task
  async function getTask(id: number) {
    setGetTaskLoading(true);
    await delay();
    try {
      //get deatil with id
      const res = await myapi.get(`/Task/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorLoadTask("Error loading task");
        setGetTaskLoading(false);
        return;
      }
      setTask(res.data);
      setGetTaskLoading(false);
    } catch (error) {
      console.error(error);
      setErrorLoadTask("Error loading task");
      setGetTaskLoading(false);
    }
  }

  //get created username
  async function getUsername(id: string) {
    setGetUsernameLoading(true);
    await delay();
    try {
      //get created username from id in task
      const res = await myapi.get(`/Auth/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorLoadUsername("Error Loading Username");
        setGetUsernameLoading(false);
        return;
      }
      setUsername(res.data);
      setGetUsernameLoading(false);
    } catch (error) {
      console.error(error);
      setErrorLoadUsername("Error Loading Username");
      setGetUsernameLoading(false);
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
      {getTaskLoading || getUsernameLoading ? (
        <>
          <HeaderDisplay label="EDIT TASK REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadTask || errorLoadUsername ? (
        <>
          <HeaderDisplay label="EDIT TASK REPORT" />
          <span>Error Loading task</span>
        </>
      ) : (
        <>
          <HeaderDisplay label="EDIT TASK REPORT">
            <span className="inline-flex items-center h-10 px-5 self-center text-lg font-medium text-center text-gray-900 border-[1.5px] border-gray-900 rounded-s-xl">
              Status
            </span>
            <Menu>
              <MenuButton className="flex items-center h-10 w-64 self-center pl-5 pr-3 text-lg font-medium text-center text-gray-900 border-gray-900 border-y-[1.5px] border-r-[1.5px] rounded-r-xl stroke-gray-900">
                <span className="flex-1 mr-1">{selectStatusName}</span>
                <DropdownIcon />
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className="w-64 mt-3 border border-gray-300 rounded-lg text-lg text-center bg-white"
              >
                {statusUpdate.map((c) => {
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        setselectStatusId({ ...selectStatusId, id: c.id });
                        setTask({ ...task, taskStatus: c.id });
                      }}
                    >
                      <MenuItem>
                        <a className="block data-[focus]:bg-gray-100 py-2">
                          {c.name}
                        </a>
                      </MenuItem>
                    </div>
                  );
                })}
              </MenuItems>
            </Menu>
            {errorSaveLoading !== "" ? (
              <span className="ml-5 font-semibold text-red-500">
                {errorSaveLoading}
              </span>
            ) : (
              <></>
            )}
            {requiredInput !== "" && selectStatusId.id == 0 ? (
              <span className="ml-5 font-semibold text-red-500">
                {requiredInput}
              </span>
            ) : (
              <></>
            )}
          </HeaderDisplay>
          <div className="overflow-auto">
            <div className="w-full">
              <AppFormPanel label="DETAIL">
                <ShowTextInput
                  label="ORIGIANL AFFILIATION"
                  content={task.originalAffiliation}
                />
                <ShowTextInput
                  label="DESIGN SPECIFICATION"
                  content={task.designSpecification}
                />
                <ShowTextInput label="JCH" content={task.jch} />
                <ShowDetailInput label="WORKER" content={task.worker} />
                <ShowTextInput label="INSPECTOR" content={task.inspector} />
              </AppFormPanel>
            </div>

            <div className="w-full mt-14">
              <AppFormPanel label="ADDITIONAL">
                <ShowDetailInput label="SYSTEM" content={task.system} />
                <ShowDetailInput label="PROBLEM" content={task.problem} />
                <ShowTextInput
                  label="DATE"
                  content={dayjs(task.createdTimeTask).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                />
                <ShowTextInput label="CODE" content={task.code} />
                <ShowTextInput label="Created by" content={String(username)} />
              </AppFormPanel>
            </div>
          </div>
        </>
      )}
      {/*button*/}
      <div className="mt-16 flex justify-end">
        <Link href={`/task/${task.id}`}>
          <ActionButton label="Cancle" />
        </Link>

        <ActionButton
          label="Save"
          onClick={saveTask}
          disableButton={saveLoading}
        />
      </div>
    </div>
  );
}
