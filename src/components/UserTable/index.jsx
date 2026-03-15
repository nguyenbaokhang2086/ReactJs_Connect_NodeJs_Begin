import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";
import UserDialog from "@/components/UserDialog";
import { getUsers, deleteUser, updateUser } from "@/services/api/apiUser";

const UserTable = () => {
  // State management
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Dialog states
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);

  // Format date dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Fetch users
  React.useEffect(() => {
    fetchUsers();

    const handleUserCreated = () => {
      console.log("📢 User created event received, refreshing list");
      fetchUsers();
    };

    window.addEventListener("userCreated", handleUserCreated);
    return () => window.removeEventListener("userCreated", handleUserCreated);
  }, []);

  const fetchUsers = async () => {
    try {
      setIsFetching(true);
      setError(null);

      const response = await getUsers();

      const usersList = Array.isArray(response)
        ? response
        : response.data || [];

      setUsers(usersList);

      console.log("✅ Load users từ API:", usersList);
    } catch (err) {
      console.error("❌ Error loading users:", err);
      setError("Không thể tải danh sách người dùng. Vui lòng thử lại.");
    } finally {
      setIsFetching(false);
    }
  };

  // Update user
  const handleUpdateUser = async (updatedData) => {
    if (!editingUser) return;

    try {
      setIsLoading(true);

      await updateUser(editingUser._id, {
        name: updatedData.name,
        email: updatedData.email,
        age: Number(updatedData.age),
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === editingUser._id
            ? {
                ...u,
                name: updatedData.name,
                email: updatedData.email,
                age: Number(updatedData.age),
              }
            : u,
        ),
      );

      setIsEditOpen(false);
      setEditingUser(null);

      console.log("✅ Cập nhật user thành công");
    } catch (err) {
      console.error("❌ Failed to update user:", err);

      alert(
        "❌ Không thể cập nhật người dùng: " +
          (err.message || "Lỗi không xác định"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user
  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      setIsLoading(true);

      await deleteUser(selectedUser._id);

      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));

      setIsConfirmOpen(false);
      setSelectedUser(null);

      console.log("✅ Xóa user thành công");
    } catch (err) {
      console.error("❌ Failed to delete user:", err);

      alert(
        "❌ Không thể xóa người dùng: " + (err.message || "Lỗi không xác định"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsConfirmOpen(true);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditOpen(true);
  };

  // Loading
  if (isFetching) {
    return (
      <div className="flex items-center justify-center w-full h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-red-800">{error}</p>

        <button
          onClick={fetchUsers}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <>
      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."
      />

      <UserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={editingUser || { name: "", email: "", age: "" }}
        onSubmit={handleUpdateUser}
        title="Cập nhật thông tin"
        submitText="Cập nhật"
        cancelText="Hủy bỏ"
        isLoading={isLoading}
      />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Thông tin
              </TableHead>

              <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Tuổi
              </TableHead>

              <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Ngày tạo
              </TableHead>

              <TableHead className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((u) => (
              <TableRow
                key={u.id}
                className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
              >
                <TableCell className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {u.name}
                    </span>

                    <span className="text-gray-500 text-xs">{u.email}</span>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4 text-gray-600">
                  {u.age}
                </TableCell>

                <TableCell className="px-6 py-4 text-gray-400 text-xs font-mono">
                  {formatDate(u.createdAt)}
                </TableCell>

                <TableCell className="text-right px-6 py-4">
                  <button
                    className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-all mr-1"
                    onClick={() => handleEditClick(u)}
                    title="Chỉnh sửa"
                  >
                    <SquarePen size={20} />
                  </button>

                  <button
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                    onClick={() => handleDeleteClick(u)}
                    title="Xóa"
                  >
                    <Trash2 size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserTable;
