import React from "react";
import UserDialog from "@/components/UserDialog";
import { createUser } from "@/services/api/apiUser";

export default function UserListHeader() {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddUser = async (userData) => {
    try {
      setIsLoading(true);
      await createUser({
        name: userData.name,
        email: userData.email,
        age: Number(userData.age),
      });
      setIsAddOpen(false);
      // Trigger a refresh by dispatching a custom event
      window.dispatchEvent(new Event("userCreated"));
      console.log("✅ User created from header");
    } catch (error) {
      console.error("❌ Failed to create user:", error);
      alert(
        "❌ Không thể tạo người dùng: " +
          (error.message || "Lỗi không xác định"),
      );
    } finally {
      setIsLoading(false);
    }
  };

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
      <UserDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmit={handleAddUser}
        initialData={{ name: "", email: "", age: "" }}
        title="Thêm người dùng mới"
        submitText="Thêm mới"
        cancelText="Hủy bỏ"
        isLoading={isLoading}
      />
    </div>
  );
}
