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
    fetch("https://8bc0-125-24-15-48.ngrok-free.app/get_recipes")
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
    fetch(
      `https://backend-billowing-waterfall-4640.fly.dev/delete_recipe/${id}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting menu item:", error);
      });
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

  const handleUpdate = (id: number, updatedData: Partial<MenuItem>) => {
    fetch(
      `https://backend-billowing-waterfall-4640.fly.dev/update_recipe/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((updatedItem) => {
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating menu item:", error);
      });
  };

  const handleCreate = (newItem: MenuItem) => {
    fetch("https://backend-billowing-waterfall-4640.fly.dev/create_recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((createdItem) => {
        setMenuItems((prevItems) => [...prevItems, createdItem]);
      })
      .catch((error) => {
        console.error("Error creating menu item:", error);
      });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full flex-1">
        <Header
          title="จัดการเมนูอาหาร"
          sortOptions={["ทั่วไป", "ฮาลาล", "มังสวิรัติ", "วีแกน"]}
          onSortChange={handleSortChange}
          addPath="/Menu/AddMenu"
        />
        <div className="grid grid-cols-4 gap-4">
          {sortedMenuItems().map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
              onUpdate={() => handleUpdate(item.id, { name: "Updated Name" })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
