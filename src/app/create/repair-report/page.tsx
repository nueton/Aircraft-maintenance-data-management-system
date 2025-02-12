import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import AppFormPanel from "@/components/InputArea/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTetxtInput";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/RemindTags";

export default function Home() {
  return (
    <>
      {/* Title page */}
      <div className="flex items-center pb-14">
        <span className="text-5xl font-semibold mr-4">
          CREATE REPAIR REPORT
        </span>
        <RemindTags status={3} />
      </div>

      <div className="w-full">
        <span className="text-2xl">DECOMMISSIONED EQUIPMENT</span>
        <AppFormPanel>
          <AppTetxtInput label="SERIAL NUMBER" />
          <AppTetxtInput label="PARCEL NUMBER" />
        </AppFormPanel>
      </div>

      <div className="w-full mt-14">
        <span className="text-2xl">COMMISSIONED EQUIPMENT</span>
        <AppFormPanel>
          <AppTetxtInput label="SERIAL NUMBER" />
          <AppTetxtInput label="PARCEL NUMBER" />
        </AppFormPanel>
      </div>

      {/*button*/}
      <div className="mt-16 flex justify-end">
        <ActionButton label="Cancel" />
        <ActionButton label="Create" iconRight={<AddCreateIcon />} />
      </div>
    </>
  );
}
