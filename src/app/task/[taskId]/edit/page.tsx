"use client";

import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/RemindTags";
import ShowDetailInput from "@/components/ShowArea/ShowDetailInput";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { delay } from "@/libs/delay";
import { myapi } from "@/services/myapi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import DropdownIcon from "@/assets/icons/DropdownIcon";

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

type StatusType = {
  id: number;
  name: string;
};

export default function TaskEditPage() {
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
  const [successSaveTask, setSuccessSaveTask] = useState("");
  const [statusUpdate, setStatusUpdate] = useState<StatusType[]>([]);
  const [selectStatusId, setselectStatusId] = useState(0);

  const selectStatusName =
    selectStatusId !== 0
      ? statusUpdate.find((c) => c.id === selectStatusId)?.name
      : "Select Status";

  useEffect(() => {
    if (taskId) {
      getTask(Number(taskId));
    }
  }, [taskId]);

  useEffect(() => {
    getAllStatus();
  }, []);

  async function saveTask() {
    if (task.id === 0) {
      setErrorLoadTask("Invalid Task");
      return;
    }
    try {
      setGetTaskLoading(true);

      await delay();

      const res = await myapi.put(`/task/${task.id}`, task);
      if (res.status !== 200) {
        setErrorLoadTask("Error saving task");
        setGetTaskLoading(false);
        return;
      }
      setGetTaskLoading(false);
      setSuccessSaveTask("Task saved successfully");
    } catch (error) {
      console.error(error);
      setErrorLoadTask("Error saving Task");
      setGetTaskLoading(false);
    }
  }

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

  async function getAllStatus() {
    const status = [
      {
        id: 2,
        name: "Approved Task",
      },
      {
        id: 5,
        name: "Rejected",
      },
    ];
    // get status from api
    setStatusUpdate(status);
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
          <HeaderDisplay label="VIEW TASK REPORT"></HeaderDisplay>
        </>
      ) : (
        <>
          {/* <span>{successSaveTask && <div>{successSaveTask}</div>}</span>
          <span>{task.status}</span> */}
          <HeaderDisplay label="VIEW TASK REPORT">
            <span className="inline-flex items-center h-10 px-5 self-center text-lg font-medium text-center text-gray-900 border-[1.5px] border-gray-900 rounded-s-xl">
              Status
            </span>
            <Menu>
              <MenuButton className="flex items-center h-10 w-48 self-center pl-5 pr-3 text-lg font-medium text-center text-gray-900 border-gray-900 border-y-[1.5px] border-r-[1.5px] rounded-r-xl stroke-gray-900">
                <span className="flex-1 mr-1">{selectStatusName}</span>
                <DropdownIcon />
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className="w-48 mt-3 border border-gray-300 rounded-lg text-lg text-center bg-white"
              >
                {statusUpdate.map((c) => {
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        setselectStatusId(c.id);
                        setTask({ ...task, status: c.id });
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
        <Link href={`/task/${task.id}`}>
          <ActionButton label="Cancle" />
        </Link>
        <Link href={`/task/${task.id}`}>
          <ActionButton label="Save" onClick={saveTask} />
        </Link>
      </div>
    </div>
  );
}
