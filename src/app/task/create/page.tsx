"use client";

import Link from "next/link";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppDetailInput from "@/components/InputArea/AppDetailInput";
import AppFormPanel from "@/components/AppFormPanel";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import moment from "moment";

import { useEffect, useState } from "react";
import { myapi } from "@/services/myapi";
import { delay } from "@/libs/delay";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { cn } from "@/helpers/cn";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import CrossIcon from "@/assets/icons/CrossIcon";

type Task = {
  code: string;
  designSpecification: string;
  inspectorId: string;
  originalAffiliation: string;
  problem: string;
  system: string;
  worker: string;
  createdUserId: string;
};

type Worker = {
  id: string;
  userId: string;
  rank: string;
  name: string;
  surname: string;
};

export default function TaskCreatePage() {
  //check date
  const [check, setCheck] = useState(false);

  //model task
  const [task, setTask] = useState<Task>({
    code: "",
    designSpecification: "",
    inspectorId: "",
    originalAffiliation: "",
    problem: "",
    system: "",
    worker: "",
    createdUserId: " ",
  });
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const [errorCreateTask, setErrorCreateTask] = useState("");

  //get origianl affiliation
  const [getAffiliations, setGetAffiliations] = useState<
    { id: number; affiliationName: string }[]
  >([]);
  const [getAffiliationLoading, setGetAffiliationLoading] = useState(false);
  const [errorAffiliation, setErrorAffiliation] = useState("");

  //get model
  const [getModels, setGetModels] = useState<
    { id: number; modelName: string; model: string[] }[]
  >([]);
  const [getModelLoading, setGetModelLoading] = useState(false);
  const [errorModel, setErrorModel] = useState("");

  //get inspector
  const [getInspectors, setGetInspectors] = useState<Worker[]>([]);
  const [getInspectorLoading, setGetInspectorLoading] = useState(false);
  const [errorInspector, setErrorInspector] = useState("");
  //select inspector name
  const selectInspectorName =
    task.inspectorId !== ""
      ? getInspectorFullName(task.inspectorId)
      : "เลือกผู้ตรวจสอบ";
  //search inspector
  const [searchInspector, setSearchInspector] = useState<Worker[]>([]);
  const [queryInspector, setQueryInspector] = useState({ data: "" });

  //get worker
  const [getWorkers, setGetWorkers] = useState<Worker[]>([]);
  const [getWorkerLoading, setGetWorkerLoading] = useState(false);
  const [errorWorker, setErrorWorker] = useState("");
  //select worker id
  const [selectWorkerId, setSelectWorkerId] = useState<string[]>([]);
  //search worker name
  const [serachWorker, setSearchWorker] = useState<Worker[]>([]);
  const [queryWorker, setQueryWorker] = useState({ data: "" });

  //get system
  const [getSystems, setGetSystems] = useState<
    { id: number; systemName: string }[]
  >([]);
  const [getSystemLoading, setGetSystemLoading] = useState(false);
  const [errorSystem, setErrorSystem] = useState("");
  //select system name
  const [selectSystemName, setSelectSystemName] = useState<
    { name: string; repair: boolean }[]
  >([]);
  // select system id
  const [selectSystemId, setSelectSystemId] = useState<number[]>([]);
  //serch system
  const [searchSystem, setSearchSystem] = useState<
    { id: number; systemName: string }[]
  >([]);
  const [querySystem, setQuerySystem] = useState({ data: "" });
  //additional area
  const [additionalCheck, setAdditionalCheck] = useState(false);
  //require area
  const [requireInput, setRequireInput] = useState("");
  //require problem
  const [requireProblem, setRequireProblem] = useState("");

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (check) {
      getInspector();
      getWorker();
      getAffiliation();
      getModel();
      getSystem();
    }
  }, [check]);

  //search inspector
  useEffect(() => {
    if (queryInspector.data == "" && task.inspectorId == "Select Inspector") {
    } else {
      setSearchInspector(
        getInspectors.filter((inspector) =>
          (inspector.rank + inspector.name + " " + inspector.surname).includes(
            queryInspector.data
          )
        )
      );
    }
  }, [queryInspector, getInspectors, task.inspectorId]);

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

  //search system
  useEffect(() => {
    if (querySystem.data == "") {
      setSearchSystem(getSystems);
    } else {
      setSearchSystem(
        getSystems.filter((system) =>
          system.systemName.includes(querySystem.data)
        )
      );
    }
  }, [querySystem, getSystems]);

  async function CheckDate() {
    if (localStorage.length == 0) {
      router.push("/login");
      return;
    }
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
      if (localStorage.getItem("name") == null || checking) {
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
      const allModel = [];
      for (let i = 0; i < res.data.length; i++) {
        const modelNumbers = res.data[i].modelNumber.split(",");
        const result = [];
        for (let a = 0; a < modelNumbers.length; a++) {
          result.push(modelNumbers[a]);
        }
        allModel.push({
          id: res.data[i].id,
          modelName: res.data[i].modelName,
          model: result,
        });
      }
      setGetModels(allModel);
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

  //get system
  async function getSystem() {
    setGetSystemLoading(true);
    await delay();
    try {
      const res = await myapi.get(`/SystemAirplane`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.status !== 200) {
        setErrorSystem("Error loading system");
        setGetSystemLoading(false);
      }
      setGetSystems(res.data);
      setGetSystemLoading(false);
    } catch (error) {
      console.error(error);
      setErrorSystem("Error loading system");
      setGetSystemLoading(false);
    }
  }

  function getInspectorFullName(Id: string) {
    const rank = getInspectors.find((user) => user.id == Id)?.rank;
    const name = getInspectors.find((user) => user.id == Id)?.name;
    const surname = getInspectors.find((user) => user.id == Id)?.surname;
    if (rank == undefined || name == undefined || surname == undefined) {
      return;
    } else {
      const fullName = rank + name + " " + surname;
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
    const dateCheck = await CheckDate();
    if (dateCheck == false) {
      return;
    }
    if (additionalCheck == true) {
      task.system = selectSystemName
        .map((system) => system.name + ":" + system.repair)
        .toString();
    } else if (additionalCheck == false) {
      task.problem = "";
    }
    task.worker = selectWorkerId.map((c) => getWorkerFullName(c)).toString();
    //when second attempt
    setRequireInput("");
    setRequireProblem("");
    setErrorCreateTask("");
    //check require area
    if (
      task.originalAffiliation == "" ||
      task.designSpecification == "" ||
      task.worker == "" ||
      task.inspectorId == "" ||
      task.code == ""
    ) {
      setRequireInput("Require Input");
      if (
        additionalCheck == true &&
        (task.system == "" || task.problem == "")
      ) {
        setRequireProblem("Require Explanation");
      }
      return;
    } else if (
      additionalCheck == true &&
      (task.system == "" || task.problem == "")
    ) {
      setRequireProblem("Require Explanation");
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
          selectWorkerId.length == 0 ||
          task.inspectorId == "" ||
          task.code == "") ? (
          <span className="mt-4 font-semibold text-red-500">
            {requireInput}
          </span>
        ) : (
          <></>
        )}
      </HeaderDisplay>

      <div className="overflow-auto overflow-y-scroll">
        <div className="w-full">
          <AppFormPanel label="DETAIL">
            {/* affiliation */}
            <div className="flex flex-col h-20 text-lg">
              <label className="font-semibold">กองบิน</label>
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
                      : task.originalAffiliation !== ""
                      ? task.originalAffiliation
                      : "เลือกกองบิน"}
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
            <div className="grid grid-cols-2 gap-5">
              {/* design specification */}
              <div className="flex flex-col h-20 text-lg">
                <label className="font-semibold">รุ่นเครื่องบิน</label>
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
                        : task.designSpecification !== ""
                        ? task.designSpecification
                        : "เลือกรุ่นเครื่องบิน"}
                    </div>
                    <DropdownIcon style="ml-1" />
                  </MenuButton>
                  {getModelLoading || errorModel ? (
                    <MenuItems
                      anchor="bottom"
                      className="w-[22rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                    >
                      {getModelLoading
                        ? "Loading"
                        : errorModel
                        ? errorModel
                        : ""}
                    </MenuItems>
                  ) : (
                    <MenuItems
                      anchor="bottom"
                      className="w-[22rem] mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
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
                                    code: "",
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
              {/* model number */}
              <div className="flex flex-col h-20 text-lg">
                <label className="font-semibold">หมายเลขเครื่องบิน</label>
                <Menu>
                  <MenuButton
                    className={cn(
                      "inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 rounded-lg stroke-gray-900 hover:border-2",
                      requireInput !== "" && task.code == ""
                        ? "border-red-500 border-2 text-red-500 font-semibold animate-headShake"
                        : "border border-gray-900"
                    )}
                  >
                    <div className="text-nowrap w-full truncate">
                      {getModelLoading
                        ? "Loading..."
                        : errorModel
                        ? errorModel
                        : task.code !== ""
                        ? task.code
                        : "เลือกหมายเลขเครื่องบิน"}
                    </div>
                    <DropdownIcon style="ml-1" />
                  </MenuButton>
                  {getModelLoading || errorModel ? (
                    <MenuItems
                      anchor="bottom"
                      className="w-[22rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                    >
                      {getModelLoading
                        ? "Loading"
                        : errorModel
                        ? errorModel
                        : ""}
                    </MenuItems>
                  ) : task.designSpecification !== "" ? (
                    <MenuItems
                      anchor="bottom"
                      className="w-[22rem] mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                    >
                      <div className="max-h-40 overflow-y-scroll">
                        {getModels
                          .find((c) => c.modelName == task.designSpecification)
                          ?.model.filter((c) => c !== task.code)
                          .map((c) => {
                            return (
                              <div
                                key={c}
                                onClick={() => {
                                  setTask({
                                    ...task,
                                    code: c,
                                  });
                                }}
                              >
                                <MenuItem>
                                  <a className="block data-[focus]:bg-gray-100 py-2">
                                    {c}
                                  </a>
                                </MenuItem>
                              </div>
                            );
                          })}
                      </div>
                    </MenuItems>
                  ) : (
                    <></>
                  )}
                </Menu>
              </div>
            </div>

            {/* inspector */}
            <div className="flex flex-col h-20 text-lg">
              <label className="font-semibold">ผู้ตรวจสอบ</label>
              <Menu>
                <MenuButton
                  className={cn(
                    "inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 rounded-lg stroke-gray-900 hover:border-2",
                    requireInput !== "" && task.inspectorId == ""
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
                          (inspector) => inspector.id !== task.inspectorId
                        )
                        .map((c) => {
                          return (
                            <div
                              key={c.id}
                              onClick={() => {
                                setTask({
                                  ...task,
                                  inspectorId: c.id,
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
                <label className="font-semibold">ผู้ปฏิบัติงาน</label>
                <Menu>
                  <MenuButton
                    className={cn(
                      "inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 rounded-lg stroke-gray-900 hover:border-2",
                      requireInput !== "" && selectWorkerId.length == 0
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
                        : "เลือกผู้ปฏิบัติงาน"}
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
          <input
            className="w-4 h-4 mr-2"
            type="checkbox"
            onClick={(c) => {
              setAdditionalCheck(c.currentTarget.checked);
            }}
          />
          <AppFormPanel
            label="ADDITIONAL"
            style={additionalCheck == true ? "" : "hidden"}
          >
            {/* system */}
            <div className="row-span-2">
              <div className="flex flex-col h-20 text-lg">
                <label className="font-semibold">ระบบปฏิบัติการ</label>
                <Menu>
                  <MenuButton
                    className={cn(
                      "inline-flex items-center h-full pr-3 text-lg text-center mt-4 text-gray-900 rounded-lg stroke-gray-900 hover:border-2",
                      requireProblem !== "" &&
                        selectSystemId.length == 0 &&
                        additionalCheck == true
                        ? "border-red-500 border-2 text-red-500 font-semibold animate-headShake"
                        : "border border-gray-900"
                    )}
                    onClick={() => {
                      setQuerySystem({
                        ...querySystem,
                        data: "",
                      });
                    }}
                  >
                    <div className="text-nowrap w-full truncate">
                      {getSystemLoading
                        ? "Loading..."
                        : errorSystem
                        ? errorSystem
                        : "เลือกระบบปฏิบัติการ"}
                    </div>
                    <DropdownIcon style="ml-1" />
                  </MenuButton>
                  {getSystemLoading || errorSystem ? (
                    <MenuItems
                      anchor="bottom"
                      className="w-[46rem] h-9 mt-2 border rounded-lg text-lg text-center bg-white border-gray-300"
                    >
                      {getSystemLoading
                        ? "Loading"
                        : errorSystem
                        ? errorSystem
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
                            setQuerySystem({
                              ...querySystem,
                              data: c.target.value,
                            });
                          }}
                        />
                        <div className="flex justify-center place-items-center border border-l-0 px-4 my-2 mr-2 border-gray-900 rounded-e-lg stroke-gray-900 stroke-2">
                          <SearchIcon />
                        </div>
                      </div>
                      <div className="max-h-40 overflow-y-scroll">
                        {searchSystem
                          .filter(
                            (system) => !selectSystemId.includes(system.id)
                          )
                          .map((c) => {
                            return (
                              <div
                                key={c.id}
                                onClick={() => {
                                  const system = getSystems.find(
                                    (system) => system.id == c.id
                                  );
                                  if (system) {
                                    setSelectSystemId([
                                      ...selectSystemId,
                                      system.id,
                                    ]);

                                    setSelectSystemName([
                                      ...selectSystemName,
                                      {
                                        name: system.systemName,
                                        repair: false,
                                      },
                                    ]);

                                    setQuerySystem({
                                      ...querySystem,
                                      data: "",
                                    });
                                  }
                                }}
                              >
                                <MenuItem>
                                  <a className="block data-[focus]:bg-gray-100 py-2">
                                    {c.systemName}
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
                <div className="flex flex-col max-h-32 min-h-12 text-lg mt-3 overflow-y-auto">
                  {selectSystemName.map((system) => (
                    <div
                      key={system.name}
                      className="flex items-center mb-3 py-[0.2rem] pl-2"
                    >
                      <label className="w-60">{system.name}</label>
                      <div className="flex flex-1 justify-end items-center">
                        <label className="mr-2">
                          This system need to replace part
                        </label>
                        <input
                          className="w-4 h-4 mr-2"
                          type="checkbox"
                          onClick={(c) => {
                            system.repair = c.currentTarget.checked;
                          }}
                        />
                        <button
                          className="mr-2"
                          onClick={() => {
                            const searchId = selectSystemName.findIndex(
                              (search) => search.name == system.name
                            );
                            setSelectSystemId((prev) =>
                              prev.filter(
                                (id) => id !== selectSystemId[searchId]
                              )
                            );
                            setSelectSystemName((prev) =>
                              prev.filter(
                                (system) =>
                                  system.name !==
                                  selectSystemName[searchId].name
                              )
                            );
                          }}
                        >
                          <CrossIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <AppDetailInput
              label="ปัญหา"
              value={task.problem}
              onTextChange={(problem) =>
                setTask((pre) => ({ ...pre, problem }))
              }
              inputAlert={
                task.problem == "" &&
                requireProblem !== "" &&
                additionalCheck == true
                  ? true
                  : false
              }
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
