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
import { useParams, useRouter } from "next/navigation";
import AppRepairPanel from "@/components/AppRepairPanel";

type RepairReport = {
  id: number;
  repairStatus: number;
  createdTimeRepair: Date;
  taskReportId: number;
  changeStatusUserId: string;
};

type EachSystem = {
  name: string;
  decommissionedSerial: string;
  decommissionedParcel: string;
  decommissionedNationalSerialNumber: string;
  commissionedSerial: string;
  commissionedParcel: string;
  commissionedNationalSerialNumber: string;
};

export default function Home() {
  //check date
  const [check, setCheck] = useState(false);

  //repair id, get repair
  const { repairReportId } = useParams<{ repairReportId: string }>();
  const [repairReport, setRepairReport] = useState<RepairReport>({
    id: 0,
    repairStatus: 0,
    createdTimeRepair: new Date(),
    taskReportId: 0,
    changeStatusUserId: "",
  });
  const [getRepairReportLoading, setGetRepairReportLoading] = useState(false);
  const [errorLoadRepairReport, setErrorLoadRepairReport] = useState("");

  //get model
  const [modelDetail, setModelDetail] = useState<EachSystem[]>([]);
  const [getModelLoading, setGetModelLoading] = useState(false);
  const [errorModel, setErrorModel] = useState("");

  //save loading
  const [saveRepairReportLoading, setSaveRepairReportLoading] = useState(false);
  const [errorSaveRepairReport, setErrorSaveRepairReport] = useState("");

  const statusUpdate = [
    {
      id: 6,
      name: "Approved Repair Task",
    },
    {
      id: 7,
      name: "Rejected",
    },
  ];

  //disabled button
  const [requiredInput, setRequiredInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get repair detail
  useEffect(() => {
    if (check && repairReportId) {
      getRepairReport(Number(repairReportId));
      getSystems(Number(repairReportId));
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
      if (localStorage.getItem("role") !== "admin") {
        router.back();
        return false;
      }
      setCheck(true);
      return true;
    } catch (error) {
      console.log(error);
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

  //get system report detail
  async function getSystems(id: number) {
    setGetModelLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/RepairReport/system/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorModel("Error loading repair report");
        setGetModelLoading(false);
        return;
      }
      setModelDetail(res.data);
      setGetModelLoading(false);
    } catch (error) {
      console.error(error);
      setErrorModel("Error loading repair report");
      setGetModelLoading(false);
    }
  }

  //save repair report
  async function saveRepairReport() {
    const dateCheck = await CheckDate();
    if (dateCheck == false) {
      return;
    }
    //For second attmept
    setErrorSaveRepairReport("");
    setRequiredInput("");
    //select status or not
    if (repairReport.repairStatus == 5) {
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

  return (
    <div className="flex flex-col h-[85vh]">
      {getRepairReportLoading || getModelLoading ? (
        <>
          <HeaderDisplay label="EDIT REPAIR REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadRepairReport || errorModel ? (
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
                <span className="flex-1 mr-1">
                  {repairReport.repairStatus == 5
                    ? "Select Status"
                    : statusUpdate.find(
                        (c) => c.id == repairReport.repairStatus
                      )?.name}
                </span>
                <DropdownIcon />
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className="w-64 mt-3 border border-gray-300 rounded-lg text-lg text-center bg-white"
              >
                {statusUpdate
                  .filter((c) => c.id !== repairReport.repairStatus)
                  .map((c) => {
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          setRepairReport({
                            ...repairReport,
                            repairStatus: c.id,
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
            {requiredInput && repairReport.repairStatus == 5 ? (
              <span className="ml-5 font-semibold text-red-500">
                {requiredInput}
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
                    <AppRepairPanel label="พัสดุที่ถอด(OUT)">
                      <ShowTextInput
                        label="หมายเลขพัสดุ(NSN)"
                        content={c.decommissionedNationalSerialNumber}
                      />
                      <ShowTextInput
                        label="หมายเลขกำกับพัสดุ(PN)"
                        content={c.decommissionedParcel}
                      />
                      <ShowTextInput
                        label="หมายเลขพัสดุ(SN)"
                        content={c.decommissionedSerial}
                      />
                    </AppRepairPanel>
                  </div>
                  <div className="w-full mt-7">
                    <AppRepairPanel label="พัสดุที่ติดตั้ง(IN)">
                      <ShowTextInput
                        label="หมายเลขพัสดุ(NSN)"
                        content={c.commissionedNationalSerialNumber}
                      />
                      <ShowTextInput
                        label="หมายเลขกำกับพัสดุ(PN)"
                        content={c.commissionedParcel}
                      />
                      <ShowTextInput
                        label="หมายเลขพัสดุ(SN)"
                        content={c.commissionedSerial}
                      />
                    </AppRepairPanel>
                  </div>
                </div>
              );
            })}
            <div>
              <AppFormPanel label="INFORMATION">
                <ShowTextInput
                  label="สร้างเมื่อ"
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
        <Link
          href={`/task/${repairReport.taskReportId}/repair-report/${repairReport.id}`}
        >
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
