"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface FoodCardProps {
  item: {
    id: number;
    name: string;
    image: string;
  };
  onDelete: () => void;
  onUpdate: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onDelete, onUpdate }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden p-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <div className="flex justify-between gap-x-5 mt-2 px-3">
          <button
            onClick={onUpdate}
            className="flex items-center justify-center gap-1 px-4 py-2 border border-orange-500 text-orange-500 rounded-md shadow-sm hover:bg-orange-500 hover:text-white active:bg-orange-600 transition w-full max-w-[calc(50%-10px)]"
          >
            <Icon icon="tabler:pencil" width="16" /> แก้ไข
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-500 text-gray-500 rounded-md shadow-sm hover:bg-gray-500 hover:text-white active:bg-gray-600 transition w-full max-w-[calc(50%-10px)]"
          >
            <Icon icon="tabler:trash" width="16" /> ลบ
          </button>
        </div>
      </div>

      {/* Pop-up confirm */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold mb-4">
              คุณแน่ใจหรือไม่ที่จะลบเมนูนี้?
            </h4>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                ยืนยัน
              </button>
              <button
                onClick={cancelDelete}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCard;
