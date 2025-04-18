import React from "react";

type TableErrorShowProps = {
  label: string;
};

function TableErrorShow({ label }: TableErrorShowProps) {
  return (
    <tr className="flex text-center h-16 hover:bg-slate-100 text-base">
      <td className="flex justify-center items-center pl-8 min-w-96 text-left">
        {label}
      </td>
      <td className="flex-1 flex justify-center items-center min-w-64">
        {label}
      </td>
      <td className="flex-1 flex justify-center items-center min-w-64">
        {label}
      </td>
      <td className="flex-1 flex justify-center items-center min-w-64">
        {label}
      </td>
      <td className="flex-1 flex justify-center items-center min-w-64">
        {label}
      </td>
      <td className="h-16 cursor-pointer min-w-20"></td>
    </tr>
  );
}

export default TableErrorShow;
