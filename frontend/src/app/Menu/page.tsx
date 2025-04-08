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
    fetch("https://backend-billowing-waterfall-4640.fly.dev/get_recipes")
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
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSortChange = (option: string) => {
    setSortBy(option);
  };

  const sortedMenuItems = (): MenuItem[] => {
    if (!Array.isArray(menuItems)) return [];

    if (sortBy) {
      return menuItems.filter((item) => item.ingredients.includes(sortBy));
    }

    return menuItems;
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full flex-1">
        <Header
          title="จัดการเมนูอาหาร"
          sortOptions={["ผัด", "ทอด"]}
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
