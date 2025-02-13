import LeftIcon from "@/assets/icons/LeftIcon";
import RightIcon from "@/assets/icons/RightIcon";
import AppFormPanel from "@/components/AppFormPanel";
import ActionButton from "@/components/button/ActionButton";
import RemindTags from "@/components/RemindTags";
import ShowTextInput from "@/components/ShowArea/ShowTetxtInput";
import HeaderDisplay from "@/components/TextDisplay/HeaderDisplay";

export default function Home() {
  return (
    <>
      <HeaderDisplay label="VIEW REPAIR REPORT">
        <RemindTags status={5} />
      </HeaderDisplay>
      <div className="overflow-auto">
        <div className="w-full">
          <AppFormPanel label="DECOMMISSIONED EQUIPMENT">
            <ShowTextInput
              label="SERIAL NUMBER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowTextInput
              label="PARCEL NUMBER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
          </AppFormPanel>
        </div>
        <div className="w-full mt-14">
          <AppFormPanel label="COMMISSIONED EQUIPMENT">
            <ShowTextInput
              label="SERIAL NUMBER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
            <ShowTextInput
              label="PARCEL NUMBER"
              content={"xxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxx"}
            />
          </AppFormPanel>
        </div>
      </div>
      <div className="mt-16 flex justify-end">
        <ActionButton label="Return" iconLeft={<LeftIcon />} />
        <ActionButton label="Task" iconRight={<RightIcon />} />
      </div>
    </>
  );
}
