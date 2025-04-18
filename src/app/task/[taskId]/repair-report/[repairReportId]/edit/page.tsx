"use client";

import DropdownIcon from "@/assets/icons/DropdownIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import Link from "next/link";
import dayjs from "dayjs";
import moment from "moment";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { delay } from "@/libs/delay";
import { myapi } from "@/services/myapi";
import { redirect, useParams, useRouter } from "next/navigation";

type RepairReport = {
  id: number;
  decommissionedSerial: string;
  decommissionedParcel: string;
  commissionedSerial: string;
  commissionedParcel: string;
  repairStatus: number;
  createdTimeRepair: Date;
  taskReportId: number;
  changeStatusUserId: string;
};

type Task = {
  id: number;
  taskStatus: number;
};

export default function Home() {
  //repair id, get repair
  const { repairReportId } = useParams<{ repairReportId: string }>();
  const [repairReport, setRepairReport] = useState<RepairReport>({
    id: 0,
    decommissionedSerial: "",
    decommissionedParcel: "",
    commissionedSerial: "",
    commissionedParcel: "",
    repairStatus: 0,
    createdTimeRepair: new Date(),
    taskReportId: 0,
    changeStatusUserId: "",
  });
  const [getRepairReportLoading, setGetRepairReportLoading] = useState(false);
  const [errorLoadRepairReport, setErrorLoadRepairReport] = useState("");
  //task from repair id for update state
  const [task, setTask] = useState<Task>({
    id: 0,
    taskStatus: 0,
  });
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTask, setErrorLoadTask] = useState("");
  //save loading
  const [saveRepairReportLoading, setSaveRepairReportLoading] = useState(false);
  const [errorSaveRepairReport, setErrorSaveRepairReport] = useState("");
  //select status
  const [selectStatusId, setselectStatusId] = useState({ id: 0 });
  const statusUpdate = [
    {
      id: 5,
      name: "Approved Repair Task",
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
  //disabled button
  const [requiredInput, setRequiredInput] = useState("");

  const router = useRouter();

  //get repair detail
  useEffect(() => {
    if (repairReportId) {
      getRepairReport(Number(repairReportId));
    }
  }, [repairReportId]);

  //use id from repair report to get task status
  useEffect(() => {
    if (repairReport.taskReportId) {
      getTask(Number(repairReport.taskReportId));
    }
  }, [repairReport.taskReportId]);

  //save repair report
  async function saveRepairReport() {
    //For second attmept
    setErrorSaveRepairReport("");
    setRequiredInput("");
    //select status or not
    if (selectStatusId.id === 0) {
      setRequiredInput("Please select status");
      return;
    }
    //input changed status user
    const changeStatusUserId = localStorage.getItem("nameIdentifier");
    if (changeStatusUserId)
      repairReport.changeStatusUserId = changeStatusUserId;
    //start to user api
    setSaveRepairReportLoading(true);
    //check loading
    await delay();
    try {
      //put new status to repair status
      const res = await myapi.put(
        `/RepairReport/${repairReport.id}`,
        repairReport,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status !== 200) {
        setErrorSaveRepairReport(
          "We can't process your request. Please submit again."
        );
        setSaveRepairReportLoading(false);
        return;
      }
      //put new status to task status
      await myapi.put(`/Task/${repairReport.taskReportId}`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setSaveRepairReportLoading(false);
      router.push(
        `/task/${repairReport.taskReportId}/repair-report/${repairReport.id}`
      );
    } catch (error) {
      console.error(error);
      setErrorSaveRepairReport(
        "We can't process your request. Please submit again."
      );
      setSaveRepairReportLoading(false);
    }
  }

  //get repair report detail
  async function getRepairReport(id: number) {
    setGetRepairReportLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/RepairReport/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorLoadRepairReport("Error loading repair report");
        setGetRepairReportLoading(false);
        return;
      }
      setRepairReport(res.data);
      setGetRepairReportLoading(false);
    } catch (error) {
      console.error(error);
      setErrorLoadRepairReport("Error loading repair report");
      setGetRepairReportLoading(false);
    }
  }

  //get task
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
  } else if (localStorage.getItem("role") !== "admin") {
    redirect(`/login`);
  }

  return (
    <div className="flex flex-col h-[85vh]">
      {getRepairReportLoading || getTaskLoading ? (
        <>
          <HeaderDisplay label="EDIT REPAIR REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadRepairReport || errorLoadTask ? (
        <>
          <HeaderDisplay label="EDIT REPAIR REPORT" />
          <span>Error Loading repair report</span>
        </>
      ) : (
        <>
          <HeaderDisplay label="EDIT REPAIR REPORT">
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
                        setRepairReport({
                          ...repairReport,
                          repairStatus: c.id,
                        });
                        setTask({
                          ...task,
                          taskStatus: c.id,
                        });
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
            {errorSaveRepairReport !== "" ? (
              <span className="ml-5 font-semibold text-red-500">
                {errorSaveRepairReport}
              </span>
            ) : (
              <></>
            )}
            {requiredInput && selectStatusId.id == 0 ? (
              <span className="ml-5 font-semibold text-red-500">
                {requiredInput}
              </span>
            ) : (
              <></>
            )}
          </HeaderDisplay>
          <div className="overflow-auto">
            <div className="w-full">
              <AppFormPanel label="DECOMMISSIONED EQUIPMENT">
                <ShowTextInput
                  label="SERIAL NUMBER"
                  content={repairReport.decommissionedSerial}
                />
                <ShowTextInput
                  label="PARCEL NUMBER"
                  content={repairReport.decommissionedParcel}
                />
              </AppFormPanel>
            </div>
            <div className="w-full mt-14">
              <AppFormPanel label="COMMISSIONED EQUIPMENT">
                <ShowTextInput
                  label="SERIAL NUMBER"
                  content={repairReport.commissionedSerial}
                />
                <ShowTextInput
                  label="PARCEL NUMBER"
                  content={repairReport.commissionedParcel}
                />
                <ShowTextInput
                  label="DATE"
                  content={dayjs(repairReport.createdTimeRepair).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                />
              </AppFormPanel>
            </div>
          </div>
        </>
      )}

      <div className="mt-16 flex justify-end">
        <Link href={`/task/${task.id}/repair-report/${repairReport.id}`}>
          <ActionButton label="Cancle" />
        </Link>
        <ActionButton
          label="Save"
          onClick={saveRepairReport}
          disableButton={saveRepairReportLoading}
        />
      </div>
    </div>
  );
}
