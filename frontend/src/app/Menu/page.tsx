"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/Sidebar";
import Header from "../../../Components/Header";
import FoodCard from "../../../Components/FoodCard";

interface MenuItem {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    fetch("http://127.0.0.1:7878/get_recipes")
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

  const handleSortChange = (option: string) => {
    setSortBy(option);
  };

  const sortedMenuItems = () => {
    if (sortBy === "ผัด") {
      return menuItems.filter((item) => item.ingredients.includes("ผัด"));
    } else if (sortBy === "ทอด") {
      return menuItems.filter((item) => item.ingredients.includes("ทอด"));
    }
    return menuItems;
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full flex-1">
        <Header
          title="จัดการเมนูอาหาร"
          sortOptions={["ผัก", "เนื้อสัตว์"]}
          onSortChange={handleSortChange}
        />
        <div className="grid grid-cols-4 gap-4">
          {sortedMenuItems().map((item) => (
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
