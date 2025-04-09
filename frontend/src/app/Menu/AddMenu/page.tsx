"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import TextField from "../../../../Components/Textfield";
import Sidebar from "../../../../Components/Sidebar";
import { useRouter } from "next/navigation";

export default function AddFoodMenu() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);
  const [foodName, setFoodName] = useState("");
  const [nutrition, setNutrition] = useState({
    protein: "",
    vitamin: "",
    fat: "",
    fiber: "",
    carbs: "",
    sodium: "",
    potassium: "",
    water: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [steps, setSteps] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 3));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const data = {
      foodName,
      nutrition,
      ingredients,
      steps,
      images,
    };

    try {
      const response = await fetch(
        "https://backend-billowing-waterfall-4640.fly.dev/create_recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("บันทึกเมนูเรียบร้อยแล้ว!");
      router.push("/Menu");
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("ไม่สามารถบันทึกเมนูได้");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 max-w-5xl mx-auto flex-1">
        <h2 className="text-2xl font-bold mb-4">เพิ่มเมนูอาหาร</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* ข้อมูลทั่วไป */}
          <div>
            <h3 className="text-lg font-semibold">ข้อมูลทั่วไป</h3>
            <TextField
              label="ชื่อเมนูอาหาร"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              type="text"
            />
            <div className="mt-4 flex gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden cursor-pointer"
                  onClick={() => removeImage(index)}
                >
                  <img
                    src={image}
                    alt={`อาหาร ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md">
                    <Icon icon="tabler:x" width={16} />
                  </div>
                </div>
              ))}
              {images.length < 3 && (
                <div
                  className="w-32 h-32 flex items-center justify-center border-dashed border-2 border-gray-400 rounded-md cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon icon="tabler:plus" width={24} />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* ข้อมูลสารอาหาร */}
          <div>
            <h3 className="text-lg font-semibold mb-2">ข้อมูลสารอาหาร</h3>
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(nutrition).map((key) => (
                <TextField
                  key={key}
                  label={key}
                  value={nutrition[key as keyof typeof nutrition]}
                  onChange={(e) =>
                    setNutrition({ ...nutrition, [key]: e.target.value })
                  }
                  type="text"
                />
              ))}
            </div>
          </div>
        </div>

        {/* วัตถุดิบ */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">ข้อมูลวัตถุดิบ</h3>
            <button
              onClick={addIngredient}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              <Icon icon="tabler:plus" width={16} /> เพิ่มวัตถุดิบ
            </button>
          </div>
          {ingredients.map((_, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <span className="text-gray-700 w-6">{index + 1}.</span>
              <TextField
                label="ชื่อวัตถุดิบ"
                value={ingredients[index].name}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = e.target.value;
                  setIngredients(newIngredients);
                }}
                type="text"
                className="flex-1 w-full"
                style={{ width: "100%" }}
              />
              <TextField
                label="จำนวน"
                value={ingredients[index].amount}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].amount = e.target.value;
                  setIngredients(newIngredients);
                }}
                type="text"
                className="w-20"
              />
              <TextField
                label="หน่วย"
                value={ingredients[index].unit}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].unit = e.target.value;
                  setIngredients(newIngredients);
                }}
                type="text"
                className="w-20"
              />
              <button
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Icon icon="tabler:x" width={20} />
              </button>
            </div>
          ))}
        </div>

        {/* ขั้นตอนการทำ */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">ขั้นตอนการทำ</h3>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="ระบุขั้นตอนการทำอาหารที่นี่"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => router.push("/Menu")}
            className="px-6 py-2 border border-gray-400 text-gray-800 rounded-md hover:bg-gray-200"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
