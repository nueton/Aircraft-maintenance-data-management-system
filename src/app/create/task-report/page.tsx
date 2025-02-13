import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppDetailInput from "@/components/InputArea/AppDetailInput";
import AppFormPanel from "@/components/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";

export default function Home() {
  return (
    <div className="flex flex-col h-[85vh]">
      {/* Title page */}
      <HeaderDisplay label="CREATE NEW TASK" />

      <div className="overflow-auto">
        <div className="w-full">
          <AppFormPanel label="DETAIL">
            <AppTetxtInput label="ORIGIANL AFFILIATION" />
            <AppTetxtInput label="DESIGN SPECIFICATION" />
            <AppTetxtInput label="JCH" />
            <AppDetailInput label="WORKER" />
            <AppTetxtInput label="INSPECTOR" />
          </AppFormPanel>
        </div>

        <div className="w-full mt-14">
          <AppFormPanel label="ADDITIONAL">
            <AppDetailInput label="SYSTEM" />
            <AppDetailInput label="WORKER" />
            <AppTetxtInput label="DATE" />
            <AppTetxtInput label="CODE" />
          </AppFormPanel>
        </div>
      </div>
      {/*button*/}
      <div className="mt-16 flex justify-end">
        <ActionButton label="Cancel" />
        <ActionButton label="Create" iconRight={<AddCreateIcon />} />
      </div>
    </div>
  );
}
