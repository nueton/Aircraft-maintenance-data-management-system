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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderDetailDisplay from "@/components/TextDisplay/HeaderDetailDisplay";

type Task = {
  id: number;
  originalAffiliation: string;
  designSpecification: string;
  jcn: string;
  worker: string;
  system: string;
  problem: string;
  code: string;
  taskStatus: number;
  createdTimeTask: Date;
  createdUserId: string;
  inspectorChangeTime: Date;
  inspectorId: string;
  adminId: string;
};

export default function TaskEditPage() {
  //check date
  const [check, setCheck] = useState(false);
  const [role, setRole] = useState("");

  //task id, get task
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task>({
    id: 0,
    originalAffiliation: "",
    designSpecification: "",
    jcn: "",
    worker: "",
    system: "",
    problem: "",
    code: "",
    taskStatus: 0,
    createdTimeTask: new Date(),
    createdUserId: "",
    inspectorChangeTime: new Date(),
    inspectorId: "",
    adminId: "",
  });
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTask, setErrorLoadTask] = useState("");
  // select status
  const statusUpdate = [
    {
      role: "admin",
      repair: false,
      status: [
        {
          id: 3,
          name: "Approved Task",
        },
        {
          id: 7,
          name: "Rejected",
        },
      ],
    },
    {
      role: "admin",
      repair: true,
      status: [
        {
          id: 4,
          name: "Waiting for submit repair",
        },
        {
          id: 7,
          name: "Rejected",
        },
      ],
    },
    {
      role: "inspector",
      status: [
        {
          id: 2,
          name: "Pending Approved Task",
        },
        {
          id: 7,
          name: "Rejected",
        },
      ],
    },
  ];

  // get username
  const [username, setUsername] = useState({
    createdUser: "",
    inspector: "",
    admin: "",
  });
  const [getUsernameLoading, setGetUsernameLoading] = useState(false);
  const [errorLoadUsername, setErrorLoadUsername] = useState("");
  //check repair report
  const [repairCheck, setRepairCheck] = useState(true);
  const [repairCheckLoading, setRepairCheckLoading] = useState(false);
  const [errorRepairCheck, setErrorRepairCheck] = useState("");
  //save loading
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorSaveLoading, setErrorSaveLoading] = useState("");
  //check input
  const [requiredInput, setRequiredInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    if (typeof window !== undefined) {
      setRole(localStorage.getItem("role") || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get task from api
  useEffect(() => {
    if (taskId) {
      getTask(Number(taskId));
      getUsername(Number(taskId));
      checkSystem(Number(taskId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

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
      }
      if (
        localStorage.getItem("role") == "user" &&
        localStorage.getItem("role") == "supervisor"
      ) {
        router.back();
        return false;
      }
      setCheck(true);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async function saveTask() {
    const dateCheck = await CheckDate();
    if (dateCheck == false) {
      return;
    }
    //For second attempt
    setErrorSaveLoading("");
    setRequiredInput("");
    //select status or not
    if (task.taskStatus == 1 && localStorage.getItem("role") == "inspector") {
      setRequiredInput("Please select status");
      return;
    } else if (
      task.taskStatus == 2 &&
      localStorage.getItem("role") == "admin"
    ) {
      setRequiredInput("Please select status");
      return;
    }
    //input changed status user
    if (localStorage.getItem("role") == "inspector") {
      const changeStatusUserId = localStorage.getItem("nameIdentifier");
      if (changeStatusUserId) task.inspectorId = changeStatusUserId;
    } else if (localStorage.getItem("role") == "admin") {
      const changeStatusUserId = localStorage.getItem("nameIdentifier");
      if (changeStatusUserId) task.adminId = changeStatusUserId;
    }

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

  //get username
  async function getUsername(id: number) {
    setGetUsernameLoading(true);
    await delay();
    try {
      //get created username from id in task
      const res = await myapi.get(`/task/detailWithUsername/${id}`, {
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

  //system checking
  async function checkSystem(id: number) {
    setRepairCheckLoading(true);
    await delay();
    try {
      //get created username from id in task
      const res = await myapi.get(`/task/checkSystem/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorRepairCheck("Error Loading Username");
        setRepairCheckLoading(false);
        return;
      }
      setRepairCheck(res.data);
      setRepairCheckLoading(false);
    } catch (error) {
      console.error(error);
      setErrorRepairCheck("Error Loading Username");
      setRepairCheckLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[85vh]">
      {getTaskLoading || getUsernameLoading || repairCheckLoading ? (
        <>
          <HeaderDisplay label="EDIT TASK REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadTask || errorLoadUsername || errorRepairCheck ? (
        <>
          <HeaderDisplay label="EDIT TASK REPORT" />
          <span>Error Loading task</span>
        </>
      ) : (
        <>
          <HeaderDetailDisplay label="EDIT TASK REPORT" detail={task.jcn}>
            <span className="inline-flex items-center h-10 px-5 self-center text-lg font-medium text-center text-gray-900 border-[1.5px] border-gray-900 rounded-s-xl">
              Status
            </span>
            <Menu>
              <MenuButton className="flex items-center h-10 w-64 self-center pl-5 pr-3 text-lg font-medium text-center text-gray-900 border-gray-900 border-y-[1.5px] border-r-[1.5px] rounded-r-xl stroke-gray-900">
                <span className="flex-1 mr-1">
                  {role == "inspector"
                    ? task.taskStatus !== 1
                      ? statusUpdate
                          .find((c) => c.role == "inspector")
                          ?.status.find((c) => c.id == task.taskStatus)?.name
                      : "Select Status"
                    : task.taskStatus !== 2
                    ? statusUpdate
                        .find(
                          (c) => c.role == "admin" && c.repair == repairCheck
                        )
                        ?.status.find((c) => c.id == task.taskStatus)?.name
                    : "Select Status"}
                </span>
                <DropdownIcon />
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className="w-64 mt-3 border border-gray-300 rounded-lg text-lg text-center bg-white"
              >
                {statusUpdate
                  .find((c) =>
                    role == "admin"
                      ? c.role == "admin" && c.repair == repairCheck
                      : c.role == "inspector"
                  )
                  ?.status.filter((c) => c.id !== task.taskStatus)
                  .map((c) => {
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
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
            {requiredInput !== "" &&
            ((task.taskStatus == 1 &&
              localStorage.getItem("role") == "inspector") ||
              (task.taskStatus == 2 &&
                localStorage.getItem("role") == "admin")) ? (
              <span className="ml-5 font-semibold text-red-500">
                {requiredInput}
              </span>
            ) : (
              <></>
            )}
          </HeaderDetailDisplay>
          <div className="overflow-auto">
            <div className="w-full">
              <AppFormPanel label="DETAIL">
                <ShowTextInput
                  label="กองบิน"
                  content={task.originalAffiliation}
                />
                <div className="grid grid-cols-2 gap-5">
                  <ShowTextInput
                    label="รุ่นเครื่องบิน"
                    content={task.designSpecification}
                  />
                  <ShowTextInput
                    label="หมายเลขเครื่องบิน"
                    content={task.code}
                  />
                </div>

                <ShowDetailInput label="ผู้ปฏิบัติงาน">
                  {task.worker.split(",").map((worker) => {
                    return (
                      <label key={worker} className="mb-1">
                        {worker}
                      </label>
                    );
                  })}
                </ShowDetailInput>
              </AppFormPanel>
            </div>

            {task.system !== "" ? (
              <div className="w-full mt-14">
                <AppFormPanel label="ADDITIONAL">
                  <ShowDetailInput label="ระบบปฏิบัติการ">
                    {task.system
                      .split(",")
                      .map((c) => c.split(":"))
                      .map((c) => {
                        return (
                          <div key={c[0]} className="flex">
                            <label className="w-60">{c[0]}</label>
                            {c[1] == "true" ? (
                              <label>ขอเบิกอะไหล่</label>
                            ) : (
                              <></>
                            )}
                          </div>
                        );
                      })}
                  </ShowDetailInput>
                  <ShowDetailInput label="ปัญหา">
                    <label className="break-all">{task.problem}</label>
                  </ShowDetailInput>
                </AppFormPanel>
              </div>
            ) : (
              <></>
            )}

            <div className="w-full mt-14">
              <AppFormPanel label="INFORMATION">
                <div className="grid grid-cols-2 gap-5">
                  <ShowTextInput
                    label="สร้างโดย"
                    content={username.createdUser}
                  />
                  <ShowTextInput
                    label="สร้างเมื่อ"
                    content={dayjs(task.createdTimeTask).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  />
                </div>
                <div></div>
                <div className="grid grid-cols-2 gap-5">
                  <ShowTextInput
                    label="ผู้ตรวจสอบ"
                    content={username.inspector}
                  />
                  {role == "admin" ? (
                    <ShowTextInput
                      label="ผู้ตรวจสอบตรวจสอบเมื่อ"
                      content={dayjs(task.inspectorChangeTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    />
                  ) : (
                    <></>
                  )}
                </div>
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
