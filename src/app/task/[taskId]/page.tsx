"use client";

import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/Tag/RemindTags";
import ShowDetailInput from "@/components/ShowArea/ShowDetailInput";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import HeaderDetailDisplay from "@/components/TextDisplay/HeaderDetailDisplay";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import dayjs from "dayjs";
import moment from "moment";
import Link from "next/link";

import { delay } from "@/libs/delay";
import { myapi } from "@/services/myapi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/helpers/cn";

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
  adminChangeTime: Date;
  adminId: string;
  repairReportId: number;
};

export default function TaskDetailPage() {
  //check date
  const [check, setCheck] = useState(false);
  const [role, setRole] = useState("");

  //taskid, get task
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
    adminChangeTime: new Date(),
    adminId: "",
    repairReportId: 0,
  });
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTask, setErrorLoadTask] = useState("");
  //username that create task
  const [username, setUsername] = useState({
    createdUser: "",
    inspector: "",
    admin: "",
  });
  const [getUsernameLoading, setGetUsernameLoading] = useState(false);
  const [errorLoadUsername, setErrorLoadUsername] = useState("");
  //disable button
  const [editLoading, setEditLoading] = useState(false);
  const [createRepairLoading, setCreateRepairLoading] = useState(false);
  const [getRepairLoading, setGetRepairLoading] = useState(false);

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
    if (check && taskId) {
      getTask(Number(taskId));
      getUsername(Number(taskId));
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
        setCheck(false);
        return;
      } else {
        setCheck(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //get detail task
  async function getTask(id: number) {
    setGetTaskLoading(true);
    await delay();
    try {
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

  //Button function
  function editOnclick() {
    router.push(`/task/${task.id}/edit`);
    setEditLoading(true);
  }
  function createOnclick() {
    router.push(`/task/${task.id}/create`);
    setCreateRepairLoading(true);
  }
  function getOnclick() {
    router.push(`/task/${task.id}/repair-report/${task.repairReportId}`);
    setGetRepairLoading(true);
  }

  //return admin button
  function taskCheck() {
    localStorage.setItem("path", `/Task/checked`);
    localStorage.setItem("pathName", "CHECKED");
    router.push(`/task`);
  }

  function taskNotChecked() {
    localStorage.setItem("path", `/Task/inProgress`);
    localStorage.setItem("pathName", "NOT CHECKED");
    router.push(`/task`);
  }

  return (
    <div className="flex flex-col h-[85vh]">
      {getTaskLoading || getUsernameLoading ? (
        <>
          <HeaderDisplay label="VIEW TASK REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadTask || errorLoadUsername ? (
        <>
          <HeaderDisplay label="VIEW TASK REPORT" />
          <span>Error Loading Task</span>
        </>
      ) : (
        <>
          <HeaderDetailDisplay label="VIEW TASK REPORT" detail={task.jcn}>
            <RemindTags status={task.taskStatus} />
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

            <div
              className={cn("w-full mt-14", task.system == "" ? "hidden" : "")}
            >
              <AppFormPanel label="ADDITIONAL">
                <ShowDetailInput label="ระบบปฏิบัติการ">
                  {task.system
                    .split(",")
                    .map((c) => c.split(":"))
                    .map((c) => {
                      return (
                        <div key={c[0]} className="flex">
                          <label className="w-60">{c[0]}</label>
                          {c[1] == "true" ? <label>ขอเบิกอะไหล่</label> : <></>}
                        </div>
                      );
                    })}
                </ShowDetailInput>
                <ShowDetailInput label="ปัญหา">
                  <label className="break-all">{task.problem}</label>
                </ShowDetailInput>
              </AppFormPanel>
            </div>

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
                  {task.taskStatus > 1 ? (
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
                <div className="grid grid-cols-2 gap-5">
                  {username.admin !== "" ? (
                    // check that task has change status id
                    <>
                      <ShowTextInput label="แอดมิน" content={username.admin} />
                      <ShowTextInput
                        label="แอดมินตรวจสอบเมื่อ"
                        content={dayjs(task.adminChangeTime).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </AppFormPanel>
            </div>
          </div>

          {/*button*/}
          <div className="mt-16 flex justify-end">
            {role !== "admin" ? (
              // normal return to task
              <Link href={`/task`}>
                <ActionButton label="Return" iconLeft={<LeftIcon />} />
              </Link>
            ) : (
              // admin return depend on status
              <ActionButton
                label="Return"
                iconLeft={<LeftIcon />}
                onClick={
                  task.taskStatus == 2 || task.taskStatus == 5
                    ? taskNotChecked
                    : taskCheck
                }
              />
            )}

            {role == "admin" && task.taskStatus == 2 ? (
              //admin can change status 1 time
              <ActionButton
                label="Edit"
                onClick={editOnclick}
                disableButton={editLoading}
              />
            ) : (
              <></>
            )}

            {role == "inspector" && task.taskStatus == 1 ? (
              //admin can change status 1 time
              <ActionButton
                label="Edit"
                onClick={editOnclick}
                disableButton={editLoading}
              />
            ) : (
              <></>
            )}

            {task.repairReportId == 0 ? (
              //check that task has repair report
              <>
                {role == "user" && task.taskStatus == 4 ? (
                  // only user can create repair
                  <ActionButton
                    label="Create Repair Report"
                    iconRight={<AddCreateIcon />}
                    onClick={createOnclick}
                    disableButton={createRepairLoading}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              // view repair report
              <ActionButton
                label="Repair Report"
                iconRight={<RightIcon />}
                onClick={getOnclick}
                disableButton={getRepairLoading}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
