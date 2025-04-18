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
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function RepairReportDeatail() {
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
  //username that change status
  const [username, setUsername] = useState("");
  const [getUsernameLoading, setGetUsernameLoading] = useState(false);
  const [errorLoadGetUsername, setErrorLoadGetUsername] = useState("");
  //disable button
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [editRepairLoading, setEditRepairLoading] = useState(false);

  const router = useRouter();

  //get repair from api
  useEffect(() => {
    if (repairReportId) {
      getRepairReport(Number(repairReportId));
    }
  }, [repairReportId]);

  //use id from api to find changed status username from user db
  useEffect(() => {
    if (repairReport.changeStatusUserId) {
      getUsername(String(repairReport.changeStatusUserId));
    }
  }, [repairReport.changeStatusUserId]);

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

  //get changed status username
  async function getUsername(id: string) {
    setGetUsernameLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/Auth/${id}`, {
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
    <>
      {getRepairReportLoading || getUsernameLoading ? (
        <>
          <HeaderDisplay label="VIEW REPAIR REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadRepairReport || errorLoadGetUsername ? (
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
                {repairReport.changeStatusUserId !=
                "00000000-0000-0000-0000-000000000000" ? (
                  <ShowTextInput
                    label="CHANGED STATUS BY"
                    content={String(username)}
                  />
                ) : (
                  <></>
                )}
              </AppFormPanel>
            </div>
          </div>
          {/* button */}
          <div className="mt-16 flex justify-end">
            {localStorage.getItem("role") == "admin" ? (
              <>
                {repairReport.repairStatus == 5 ||
                repairReport.repairStatus == 6 ? (
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
    </>
  );
}
