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
        <div className="flex flex-row relative w-full min-w-[700px]">
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
        <table className="mt-10 w-full border-[1.5px] border-gray-900 rounded">
          <thead className="">
            <tr className="h-14">
              <th className="w-[400px]">JCH</th>
              <th>ORIGINAL AFFILIATION</th>
              <th>INSPECTOR</th>
              <th>DATE & TIME</th>
              <th>STATUS</th>
              <th className="w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center h-14">
              <td className="pl-4 text-left">
                การตรวจเช็คระบบเครื่องยนต์ด้านหลัง
              </td>
              <td>กองบิน 1</td>
              <td>ณิชาภัทร ธิติธนากร</td>
              <td className="">June 06, 2024</td>
              <td className="">Rejected</td>
              <td className="">
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
