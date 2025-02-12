import AddCreateIcon from "@/assets/icons/AddCreateIcon";
import ActionButton from "@/components/button/ActionButton";
import AppDetailInput from "@/components/InputArea/AppDetailInput";
import AppFormPanel from "@/components/InputArea/AppFormPanel";
import AppTetxtInput from "@/components/InputArea/AppTetxtInput";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-[54.5rem]">
        {/* Title page */}
        <div className="items-center pb-14">
          <span className="text-5xl font-semibold mr-4">CREATE NEW TASK</span>
        </div>

        <div className="overflow-auto">
          <div className="w-full">
            <span className="text-2xl">DETAIL</span>
            <AppFormPanel>
              <AppTetxtInput label="ORIGIANL AFFILIATION" />
              <AppTetxtInput label="DESIGN SPECIFICATION" />
              <AppTetxtInput label="JCH" />
              <AppDetailInput label="WORKER" />
              <AppTetxtInput label="INSPECTOR" />
            </AppFormPanel>
          </div>

          <div className="w-full mt-14">
            <span className="text-2xl">ADDITIONAL</span>
            <AppFormPanel>
              <AppDetailInput label="SYSTEM" />
              <AppDetailInput label="WORKER" />
              <AppTetxtInput label="DATE" />
              <AppTetxtInput label="CODE" />
            </AppFormPanel>
          </div>

          {/*button*/}
          <div className="mt-16 flex justify-end">
            <ActionButton label="Cancel" />
            <ActionButton label="Create" iconRight={<AddCreateIcon />} />
          </div>
        </div>
      </div>
    </>
  );
}
