"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

type MenuItemKey = "menu1" | "menu2" | "menu3";

const MENU_ITEMS: Record<MenuItemKey, {
  label: string;
  icon: string;
  path?: string;
  external?: boolean;
}> = {
  menu1: {
    label: "จัดการเมนูอาหาร",
    icon: "material-symbols:food-bank",
    path: "/Menu",
  },
  menu2: {
    label: "จัดการวัตถุดิบ",
    icon: "mdi:fish-food",
    path: "/Ingredients",
  },
  menu3: {
    label: "จัดการข้อความ",
    icon: "material-symbols:chat-outline",
    path: "https://chat.line.biz/Ub4b7e0554e30f34b42401f875fdc8414",
    external: true,
  },
};

export default function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState<MenuItemKey>("menu1");
  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    router.push("/Login");
  }, [router]);

  useEffect(() => {
    console.log("Selected menu changed:", selectedMenu);
  }, [selectedMenu]);

  return (
    <div className="flex flex-col bg-white w-60 min-h-screen drop-shadow-lg pb-6">
      <div className="flex flex-row items-center gap-2 p-2 mb-4 text-black text-body3">
        <Icon icon="mdi:account-circle" height="24" className="text-black" />
        <span className="font-semibold">Admin01</span>
      </div>

      <div className="flex flex-col gap-2">
        {Object.entries(MENU_ITEMS).map(([key, item]) => {
          const isActive = selectedMenu === key;
          const baseClass = isActive
            ? "bg-orange-100 text-orange-500 font-semibold border-l-4 border-orange-500"
            : "text-gray-400 font-normal";

          if (item.external) {
            return (
              <a
                key={key}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-row items-center gap-2 p-2 cursor-pointer ${baseClass}`}
                onClick={() => setSelectedMenu(key as MenuItemKey)}
              >
                <Icon icon={item.icon} height="20" />
                <span>{item.label}</span>
              </a>
            );
          }

          return (
            <div
              key={key}
              className={`flex flex-row items-center gap-2 p-2 cursor-pointer ${baseClass}`}
              onClick={(e) => {
                e.preventDefault();
                if (selectedMenu !== key) {
                  setSelectedMenu(key as MenuItemKey);
                  router.push(item.path!);
                }
              }}
            >
              <Icon icon={item.icon} height="20" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div
        className="mt-auto flex flex-row items-center gap-2 p-2 text-gray-400 cursor-pointer hover:text-orange-500"
        onClick={handleLogout}
      >
        <Icon icon="material-symbols:logout" height="20" />
        <span>ออกจากระบบ</span>
      </div>
    </div>
  );
}