"use client";

import React from "react";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  type,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
