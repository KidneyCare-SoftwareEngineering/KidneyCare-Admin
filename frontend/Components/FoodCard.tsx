"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface FoodCardProps {
  item: {
    id: number;
    name: string;
    image: string;
  };
  onDelete: (id: number) => void;
  onUpdate: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onDelete, onUpdate }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(item.id);
    setShowConfirm(false);

  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleUpdate = () => {
    router.push(`/Menu/EditMenu/${item.id}`);
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden p-3 hover:shadow-lg transition">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="p-3 text-center">
        <h3 className="text-lg font-semibold truncate">{item.name}</h3>
        <div className="flex justify-between gap-x-5 mt-3 px-3">
          <button
            onClick={handleUpdate}
            className="flex items-center justify-center gap-1 px-4 py-2 border border-orange-500 text-orange-500 rounded-md shadow-sm hover:bg-orange-500 hover:text-white transition w-full max-w-[calc(50%-10px)]"
          >
            แก้ไข
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-500 text-gray-500 rounded-md shadow-sm hover:bg-gray-500 hover:text-white transition w-full max-w-[calc(50%-10px)]"
          >
            <Icon icon="tabler:trash" width="16" /> ลบ
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-128 h-86 flex flex-col items-center justify-center">
            <div className="flex justify-center mb-4">
              <Icon icon="tabler:trash" width="128" className="text-orange-500" />
            </div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
              ต้องการลบ “{item.name}” ใช่หรือไม่?
            </h4>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-6 py-2 border h-14 w-48 border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 border border-orange-500 h-14 w-48 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                ใช่
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCard;