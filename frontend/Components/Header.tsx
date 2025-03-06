"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">จัดการเมนูอาหาร</h2>
      <div className="flex gap-2">
        <div className="relative">
          <input
            type="text"
            className="border rounded p-2 pl-8 w-48"
            placeholder="ค้นหาเมนู..."
          />
          <Icon
            icon="tabler:search"
            className="absolute left-2 top-2.5 text-gray-400"
            width="16"
          />
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-1 border rounded px-4 py-2"
            onClick={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          >
            <Icon icon="tabler:filter" width="16" /> จัดเรียงตาม
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                ผัด
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                ทอด
              </button>
            </div>
          )}
        </div>

        <button className="flex items-center gap-1 bg-orange-500 text-white rounded px-4 py-2 shadow hover:bg-orange-600 active:bg-orange-700 transition">
          <Icon icon="tabler:plus" width="16" /> เพิ่มข้อมูลเมนูอาหาร
        </button>
      </div>
    </div>
  );
};

export default Header;
