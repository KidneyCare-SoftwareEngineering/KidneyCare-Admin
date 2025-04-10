"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/Sidebar";
import Header from "../../../Components/Header";
import FoodCard from "../../../Components/FoodCard";
import Swal from "sweetalert2";

interface MenuItem {
  id: number;
  name: string;
  image: string;
}

interface Recipe {
  recipe_id: number;
  recipe_name: string;
  recipe_img_link: string[];
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Fetching the recipes from the API
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_recipes`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const formattedData = data.recipes.map((recipe: Recipe) => ({
          id: recipe.recipe_id,
          name: recipe.recipe_name,
          image: recipe.recipe_img_link[0],
        }));
        console.log("Formatted data:", formattedData);
        setMenuItems(formattedData);
        setFilteredItems(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = menuItems.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
    scrollToTop();
  };

  const handleDelete = (id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_DIESEL}/delete_recipe/${id}`, { method: "DELETE" })
      .then(() => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setFilteredItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          text: "เมนูอาหารถูกลบเรียบร้อยแล้ว!",
          confirmButtonText: "ตกลง",
        });
      })
      .catch((error) => {
        console.error("Error deleting menu item:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบเมนูอาหารได้ กรุณาลองใหม่อีกครั้ง!",
          confirmButtonText: "ตกลง",
        });
      });
  };

  const handleUpdate = (id: number, updatedData: Partial<MenuItem>) => {
    fetch(`${process.env.NEXT_PUBLIC_API_DIESEL}update_recipe/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
          )
        );
        setFilteredItems((prevItems) =>
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
        setFilteredItems((prevItems) => [...prevItems, createdItem]);
      })
      .catch((error) => {
        console.error("Error creating menu item:", error);
      });
  };

  const handleSort = (sortOption: string) => {
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortOption === "ก-ฮ") {
        return a.name.localeCompare(b.name, "th");
      } else if (sortOption === "ฮ-ก") {
        return b.name.localeCompare(a.name, "th");
      }
      return 0;
    });
    setFilteredItems(sortedItems);
    setCurrentPage(1);
    scrollToTop();
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPaginationButtons = () => {
    const buttons = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage > 2) buttons.push(1);
      if (currentPage > 3) buttons.push("...");
      for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        buttons.push(i);
      }
      if (currentPage < totalPages - 2) buttons.push("...");
      if (currentPage < totalPages - 1) buttons.push(totalPages);
    }
    return buttons;
  };

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
          onSearch={handleSearch}
        />

        <div className="grid grid-cols-4 gap-4">
          {paginatedItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
              onUpdate={() => handleUpdate(item.id, { name: item.name, image: item.image })}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              scrollToTop();
            }}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ย้อนกลับ
          </button>
          {getPaginationButtons().map((button, index) =>
            typeof button === "number" ? (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(button);
                  scrollToTop();
                }}
                className={`px-3 py-1 rounded ${currentPage === button
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {button}
              </button>
            ) : (
              <span key={index} className="px-3 py-1">
                ...
              </span>
            )
          )}
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              scrollToTop();
            }}
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