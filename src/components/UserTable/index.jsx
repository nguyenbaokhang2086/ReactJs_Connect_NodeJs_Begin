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

const users = [
  {
    name: "Nguyễn Văn A",
    email: "vana@gmail.com",
    age: 25,
    createdAt: "11/03/2024",
  },
  {
    name: "Trần Thị B",
    email: "thib@example.com",
    age: 22,
    createdAt: "10/03/2024",
  },
];

const UserTable = () => {
  return (
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
            <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase text-right">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u, i) => (
            <TableRow key={i} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{u.name}</span>
                  <span className="text-gray-500 text-xs">{u.email}</span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-gray-600">{u.age}</TableCell>
              <TableCell className="px-6 py-4 text-gray-400 text-xs font-mono">
                {u.createdAt}
              </TableCell>
              <TableCell className="text-right">
                <div className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-all mr-1">
                    <SquarePen size={20} />
                  </button>
                  <button className="text-red-600 hover:opacity-70 transition-opacity">
                    <Trash2 size={20} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
