"use client";

import Link from "next/link";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppDetailInput from "@/components/InputArea/AppDetailInput";
import AppFormPanel from "@/components/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTextInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import moment from "moment";

import { useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { redirect, useRouter } from "next/navigation";

type Task = {
  code: string;
  designSpecification: string;
  inspector: string;
  jch: string;
  originalAffiliation: string;
  problem: string;
  system: string;
  worker: string;
  createdUserId: string;
};

export default function TaskCreatePage() {
  //model task
  const [task, setTask] = useState<Task>({
    code: "",
    designSpecification: "",
    inspector: "",
    jch: "",
    originalAffiliation: "",
    problem: "",
    system: "",
    worker: "",
    createdUserId: " ",
  });
  //create task loading
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  //post task
  const [errorCreateTask, setErrorCreateTask] = useState("");
  //requir area
  const [requireInput, setRequireInput] = useState("");

  const router = useRouter();

  async function createTask() {
    //when second attempt
    setRequireInput("");
    setErrorCreateTask("");
    //check require area
    if (
      task.originalAffiliation == "" ||
      task.designSpecification == "" ||
      task.jch == "" ||
      task.worker == "" ||
      task.inspector == ""
    ) {
      setRequireInput("Require Input");
      return;
    }
    //input created user
    const createdUserId = localStorage.getItem("nameIdentifier");
    if (createdUserId) task.createdUserId = createdUserId;
    //start to post api
    setCreateTaskLoading(true);
    //check loading
    await delay();
    try {
      //post api
      const res = await myapi.post("/Task", task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorCreateTask(
          "We can't process your request. Please submit again."
        );
        setCreateTaskLoading(false);
        return;
      }
      setCreateTaskLoading(false);
      router.push(`/task/${res.data.id}`);
    } catch (error) {
      console.error(error);
      setErrorCreateTask("We can't process your request. Please submit again.");
      setCreateTaskLoading(false);
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
  } else if (localStorage.getItem("role") !== "user") {
    redirect(`/login`);
  }

  return (
    <div className="flex flex-col h-[85vh]">
      {/* Title page */}
      <HeaderDisplay label="CREATE NEW TASK">
        {errorCreateTask !== "" ? (
          <span className="mt-4 font-semibold text-red-500">
            {errorCreateTask}
          </span>
        ) : (
          <></>
        )}
        {requireInput !== "" &&
        (task.originalAffiliation == "" ||
          task.designSpecification == "" ||
          task.jch == "" ||
          task.worker == "" ||
          task.inspector == "") ? (
          <span className="mt-4 font-semibold text-red-500">
            {requireInput}
          </span>
        ) : (
          <></>
        )}
      </HeaderDisplay>

      <div className="overflow-auto">
        <div className="w-full">
          <AppFormPanel label="DETAIL">
            <AppTetxtInput
              label="ORIGIANL AFFILIATION"
              value={task.originalAffiliation}
              onTextChange={(originalAffiliation) =>
                setTask((pre) => ({ ...pre, originalAffiliation }))
              }
              style={
                requireInput != "" && task.originalAffiliation == ""
                  ? "border-red-500 border-2"
                  : ""
              }
            />
            <AppTetxtInput
              label="DESIGN SPECIFICATION"
              value={task.designSpecification}
              onTextChange={(designSpecification) =>
                setTask((pre) => ({ ...pre, designSpecification }))
              }
              style={
                requireInput != "" && task.designSpecification == ""
                  ? "border-red-500 border-2"
                  : ""
              }
            />
            <AppTetxtInput
              label="JCH"
              value={task.jch}
              onTextChange={(jch) => setTask((pre) => ({ ...pre, jch }))}
              style={
                requireInput != "" && task.jch == ""
                  ? "border-red-500 border-2"
                  : ""
              }
            />
            <AppDetailInput
              label="WORKER"
              value={task.worker}
              onTextChange={(worker) => setTask((pre) => ({ ...pre, worker }))}
              style={
                requireInput != "" && task.worker == ""
                  ? "border-red-500 border-2"
                  : ""
              }
            />
            <AppTetxtInput
              label="INSPECTOR"
              value={task.inspector}
              onTextChange={(inspector) =>
                setTask((pre) => ({ ...pre, inspector }))
              }
              style={
                requireInput != "" && task.inspector == ""
                  ? "border-red-500 border-2"
                  : ""
              }
            />
          </AppFormPanel>
        </div>

        <div className="w-full mt-14">
          <AppFormPanel label="ADDITIONAL">
            <AppDetailInput
              label="SYSTEM"
              value={task.system}
              onTextChange={(system) => setTask((pre) => ({ ...pre, system }))}
            />
            <AppDetailInput
              label="PROBLEM"
              value={task.problem}
              onTextChange={(problem) =>
                setTask((pre) => ({ ...pre, problem }))
              }
            />
            <AppTetxtInput
              label="CODE"
              value={task.code}
              onTextChange={(code) => setTask((pre) => ({ ...pre, code }))}
            />
          </AppFormPanel>
        </div>
      </div>
      {/*button*/}
      <div className="mt-16 flex justify-end">
        <Link href={`/task`}>
          <ActionButton label="Cancel" />
        </Link>

        <ActionButton
          label="Create"
          iconRight={<AddCreateIcon />}
          disableButton={createTaskLoading}
          onClick={createTask}
        />
      </div>
    </div>
  );
}
