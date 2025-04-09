"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

interface HeaderProps {
  title: string;
  sortOptions: string[];
  onSortChange: (option: string) => void;
  addPath: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  sortOptions,
  onSortChange,
  addPath,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex gap-2">
        {/* ค้นหา */}
        <div className="relative">
          <input
            type="text"
            className="border rounded p-2 pl-8 w-48"
            placeholder={title === "Menu" ? "ค้นหาเมนู" : `ค้นหาเมนู${title.replace("จัดการ", "").trim()}...`}
          />
          <Icon
            icon="tabler:search"
            className="absolute left-2 top-2.5 text-gray-400"
            width="16"
          />
        </div>

        {/* ตัวกรอง */}
        <div className="relative">
          <button
            className="flex items-center gap-1 border rounded px-4 py-2"
            onClick={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          >
            <Icon icon="tabler:filter" width="16" /> จัดเรียงตาม
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    onSortChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ปุ่มเพิ่มข้อมูล */}
        <button
          onClick={() => router.push(addPath)}
          className="flex items-center gap-1 bg-orange-500 text-white rounded px-4 py-2 shadow hover:bg-orange-600 active:bg-orange-700 transition"
        >
          <Icon icon="tabler:plus" width="16" />
          เพิ่มข้อมูล{title.replace("จัดการ", "").trim()}
        </button>
      </div>
    </div>
  );
};

export default Header;
