"use client";

import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppTextInput from "@/components/InputArea/AppTextInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import Link from "next/link";
import moment from "moment";

import { useEffect, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { redirect, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import AppRepairPanel from "@/components/AppRepairPanel";

type EachSystem = {
  name: string;
  decommissionedSerial: string;
  decommissionedParcel: string;
  decommissionedNationalSerialNumber: string;
  commissionedSerial: string;
  commissionedParcel: string;
  commissionedNationalSerialNumber: string;
};

type Task = {
  id: number;
  system: string;
  repairReportId: number;
};

export default function RepairReportCreate() {
  //check date
  const [check, setCheck] = useState(false);

  //get task
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task>({
    id: 0,
    system: "",
    repairReportId: 0,
  });
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTask, setErrorLoadTask] = useState("");
  //post repair report
  const repairReport = {
    decommissionedSerial: "",
    decommissionedParcel: "",
    decommissionedNationalSerialNumber: "",
    commissionedSerial: "",
    commissionedParcel: "",
    commissionedNationalSerialNumber: "",
    taskReportId: Number(taskId),
  };
  const [createRepairReportLoading, setCreateRepairReportLoading] =
    useState(false);
  const [errorCreateRepairReport, setErrorCreateRepairReport] = useState("");

  //get model
  const [modelDetail, setModelDetail] = useState<EachSystem[]>([]);
  //model loading
  const [getModelLoading, setGetModelLoading] = useState(false);
  //model error
  const [errorModel, setErrorModel] = useState("");

  //require area
  const [requireInput, setRequireInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get task and input repair id after created
  useEffect(() => {
    if (check && taskId) {
      getTask(Number(taskId));
      getModel(Number(taskId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

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
        return false;
      }
      if (localStorage.getItem("role") !== "user") {
        router.back();
        return false;
      }
      setCheck(true);
      return true;
    } catch (error) {
      console.log(error);
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

  //get model
  async function getModel(id: number) {
    setGetModelLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/Task/system/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorModel("Error loading Model");
        setGetModelLoading(false);
      }
      setModelDetail(res.data);
      setGetModelLoading(false);
    } catch (error) {
      console.error(error);
      setErrorModel("Error loading Model");
      setGetModelLoading(false);
    }
  }

  function checkInput() {
    let check = false;
    modelDetail.map((c) => {
      if (
        c.decommissionedSerial == null ||
        c.decommissionedParcel == null ||
        c.decommissionedNationalSerialNumber == null ||
        c.commissionedSerial == null ||
        c.commissionedParcel == null ||
        c.commissionedNationalSerialNumber == null ||
        c.decommissionedSerial == "" ||
        c.decommissionedParcel == "" ||
        c.decommissionedNationalSerialNumber == "" ||
        c.commissionedSerial == "" ||
        c.commissionedParcel == "" ||
        c.commissionedNationalSerialNumber == ""
      ) {
        setRequireInput("Require Input");
        check = true;
      }
    });
    return check;
  }

  function insertInput() {
    repairReport.decommissionedSerial = modelDetail
      .map((c) => c.name + ":" + c.decommissionedSerial)
      .toString();
    repairReport.decommissionedParcel = modelDetail
      .map((c) => c.name + ":" + c.decommissionedParcel)
      .toString();
    repairReport.decommissionedNationalSerialNumber = modelDetail
      .map((c) => c.name + ":" + c.decommissionedNationalSerialNumber)
      .toString();
    repairReport.commissionedSerial = modelDetail
      .map((c) => c.name + ":" + c.commissionedSerial)
      .toString();
    repairReport.commissionedParcel = modelDetail
      .map((c) => c.name + ":" + c.commissionedParcel)
      .toString();
    repairReport.commissionedNationalSerialNumber = modelDetail
      .map((c) => c.name + ":" + c.commissionedNationalSerialNumber)
      .toString();
    repairReport.taskReportId = Number(taskId);
  }

  async function createRepairReport() {
    const dateCheck = await CheckDate();
    if (dateCheck == false) {
      return;
    }
    if (task.repairReportId !== 0) {
      router.push(`/task/${task.id}/repair-report/${task.repairReportId}`);
      return;
    }
    //When second attempt
    setRequireInput("");
    setErrorCreateRepairReport("");
    //check all input
    if (checkInput() == true) {
      return;
    }
    //insert input
    insertInput();
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

  if (task.repairReportId !== 0) {
    redirect(`/task/${task.id}/repair-report/${task.repairReportId}`);
  }

  return (
    <div className="flex flex-col h-[85vh]">
      {getTaskLoading || getModelLoading ? (
        <>
          <HeaderDisplay label="CREATE REPAIR REPORT" />
          <span>Loading...</span>
        </>
      ) : errorLoadTask || errorModel !== "" ? (
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
            {modelDetail.map((c) => {
              return (
                <div key={c.name} className="pb-14">
                  <div className="text-2xl font-semibold pb-5">{c.name}</div>
                  <div className="w-full">
                    <AppRepairPanel label="DECOMMISSIONED EQUIPMENT">
                      <AppTextInput
                        label="SERIAL NUMBER"
                        value={c.decommissionedSerial ?? ""}
                        onTextChange={(decommissionedSerial) =>
                          setModelDetail((prevState) =>
                            prevState.map((d) => {
                              if (d.name !== c.name) {
                                return d;
                              }
                              return {
                                ...d,
                                decommissionedSerial,
                              };
                            })
                          )
                        }
                        inputAlert={
                          requireInput !== "" &&
                          (c.decommissionedSerial == null ||
                            c.decommissionedSerial == "")
                            ? true
                            : false
                        }
                      />
                      <AppTextInput
                        label="PARCEL NUMBER"
                        value={c.decommissionedParcel ?? ""}
                        onTextChange={(decommissionedParcel) =>
                          setModelDetail((prevState) =>
                            prevState.map((d) => {
                              if (d.name !== c.name) {
                                return d;
                              }
                              return {
                                ...d,
                                decommissionedParcel,
                              };
                            })
                          )
                        }
                        inputAlert={
                          requireInput !== "" &&
                          (c.decommissionedParcel == null ||
                            c.decommissionedParcel == "")
                            ? true
                            : false
                        }
                      />
                      <AppTextInput
                        label="NATIONAL SERIAL NUMBER"
                        value={c.decommissionedNationalSerialNumber ?? ""}
                        onTextChange={(decommissionedNationalSerialNumber) =>
                          setModelDetail((prevState) =>
                            prevState.map((d) => {
                              if (d.name !== c.name) {
                                return d;
                              }
                              return {
                                ...d,
                                decommissionedNationalSerialNumber,
                              };
                            })
                          )
                        }
                        inputAlert={
                          requireInput !== "" &&
                          (c.decommissionedNationalSerialNumber == null ||
                            c.decommissionedNationalSerialNumber == "")
                            ? true
                            : false
                        }
                      />
                    </AppRepairPanel>
                  </div>
                  <div className="w-full mt-7">
                    <AppRepairPanel label="COMMISSIONED EQUIPMENT">
                      <AppTextInput
                        label="SERIAL NUMBER"
                        value={c.commissionedSerial ?? ""}
                        onTextChange={(commissionedSerial) =>
                          setModelDetail((prevState) =>
                            prevState.map((d) => {
                              if (d.name !== c.name) {
                                return d;
                              }
                              return {
                                ...d,
                                commissionedSerial,
                              };
                            })
                          )
                        }
                        inputAlert={
                          requireInput !== "" &&
                          (c.commissionedSerial == null ||
                            c.commissionedSerial == "")
                            ? true
                            : false
                        }
                      />
                      <AppTextInput
                        label="PARCEL NUMBER"
                        value={c.commissionedParcel ?? ""}
                        onTextChange={(commissionedParcel) =>
                          setModelDetail((prevState) =>
                            prevState.map((d) => {
                              if (d.name !== c.name) {
                                return d;
                              }
                              return {
                                ...d,
                                commissionedParcel,
                              };
                            })
                          )
                        }
                        inputAlert={
                          requireInput !== "" &&
                          (c.commissionedParcel == null ||
                            c.commissionedParcel == "")
                            ? true
                            : false
                        }
                      />
                      <AppTextInput
                        label="NATIONAL SERIAL NUMBER"
                        value={c.commissionedNationalSerialNumber ?? ""}
                        onTextChange={(commissionedNationalSerialNumber) =>
                          setModelDetail((prevState) =>
                            prevState.map((d) => {
                              if (d.name !== c.name) {
                                return d;
                              }
                              return {
                                ...d,
                                commissionedNationalSerialNumber,
                              };
                            })
                          )
                        }
                        inputAlert={
                          requireInput !== "" &&
                          (c.commissionedNationalSerialNumber == null ||
                            c.commissionedNationalSerialNumber == "")
                            ? true
                            : false
                        }
                      />
                    </AppRepairPanel>
                  </div>
                </div>
              );
            })}
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
              onClick={() => createRepairReport()}
            />
          </div>
        </>
      )}
    </div>
  );
}
