"use client";

import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/RemindTags";
import ShowDetailInput from "@/components/ShowArea/ShowDetailInput";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import { delay } from "@/libs/delay";
import { myapi } from "@/services/myapi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  id: number;
  code: string;
  dateTime: string;
  designSpecification: string;
  inspector: string;
  jch: string;
  orgianlAffiliation: string;
  problem: string;
  status: number;
  system: string;
  worker: string;
};

export default function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();

  const [task, setTask] = useState<Task>({
    id: 0,
    code: "",
    dateTime: "",
    designSpecification: "",
    inspector: "",
    jch: "",
    orgianlAffiliation: "",
    problem: "",
    status: 0,
    system: "",
    worker: "",
  });

  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTask, setErrorLoadTask] = useState("");

  useEffect(() => {
    if (taskId) {
      getTask(Number(taskId));
    }
  }, [taskId]);

  async function getTask(id: number) {
    try {
      setGetTaskLoading(true);

      await delay;

      const res = await myapi.get(`/Task/${id}`);
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

  return (
    <div className="flex flex-col h-[85vh]">
      {getTaskLoading ? (
        <>
          <HeaderDisplay label="VIEW TASK REPORT" />
          <span>Loading....</span>
        </>
      ) : errorLoadTask ? (
        <>
          <HeaderDisplay label="VIEW TASK REPORT" />
          <span>Error Loading Task</span>
        </>
      ) : (
        <>
          <HeaderDisplay label="VIEW TASK REPORT">
            <RemindTags status={task.status} />
          </HeaderDisplay>
          <div className="overflow-auto">
            <div className="w-full">
              <AppFormPanel label="DETAIL">
                <ShowTextInput
                  label="ORIGIANL AFFILIATION"
                  content={task.orgianlAffiliation}
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
                <ShowTextInput label="DATE" content={task.dateTime} />
                <ShowTextInput label="CODE" content={task.code} />
              </AppFormPanel>
            </div>
          </div>
        </>
      )}
      {/*button*/}
      <div className="mt-16 flex justify-end">
        <Link href={`/task`}>
          <ActionButton label="Return" iconLeft={<LeftIcon />} />
        </Link>
        <Link href={`/task/${task.id}/edit`}>
          <ActionButton label="Edit" />
        </Link>
        <ActionButton label="Repair Report" iconRight={<RightIcon />} />
      </div>
    </div>
  );
}
