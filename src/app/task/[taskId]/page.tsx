"use client";

import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/Tag/RemindTags";
import ShowDetailInput from "@/components/ShowArea/ShowDetailInput";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import dayjs from "dayjs";
import moment from "moment";
import Link from "next/link";

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
  repairReportId: number;
  createdUserId: string;
  changeStatusUserId: string;
};

export default function TaskDetailPage() {
  //taskid, get task
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
    repairReportId: 0,
    createdUserId: "",
    changeStatusUserId: "",
  });
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTask, setErrorLoadTask] = useState("");
  //username that create task
  const [username, setUsername] = useState("");
  const [getUsernameLoading, setGetUsernameLoading] = useState(false);
  const [errorLoadUsername, setErrorLoadUsername] = useState("");
  //username that change status
  const [changeStatusUsername, setChangeStatusUsername] = useState("");
  const [getChangeStatusUsernameLoading, setGetChangeStatusUsernameLoading] =
    useState(false);
  const [errorLoadChangeStatusUsername, setErrorLoadChangeStatusUsername] =
    useState("");
  //disable button
  const [editLoading, setEditLoading] = useState(false);
  const [createRepairLoading, setCreateRepairLoading] = useState(false);
  const [getRepairLoading, setGetRepairLoading] = useState(false);

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

  //use id from task to find changed status username from user db
  useEffect(() => {
    if (task.changeStatusUserId) {
      getChangeStatusUsername(String(task.changeStatusUserId));
    }
  }, [task.changeStatusUserId]);

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

  //get changed status username
  async function getChangeStatusUsername(id: string) {
    try {
      setGetChangeStatusUsernameLoading(true);
      await delay();
      const res = await myapi.get(`/Auth/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorLoadChangeStatusUsername(
          "Error Loading Change Statuse Username"
        );
        setGetChangeStatusUsernameLoading(false);
        return;
      }
      setChangeStatusUsername(res.data);
      setGetChangeStatusUsernameLoading(false);
    } catch (error) {
      console.error(error);
      setErrorLoadChangeStatusUsername("Error Loading Change Statuse Username");
      setGetChangeStatusUsernameLoading(false);
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

  //check token and expire time
  if (
    localStorage.getItem("name") == null ||
    new Date(moment(Date.now()).toISOString()) >
      new Date(String(localStorage.getItem("refreshTokenExpiryTime")))
  ) {
    localStorage.clear();
    redirect(`/login`);
  }

  return (
    <div className="flex flex-col h-[85vh]">
      {getTaskLoading ||
      getUsernameLoading ||
      getChangeStatusUsernameLoading ? (
        <>
          <HeaderDisplay label="VIEW TASK REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadTask ||
        errorLoadUsername ||
        errorLoadChangeStatusUsername ? (
        <>
          <HeaderDisplay label="VIEW TASK REPORT" />
          <span>Error Loading Task</span>
        </>
      ) : (
        <>
          <HeaderDisplay label="VIEW TASK REPORT">
            <RemindTags status={task.taskStatus} />
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
                {task.changeStatusUserId !=
                "00000000-0000-0000-0000-000000000000" ? (
                  // check that task has change status id
                  <ShowTextInput
                    label="CHANGED STATUS BY"
                    content={String(changeStatusUsername)}
                  />
                ) : (
                  <></>
                )}
              </AppFormPanel>
            </div>
          </div>

          {/*button*/}
          <div className="mt-16 flex justify-end">
            {localStorage.getItem("role") == "user" ||
            localStorage.getItem("role") == "supervisor" ? (
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
                  task.taskStatus == 1 || task.taskStatus == 4
                    ? taskNotChecked
                    : taskCheck
                }
              />
            )}

            {localStorage.getItem("role") == "admin" && task.taskStatus == 1 ? (
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
                {localStorage.getItem("role") == "user" &&
                task.taskStatus == 3 ? (
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
