"use client";

import Link from "next/link";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppDetailInput from "@/components/InputArea/AppDetailInput";
import AppFormPanel from "@/components/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTextInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import moment from "moment";

import { useEffect, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { redirect, useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import CrossIcon from "@/assets/icons/CrossIcon";

type Task = {
  code: string;
  designSpecification: string;
  inspector: string;
  originalAffiliation: string;
  problem: string;
  system: string;
  worker: string;
  createdUserId: string;
};

type Worker = {
  userId: string;
  rank: string;
  name: string;
  surname: string;
};

export default function TaskCreatePage() {
  //model task
  const [task, setTask] = useState<Task>({
    code: "",
    designSpecification: "",
    inspector: "",
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
  //get inspector
  const [inspectors, setInspectors] = useState<Worker[]>([]);
  //inspector loading
  const [getInspectorLoading, setGetInspectorLoading] = useState(false);
  //error get inspector
  const [errorInspector, setErrorInspector] = useState("");
  //select inspector id
  const [selectInspectorId, setSelectInspectorId] = useState({ id: "" });
  //select inspector name
  const selectInspectorName =
    selectInspectorId.id !== "" ? getInspectorFullName() : "Select Inspector";
  //search inspector
  const [searchInspector, setSearchInspector] = useState<Worker[]>([]);
  const [queryInspector, setQueryInspector] = useState({ data: "" });
  //get worker
  const [getWorkers, setGetWorkers] = useState<Worker[]>([]);
  //worker loading
  const [getWorkerLoading, setGetWorkerLoading] = useState(false);
  //error get worker
  const [errorWorker, setErrorWorker] = useState("");
  //select worker id
  const [selectWorkerId, setSelectWorkerId] = useState<string[]>([]);
  //select worker name
  //requir area
  const [requireInput, setRequireInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    getInspector();
    getWorker();
  }, []);

  //search inspector
  useEffect(() => {
    if (selectInspectorName == undefined) {
      return;
    }

    if (queryInspector.data == "") {
      if (selectInspectorName == "Select Inspector") {
        setSearchInspector(inspectors);
      } else {
        setSearchInspector(
          inspectors.filter(
            (inspector) =>
              !(
                inspector.rank +
                inspector.name +
                " " +
                inspector.surname
              ).includes(selectInspectorName)
          )
        );
      }
    } else {
      if (selectInspectorName == "Select Inspector") {
        setSearchInspector(
          inspectors.filter((inspector) =>
            (
              inspector.rank +
              inspector.name +
              " " +
              inspector.surname
            ).includes(queryInspector.data)
          )
        );
      } else {
        setSearchInspector(
          inspectors.filter(
            (inspector) =>
              (
                inspector.rank +
                inspector.name +
                " " +
                inspector.surname
              ).includes(queryInspector.data) &&
              !(
                inspector.rank +
                inspector.name +
                " " +
                inspector.surname
              ).includes(selectInspectorName)
          )
        );
      }
    }
  }, [queryInspector, inspectors, selectInspectorName]);

  //get inspector
  async function getInspector() {
    setGetInspectorLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/Auth/allInspector`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorInspector("Error loading inspector name");
        setGetInspectorLoading(false);
      }
      setInspectors(res.data);
      setGetInspectorLoading(false);
    } catch (error) {
      console.error(error);
      setErrorInspector("Error loading inspector name");
      setGetInspectorLoading(false);
    }
  }

  //get worker
  async function getWorker() {
    setGetWorkerLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/Auth/allWorker`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorWorker("Error loading worker name");
        setGetWorkerLoading(false);
      }
      setGetWorkers(res.data);
      setGetWorkerLoading(false);
    } catch (error) {
      console.error(error);
      setErrorWorker("Error loading worker name");
      setGetWorkerLoading(false);
    }
  }

  function getInspectorFullName() {
    const name = inspectors.find(
      (c) => c.userId === selectInspectorId.id
    )?.name;
    const surname = inspectors.find(
      (c) => c.userId === selectInspectorId.id
    )?.surname;
    const rank = inspectors.find(
      (c) => c.userId === selectInspectorId.id
    )?.rank;
    if (rank == undefined || name == undefined || surname == undefined) {
      return;
    } else {
      const fullName = rank + name + " " + surname;
      task.inspector = fullName;
      return fullName;
    }
  }

  function getWorkerFullName(userId: string) {
    const rank = getWorkers.find((user) => user.userId == userId)?.rank;
    const name = getWorkers.find((user) => user.userId == userId)?.name;
    const surname = getWorkers.find((user) => user.userId == userId)?.surname;
    if (rank == undefined || name == undefined || surname == undefined) {
      return;
    } else {
      const fullName = rank + name + " " + surname;
      return fullName;
    }
  }

  async function createTask() {
    //when second attempt
    setRequireInput("");
    setErrorCreateTask("");
    //check require area
    if (
      task.originalAffiliation == "" ||
      task.designSpecification == "" ||
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
            <div className="flex flex-col h-20 text-lg">
              <div>
                <label className="uppercase">inspector</label>
              </div>
              <Menu>
                <MenuButton className="inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 border border-gray-900 rounded-lg stroke-gray-900 hover:border-2">
                  <div className="text-nowrap w-full truncate">
                    {getInspectorLoading
                      ? "Loading..."
                      : errorInspector
                      ? errorInspector
                      : selectInspectorName}
                  </div>
                  <DropdownIcon style="ml-1" />
                </MenuButton>
                {getInspectorLoading || errorInspector ? (
                  <MenuItems
                    anchor="bottom"
                    className="w-[45rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                  >
                    {getInspectorLoading
                      ? "Loading"
                      : errorInspector
                      ? errorInspector
                      : ""}
                  </MenuItems>
                ) : (
                  <MenuItems
                    anchor="bottom"
                    className="w-[45rem] mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                  >
                    <div className="flex bg-white">
                      <input
                        placeholder="search"
                        className="w-full border border-r-0 my-2 ml-2 border-gray-900 rounded-s-lg hover:outline-none focus:outline-none pl-2"
                        onChange={(c) => {
                          setQueryInspector({
                            ...queryInspector,
                            data: c.target.value,
                          });
                          if (queryInspector.data !== c.target.value) {
                            queryInspector.data = c.target.value;
                          }
                        }}
                      />
                      <div className="flex justify-center place-items-center border border-l-0 px-4 my-2 mr-2 border-gray-900 rounded-e-lg stroke-gray-900 stroke-2">
                        <SearchIcon />
                      </div>
                    </div>
                    <div className="max-h-40 overflow-y-scroll">
                      {searchInspector.map((c) => {
                        return (
                          <div
                            key={c.userId}
                            onClick={() => {
                              setSelectInspectorId({
                                ...selectInspectorId,
                                id: c.userId,
                              });
                              if (selectInspectorId.id !== c.userId) {
                                selectInspectorId.id = c.userId;
                              }
                              setQueryInspector({
                                ...queryInspector,
                                data: "",
                              });
                            }}
                          >
                            <MenuItem>
                              <a className="block data-[focus]:bg-gray-100 py-2">
                                {c.rank + c.name + " " + c.surname}
                              </a>
                            </MenuItem>
                          </div>
                        );
                      })}
                    </div>
                  </MenuItems>
                )}
              </Menu>
            </div>

            <div className="row-span-2">
              <div className="flex flex-col h-20 text-lg">
                <label>WORKER</label>
                <Menu>
                  <MenuButton className="inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 border border-gray-900 rounded-lg stroke-gray-900 hover:border-2">
                    <div className="text-nowrap w-full truncate">
                      {getWorkerLoading
                        ? "Loading..."
                        : errorWorker
                        ? errorWorker
                        : "Select worker name"}
                    </div>
                    <DropdownIcon style="ml-1" />
                  </MenuButton>
                  {getWorkerLoading || errorWorker ? (
                    <MenuItems
                      anchor="bottom"
                      className="w-[45rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                    >
                      {getWorkerLoading
                        ? "Loading"
                        : errorWorker
                        ? errorWorker
                        : ""}
                    </MenuItems>
                  ) : (
                    <MenuItems
                      anchor="bottom"
                      className="w-[46rem] mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                    >
                      <div className="flex bg-white">
                        <input
                          placeholder="search"
                          className="w-full border border-r-0 my-2 ml-2 border-gray-900 rounded-s-lg hover:outline-none focus:outline-none pl-2"
                        />
                        <div className="flex justify-center place-items-center border border-l-0 px-4 my-2 mr-2 border-gray-900 rounded-e-lg stroke-gray-900 stroke-2">
                          <SearchIcon />
                        </div>
                      </div>
                      <div className="max-h-40 overflow-y-scroll">
                        {getWorkers
                          .filter(
                            (user) => !selectWorkerId.includes(user.userId)
                          )
                          .map((c) => {
                            return (
                              <div
                                key={c.userId}
                                onClick={() => {
                                  const user = getWorkers.find(
                                    (user) => user.userId == c.userId
                                  );
                                  if (user) {
                                    setSelectWorkerId((prev) => [
                                      ...prev,
                                      user.userId,
                                    ]);
                                  }
                                }}
                              >
                                <MenuItem>
                                  <a className="block data-[focus]:bg-gray-100 py-2">
                                    {c.rank + c.name + " " + c.surname}
                                  </a>
                                </MenuItem>
                              </div>
                            );
                          })}
                      </div>
                    </MenuItems>
                  )}
                </Menu>
              </div>
              <div className="h-[7.5rem]">
                <div className="flex flex-wrap space-y-0 border border-gray-900 max-h-[7.5rem] min-h-10 text-lg pt-1 px-2 mt-4 rounded-lg overflow-y-auto">
                  {selectWorkerId.map((userId) => (
                    <div key={userId} className="mx-2 h-8">
                      {getWorkerFullName(userId)}
                      <button
                        onClick={() => {
                          setSelectWorkerId((prev) =>
                            prev.filter((id) => id !== userId)
                          );
                        }}
                        className="items-center"
                      >
                        <CrossIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
