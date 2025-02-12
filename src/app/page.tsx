"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import SearchIcon from "@/assets/icons/SearchIcon";
import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import FileIcon from "@/assets/icons/FileIcon";
import UpdownIcon from "@/assets/icons/UpdownIcon";
import RemindTags from "@/components/RemindTags";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import { cn } from "@/helpers/cn";
import ActionButton from "@/components/button/ActionButton";

type CategoryType = {
  id: number;
  name: string;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectCategoryId, setSelectCategoryId] = useState(0);
  const selectCategoryName =
    selectCategoryId !== 0
      ? categories.find((c) => c.id === selectCategoryId)?.name
      : "All categories";

  useEffect(() => {
    getAllCategories();
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

  const TableDatas = [
    {
      id: 1,
      JCH: "การตรวจเช็คระบบเครื่องยนต์ด้านหลัง",
      OrgianlAffiliation: "กองบิน 1",
      Inspector: "ณิชาภัทร ธิติธนากร",
      DataTime: "Jun 06 2024",
      Status: 2,
    },
    {
      id: 2,
      JCH: "การตรวจเช็คระบบเครื่องยนต์ด้านหลัง",
      OrgianlAffiliation: "กองบิน 1",
      Inspector: "ณิชาภัทร ธิติธนากร",
      DataTime: "Jun 06 2024",
      Status: 1,
    },
    {
      id: 3,
      JCH: "การตรวจเช็คระบบเครื่องยนต์ด้านหลัง",
      OrgianlAffiliation: "กองบิน 1",
      Inspector: "ณิชาภัทร ธิติธนากร",
      DataTime: "Jun 06 2024",
      Status: 2,
    },
    {
      id: 4,
      JCH: "การตรวจเช็คระบบเครื่องยนต์ด้านหลัง",
      OrgianlAffiliation: "กองบิน 1",
      Inspector: "ณิชาภัทร ธิติธนากร",
      DataTime: "Jun 06 2024",
      Status: 3,
    },
    {
      id: 5,
      JCH: "การตรวจเช็คระบบเครื่องยนต์ด้านหลัง",
      OrgianlAffiliation: "กองบิน 1",
      Inspector: "ณิชาภัทร ธิติธนากร",
      DataTime: "Jun 06 2024",
      Status: 4,
    },
    {
      id: 6,
      JCH: "การตรวจเช็คระบบเครื่องยนต์ด้านหลัง",
      OrgianlAffiliation: "กองบิน 1",
      Inspector: "ณิชาภัทร ธิติธนากร",
      DataTime: "Jun 06 2024",
      Status: 5,
    },
    {
      id: 7,
      JCH: "การตรวจเช็คระบบเครื่องยนต์ด้านหลัง",
      OrgianlAffiliation: "กองบิน 1",
      Inspector: "ณิชาภัทร ธิติธนากร",
      DataTime: "Jun 06 2024",
      Status: 5,
    },
  ];

  const TableHeads = [
    { id: 1, label: "JCH" },
    { id: 2, label: "ORIGINAL AFFILIATION", function: <UpdownIcon /> },
    { id: 3, label: "INSPECTOR", function: <UpdownIcon /> },
    { id: 4, label: "DATE & TIME", function: <UpdownIcon /> },
    { id: 5, label: "STATUS", function: <UpdownIcon /> },
    { id: 6, label: "" },
  ];

  const PaginationNumber = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  return (
    <div>
      <div className="text-5xl font-semibold pb-14">TASKS</div>
      {/*serch group*/}
      <div className="flex w-full min-w-[90rem] pt-1">
        <Menu>
          <MenuButton className="inline-flex items-center py-2 pl-5 pr-3 text-base font-medium text-center text-gray-900 hover:text-white hover:bg-slate-500 border-[0.1rem] hover:border-slate-500 border-gray-900 rounded-s-xl stroke-gray-900 hover:stroke-white ease-in duration-75">
            <p className="mr-2 text-nowrap w-32 truncate">
              {selectCategoryName}
            </p>
            <DropdownIcon />
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="w-56 mt-2 border rounded-lg text-center font-mono bg-white"
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
          className="border-y-[0.1rem] border-gray-900 py-2 pl-2 w-full focus:outline-none"
          type="search"
          placeholder="Search Original Affiliation, JCH, inspector, Model"
        />

        <button className="flex justify-center place-items-center border-[0.1rem] px-4 border-gray-900 rounded-e-xl stroke-gray-900 stroke-2 hover:bg-slate-500 hover:border-slate-500 hover:stroke-white ease-in duration-75">
          <SearchIcon />
        </button>

        <ActionButton label="Create" iconRight={<AddCreateIcon />} />
      </div>

      {/*Table*/}
      <table className="mt-10 w-full border-separate border-spacing-[0rem]">
        <thead>
          <tr className="h-16">
            {TableHeads.map((c) => {
              const styleHeader =
                c.id === 1
                  ? "min-w-96 border-l-[0.1rem] rounded-tl-xl"
                  : c.id === 6
                  ? "min-w-20 border-r-[0.1rem] rounded-tr-xl"
                  : "";
              return (
                <th
                  key={c.id}
                  className={cn(
                    "min-w-64 border-t-[0.1rem] border-gray-900",
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
        <tbody>
          {TableDatas.map((c) => {
            const styleData =
              TableDatas[TableDatas.length - 1].id === c.id
                ? [
                    "border-b-[0.1rem] rounded-bl-xl",
                    "border-b-[0.1rem] border-gray-900",
                    "border-b-[0.1rem]  rounded-br-xl",
                  ]
                : ["", "", ""];
            return (
              <tr key={c.id} className="text-center h-16 hover:bg-slate-100">
                <td
                  className={cn(
                    "pl-8 text-left border-l-[0.1rem] border-gray-900",
                    styleData[0]
                  )}
                >
                  {c.JCH}
                </td>
                <td className={cn(styleData[1])}>{c.OrgianlAffiliation}</td>
                <td className={cn(styleData[1])}>{c.Inspector}</td>
                <td className={cn(styleData[1])}>{c.DataTime}</td>
                <td className={cn(styleData[1])}>
                  <RemindTags status={c.Status} />
                </td>
                <td
                  className={cn(
                    "flex justify-center items-center h-16 border-r-[0.1rem] border-gray-900 cursor-pointer",
                    styleData[2]
                  )}
                >
                  <FileIcon />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/*Pagination*/}
      <div className="mt-10 flex justify-end items-center list-none h-10 text-lg min-w-[90rem]">
        <li>
          <a className="flex items-center mr-2 px-2 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
            <LeftIcon />
          </a>
        </li>
        {PaginationNumber.map((c) => {
          return (
            <li
              key={c.id}
              className="mr-2 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              {c.id}
            </li>
          );
        })}
        <li>
          <a className="flex items-center mr-2 px-2 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
            <RightIcon />
          </a>
        </li>
      </div>
    </div>
  );
}
