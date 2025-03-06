"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

type MenuItem = "menu1" | "menu2" | "menu3";

export default function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>("menu1");

  return (
    <div className="flex flex-col bg-white w-60 h-screen drop-shadow-lg p-4">
      <div className="flex flex-row items-center gap-2 p-2 mb-4 text-black text-body3">
        <Icon icon="mdi:account-circle" height="24" className="text-black" />
        <span className="font-semibold">Admin01</span>
      </div>

      <div className="flex flex-col gap-2">
        <div
          className={`flex flex-row items-center gap-2 p-2  ${
            selectedMenu === "menu1"
              ? "bg-orange-100 text-orange-500 font-semibold border-l-4 border-orange-500"
              : "text-gray-400 font-normal"
          }`}
          onClick={() => setSelectedMenu("menu1")}
        >
          <Icon icon="material-symbols:food-bank" height="20" />
          <span>จัดการเมนูอาหาร</span>
        </div>

        <div
          className={`flex flex-row items-center gap-2 p-2 ${
            selectedMenu === "menu2"
              ? "bg-orange-100 text-orange-500 font-semibold border-l-4 border-orange-500"
              : "text-gray-400 font-normal"
          }`}
          onClick={() => setSelectedMenu("menu2")}
        >
          <Icon icon="mdi:fish-food" height="20" />
          <span>จัดการวัตถุดิบ</span>
        </div>

        <div
          className={`flex flex-row items-center gap-2 p-2  ${
            selectedMenu === "menu3"
              ? "bg-orange-100 text-orange-500 font-semibold border-l-4 border-orange-500"
              : "text-gray-400 font-normal"
          }`}
          onClick={() => setSelectedMenu("menu3")}
        >
          <Icon icon="material-symbols:chat-outline" height="20" />
          <span>จัดการข้อความ</span>
        </div>
      </div>

      <div className="mt-auto flex flex-row items-center gap-2 p-2 text-gray-400 cursor-pointer">
        <Icon icon="material-symbols:logout" height="20" />
        <span>ออกจากระบบ</span>
      </div>
    </div>
  );
}
