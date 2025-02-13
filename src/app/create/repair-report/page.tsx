import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import AppFormPanel from "@/components/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTetxtInput";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/RemindTags";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";

export default function Home() {
  return (
    <>
      {/* Title page */}
      <HeaderDisplay label="CREATE REPAIR REPORT">
        <RemindTags status={3} />
      </HeaderDisplay>

      <div className="w-full">
        <AppFormPanel label="DECOMMISSIONED EQUIPMENT">
          <AppTetxtInput label="SERIAL NUMBER" />
          <AppTetxtInput label="PARCEL NUMBER" />
        </AppFormPanel>
      </div>

      <div className="w-full mt-14">
        <AppFormPanel label="COMMISSIONED EQUIPMENT">
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
