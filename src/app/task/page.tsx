"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import SearchIcon from "@/assets/icons/SearchIcon";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import FileIcon from "@/assets/icons/FileIcon";
import UpdownIcon from "@/assets/icons/UpdownIcon";
import RemindTags from "@/components/RemindTags";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import { cn } from "@/helpers/cn";
import ActionButton from "@/components/button/ActionButton";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import { myapi } from "@/services/myapi";
import { delay } from "../../libs/delay";
import Link from "next/link";
import TableErrorShow from "@/components/TableErrorShow";

type CategoryType = {
  id: number;
  name: string;
};

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

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectCategoryId, setSelectCategoryId] = useState(0);
  const [getTaskLoading, setGetTaskLoading] = useState(false);
  const [errorLoadTasks, setErrorLoadTasks] = useState("");
  const selectCategoryName =
    selectCategoryId !== 0
      ? categories.find((c) => c.id === selectCategoryId)?.name
      : "All categories";

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  async function getAllCategories() {
    const categories = [
      {
        id: 1,
        name: "Original Affiliation",
      },
      {
        id: 2,
        name: "JCH",
      },
      {
        id: 3,
        name: "Inspector",
      },
      {
        id: 4,
        name: "Model",
      },
    ];
    // get categories from api
    setCategories(categories);
  }

  async function getTasks() {
    setGetTaskLoading(true);

    await delay();

    try {
      const res = await myapi.get("/Task");
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
  const TableHeads = [
    { id: 1, label: "JCH" },
    { id: 2, label: "ORIGINAL AFFILIATION", function: <UpdownIcon /> },
    { id: 3, label: "INSPECTOR", function: <UpdownIcon /> },
    { id: 4, label: "DATE & TIME", function: <UpdownIcon /> },
    { id: 5, label: "STATUS", function: <UpdownIcon /> },
    { id: 6, label: "" },
  ];

  return (
    <div>
      <HeaderDisplay label="TASKS" />
      {/*serch group*/}
      <div className="flex w-full min-w-[90rem] pt-1">
        <Menu>
          <MenuButton className="inline-flex items-center py-2 pl-5 pr-3 text-lg font-medium text-center text-gray-900 hover:text-white hover:bg-slate-500 border-[0.1rem] hover:border-slate-500 border-gray-900 rounded-s-xl stroke-gray-900 hover:stroke-white ease-in duration-75">
            <p className=" text-nowrap w-40 truncate">{selectCategoryName}</p>
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
                    setSelectCategoryId(c.id);
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
          placeholder="Search Original Affiliation, JCH, inspector, Model"
        />

        <button className="flex justify-center place-items-center border-[0.1rem] px-4 border-gray-900 rounded-e-xl stroke-gray-900 stroke-2 hover:bg-slate-500 hover:border-slate-500 hover:stroke-white ease-in duration-75">
          <SearchIcon />
        </button>

        <ActionButton label="Create" iconRight={<AddCreateIcon />} />
      </div>

      <div className="border-[0.1rem] rounded-xl border-gray-900 min-w-[90rem] mt-10 overflow-hidden w-full">
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
                      "flex flex-1 min-w-64 text-lg  font-semibold",
                      styleHeader
                    )}
                  >
                    <button className="flex m-auto">
                      <span className="pr-3">{c.label}</span>
                      {c.function}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="w-full max-h-[35rem] overflow-y-scroll overflow-x-hidden">
            {getTaskLoading ? (
              <TableErrorShow label="Loading..." />
            ) : errorLoadTasks ? (
              <TableErrorShow label={errorLoadTasks} />
            ) : (
              tasks.map((task) => {
                return (
                  <tr
                    key={task.id}
                    className="flex text-center h-16 hover:bg-slate-100 text-base"
                  >
                    <td className="flex justify-start items-center pl-8 min-w-96 text-left">
                      {task.jch}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      {task.orgianlAffiliation}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      {task.inspector}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      {task.dateTime}
                    </td>
                    <td className="flex-1 flex justify-center items-center min-w-64">
                      <RemindTags status={task.status} />
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
