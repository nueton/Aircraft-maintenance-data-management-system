"use client";

import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppFormPanel from "@/components/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTextInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import Link from "next/link";
import moment from "moment";

import { useEffect, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { redirect, useRouter } from "next/navigation";
import { useParams } from "next/navigation";

type RepairReport = {
  decommissionedSerial: string;
  decommissionedParcel: string;
  commissionedSerial: string;
  commissionedParcel: string;
  taskReportId: number;
};

type Task = {
  id: number;
  repairReportId: number;
};

export default function RepairReportCreate() {
  //get task
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task>({
    id: 0,
    repairReportId: 0,
  });
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTask, setErrorLoadTask] = useState("");
  //post repair report
  const [repairReport, setRepairReport] = useState<RepairReport>({
    decommissionedSerial: "",
    decommissionedParcel: "",
    commissionedSerial: "",
    commissionedParcel: "",
    taskReportId: Number(taskId),
  });
  const [createRepairReportLoading, setCreateRepairReportLoading] =
    useState(false);
  const [errorCreateRepairReport, setErrorCreateRepairReport] = useState("");
  //require area
  const [requireInput, setRequireInput] = useState("");

  const router = useRouter();

  //get task and input repair id after created
  useEffect(() => {
    if (taskId) {
      getTask(Number(taskId));
    }
  }, [taskId]);

  async function createRepairReport() {
    if (task.repairReportId !== 0) {
      router.push(`/task/${task.id}/repair-report/${task.repairReportId}`);
      return;
    }
    //When second attempt
    setRequireInput("");
    setErrorCreateRepairReport("");
    //check require area
    if (
      repairReport.decommissionedParcel == "" ||
      repairReport.commissionedParcel == "" ||
      repairReport.decommissionedSerial == "" ||
      repairReport.commissionedSerial == ""
    ) {
      setRequireInput("Require Input");
      return;
    }
    //start to post api
    setCreateRepairReportLoading(true);
    //check loading
    await delay();
    try {
      const res = await myapi.post("/RepairReport", repairReport, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorCreateRepairReport(
          "We can't process your request. Please submit again."
        );
        setCreateRepairReportLoading(false);
        return;
      }
      //get repair id after created and set
      setTask((task.repairReportId = res.data.id));
      //put and send
      await myapi.put(`/task/${task.id}`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setCreateRepairReportLoading(false);
      router.push(`/task/${task.id}/repair-report/${res.data.id}`);
    } catch (error) {
      console.error(error);
      setErrorCreateRepairReport(
        "We can't process your request. Please submit again."
      );
      setCreateRepairReportLoading(false);
    }
  }

  //get task id and id of repair report
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
  } else if (task.repairReportId !== 0) {
    redirect(`/task/${task.id}/repair-report/${task.repairReportId}`);
  }

  return (
    <div className="flex flex-col h-[85vh]">
      {getTaskLoading ? (
        <>
          <HeaderDisplay label="CREATE REPAIR REPORT" />
          <span>Loading...</span>
        </>
      ) : errorLoadTask !== "" ? (
        <>
          <HeaderDisplay label="CREATE REPAIR REPORT" />
          <span>{errorLoadTask}</span>
        </>
      ) : (
        <>
          <HeaderDisplay label="CREATE REPAIR REPORT">
            {errorCreateRepairReport !== "" ? (
              <span className="mt-4 font-semibold text-red-500">
                {errorCreateRepairReport}
              </span>
            ) : (
              <></>
            )}
            {requireInput !== "" &&
            (repairReport.decommissionedParcel == "" ||
              repairReport.commissionedParcel == "" ||
              repairReport.decommissionedSerial == "" ||
              repairReport.commissionedSerial == "") ? (
              <span className="mt-4 font-semibold text-red-500">
                {requireInput}
              </span>
            ) : (
              <></>
            )}
          </HeaderDisplay>

          <div className="overflow-auto">
            <div className="w-full">
              <AppFormPanel label="DECOMMISSIONED EQUIPMENT">
                <AppTetxtInput
                  label="SERIAL NUMBER"
                  value={repairReport.decommissionedSerial}
                  onTextChange={(decommissionedSerial) =>
                    setRepairReport((pre) => ({ ...pre, decommissionedSerial }))
                  }
                  style={
                    requireInput !== "" &&
                    repairReport.decommissionedSerial == ""
                      ? "border-red-500 border-2"
                      : ""
                  }
                />
                <AppTetxtInput
                  label="PARCEL NUMBER"
                  value={repairReport.decommissionedParcel}
                  onTextChange={(decommissionedParcel) =>
                    setRepairReport((pre) => ({ ...pre, decommissionedParcel }))
                  }
                  style={
                    requireInput !== "" &&
                    repairReport.decommissionedParcel == ""
                      ? "border-red-500 border-2"
                      : ""
                  }
                />
              </AppFormPanel>
            </div>
            <div className="w-full mt-14">
              <AppFormPanel label="COMMISSIONED EQUIPMENT">
                <AppTetxtInput
                  label="SERIAL NUMBER"
                  value={repairReport.commissionedSerial}
                  onTextChange={(commissionedSerial) =>
                    setRepairReport((pre) => ({ ...pre, commissionedSerial }))
                  }
                  style={
                    requireInput !== "" && repairReport.commissionedSerial == ""
                      ? "border-red-500 border-2"
                      : ""
                  }
                />
                <AppTetxtInput
                  label="PARCEL NUMBER"
                  value={repairReport.commissionedParcel}
                  onTextChange={(commissionedParcel) =>
                    setRepairReport((pre) => ({ ...pre, commissionedParcel }))
                  }
                  style={
                    requireInput !== "" && repairReport.commissionedParcel == ""
                      ? "border-red-500 border-2"
                      : ""
                  }
                />
              </AppFormPanel>
            </div>
          </div>
          {/*button*/}
          <div className="mt-16 flex justify-end">
            <Link href={`/task/${task.id}`}>
              <ActionButton label="Cancel" />
            </Link>
            <ActionButton
              label="Create"
              iconRight={<AddCreateIcon />}
              disableButton={createRepairReportLoading}
              onClick={createRepairReport}
            />
          </div>
        </>
      )}
    </div>
  );
}
