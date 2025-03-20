"use client";

import React, { useState } from "react";
import Sidebar from "../../../Components/Sidebar";
import Header from "../../../Components/Header";
import FoodCard from "../../../Components/FoodCard";

interface MenuItem {
  id: number;
  name: string;
  image: string;
}

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "เนื้อวัว",
    image:
      "https://lh5.googleusercontent.com/proxy/fPBVzWVoiv2oQ5mRAYJYuVv6sc_tl-HLtSkw4zxLUmmLZWCEDU7DraX2ETChEFc8Qfa0xiO4RwEjGwG5uC7aNK83RCIhcthVfCvUMA",
  },
  {
    id: 2,
    name: "หมู",
    image: "https://www.prachachat.net/wp-content/uploads/2023/08/image1-5.jpg",
  },
  {
    id: 3,
    name: "แครอท",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRj6JAOMavkuVMuTEo5T81e6Z4h-uc7nOkgQ&s",
  },
  {
    id: 4,
    name: "ไข่",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAH7zdsGdU1m4aCxHJWoz7wsPKiCVLoJ09g&s",
  },
  {
    id: 5,
    name: "ไส้กรอก",
    image:
      "https://www.sgethai.com/wp-content/uploads/2023/10/210322-Content-%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9%E0%B9%84%E0%B8%AA%E0%B9%89%E0%B8%81%E0%B8%A3%E0%B8%AD%E0%B8%81-%E0%B8%AD%E0%B8%A3%E0%B9%88%E0%B8%AD%E0%B8%A2-%E0%B8%8A%E0%B8%A7%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%AD02.webp",
  },
  {
    id: 6,
    name: "ผักชี",
    image:
      "https://adeq.or.th/wp-content/uploads/2019/04/%E0%B8%9C%E0%B8%B1%E0%B8%81%E0%B8%8A%E0%B8%B501.jpg",
  },
  {
    id: 7,
    name: "ผักกาด",
    image:
      "https://v3i.rweb-images.com/www.disthai.com/images/content/original-1643870467735.jpg",
  },
  {
    id: 8,
    name: "ไก่",
    image: "https://pasusart.com/wp-content/uploads/2020/05/S__118874119.jpg",
  },
  {
    id: 9,
    name: "แตงกวา",
    image: "https://www.opsmoac.go.th/data/local_wisdom/l/631100000121.jpg",
  },
  {
    id: 10,
    name: "กุ้ง",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi4I_INy6U0X5GNtBm4RJmz3BrcJ3jVNA5iw&s",
  },
  {
    id: 11,
    name: "นม",
    image:
      "https://happygrocersbkk.com/cdn/shop/files/WholeMilk_5eb8296f-2f47-4e51-9155-509cc7a1a41b.jpg?crop=center&height=640&v=1689836135&width=640",
  },
  {
    id: 12,
    name: "ฟักทอง",
    image:
      "https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/49/02/0213449/0213449_5.jpg",
  },
];

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <Header />
        <div className="grid grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
