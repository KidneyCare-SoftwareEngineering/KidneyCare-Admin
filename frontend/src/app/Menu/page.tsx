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
      "https://s359.kapook.com/pagebuilder/3e1a9460-ddf0-47de-9c99-f2136aacd828.jpg",
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
      "https://s359.kapook.com/pagebuilder/3e1a9460-ddf0-47de-9c99-f2136aacd828.jpg",
  },
  {
    id: 4,
    name: "ปูผัดผงกะหรี่",
    image:
      "https://s359.kapook.com/pagebuilder/3e1a9460-ddf0-47de-9c99-f2136aacd828.jpg",
  },
  {
    id: 5,
    name: "สลัดผักไข่",
    image:
      "https://s359.kapook.com/pagebuilder/3e1a9460-ddf0-47de-9c99-f2136aacd828.jpg",
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
