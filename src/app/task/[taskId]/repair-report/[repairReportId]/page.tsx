"use client";

import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/Tag/RemindTags";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import Link from "next/link";
import dayjs from "dayjs";
import moment from "moment";

import { delay } from "@/libs/delay";
import { myapi } from "@/services/myapi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppRepairPanel from "@/components/AppRepairPanel";

type RepairReport = {
  id: number;
  repairStatus: number;
  createdTimeRepair: Date;
  changeStatusTime: Date;
  taskReportId: number;
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

export default function RepairReportDeatail() {
  //check date
  const [check, setCheck] = useState(false);
  const [role, setRole] = useState("");

  //repair id, get repair
  const { repairReportId } = useParams<{ repairReportId: string }>();
  const [repairReport, setRepairReport] = useState<RepairReport>({
    id: 0,
    repairStatus: 0,
    createdTimeRepair: new Date(),
    changeStatusTime: new Date(),
    taskReportId: 0,
  });
  const [getRepairReportLoading, setGetRepairReportLoading] = useState(false);
  const [errorLoadRepairReport, setErrorLoadRepairReport] = useState("");

  //get model
  const [modelDetail, setModelDetail] = useState<EachSystem[]>([]);
  const [getModelLoading, setGetModelLoading] = useState(false);
  const [errorModel, setErrorModel] = useState("");

  //username that change status
  const [username, setUsername] = useState("");
  const [getUsernameLoading, setGetUsernameLoading] = useState(false);
  const [errorLoadGetUsername, setErrorLoadGetUsername] = useState("");

  //disable button
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [editRepairLoading, setEditRepairLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    if (typeof window !== undefined) {
      setRole(localStorage.getItem("role") || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get repair from api
  useEffect(() => {
    if (check && repairReportId) {
      getRepairReport(Number(repairReportId));
      getSystems(Number(repairReportId));
      getUsername(Number(repairReportId));
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

  //get repair report detail
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

  //get changed status username
  async function getUsername(id: number) {
    setGetUsernameLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/RepairReport/name/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorLoadGetUsername("Error loading username");
        setGetUsernameLoading(false);
        return;
      }
      setUsername(res.data);
      setGetUsernameLoading(false);
    } catch (error) {
      console.error(error);
      setErrorLoadGetUsername("Error loading username");
      setGetUsernameLoading(false);
    }
  }

  //Button function
  function getTaskOnClick() {
    setGetTaskLoading(true);
    router.push(`/task/${repairReport.taskReportId}`);
  }
  function editRepairOnClick() {
    setEditRepairLoading(true);
    router.push(
      `/task/${repairReport.taskReportId}/repair-report/${repairReport.id}/edit`
    );
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
      {getRepairReportLoading || getUsernameLoading || getModelLoading ? (
        <>
          <HeaderDisplay label="VIEW REPAIR REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadRepairReport || errorLoadGetUsername || errorModel ? (
        <>
          <HeaderDisplay label="VIEW REPAIR REPORT" />
          <span>Error Loading Report</span>
        </>
      ) : (
        <>
          <HeaderDisplay label="VIEW REPAIR REPORT">
            <RemindTags status={repairReport.repairStatus} />
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
                {repairReport.repairStatus !== 5 ? (
                  <div className="grid grid-cols-2 gap-5">
                    <ShowTextInput label="แอดมิน" content={username} />
                    <ShowTextInput
                      label="แอดมินตรวจสอบเมื่อ"
                      content={dayjs(repairReport.changeStatusTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </AppFormPanel>
            </div>
          </div>
          {/* button */}
          <div className="mt-16 flex justify-end">
            {role == "admin" ? (
              <>
                {repairReport.repairStatus == 6 ||
                repairReport.repairStatus == 7 ? (
                  <ActionButton
                    label="Return"
                    iconLeft={<LeftIcon />}
                    onClick={taskCheck}
                  />
                ) : (
                  <>
                    <ActionButton
                      label="Return"
                      iconLeft={<LeftIcon />}
                      onClick={taskNotChecked}
                    />
                    <ActionButton
                      label="Edit"
                      onClick={editRepairOnClick}
                      disableButton={editRepairLoading}
                    />
                  </>
                )}
              </>
            ) : (
              <Link href={`/task`}>
                <ActionButton label="Return" iconLeft={<LeftIcon />} />
              </Link>
            )}

            <ActionButton
              label="Task"
              iconRight={<RightIcon />}
              onClick={getTaskOnClick}
              disableButton={getTaskLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}
