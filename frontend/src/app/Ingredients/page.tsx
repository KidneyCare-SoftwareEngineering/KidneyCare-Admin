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

const Ingredients: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

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

  const sortMenuItems = (items: MenuItem[]) => {
    if (sortBy === "ผัก") {
      return items.filter((item) => item.name.includes("ผัก"));
    } else if (sortBy === "เนื้อสัตว์") {
      return items.filter((item) => item.name.includes("เนื้อสัตว์"));
    }
    return items;
  };

  const sortedMenuItems = sortMenuItems(menuItems);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <Header
          title="จัดการวัตถุดิบ"
          sortOptions={["ผัก", "เนื้อสัตว์"]}
          onSortChange={(option: string) => setSortBy(option)}
        />
        <div className="grid grid-cols-4 gap-4">
          {sortedMenuItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onDelete={() =>
                setMenuItems(menuItems.filter((i) => i.id !== item.id))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
