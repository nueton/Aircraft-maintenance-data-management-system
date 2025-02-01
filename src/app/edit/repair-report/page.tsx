import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
export default function Home() {
  return (
    <div>
      {/*left side bar*/}
      <div className="relative w-[350px] border-r border-gray-900 text-xl h-screen min-h-[500px] font-mono font-semibold pt-60 pl-10">
        {/*third button*/}
        <button className="flex w-full h-10 py-5 cursor-pointer text-gray-900 hover:text-slate-500 stroke-gray-900 hover:stroke-slate-500 stroke-2 ease-in duration-200">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="self-center w-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.66669 12.2667L7.61907 17.3334L20 4.66675"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="self-center ml-5">CHECKED</div>
        </button>

        {/*fourth button*/}
        <button className="flex w-full h-10 py-5 mt-8 cursor-pointer text-gray-900 hover:text-slate-500 stroke-gray-900 hover:stroke-slate-500 stroke-2 ease-in duration-200">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="self-center w-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7647 2.58813L2.58826 18.7646M2.58826 2.58813L18.7647 18.7646"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="self-center ml-5">NOT CHECKED</div>
        </button>

        {/*bottom button*/}
        <button className="flex absolute bottom-5 w-full h-10 py-5 mt-8 cursor-pointer text-gray-900 hover:text-slate-500 stroke-gray-900 hover:stroke-slate-500 stroke-2 ease-in duration-200">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="self-center w-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 10H15M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10Z" />
          </svg>
          <div className="self-center ml-5">LOG OUT</div>
        </button>
      </div>

      {/*top bar*/}
      <div className="absolute right-0 left-[350px] top-0 h-[80px] min-w-[700px] font-mono font-medium content-center">
        <div className="absolute right-20 flex flex-row">
          <div className="text-gray-700">WELCOME,</div>
          <div className="text-blue-600 cursor-pointer">
            Nichapat Thitithanakorn
          </div>
        </div>
      </div>

      {/*middle*/}
      <div className="absolute left-[350px] right-0 top-[80px] bottom-0 font-mono px-20 py-12 overflow-auto">
        <div className="flex flex-row pb-14 items-end">
          <div className="text-5xl font-semibold mr-4">VIEW REPAIR REPORT</div>
          <div className="inline-flex items-center h-9 px-3 self-center text-base font-medium text-center text-gray-900 border-[1.5px] border-gray-900 rounded-s-xl">
            Status
          </div>
          <Menu>
            <MenuButton className="flex justify-end h-9 w-52 self-center py-2 pl-5 pr-3 text-base font-medium text-center text-gray-900 border-gray-900 border-y-[1.5px] border-r-[1.5px] rounded-r-xl stroke-gray-900">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 7.5L10 12.5L5 7.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="w-52 mt-3 border border-gray-300 rounded-lg text-center font-mono bg-white"
            >
              <MenuItem>
                <a className="block data-[focus]:bg-gray-100 py-2">
                  Approved Repair
                </a>
              </MenuItem>
              <MenuItem>
                <a className="block data-[focus]:bg-gray-100 py-2">Rejected</a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>

        {/*Detail*/}
        <div className="flex flex-col relative w-full pt-3">
          <span className="text-2xl">DECOMMISSONED EQUIPMENT</span>
          <div className="flex flex-row relative w-full pt-10 text-xl">
            {/*First Row*/}
            <div className="w-1/2 mr-48">
              <div className="flex flex-col h-[80px]">
                SERIAL NUMBER
                <span className="wfull mt-4 pl-2 flex-1">
                  xxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxx
                </span>
              </div>
            </div>
            {/*Second Row*/}
            <div className="w-1/2">
              <div className="flex flex-col h-[80px]">
                PARCEL NUMBER
                <span className="wfull mt-4 pl-2 flex-1">
                  xxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxx
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*Additional*/}
        <div className="flex flex-col relative w-full pt-3 mt-14">
          <span className="text-2xl">COMMISSIONED EQUIPMENT</span>
          <div className="flex flex-row relative w-full pt-10 text-xl">
            {/*First Row*/}
            <div className="w-1/2 mr-48">
              <div className="flex flex-col h-[80px]">
                SERIAL NUMBER
                <span className="wfull mt-4 pl-2 flex-1">
                  xxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxx
                </span>
              </div>
            </div>
            {/*Second Row*/}
            <div className="w-1/2">
              <div className="flex flex-col h-[80px]">
                PARCEL NUMBER
                <span className="wfull mt-4 pl-2 flex-1">
                  xxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxx
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*button*/}
        <div className="flex mt-16 justify-end text-lg">
          <button className="flex flex-row justify-center w-36 py-2 pl-1 pr-3 mr-10 border-[1.5px] rounded-xl border-gray-900 stroke-gray-900 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              className="self-center"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0626 2.77087L6.72925 9.50004L13.0626 16.2292"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="ml-2">Return</div>
          </button>
          <button className="flex flex-row justify-center w-40 py-2 pl-3 pr-1 border-[1.5px] rounded-xl border-gray-900 stroke-gray-900 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75">
            <div className="mr-1">View Task</div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className="self-center ml-2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 17.375L12.75 9.875L5.25 2.375"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="flex flex-row justify-center w-46 py-2 pl-3 pr-2 border-[1.5px] rounded-xl border-gray-900 stroke-gray-900 ml-10 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75">
            <div className="mr-1">Submitted Status</div>
          </button>
        </div>
      </div>
    </div>
  );
}
