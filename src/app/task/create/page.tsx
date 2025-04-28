"use client";

import Link from "next/link";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppDetailInput from "@/components/InputArea/AppDetailInput";
import AppFormPanel from "@/components/AppFormPanel";
import AppTextInput from "@/components/InputArea/AppTextInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import moment from "moment";

import { useEffect, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { redirect, useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { cn } from "@/helpers/cn";
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
  //create task error
  const [errorCreateTask, setErrorCreateTask] = useState("");

  //get origianl affiliation
  const [getAffiliations, setGetAffiliations] = useState<
    { id: number; affiliationName: string }[]
  >([]);
  //affiliation loading
  const [getAffiliationLoading, setGetAffiliationLoading] = useState(false);
  //affiliation error
  const [errorAffiliation, setErrorAffiliation] = useState("");
  //select affiliation name
  const selectAffiliationName =
    task.originalAffiliation !== ""
      ? task.originalAffiliation
      : "Select Affiliation";

  //get model
  const [getModels, setGetModels] = useState<
    { id: number; modelName: string }[]
  >([]);
  //model loading
  const [getModelLoading, setGetModelLoading] = useState(false);
  //model error
  const [errorModel, setErrorModel] = useState("");
  //selec model name
  const selectModelName =
    task.designSpecification !== "" ? task.designSpecification : "Select Model";

  //get inspector
  const [getInspectors, setGetInspectors] = useState<Worker[]>([]);
  //inspector loading
  const [getInspectorLoading, setGetInspectorLoading] = useState(false);
  //error get inspector
  const [errorInspector, setErrorInspector] = useState("");
  //select inspector name
  const selectInspectorName =
    task.inspector !== "" ? task.inspector : "Select Inspector";
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
  //search worker name
  const [serachWorker, setSearchWorker] = useState<Worker[]>([]);
  const [queryWorker, setQueryWorker] = useState({ data: "" });

  //requir area
  const [requireInput, setRequireInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    getInspector();
    getWorker();
    getAffiliation();
    getModel();
  }, []);

  //search inspector
  useEffect(() => {
    if (queryInspector.data == "" && task.inspector == "Select Inspector") {
    } else {
      setSearchInspector(
        getInspectors.filter((inspector) =>
          (inspector.rank + inspector.name + " " + inspector.surname).includes(
            queryInspector.data
          )
        )
      );
    }
  }, [queryInspector, getInspectors, task.inspector]);

  //serach worker
  useEffect(() => {
    if (queryWorker.data == "") {
      setSearchWorker(getWorkers);
    } else {
      setSearchWorker(
        getWorkers.filter((worker) =>
          (worker.rank + worker.name + " " + worker.surname).includes(
            queryWorker.data
          )
        )
      );
    }
  }, [queryWorker, getWorkers]);

  //get affiliation
  async function getAffiliation() {
    setGetAffiliationLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/Affiliation`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorAffiliation("Error loading Affiliation");
        setGetAffiliationLoading(false);
      }
      setGetAffiliations(res.data);
      setGetAffiliationLoading(false);
    } catch (error) {
      console.error(error);
      setErrorAffiliation("Error loading worker name");
      setGetAffiliationLoading(false);
    }
  }

  //get model
  async function getModel() {
    setGetModelLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/ModelSpecification`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorModel("Error loading Model");
        setGetModelLoading(false);
      }
      setGetModels(res.data);
      setGetModelLoading(false);
    } catch (error) {
      console.error(error);
      setErrorModel("Error loading Model");
      setGetModelLoading(false);
    }
  }

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
      setGetInspectors(res.data);
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
    // task.worker = selectWorkerId.toString();
    // task.system = selectSystemName
    //   .map((system) => system.name + ":" + system.repair)
    //   .toString();
    // //when second attempt
    // setRequireInput("");
    // setErrorCreateTask("");
    // //check require area
    // if (
    //   task.originalAffiliation == "" ||
    //   task.designSpecification == "" ||
    //   task.worker == "" ||
    //   task.inspector == ""
    // ) {
    //   setRequireInput("Require Input");
    //   return;
    // }
    // //input created user
    // const createdUserId = localStorage.getItem("nameIdentifier");
    // if (createdUserId) task.createdUserId = createdUserId;
    // //start to post api
    // setCreateTaskLoading(true);
    // //check loading
    // await delay();
    // try {
    //   //post api
    //   const res = await myapi.post("/Task", task, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   });
    //   if (res.status !== 200) {
    //     setErrorCreateTask(
    //       "We can't process your request. Please submit again."
    //     );
    //     setCreateTaskLoading(false);
    //     return;
    //   }
    //   setCreateTaskLoading(false);
    //   router.push(`/task/${res.data.id}`);
    // } catch (error) {
    //   console.error(error);
    //   setErrorCreateTask("We can't process your request. Please submit again.");
    //   setCreateTaskLoading(false);
    // }
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
            {/* affiliation */}
            <div className="flex flex-col h-20 text-lg">
              <label className="uppercase">affiliation</label>
              <Menu>
                <MenuButton
                  className={cn(
                    "inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 rounded-lg stroke-gray-900 hover:border-2",
                    requireInput !== "" && task.originalAffiliation == ""
                      ? "border-red-500 border-2 text-red-500 font-semibold animate-headShake"
                      : "border border-gray-900"
                  )}
                >
                  <div className="text-nowrap w-full truncate">
                    {getAffiliationLoading
                      ? "Loading..."
                      : errorAffiliation
                      ? errorAffiliation
                      : selectAffiliationName}
                  </div>
                  <DropdownIcon style="ml-1" />
                </MenuButton>
                {getAffiliationLoading || errorAffiliation ? (
                  <MenuItems
                    anchor="bottom"
                    className="w-[46rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                  >
                    {getAffiliationLoading
                      ? "Loading"
                      : errorAffiliation
                      ? errorAffiliation
                      : ""}
                  </MenuItems>
                ) : (
                  <MenuItems
                    anchor="bottom"
                    className="w-[46rem] mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                  >
                    <div className="max-h-40 overflow-y-scroll">
                      {getAffiliations
                        .filter(
                          (affiliation) =>
                            affiliation.affiliationName !==
                            task.originalAffiliation
                        )
                        .map((c) => {
                          return (
                            <div
                              key={c.id}
                              onClick={() => {
                                setTask({
                                  ...task,
                                  originalAffiliation: c.affiliationName,
                                });
                              }}
                            >
                              <MenuItem>
                                <a className="block data-[focus]:bg-gray-100 py-2">
                                  {c.affiliationName}
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
            {/* design specification */}
            <div className="flex flex-col h-20 text-lg">
              <label className="uppercase">design specification</label>
              <Menu>
                <MenuButton
                  className={cn(
                    "inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 rounded-lg stroke-gray-900 hover:border-2",
                    requireInput !== "" && task.designSpecification == ""
                      ? "border-red-500 border-2 text-red-500 font-semibold animate-headShake"
                      : "border border-gray-900"
                  )}
                >
                  <div className="text-nowrap w-full truncate">
                    {getModelLoading
                      ? "Loading..."
                      : errorModel
                      ? errorModel
                      : selectModelName}
                  </div>
                  <DropdownIcon style="ml-1" />
                </MenuButton>
                {getModelLoading || errorModel ? (
                  <MenuItems
                    anchor="bottom"
                    className="w-[46rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                  >
                    {getModelLoading ? "Loading" : errorModel ? errorModel : ""}
                  </MenuItems>
                ) : (
                  <MenuItems
                    anchor="bottom"
                    className="w-[46rem] mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                  >
                    <div className="max-h-40 overflow-y-scroll">
                      {getModels
                        .filter(
                          (model) =>
                            model.modelName !== task.designSpecification
                        )
                        .map((c) => {
                          return (
                            <div
                              key={c.id}
                              onClick={() => {
                                setTask({
                                  ...task,
                                  designSpecification: c.modelName,
                                });
                              }}
                            >
                              <MenuItem>
                                <a className="block data-[focus]:bg-gray-100 py-2">
                                  {c.modelName}
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
            {/* inspector */}
            <div className="flex flex-col h-20 text-lg">
              <label className="uppercase">inspector</label>
              <Menu>
                <MenuButton
                  className={cn(
                    "inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 rounded-lg stroke-gray-900 hover:border-2",
                    requireInput !== "" && task.inspector == ""
                      ? "border-red-500 border-2 text-red-500 font-semibold animate-headShake"
                      : "border border-gray-900"
                  )}
                  onClick={() => {
                    setQueryInspector({
                      ...queryInspector,
                      data: "",
                    });
                  }}
                >
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
                    className="w-[46rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
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
                    className="w-[46rem] mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
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
                        }}
                      />
                      <div className="flex justify-center place-items-center border border-l-0 px-4 my-2 mr-2 border-gray-900 rounded-e-lg stroke-gray-900 stroke-2">
                        <SearchIcon />
                      </div>
                    </div>
                    <div className="max-h-40 overflow-y-scroll">
                      {searchInspector
                        .filter(
                          (inspector) =>
                            inspector.rank +
                              inspector.name +
                              " " +
                              inspector.surname !==
                            task.inspector
                        )
                        .map((c) => {
                          return (
                            <div
                              key={c.userId}
                              onClick={() => {
                                setTask({
                                  ...task,
                                  inspector: c.rank + c.name + " " + c.surname,
                                });
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
            {/* worker */}
            <div className="row-span-2">
              <div className="flex flex-col h-20 text-lg">
                <label>WORKER</label>
                <Menu>
                  <MenuButton
                    className={cn(
                      "inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 rounded-lg stroke-gray-900 hover:border-2",
                      requireInput !== "" && task.worker == ""
                        ? "border-red-500 border-2 text-red-500 font-semibold animate-headShake"
                        : "border border-gray-900"
                    )}
                    onClick={() => {
                      setQueryWorker({
                        ...queryWorker,
                        data: "",
                      });
                    }}
                  >
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
                      className="w-[46rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
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
                          onChange={(c) => {
                            setQueryWorker({
                              ...queryWorker,
                              data: c.target.value,
                            });
                          }}
                        />
                        <div className="flex justify-center place-items-center border border-l-0 px-4 my-2 mr-2 border-gray-900 rounded-e-lg stroke-gray-900 stroke-2">
                          <SearchIcon />
                        </div>
                      </div>
                      <div className="max-h-40 overflow-y-scroll">
                        {serachWorker
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
                                  setQueryWorker({
                                    ...queryWorker,
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
              <div className="h-[7.5rem]">
                <div className="flex flex-wrap items-center justify-center max-h-32 min-h-12 text-lg px-2 mt-3 overflow-y-auto">
                  {selectWorkerId.map((userId) => (
                    <div
                      key={userId}
                      className="m-2 px-3 flex items-center border-[0.1rem] border-gray-900 rounded-full"
                    >
                      <label className="mr-2">
                        {getWorkerFullName(userId)}
                      </label>
                      <button
                        onClick={() => {
                          setSelectWorkerId((prev) =>
                            prev.filter((id) => id !== userId)
                          );
                        }}
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
            <AppTextInput
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
