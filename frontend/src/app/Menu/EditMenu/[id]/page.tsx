"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import TextField from "../../../../../Components/Textfield";
import Sidebar from "../../../../../Components/Sidebar";

// Define the Ingredient type
type Ingredient = {
  name: string;
  amount: string;
  unit: string;
};

// Mock data
const mockData = {
  recipe_id: 128,
  recipe_name: "แพนเค้กกล้วยหอมไร้แป้ง",
  recipe_image: "https://www.healthyfood.com/media/1647/banana-pancakes.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132197761270000000",
  recipe_method: [
    "STEP1 :บดกล้วยหอมให้เนียนด้วยส้อม หรือปั่นให้เนียน",
    "STEP2 :ตีไข่ไก่ให้เข้ากัน แล้วผสมกับกล้วยบด",
    "STEP3 :ใส่ผงฟูและกลิ่นวานิลลา คนให้เข้ากันดี",
    "STEP4 :ตั้งกระทะ ใช้ไฟอ่อน-ปานกลาง ทาน้ำมันบาง ๆ",
    "STEP5 :ตักแป้งแพนเค้กหยอดลงกระทะ ทอดประมาณ 1-2 นาทีจนมีฟองอากาศขึ้น",
    "STEP6 :กลับด้าน ทอดต่ออีก 1 นาทีจนสุก",
    "STEP7 :ตักขึ้นเสิร์ฟ กินเปล่า ๆ หรือเพิ่มผลไม้ตามชอบ! ",
  ],
  calories: 220.0,
  food_category: ["ทั่วไป"],
  dish_type: ["ของหวาน"],
  ingredients: [
    { ingredient_name: "กลิ่นวานิลลา", amount: "1", unit: "ช้อนชา" },
    { ingredient_name: "ไข่ไก่", amount: "2", unit: "ฟอง" },
    { ingredient_name: "น้ำมันมะพร้าว", amount: "1", unit: "ช้อนโต๊ะ" },
    { ingredient_name: "ผงฟู", amount: "1", unit: "ช้อนชา" },
    { ingredient_name: "กล้วยหอม", amount: "1", unit: "ผล" },
  ],
  nutrients: {
    protein: "10.5",
    carbs: "30.0",
    fat: "370.0",
    sodium: "3.2",
    potassium: "7.5",
    phosphorus: "150.0",
    vitamin: "0.1",
    water: "0.0",
  },
};

const EditMenuPage = () => {
  const router = useRouter();

  // State for managing data
  const [foodName, setFoodName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [nutrition, setNutrition] = useState({
    protein: "",
    carbs: "",
    fat: "",
    sodium: "",
    potassium: "",
    phosphorus: "",
    vitamin: "",
    water: "",
  });
  const categoryList = [
    "ทั่วไป",
    "ฮาลาล",
    "วีแกน",
    "มังสวิรัติ",
    "ผลไม้",
  ];
  const [foodType, setFoodType] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prefill data from mockData
  useEffect(() => {
    setFoodName(mockData.recipe_name);
    setCalories(mockData.calories.toString());
    setNutrition(mockData.nutrients);
    setFoodType(mockData.food_category);
    setIngredients(
      mockData.ingredients.map((ingredient) => ({
        name: ingredient.ingredient_name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      }))
    );
    setSteps(mockData.recipe_method.join("\n"));
  }, []);

  // ฟังก์ชันจัดการประเภทอาหาร
  const toggleFoodType = (type: string) => {
    setFoodType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // ฟังก์ชันจัดการวัตถุดิบ
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // ฟังก์ชันจัดการอัปโหลดรูปภาพ
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 3 - imageFiles.length);
      setImageFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = () => {
    const recipeData = {
      foodName,
      calories,
      nutrition,
      foodType,
      ingredients,
      steps,
      images: imageFiles,
    };
    console.log("บันทึกข้อมูล:", recipeData);
    router.push("/Menu");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 max-w-5xl mx-auto flex-1">
        <h2 className="text-2xl font-bold mb-4">แก้ไขเมนูอาหาร</h2>
        <div className="grid grid-cols-[1fr_3fr] gap-6 w-full">
          {/* ข้อมูลทั่วไป */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2">ข้อมูลทั่วไป</h3>
            <TextField
              label="ชื่อเมนูอาหาร"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              type="text"
            />
            <div className="mt-2">
              <TextField
                label="แคลอรี่ (kcal)"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                type="number"
              />
            </div>
            <div className="mt-4 flex gap-2">
              {imageFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden cursor-pointer"
                  onClick={() => removeImage(index)}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`อาหาร ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md">
                    <Icon icon="tabler:x" width={16} />
                  </div>
                </div>
              ))}
              {imageFiles.length < 3 && (
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
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2">ข้อมูลสารอาหาร</h3>
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(nutrition).map((key) => {
                const labels: { [key: string]: string } = {
                  protein: "โปรตีน (กรัม)",
                  vitamin: "วิตามิน (มิลลิกรัม)",
                  fat: "ไขมัน (กรัม)",
                  phosphorus: "ฟอสฟอรัส (มิลลิกรัม)",
                  carbs: "คาร์โบไฮเดรต (กรัม)",
                  sodium: "โซเดียม (มิลลลิกรัม)",
                  potassium: "โพแทสเซียม (มิลลิกรัม)",
                  water: "น้ำ (มิลลิลิตร)",
                };
                return (
                  <TextField
                    key={key}
                    label={labels[key] || key}
                    value={nutrition[key as keyof typeof nutrition]}
                    onChange={(e) =>
                      setNutrition({
                        ...nutrition,
                        [key]: e.target.value,
                      })
                    }
                    type="text"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ประเภทอาหาร */}
        <div className="mt-4">
          <label className="block font-semibold mb-2 text-gray-700">ประเภทอาหาร</label>
          <div className="flex flex-wrap gap-2">
            {categoryList.map((type) => (
              <label
                key={type}
                className="w-24 flex items-center space-x-2 p-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                  checked={foodType.includes(type)}
                  onChange={() => toggleFoodType(type)}
                />
                <span className="text-gray-800">{type}</span>
              </label>
            ))}
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
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <span className="text-gray-700 w-6">{index + 1}.</span>
              <TextField
                label="ชื่อวัตถุดิบ"
                value={ingredient.name}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = e.target.value;
                  setIngredients(newIngredients);
                }}
                type="text"
                className="flex-1 w-full"
              />
              <TextField
                label="จำนวน"
                value={ingredient.amount}
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
                value={ingredient.unit}
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
};

export default EditMenuPage;