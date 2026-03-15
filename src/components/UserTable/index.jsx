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

const UserTable = () => {
  const [users, setUsers] = React.useState([]);

  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsConfirmOpen(true);
  };

  const handleAddUser = (user) => {
    const createdAt = new Date().toLocaleDateString("en-GB");
    setUsers((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: nextId,
          name: user.name,
          email: user.email,
          age: Number(user.age),
          createdAt,
        },
      ];
    });
  };

  const handleConfirmDelete = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setSelectedUser(null);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditOpen(true);
  };

  const handleUpdateUser = (updated) => {
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              name: updated.name,
              email: updated.email,
              age: Number(updated.age),
            }
          : u,
      ),
    );
  };

  // ...existing code...

  //crate function loadUsers from localStorage => setUsers
  return (
    <>
      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."
      />

      {/* Header Danh sách */}

      <UserDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmit={handleAddUser}
        title="Thêm người dùng mới"
        submitText="Thêm mới"
        cancelText="Hủy bỏ"
        trigger={<div className="hidden"></div>}
        setUsers={setUsers}
        users={users}
      />

      {/* Dialog Edit (Không hiện trigger) */}
      <UserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialData={editingUser ?? { name: "", email: "", age: "" }}
        onSubmit={handleUpdateUser}
        title="Cập nhật thông tin"
        submitText="Cập nhật"
        cancelText="Hủy bỏ"
        trigger={<div className="hidden"></div>}
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
                className="hover:bg-gray-50/50 transition-colors"
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
                  {u.createdAt}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-all mr-1"
                    onClick={() => handleEditClick(u)}
                  >
                    <SquarePen size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:opacity-70 transition-opacity p-2"
                    onClick={() => handleDeleteClick(u)}
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
