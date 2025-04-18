import React from "react";

type RegisterErrorProps = {
  label: string;
};

function RegisterError({ label }: RegisterErrorProps) {
  return <span className="mt-6 font-semibold text-red-500">{label}</span>;
}

export default RegisterError;
