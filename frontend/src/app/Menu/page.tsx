"use client";

import React, { useState } from "react";
import Sidebar from "../../../Components/Sidebar";
import Header from "../../../Components/Header";
import FoodCard from "../../../Components/FoodCard";

interface MenuItem {
  id: number;
  name: string;
  image: string;
}

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "ไก่ทอด",
    image:
      "https://www.maggi.co.th/sites/default/files/styles/home_stage_1500_700/public/srh_recipes/22083cfb8eb29281fa1992e9aa589423.jpeg?h=b2589b4a&itok=Xz_r8U6a",
  },
  {
    id: 2,
    name: "แกงกะหรี่หมูทอด",
    image:
      "https://s359.kapook.com/pagebuilder/3e1a9460-ddf0-47de-9c99-f2136aacd828.jpg",
  },
  {
    id: 3,
    name: "ต้มยำ",
    image:
      "https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSGoljLW5KeafFttEBzPkbbl7GHOdf.jpg",
  },
  {
    id: 4,
    name: "ปูผัดผงกะหรี่",
    image: "https://food.mthai.com/app/uploads/2017/01/iStock-611778670.jpg",
  },
  {
    id: 5,
    name: "สลัดผักไข่",
    image: "https://howtocookhub.com/wp-content/uploads/2024/01/2-1.jpg",
  },
];

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <Header />
        <div className="grid grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
