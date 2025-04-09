"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface IngreCardProps {
    item: {
        id: number;
        name: string;
        nameEng: string;
    };
    onDelete: () => void;
    onUpdate: () => void;
}

const IngreCardProps: React.FC<IngreCardProps> = ({ item, onDelete, onUpdate }) => {
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
        <div className="w-full border rounded-lg shadow-md p-4 hover:shadow-lg transition mb-4">
            {/* แถวหลัก: ฝั่งซ้าย (ชื่อ) + ฝั่งขวา (ปุ่ม) */}
            <div className="flex justify-between items-center">
                {/* ฝั่งซ้าย: ข้อความ */}
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{item.nameEng}</p>
                </div>

                {/* ฝั่งขวา: ปุ่ม */}
                <div className="flex gap-2">
                    <button
                        onClick={onUpdate}
                        className="flex items-center justify-center gap-1 px-4 py-2 border border-orange-500 text-orange-500 rounded-md shadow-sm hover:bg-orange-500 hover:text-white transition"
                    >
                        <Icon icon="tabler:pencil" width="16" /> แก้ไข
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-500 text-gray-500 rounded-md shadow-sm hover:bg-gray-500 hover:text-white transition"
                    >
                        <Icon icon="tabler:trash" width="16" /> ลบ
                    </button>
                </div>
            </div>

            {/* Confirm Modal */}
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

export default IngreCardProps;