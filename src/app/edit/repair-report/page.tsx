"use client";

import DropdownIcon from "@/assets/icons/DropdownIcon";
import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";

type StatusType = {
  id: number;
  name: string;
};

export default function Home() {
  const [status, setstatus] = useState<StatusType[]>([]);
  const [selectStatusId, setselectStatusId] = useState(0);
  const selectStatusName =
    selectStatusId !== 0
      ? status.find((c) => c.id === selectStatusId)?.name
      : "Select Status";

  useEffect(() => {
    getAllstatus();
  }, []);

  async function getAllstatus() {
    const status = [
      {
        id: 1,
        name: "Approved Repair Task",
      },
      {
        id: 2,
        name: "Rejected",
      },
    ];
    setstatus(status);
  }
  return (
    <div className="flex flex-col h-[85vh]">
      {/* Title page */}
      <HeaderDisplay label="VIEW REPAIR REPORT">
        <span className="inline-flex items-center h-10 px-5 self-center text-lg font-medium text-center text-gray-900 border-[1.5px] border-gray-900 rounded-s-xl">
          Status
        </span>
        <Menu>
          <MenuButton className="flex items-center h-10 w-64 self-center pl-5 pr-3 text-lg font-medium text-center text-gray-900 border-gray-900 border-y-[1.5px] border-r-[1.5px] rounded-r-xl stroke-gray-900">
            <span className="flex-1 mr-1">{selectStatusName}</span>
            <DropdownIcon />
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="w-64 mt-3 border border-gray-300 rounded-lg text-lg text-center bg-white"
          >
            {status.map((c) => {
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setselectStatusId(c.id);
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
          <AppFormPanel label="DECOMMISSIONED EQUIPMENT">
            <ShowTextInput
              label="SERIAL NUMBER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowTextInput
              label="PARCEL NUMBER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
          </AppFormPanel>
        </div>
        <div className="w-full mt-14">
          <AppFormPanel label="COMMISSIONED EQUIPMENT">
            <ShowTextInput
              label="SERIAL NUMBER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowTextInput
              label="PARCEL NUMBER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
          </AppFormPanel>
        </div>
      </div>
      <div className="mt-16 flex justify-end">
        <ActionButton label="Return" iconLeft={<LeftIcon />} />
        <ActionButton label="View Task" iconRight={<RightIcon />} />
        <ActionButton label="Submitted Status" />
      </div>
    </div>
  );
}
