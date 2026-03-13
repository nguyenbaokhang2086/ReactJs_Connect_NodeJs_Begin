import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserListHeader() {
  return (
    <div className="flex flex-row items-center justify-between py-6">
      {/* Cụm Tiêu đề và Mô tả */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-[#1a2b3b]">
          Danh Sách Người Dùng
        </h2>
        <p className="text-sm text-muted-foreground">
          Quản lý thông tin thành viên hệ thống
        </p>
      </div>

      {/* Nút Thêm mới */}
      <Button className="bg-[#5c59e8] hover:bg-[#4b48d1] text-white px-5 py-2.5 flex items-center gap-2 rounded-lg">
        <Plus className="w-5 h-5" />
        <span className="font-medium">Thêm mới</span>
      </Button>
    </div>
  );
}
