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
  const [sortBy, setSortBy] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("https://backend-billowing-waterfall-4640.fly.dev/get_recipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.recipes.map(
          (recipe: any, index: number) => ({
            id: index + 1,
            name: recipe.recipe_name,
            image: recipe.recipe_img_link[0],
          })
        );
        setMenuItems(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleDelete = (id: number) => {
    fetch(
      `https://backend-billowing-waterfall-4640.fly.dev/delete_recipe/${id}`,
      { method: "DELETE" }
    )
      .then(() => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting menu item:", error);
      });
  };

  const handleUpdate = (id: number, updatedData: Partial<MenuItem>) => {
    fetch(
      `https://backend-billowing-waterfall-4640.fly.dev/update_recipe/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
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

  const handleSort = (sortOption: string) => {
    const sortedItems = [...menuItems].sort((a, b) => {
      if (sortOption === "ก-ฮ") {
        return a.name.localeCompare(b.name, "th");
      } else if (sortOption === "ฮ-ก") {
        return b.name.localeCompare(a.name, "th");
      }
      return 0;
    });
    setMenuItems(sortedItems);
    setCurrentPage(1); // reset ไปหน้าแรกเมื่อ sort
  };

  // Pagination logic
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const paginatedItems = menuItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full flex-1">
        <Header
          title="จัดการเมนูอาหาร"
          sortOptions={["ก-ฮ", "ฮ-ก"]}
          onSortChange={(selectedOption) => {
            setSortBy(selectedOption);
            handleSort(selectedOption);
          }}
          addPath="/Menu/AddMenu"
        />

        <div className="grid grid-cols-4 gap-4">
          {paginatedItems.map((item) => (
            <FoodCard
              key={item.id}
              item={{
                id: item.id,
                name: item.name,
                image: item.image,
              }}
              onDelete={() => handleDelete(item.id)}
              onUpdate={() => handleUpdate(item.id, { name: "Updated Name" })}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ย้อนกลับ
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
