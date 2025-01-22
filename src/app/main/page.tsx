export default function Example() {
  return (
    <div className="relative w-[350px] border-r border-gray-900 text-xl h-screen min-h-[500px] font-mono font-semibold pt-60 pl-10">
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
  );
}
