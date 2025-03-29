"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/Sidebar";
import Header from "../../../Components/Header";
import FoodCard from "../../../Components/FoodCard";

interface MenuItem {
  id: number;
  name: string;
  image: string;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:7878/ingredients")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenuItems(data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

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
