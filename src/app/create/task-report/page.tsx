export default function Home() {
  return (
    <>
      {/*middle*/}
      <div className="text-5xl font-semibold pb-14">CREATE NEW TASK</div>
      <div></div>
      {/*Detail*/}
      <div className="flex flex-col relative w-full pt-3">
        <span className="text-2xl">DETAIL</span>
        <div className="flex flex-row relative w-full pt-10 text-xl">
          {/*First Row*/}
          <div className="w-1/2 mr-48">
            <div className="flex flex-col h-[80px]">
              ORIGIANL AFFILIATION
              <input className="border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2" />
            </div>
            <div className="flex flex-col h-[80px] mt-6">
              JCH
              <input className="border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2" />
            </div>
            <div className="flex flex-col h-[80px] mt-6">
              INSPECTOR
              <input className="border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2" />
            </div>
          </div>
          {/*Second Row*/}
          <div className="w-1/2">
            <div className="flex flex-col h-[80px]">
              DESIGN SPECIFICATION
              <input className="border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2" />
            </div>
            <div className="flex flex-col h-[184px] mt-6">
              WORKER
              <textarea className="border border-gray-900 pt-1 px-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2" />
            </div>
          </div>
        </div>
      </div>

      {/*Additional*/}
      <div className="flex flex-col relative w-full pt-3 mt-14">
        <span className="text-2xl">ADDITIONAL</span>
        <div className="flex flex-row relative w-full pt-10 text-xl">
          {/*First Row*/}
          <div className="w-1/2 mr-48">
            <div className="flex flex-col h-[184px]">
              SYSTEM
              <textarea className="border border-gray-900 pt-1 px-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2" />
            </div>
            <div className="flex flex-col h-[80px] mt-6">
              DATE
              <input className="border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2"></input>
            </div>
          </div>
          {/*Second Row*/}
          <div className="w-1/2">
            <div className="flex flex-col h-[184px]">
              PROBLEM
              <textarea className="border border-gray-900 pt-1 px-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2" />
            </div>
            <div className="flex flex-col h-[80px] mt-6">
              CODE
              <input className="border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2" />
            </div>
          </div>
        </div>
      </div>

      {/*button*/}
      <div className="flex mt-16 justify-end text-lg">
        <button className="flex flex-row justify-center w-36 py-2 pl-3 pr-1 border-[1.5px] rounded-xl border-gray-900 stroke-gray-900 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75">
          <div className="mr-1">Cancle</div>
        </button>
        <button className="flex flex-row justify-center w-40 py-2 pl-3 pr-1 border-[1.5px] rounded-xl border-gray-900 stroke-gray-900 ml-10 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75">
          <div className="mr-1">Create Task</div>
        </button>
      </div>
    </>
  );
}
