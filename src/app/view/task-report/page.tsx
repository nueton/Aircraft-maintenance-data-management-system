import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/RemindTags";
import ShowDetailInput from "@/components/ShowArea/ShowDetailInput";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";

export default function Home() {
  return (
    <div className="flex flex-col h-[85vh]">
      <HeaderDisplay label="VIEW TASK REPORT">
        <RemindTags status={2} />
      </HeaderDisplay>
      <div className="overflow-auto">
        <div className="w-full">
          <AppFormPanel label="DETAIL">
            <ShowTextInput
              label="ORIGIANL AFFILIATION"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowTextInput
              label="DESIGN SPECIFICATION"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowTextInput
              label="JCH"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowDetailInput
              label="WORKER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowTextInput
              label="INSPECTOR"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
          </AppFormPanel>
        </div>

        <div className="w-full mt-14">
          <AppFormPanel label="ADDITIONAL">
            <ShowDetailInput
              label="SYSTEM"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowDetailInput
              label="PROBLEM"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowTextInput label="DATE" content={"xx/xx/xxxx"} />
            <ShowTextInput
              label="CODE"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
          </AppFormPanel>
        </div>
      </div>
      {/*button*/}
      <div className="mt-16 flex justify-end">
        <ActionButton label="Return" iconLeft={<LeftIcon />} />
        <ActionButton label="Repair Report" iconRight={<RightIcon />} />
      </div>
    </div>
  );
}
