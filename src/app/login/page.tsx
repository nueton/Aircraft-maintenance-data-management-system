export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col border-[1.5px] items-center border-gray-900 w-[400px] h-[400px] rounded-2xl">
        <span className="text-3xl font-semibold text-center pt-16 pb-10">
          WELCOME
        </span>
        <input
          className="border-b-[1.5px] border-gray-900 w-4/5 focus:outline-none focus:border-b-2"
          placeholder="Email"
        />
        <input
          className="border-b-[1.5px] border-gray-900 w-4/5 focus:outline-none focus:border-b-2 mt-16"
          placeholder="Password"
        />
        <button className="w-4/5 border-[1.5px] border-gray-900 mt-14 py-2 rounded-full hover:border-2">
          Login
        </button>
      </div>
    </div>
  );
}
