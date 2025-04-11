"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import TextField from "../../../../../Components/Textfield";
import Sidebar from "../../../../../Components/Sidebar";

// Define the Ingredient type
type Ingredient = {
    name: string;
    amount: string;
    unit: string;
};

type ImageType = File | { preview: string };

const EditMenuPage = () => {
    const router = useRouter();
    const { id } = useParams();

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
    const categoryList = ["ทั่วไป", "ฮาลาล", "วีแกน", "มังสวิรัติ", "ผลไม้"];
    const [foodType, setFoodType] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<string>("");
    const [imageFiles, setImageFiles] = useState<ImageType[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/get_recipe_by_id/${id}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("First recipe:", data.recipes[0]);

                if (data.recipes && data.recipes.length > 0) {
                    const recipe = data.recipes[0];

                    const nutritionData = recipe.nutrients.reduce((acc: any, nutrient: any) => {
                        acc[nutrient.name] = nutrient.quantity.toString();
                        return acc;
                    }, {});

                    setFoodName(recipe.recipe_name || "");
                    setCalories(recipe.calories?.toString() || "0");
                    setNutrition({
                        protein: nutritionData.protein || "0",
                        carbs: nutritionData.carbs || "0",
                        fat: nutritionData.fat || "0",
                        sodium: nutritionData.sodium || "0",
                        potassium: nutritionData.potassium || "0",
                        phosphorus: nutritionData.phosphorus || "0",
                        vitamin: nutritionData.vitamin || "0",
                        water: nutritionData.water || "0",
                    });
                    setFoodType(recipe.food_category || []);
                    setIngredients(
                        recipe.ingredients.map((ingredient: any) => ({
                            name: ingredient.ingredient_name,
                            amount: ingredient.amount.toString(),
                            unit: ingredient.ingredient_unit,
                        }))
                    );
                    setSteps(recipe.recipe_method.join("\n"));
                    setImageFiles(recipe.recipe_img_link.map((link: string) => ({
                        preview: link,
                    })));
                } else {
                    console.error("No recipes found in the response.");
                }
            } catch (error) {
                console.error("Error fetching recipe data:", error);
            }
        };

        fetchData();
    }, [id]);

    const toggleFoodType = (type: string) => {
        setFoodType((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

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

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("recipe_name", foodName || "");
        formData.append("calories", calories);
        formData.append("food_category", JSON.stringify(foodType));
        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("recipe_method", steps);
        imageFiles.forEach((file) => {
            if (typeof file === "object" && "preview" in file) {
                formData.append("recipe_img_link", file.preview);
            }
        });

        console.log("Form data:", {
            recipe_name: foodName || "",
            calories,
            food_category: foodType,
            ingredients,
            recipe_method: steps,
            recipe_img_link: imageFiles,
        });
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 max-w-5xl mx-auto flex-1">
                <h2 className="text-2xl font-bold mb-4">แก้ไขเมนูอาหาร</h2>
                <div className="grid grid-cols-[1fr_3fr] gap-6 w-full">
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
                            {imageFiles.map((file, index) => {
                                const imageUrl =
                                    typeof file === "object" && "preview" in file
                                        ? file.preview
                                        : URL.createObjectURL(file as File);

                                return (
                                    <div
                                        key={index}
                                        className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden cursor-pointer"
                                        onClick={() => removeImage(index)}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`อาหาร ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md">
                                            <Icon icon="tabler:x" width={16} />
                                        </div>
                                    </div>
                                );
                            })}
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
                                    sodium: "โซเดียม (มิลลิกรัม)",
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
                            <TextField
                                label="ชื่อวัตถุดิบ"
                                value={ingredient.name || ""}
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].name = e.target.value;
                                    setIngredients(newIngredients);
                                }}
                                type="text"
                            />
                            <TextField
                                label="จำนวน"
                                value={ingredient.amount || ""}
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].amount = e.target.value;
                                    setIngredients(newIngredients);
                                }}
                                type="number"
                            />
                            <TextField
                                label="หน่วย"
                                value={ingredient.unit || ""}
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].unit = e.target.value;
                                    setIngredients(newIngredients);
                                }}
                                type="text"
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

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">ขั้นตอนการทำ</h3>
                    <textarea
                        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="ระบุขั้นตอนการทำอาหารที่นี่"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => router.push("/Menu")}
                        className="px-6 py-2 border border-gray-400 text-gray-800 rounded-md hover:bg-gray-200"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={() => handleSave()}
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