"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import SearchIcon from "@/assets/icons/SearchIcon";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import FileIcon from "@/assets/icons/FileIcon";
import RemindTags from "@/components/Tag/RemindTags";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import { cn } from "@/helpers/cn";
import ActionButton from "@/components/button/ActionButton";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import { myapi } from "@/services/myapi";
import { delay } from "../../libs/delay";
import Link from "next/link";
import TableErrorShow from "@/components/TableError/TableErrorShow";
import dayjs from "dayjs";
import moment from "moment";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  code: string;
  createdTimeTask: Date;
  designSpecification: string;
  inspectorId: string;
  jcn: string;
  originalAffiliation: string;
  problem: string;
  taskStatus: number;
  system: string;
  worker: string;
};

type Worker = {
  id: string;
  userId: string;
  rank: string;
  name: string;
  surname: string;
};

export default function Home() {
  //check date
  const [check, setCheck] = useState(false);
  const [role, setRole] = useState("");

  //check path
  const [storedValue, setStoredValue] = useState("");
  const [pathName, setPathName] = useState("");

  //get Tasks from api
  const [tasks, setTasks] = useState<Task[]>([]);
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTasks, setErrorLoadTasks] = useState("");

  //get inspector
  const [getInspectors, setGetInspectors] = useState<Worker[]>([]);
  const [getInspectorLoading, setGetInspectorLoading] = useState(false);
  const [errorInspector, setErrorInspector] = useState("");

  //result constant
  const [searchResult, setSearchResult] = useState<Task[]>([]);
  const [query, setQuery] = useState({ data: "" });

  //categories
  const categories = [
    {
      id: 1,
      name: "JCN",
    },
    {
      id: 2,
      name: "Original Affiliation",
    },
    {
      id: 3,
      name: "Inspector",
    },
  ];
  const [selectCategoryId, setSelectCategoryId] = useState({ id: 1 });
  const selectCategoryName = categories.find(
    (c) => c.id === selectCategoryId.id
  )?.name;

  //create for disable button
  const [createLoading, setCreateLoading] = useState(false);

  //Table
  const TableHeads = [
    { id: 1, label: "JCN" },
    { id: 2, label: "ORIGINAL AFFILIATION" },
    { id: 3, label: "INSPECTOR" },
    { id: 4, label: "DATE & TIME" },
    { id: 5, label: "STATUS" },
    { id: 6, label: "" },
  ];

  const router = useRouter();

  useEffect(() => {
    CheckDate();
    if (typeof window !== undefined) {
      setStoredValue(localStorage.getItem("path") || "");
      setPathName(localStorage.getItem("pathName") || "");
      setRole(localStorage.getItem("role") || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (check) {
      getTasks();
      getInspector();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  useEffect(() => {
    const checkStorageChange = setInterval(() => {
      const newValue = localStorage.getItem("path") || "";
      if (newValue !== null && newValue !== storedValue) {
        setStoredValue(newValue);
        setPathName(String(localStorage.getItem("pathName")));
        getTasks();
      }
    }, 500);

    return () => clearInterval(checkStorageChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedValue]);

  //search with different category
  useEffect(() => {
    if (query.data == "") {
      setSearchResult(tasks);
    } else {
      if (selectCategoryId.id == 1) {
        setSearchResult(
          tasks.filter((task) => task.jcn.substring(0, 40).includes(query.data))
        );
      } else if (selectCategoryId.id == 2) {
        setSearchResult(
          tasks.filter((task) =>
            task.originalAffiliation.substring(0, 20).includes(query.data)
          )
        );
      } else if (selectCategoryId.id == 3) {
        setSearchResult(
          tasks.filter((task) =>
            String(getInspectorFullName(task.inspectorId))
              .substring(0, 20)
              .includes(query.data)
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, tasks, selectCategoryId.id]);

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
      if (checking) {
        localStorage.clear();
        router.push("/login");
        return false;
      }
      setCheck(true);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTasks() {
    const checkDate = await CheckDate();
    if (checkDate == false) {
      return;
    }
    //user role
    if (localStorage.getItem("role") == "user") {
      setGetTaskLoading(true);
      await delay();
      try {
        //get task with same user id
        const res = await myapi.get(String(localStorage.getItem("path")), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (res.status !== 200) {
          setErrorLoadTasks("Error loading tasks");
          setGetTaskLoading(false);
          return;
        }
        setTasks(res.data);
        setGetTaskLoading(false);
      } catch (error) {
        console.error(error);
        setErrorLoadTasks("Error Loading tasks");
        setGetTaskLoading(false);
      }
    }
    //supervisor role
    else if (localStorage.getItem("role") == "supervisor") {
      setGetTaskLoading(true);
      await delay();
      try {
        //get api with completed status
        const res = await myapi.get(`/Task/completed`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (res.status !== 200) {
          setErrorLoadTasks("Error loading tasks");
          setGetTaskLoading(false);
          return;
        }
        setTasks(res.data);
        setGetTaskLoading(false);
      } catch (error) {
        console.error(error);
        setErrorLoadTasks("Error Loading tasks");
        setGetTaskLoading(false);
      }
    } else {
      setGetTaskLoading(true);
      await delay();
      try {
        //get api with completed status
        const res = await myapi.get(String(localStorage.getItem("path")), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (res.status !== 200) {
          setErrorLoadTasks("Error loading tasks");
          setGetTaskLoading(false);
          return;
        }
        setTasks(res.data);
        setGetTaskLoading(false);
      } catch (error) {
        console.error(error);
        setErrorLoadTasks("Error Loading tasks");
        setGetTaskLoading(false);
      }
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

  //Button create click
  function createOnlick() {
    router.push(`/task/create`);
    setCreateLoading(true);
  }

  return (
    <div>
      {role == "supervisor" ? (
        <HeaderDisplay label="TASKS" />
      ) : (
        <HeaderDisplay label={pathName} />
      )}
      <div className="flex w-full min-w-[90rem] pt-1">
        <Menu>
          <MenuButton className="inline-flex items-center py-2 pl-5 pr-3 text-lg font-medium text-center text-gray-900 border-[0.1rem] border-gray-900 rounded-s-2xl stroke-gray-900  hover:scale-x-105 hover:shadow-md">
            <div className=" text-nowrap w-40 truncate">
              {selectCategoryName}
            </div>
            <DropdownIcon style="ml-1" />
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="w-56 mt-2 border rounded-lg text-lg text-center bg-white"
          >
            {categories.map((c) => {
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectCategoryId({ ...selectCategoryId, id: c.id });
                    if (c.id != selectCategoryId.id) {
                      selectCategoryId.id = c.id;
                    }
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

        <input
          className="border-y-[0.1rem] text-lg border-gray-900 py-2 pl-4 w-full focus:outline-none"
          type="search"
          placeholder="Search Original Affiliation, JCN, inspector"
          onChange={(c) => {
            setQuery({ ...query, data: c.target.value });
            if (query.data !== c.target.value) {
              query.data = c.target.value;
            }
          }}
        />

        <div className="flex justify-center place-items-center border-[0.1rem] border-l-0 px-4 border-gray-900 rounded-e-2xl stroke-gray-900 stroke-2">
          <SearchIcon />
        </div>
        {role == "user" ? (
          <ActionButton
            label="Create"
            iconRight={<AddCreateIcon />}
            onClick={createOnlick}
            disableButton={createLoading}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="border-[0.1rem] rounded-2xl border-gray-900 min-w-[90rem] overflow-hidden w-full mt-10">
        <table className="flex flex-col w-full overflow-x-auto">
          <thead className="">
            <tr className="flex h-16">
              {TableHeads.map((c) => {
                const styleHeader =
                  c.id === 1
                    ? "min-w-96 flex-none"
                    : c.id === 6
                    ? "min-w-[5.90rem] flex-none"
                    : "";
                return (
                  <th
                    key={c.id}
                    className={cn(
                      "flex flex-1 min-w-64 text-lg font-semibold",
                      styleHeader
                    )}
                  >
                    <button className="flex m-auto">
                      <span className="pr-3">{c.label}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="w-full max-h-[35rem] overflow-y-scroll overflow-x-hidden">
            {getTaskLoading || getInspectorLoading ? (
              <TableErrorShow label="Loading..." />
            ) : errorLoadTasks || errorInspector ? (
              <TableErrorShow label={errorLoadTasks} />
            ) : (
              searchResult.map((task) => {
                return (
                  <tr
                    key={task.id}
                    className="flex text-center h-16 hover:bg-slate-100 text-base"
                  >
                    <td className="flex justify-start items-center pl-8 min-w-96 text-left">
                      {task.jcn.substring(0, 40).length == 40
                        ? task.jcn.substring(0, 40) + "..."
                        : task.jcn}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      {task.originalAffiliation.substring(0, 20).length == 20
                        ? task.originalAffiliation.substring(0, 20) + "..."
                        : task.originalAffiliation}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      {String(getInspectorFullName(task.inspectorId)).substring(
                        0,
                        20
                      ).length == 20
                        ? String(
                            getInspectorFullName(task.inspectorId)
                          ).substring(0, 20) + "..."
                        : String(getInspectorFullName(task.inspectorId))}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      {dayjs(task.createdTimeTask).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      <RemindTags status={task.taskStatus} />
                    </td>
                    <td className="flex justify-center items-center h-16 min-w-20 cursor-pointer">
                      <Link href={`/task/${task.id}`}>
                        <FileIcon />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
