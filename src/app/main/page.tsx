import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Home() {
  return (
    <div>
      {/*left side bar*/}
      <div className="relative w-[350px] border-r border-gray-900 text-xl h-screen min-h-[500px] font-mono font-semibold pt-60 pl-10">
        {/*first button*/}
        <button className="flex w-full h-10 py-5 cursor-pointer text-gray-900 hover:text-slate-500 stroke-gray-900 hover:stroke-slate-500 stroke-2 ease-in duration-200">
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            className="self-center w-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.9725 5.14989C14.8566 5.03183 14.7177 4.93882 14.5643 4.87663C14.411 4.81445 14.2466 4.78441 14.0812 4.78837C13.9158 4.79234 13.753 4.83022 13.6028 4.89968C13.4527 4.96914 13.3184 5.0687 13.2083 5.19218L5.74442 13.5526C5.54674 13.7741 5.43748 14.0605 5.4375 14.3574V23.5625C5.4375 23.8829 5.56481 24.1903 5.79141 24.4169C6.01802 24.6435 6.32536 24.7708 6.64583 24.7708H10.2708C10.5913 24.7708 10.8986 24.6435 11.1253 24.4169C11.3519 24.1903 11.4792 23.8829 11.4792 23.5625V19.3333C11.4792 19.0128 11.6065 18.7055 11.8331 18.4789C12.0597 18.2523 12.367 18.125 12.6875 18.125H16.3125C16.633 18.125 16.9403 18.2523 17.1669 18.4789C17.3935 18.7055 17.5208 19.0128 17.5208 19.3333V23.5625C17.5208 23.8829 17.6481 24.1903 17.8747 24.4169C18.1014 24.6435 18.4087 24.7708 18.7292 24.7708H22.3542C22.6746 24.7708 22.982 24.6435 23.2086 24.4169C23.4352 24.1903 23.5625 23.8829 23.5625 23.5625V14.39C23.5621 14.0735 23.4376 13.7698 23.2157 13.5442L14.9725 5.14989Z" />
          </svg>
          <div className="self-center ml-5">TASKS</div>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            className="absolute right-5 self-center w-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 20.625C16.3157 20.625 20.625 16.3157 20.625 11C20.625 5.68426 16.3157 1.375 11 1.375C5.68426 1.375 1.375 5.68426 1.375 11C1.375 16.3157 5.68426 20.625 11 20.625Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.875 11H15.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 6.875V15.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/*second button*/}
        <button className="flex w-full h-10 py-5 mt-8 cursor-pointer text-gray-900 hover:text-slate-500 stroke-gray-900 hover:stroke-slate-500 stroke-2 ease-in duration-200">
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            className="self-center w-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.916687 1.91669H21.0834M4.58335 1.91669V6.50002C4.58335 9.25002 9.16669 9.46544 9.16669 12C9.16669 14.5346 4.58335 14.75 4.58335 17.5V22.0834M17.4167 1.91669V6.50002C17.4167 9.25002 12.8334 9.46544 12.8334 12C12.8334 14.5346 17.4167 14.75 17.4167 17.5V22.0834M0.916687 22.0834H21.0834M9.16669 5.12502H12.8334V6.50002C12.8334 7.41669 11 8.33335 11 8.33335C11 8.33335 9.16669 7.41669 9.16669 6.50002V5.12502ZM7.33335 20.25C7.33335 18.4167 11 16.5834 11 16.5834C11 16.5834 14.6667 18.4167 14.6667 20.25V22.0834H7.33335V20.25Z" />
          </svg>
          <div className="self-center ml-5">IN PROGRESS</div>
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
      <div className="absolute right-5 left-[350px] top-0 h-[80px] min-w-[700px] font-mono font-medium content-center pr-5">
        <div className="absolute right-5 flex flex-row">
          <div className="text-gray-700">WELCOME,</div>
          <div className="text-blue-600 cursor-pointer">
            Nichapat Thitithanakorn
          </div>
        </div>
      </div>

      {/*middle*/}
      <div className="absolute left-[350px] right-0 top-[80px] bottom-0 font-mono p-12 pl-20">
        <div className="text-5xl font-semibold pb-14">TASKS</div>
        {/*serch group*/}
        <div className="flex flex-row relative w-full min-w-[1430px]">
          <Menu>
            <MenuButton className="inline-flex items-center py-2 pl-5 pr-3 text-base font-medium text-center text-gray-900 hover:text-white hover:bg-slate-500 border-[1.5px] hover:border-slate-500 border-gray-900 rounded-s-xl stroke-gray-900 hover:stroke-white ease-in duration-75">
              <p className="mr-2 text-nowrap">All categories</p>
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
              className="w-56 mt-2 border rounded-lg text-center font-mono bg-white"
            >
              <MenuItem>
                <a className="block data-[focus]:bg-gray-100 py-2">
                  Original Affiliation
                </a>
              </MenuItem>
              <MenuItem>
                <a className="block data-[focus]:bg-gray-100 py-2">JCH</a>
              </MenuItem>
              <MenuItem>
                <a className="block data-[focus]:bg-gray-100 py-2">Inspector</a>
              </MenuItem>
              <MenuItem>
                <a className="block data-[focus]:bg-gray-100 py-2">Model</a>
              </MenuItem>
            </MenuItems>
          </Menu>

          <input
            className="border-y-[1.5px] border-gray-900 py-2 pl-2 w-full focus:outline-none"
            type="search"
            placeholder="Search Original Affiliation, JCH, inspector, Model"
          />

          <button className="flex justify-center place-items-center border-[1.5px] px-4 border-gray-900 rounded-e-xl stroke-gray-900 stroke-2 hover:bg-slate-500 hover:border-slate-500 hover:stroke-white ease-in duration-75">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3749 18.375L14.5748 14.5749M14.5748 14.5749C15.2248 13.9248 15.7405 13.1532 16.0923 12.3039C16.4441 11.4545 16.6251 10.5443 16.6251 9.625C16.6251 8.70572 16.4441 7.79545 16.0923 6.94614C15.7405 6.09684 15.2248 5.32515 14.5748 4.67512C13.9248 4.0251 13.1531 3.50947 12.3038 3.15767C11.4545 2.80588 10.5442 2.62482 9.62494 2.62482C8.70566 2.62482 7.79538 2.80588 6.94608 3.15767C6.09678 3.50947 5.32509 4.0251 4.67506 4.67512C3.36227 5.98791 2.62476 7.76843 2.62476 9.625C2.62476 11.4816 3.36227 13.2621 4.67506 14.5749C5.98785 15.8877 7.76837 16.6252 9.62494 16.6252C11.4815 16.6252 13.262 15.8877 14.5748 14.5749Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="flex flex-row justify-center w-28 py-2 pl-3 pr-1 ml-6 border-[1.5px] rounded-xl border-gray-900 stroke-gray-900 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75">
            <div className="mr-1">Create</div>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.25 12.5H12.5M12.5 12.5H18.75M12.5 12.5V6.25M12.5 12.5V18.75"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/*Table*/}
        <table className="mt-10 w-full border-separate border-spacing-[0px]">
          <thead className="">
            <tr className="h-[70px]">
              <th className="min-w-[400px] border-t-[1.5px] border-l-[1.5px] border-gray-900 rounded-tl-xl">
                JCH
              </th>
              <th className="min-w-[250px] border-t-[1.5px] border-gray-900">
                <button className="flex m-auto">
                  <span className="pr-3">ORIGINAL AFFILIATION</span>
                  <svg
                    width="8"
                    height="15"
                    viewBox="0 0 8 15"
                    fill="none"
                    className="self-center"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.98771 14.4999C3.72252 14.4999 3.4682 14.3945 3.28071 14.2069L0.280712 11.2069C0.0985537 11.0183 -0.00224062 10.7657 3.78026e-05 10.5035C0.00231622 10.2413 0.107485 9.9905 0.292893 9.80509C0.478301 9.61968 0.729114 9.51451 0.991311 9.51223C1.25351 9.50996 1.50611 9.61075 1.69471 9.79291L3.98771 12.0859L6.28071 9.79291C6.46931 9.61075 6.72192 9.50996 6.98411 9.51223C7.24631 9.51451 7.49712 9.61968 7.68253 9.80509C7.86794 9.9905 7.97311 10.2413 7.97539 10.5035C7.97766 10.7657 7.87687 11.0183 7.69471 11.2069L4.69471 14.2069C4.50722 14.3945 4.25291 14.4999 3.98771 14.4999ZM6.98771 5.49991C6.72252 5.49985 6.4682 5.39446 6.28071 5.20691L3.98771 2.91391L1.69471 5.20691C1.50611 5.38907 1.25351 5.48986 0.991311 5.48758C0.729114 5.4853 0.478301 5.38014 0.292893 5.19473C0.107485 5.00932 0.00231622 4.75851 3.78026e-05 4.49631C-0.00224062 4.23411 0.0985537 3.98151 0.280712 3.79291L3.28071 0.792909C3.46824 0.605438 3.72255 0.500122 3.98771 0.500122C4.25288 0.500122 4.50718 0.605438 4.69471 0.792909L7.69471 3.79291C7.83452 3.93276 7.92973 4.11092 7.96829 4.30488C8.00686 4.49883 7.98706 4.69986 7.91139 4.88256C7.83572 5.06526 7.70758 5.22143 7.54317 5.33131C7.37876 5.44119 7.18546 5.49987 6.98771 5.49991Z"
                      fill="#111928"
                    />
                  </svg>
                </button>
              </th>
              <th className="min-w-[300px] border-t-[1.5px] border-gray-900">
                <button className="flex m-auto">
                  <span className="pr-3">INSPECTOR</span>
                  <svg
                    width="8"
                    height="15"
                    viewBox="0 0 8 15"
                    fill="none"
                    className="self-center"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.98771 14.4999C3.72252 14.4999 3.4682 14.3945 3.28071 14.2069L0.280712 11.2069C0.0985537 11.0183 -0.00224062 10.7657 3.78026e-05 10.5035C0.00231622 10.2413 0.107485 9.9905 0.292893 9.80509C0.478301 9.61968 0.729114 9.51451 0.991311 9.51223C1.25351 9.50996 1.50611 9.61075 1.69471 9.79291L3.98771 12.0859L6.28071 9.79291C6.46931 9.61075 6.72192 9.50996 6.98411 9.51223C7.24631 9.51451 7.49712 9.61968 7.68253 9.80509C7.86794 9.9905 7.97311 10.2413 7.97539 10.5035C7.97766 10.7657 7.87687 11.0183 7.69471 11.2069L4.69471 14.2069C4.50722 14.3945 4.25291 14.4999 3.98771 14.4999ZM6.98771 5.49991C6.72252 5.49985 6.4682 5.39446 6.28071 5.20691L3.98771 2.91391L1.69471 5.20691C1.50611 5.38907 1.25351 5.48986 0.991311 5.48758C0.729114 5.4853 0.478301 5.38014 0.292893 5.19473C0.107485 5.00932 0.00231622 4.75851 3.78026e-05 4.49631C-0.00224062 4.23411 0.0985537 3.98151 0.280712 3.79291L3.28071 0.792909C3.46824 0.605438 3.72255 0.500122 3.98771 0.500122C4.25288 0.500122 4.50718 0.605438 4.69471 0.792909L7.69471 3.79291C7.83452 3.93276 7.92973 4.11092 7.96829 4.30488C8.00686 4.49883 7.98706 4.69986 7.91139 4.88256C7.83572 5.06526 7.70758 5.22143 7.54317 5.33131C7.37876 5.44119 7.18546 5.49987 6.98771 5.49991Z"
                      fill="#111928"
                    />
                  </svg>
                </button>
              </th>
              <th className="min-w-[150px] border-t-[1.5px] border-gray-900">
                <button className="flex m-auto">
                  <span className="pr-3">DATE & TIME</span>
                  <svg
                    width="8"
                    height="15"
                    viewBox="0 0 8 15"
                    fill="none"
                    className="self-center"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.98771 14.4999C3.72252 14.4999 3.4682 14.3945 3.28071 14.2069L0.280712 11.2069C0.0985537 11.0183 -0.00224062 10.7657 3.78026e-05 10.5035C0.00231622 10.2413 0.107485 9.9905 0.292893 9.80509C0.478301 9.61968 0.729114 9.51451 0.991311 9.51223C1.25351 9.50996 1.50611 9.61075 1.69471 9.79291L3.98771 12.0859L6.28071 9.79291C6.46931 9.61075 6.72192 9.50996 6.98411 9.51223C7.24631 9.51451 7.49712 9.61968 7.68253 9.80509C7.86794 9.9905 7.97311 10.2413 7.97539 10.5035C7.97766 10.7657 7.87687 11.0183 7.69471 11.2069L4.69471 14.2069C4.50722 14.3945 4.25291 14.4999 3.98771 14.4999ZM6.98771 5.49991C6.72252 5.49985 6.4682 5.39446 6.28071 5.20691L3.98771 2.91391L1.69471 5.20691C1.50611 5.38907 1.25351 5.48986 0.991311 5.48758C0.729114 5.4853 0.478301 5.38014 0.292893 5.19473C0.107485 5.00932 0.00231622 4.75851 3.78026e-05 4.49631C-0.00224062 4.23411 0.0985537 3.98151 0.280712 3.79291L3.28071 0.792909C3.46824 0.605438 3.72255 0.500122 3.98771 0.500122C4.25288 0.500122 4.50718 0.605438 4.69471 0.792909L7.69471 3.79291C7.83452 3.93276 7.92973 4.11092 7.96829 4.30488C8.00686 4.49883 7.98706 4.69986 7.91139 4.88256C7.83572 5.06526 7.70758 5.22143 7.54317 5.33131C7.37876 5.44119 7.18546 5.49987 6.98771 5.49991Z"
                      fill="#111928"
                    />
                  </svg>
                </button>
              </th>
              <th className="min-w-[250px] border-t-[1.5px] border-gray-900">
                <button className="flex m-auto">
                  <span className="pr-3">STATUS</span>
                  <svg
                    width="8"
                    height="15"
                    viewBox="0 0 8 15"
                    fill="none"
                    className="self-center"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.98771 14.4999C3.72252 14.4999 3.4682 14.3945 3.28071 14.2069L0.280712 11.2069C0.0985537 11.0183 -0.00224062 10.7657 3.78026e-05 10.5035C0.00231622 10.2413 0.107485 9.9905 0.292893 9.80509C0.478301 9.61968 0.729114 9.51451 0.991311 9.51223C1.25351 9.50996 1.50611 9.61075 1.69471 9.79291L3.98771 12.0859L6.28071 9.79291C6.46931 9.61075 6.72192 9.50996 6.98411 9.51223C7.24631 9.51451 7.49712 9.61968 7.68253 9.80509C7.86794 9.9905 7.97311 10.2413 7.97539 10.5035C7.97766 10.7657 7.87687 11.0183 7.69471 11.2069L4.69471 14.2069C4.50722 14.3945 4.25291 14.4999 3.98771 14.4999ZM6.98771 5.49991C6.72252 5.49985 6.4682 5.39446 6.28071 5.20691L3.98771 2.91391L1.69471 5.20691C1.50611 5.38907 1.25351 5.48986 0.991311 5.48758C0.729114 5.4853 0.478301 5.38014 0.292893 5.19473C0.107485 5.00932 0.00231622 4.75851 3.78026e-05 4.49631C-0.00224062 4.23411 0.0985537 3.98151 0.280712 3.79291L3.28071 0.792909C3.46824 0.605438 3.72255 0.500122 3.98771 0.500122C4.25288 0.500122 4.50718 0.605438 4.69471 0.792909L7.69471 3.79291C7.83452 3.93276 7.92973 4.11092 7.96829 4.30488C8.00686 4.49883 7.98706 4.69986 7.91139 4.88256C7.83572 5.06526 7.70758 5.22143 7.54317 5.33131C7.37876 5.44119 7.18546 5.49987 6.98771 5.49991Z"
                      fill="#111928"
                    />
                  </svg>
                </button>
              </th>
              <th className="min-w-20 w-20 border-t-[1.5px] border-r-[1.5px] border-gray-900 rounded-tr-xl"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center h-16 hover:bg-slate-100">
              <td className="pl-8 text-left border-l-[1.5px] border-gray-900">
                การตรวจเช็คระบบเครื่องยนต์ด้านหลัง
              </td>
              <td>กองบิน 1</td>
              <td>ณิชาภัทร ธิติธนากร</td>
              <td className="">June 06, 2024</td>
              <td className="">
                <span className="bg-[#FFEBEB] px-3 py-1 rounded-lg text-[#FF3939] font-bold">
                  Rejected
                </span>
              </td>
              <td className="border-r-[1.5px] border-gray-900">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="place-self-center"
                  >
                    <path
                      d="M7 20.9998C6.46957 20.9998 5.96086 20.789 5.58579 20.414C5.21071 20.0389 5 19.5302 5 18.9998V2.99976H14L19 7.99976V18.9998C19 19.5302 18.7893 20.0389 18.4142 20.414C18.0391 20.789 17.5304 20.9998 17 20.9998H7Z"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 2.99976V8.99976H19"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center h-16 hover:bg-slate-100">
              <td className="pl-8 text-left border-l-[1.5px] border-gray-900">
                การตรวจเช็คระบบเครื่องยนต์ด้านหลัง
              </td>
              <td>กองบิน 1</td>
              <td>ณิชาภัทร ธิติธนากร</td>
              <td className="">June 06, 2024</td>
              <td className="">
                <span className="bg-[#FAE3FF] px-3 py-1 rounded-lg text-[#FF43F2] font-bold">
                  Pending Approve Task
                </span>
              </td>
              <td className="border-r-[1.5px] border-gray-900">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="place-self-center"
                  >
                    <path
                      d="M7 20.9998C6.46957 20.9998 5.96086 20.789 5.58579 20.414C5.21071 20.0389 5 19.5302 5 18.9998V2.99976H14L19 7.99976V18.9998C19 19.5302 18.7893 20.0389 18.4142 20.414C18.0391 20.789 17.5304 20.9998 17 20.9998H7Z"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 2.99976V8.99976H19"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center h-16 hover:bg-slate-100">
              <td className="pl-8 text-left border-l-[1.5px] border-gray-900">
                การตรวจเช็คระบบเครื่องยนต์ด้านหลัง
              </td>
              <td>กองบิน 1</td>
              <td>ณิชาภัทร ธิติธนากร</td>
              <td className="">June 06, 2024</td>
              <td className="">
                <span className="bg-red-100 px-3 py-1 rounded-lg text-red-800 font-bold">
                  Approved Task
                </span>
              </td>
              <td className="border-r-[1.5px] border-gray-900">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="place-self-center"
                  >
                    <path
                      d="M7 20.9998C6.46957 20.9998 5.96086 20.789 5.58579 20.414C5.21071 20.0389 5 19.5302 5 18.9998V2.99976H14L19 7.99976V18.9998C19 19.5302 18.7893 20.0389 18.4142 20.414C18.0391 20.789 17.5304 20.9998 17 20.9998H7Z"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 2.99976V8.99976H19"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center h-16 hover:bg-slate-100">
              <td className="pl-8 text-left border-l-[1.5px] border-gray-900">
                การตรวจเช็คระบบเครื่องยนต์ด้านหลัง
              </td>
              <td>กองบิน 1</td>
              <td>ณิชาภัทร ธิติธนากร</td>
              <td className="">June 06, 2024</td>
              <td className="">
                <span className="bg-purple-100 px-3 py-1 rounded-lg text-purple-800 font-bold">
                  Pending Approve Repair
                </span>
              </td>
              <td className="border-r-[1.5px] border-gray-900">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="place-self-center"
                  >
                    <path
                      d="M7 20.9998C6.46957 20.9998 5.96086 20.789 5.58579 20.414C5.21071 20.0389 5 19.5302 5 18.9998V2.99976H14L19 7.99976V18.9998C19 19.5302 18.7893 20.0389 18.4142 20.414C18.0391 20.789 17.5304 20.9998 17 20.9998H7Z"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 2.99976V8.99976H19"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center h-16 hover:bg-slate-100">
              <td className="pl-8 text-left border-l-[1.5px] border-gray-900">
                การตรวจเช็คระบบเครื่องยนต์ด้านหลัง
              </td>
              <td>กองบิน 1</td>
              <td>ณิชาภัทร ธิติธนากร</td>
              <td className="">June 06, 2024</td>
              <td className="">
                <span className="bg-green-100 px-3 py-1 rounded-lg text-green-800 font-bold">
                  Approved Repair
                </span>
              </td>
              <td className="border-r-[1.5px] border-gray-900">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="place-self-center"
                  >
                    <path
                      d="M7 20.9998C6.46957 20.9998 5.96086 20.789 5.58579 20.414C5.21071 20.0389 5 19.5302 5 18.9998V2.99976H14L19 7.99976V18.9998C19 19.5302 18.7893 20.0389 18.4142 20.414C18.0391 20.789 17.5304 20.9998 17 20.9998H7Z"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 2.99976V8.99976H19"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center h-16 hover:bg-slate-100">
              <td className="pl-8 text-left border-l-[1.5px] border-gray-900">
                การตรวจเช็คระบบเครื่องยนต์ด้านหลัง
              </td>
              <td>กองบิน 1</td>
              <td>ณิชาภัทร ธิติธนากร</td>
              <td className="">June 06, 2024</td>
              <td className="">
                <span className="bg-purple-100 px-3 py-1 rounded-lg text-purple-800 font-bold">
                  Pending Approve Repair
                </span>
              </td>
              <td className="border-r-[1.5px] border-gray-900">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="place-self-center"
                  >
                    <path
                      d="M7 20.9998C6.46957 20.9998 5.96086 20.789 5.58579 20.414C5.21071 20.0389 5 19.5302 5 18.9998V2.99976H14L19 7.99976V18.9998C19 19.5302 18.7893 20.0389 18.4142 20.414C18.0391 20.789 17.5304 20.9998 17 20.9998H7Z"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 2.99976V8.99976H19"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center h-16 hover:bg-slate-100">
              <td className="pl-8 text-left border-b-[1.5px] border-l-[1.5px] border-gray-900 rounded-bl-xl">
                การตรวจเช็คระบบเครื่องยนต์ด้านหลัง
              </td>
              <td className="border-b-[1.5px] border-gray-900">กองบิน 1</td>
              <td className="border-b-[1.5px] border-gray-900">
                ณิชาภัทร ธิติธนากร
              </td>
              <td className="border-b-[1.5px] border-gray-900">
                June 06, 2024
              </td>
              <td className="border-b-[1.5px] border-gray-900">
                <span className="bg-purple-100 px-3 py-1 rounded-lg text-purple-800 font-bold">
                  Pending Approve Repair
                </span>
              </td>
              <td className="border-b-[1.5px] border-r-[1.5px] border-gray-900 rounded-br-xl">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="place-self-center"
                  >
                    <path
                      d="M7 20.9998C6.46957 20.9998 5.96086 20.789 5.58579 20.414C5.21071 20.0389 5 19.5302 5 18.9998V2.99976H14L19 7.99976V18.9998C19 19.5302 18.7893 20.0389 18.4142 20.414C18.0391 20.789 17.5304 20.9998 17 20.9998H7Z"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 2.99976V8.99976H19"
                      stroke="#111928"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/*Pagination*/}
        <div className="mt-10 flex justify-end items-center list-none h-10 text-lg min-w-[1500px]">
          <li>
            <a className="flex items-center mr-2 px-2 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2109 16.3333C11.9168 16.3333 11.6348 16.2105 11.4269 15.9919L6.99141 11.331C6.78353 11.1125 6.66675 10.8161 6.66675 10.5072C6.66675 10.1982 6.78353 9.90186 6.99141 9.68334L11.4269 5.0224C11.5292 4.91111 11.6516 4.82234 11.7869 4.76127C11.9222 4.7002 12.0677 4.66806 12.2149 4.66672C12.3621 4.66537 12.5082 4.69485 12.6444 4.75344C12.7807 4.81203 12.9045 4.89855 13.0086 5.00796C13.1127 5.11737 13.1951 5.24747 13.2508 5.39067C13.3066 5.53387 13.3347 5.68731 13.3334 5.84203C13.3321 5.99675 13.3015 6.14965 13.2434 6.29182C13.1853 6.43398 13.1008 6.56256 12.9949 6.67005L9.34335 10.5072L12.9949 14.3443C13.1499 14.5072 13.2555 14.7148 13.2983 14.9408C13.341 15.1668 13.3191 15.4011 13.2352 15.614C13.1512 15.8269 13.0092 16.0088 12.8268 16.1369C12.6445 16.2649 12.4302 16.3333 12.2109 16.3333Z"
                  fill="#212529"
                />
              </svg>
            </a>
          </li>
          <li>
            <a className="mr-2 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
              1
            </a>
          </li>
          <li>
            <a className="mr-2 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
              2
            </a>
          </li>
          <li>
            <a className="mr-2 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
              3
            </a>
          </li>
          <li>
            <a className="mr-2 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
              4
            </a>
          </li>
          <li>
            <a className="mr-2 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
              5
            </a>
          </li>
          <li>
            <a className="flex items-center mr-2 px-2 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.78925 16.3333C7.56997 16.3333 7.35563 16.2649 7.17332 16.1369C6.99101 16.0088 6.84892 15.8269 6.76501 15.614C6.6811 15.4011 6.65914 15.1668 6.70191 14.9408C6.74467 14.7148 6.85024 14.5072 7.00528 14.3443L10.6568 10.5072L7.00528 6.67005C6.89937 6.56256 6.81489 6.43398 6.75677 6.29182C6.69866 6.14965 6.66807 5.99675 6.66679 5.84203C6.66551 5.68731 6.69357 5.53387 6.74932 5.39067C6.80508 5.24747 6.88742 5.11737 6.99153 5.00796C7.09565 4.89855 7.21946 4.81203 7.35573 4.75344C7.49201 4.69485 7.63803 4.66537 7.78526 4.66672C7.9325 4.66806 8.07801 4.7002 8.21329 4.76127C8.34858 4.82234 8.47094 4.91111 8.57323 5.0224L13.0087 9.68334C13.2166 9.90186 13.3334 10.1982 13.3334 10.5072C13.3334 10.8161 13.2166 11.1125 13.0087 11.331L8.57323 15.9919C8.36532 16.2105 8.08332 16.3333 7.78925 16.3333Z"
                  fill="#212529"
                />
              </svg>
            </a>
          </li>
        </div>
      </div>
    </div>
  );
}
