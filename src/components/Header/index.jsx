import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserListHeader() {
  return (
    <div className="flex flex-row items-center justify-between mb-8">
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
      <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 h-auto text-[16px] font-medium rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95">
        <Plus className="w-5 h-5 text-white" />
        <span>Thêm mới</span>
      </Button>
    </div>
  );
}
