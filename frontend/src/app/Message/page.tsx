"use client";
import Sidebar from "../../../Components/Sidebar";

export default function MessagePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-xl font-semibold mb-4">จัดการข้อความ</h1>
        <iframe
          src="https://example.com/"
          width="100%"
          height="600px"
          className="border rounded-lg"
        />
      </div>
    </div>
  );
}
