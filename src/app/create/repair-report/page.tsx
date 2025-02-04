import HomeIcon from "@/assets/icons/HomeIcon";
import AppButton from "@/components/AppButton";
import AppFormPanel from "@/components/AppFormPanel";
import AppTetxtInput from "@/components/AppTetxtInput";

export default function Home() {
  return (
    <>
      {/* Title page */}
      <div className="flex flex-row items-center pb-14">
        <div className="text-5xl font-semibold mr-4">CREATE REPAIR REPORT</div>
        <span className="bg-qq-primary px-3 py-1 rounded-lg h-fit text-white font-bold">
          Waited for summit Repair
        </span>
      </div>

      {/*Detail*/}
      <div className="w-full">
        <span className="text-2xl">DECOMMISSIONED EQUIPMENT</span>
        <AppFormPanel>
          <AppTetxtInput label="SERIAL NUMBER" />
          <AppTetxtInput label="PARCEL NUMBER" />
        </AppFormPanel>
      </div>

      {/*Additional*/}
      <div className="w-full mt-14">
        <span className="text-2xl">COMMISSIONED EQUIPMENT</span>
        <AppFormPanel>
          <AppTetxtInput label="SERIAL NUMBER" />
          <AppTetxtInput label="PARCEL NUMBER" />
        </AppFormPanel>
      </div>

      {/*button*/}
      <div className="mt-16 flex justify-end gap-5">
        <AppButton title="cancel" />
        <AppButton title="create" rightIcon={<HomeIcon />} />
      </div>
    </>
  );
}
