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
            <TableHead className="text-[12px] font-semibold uppercase text-gray-500 py-4">
              Thông tin
            </TableHead>
            <TableHead className="text-[12px] font-semibold uppercase text-gray-500 text-center">
              Tuổi
            </TableHead>
            <TableHead className="text-[12px] font-semibold uppercase text-gray-500 text-center">
              Ngày tạo
            </TableHead>
            <TableHead className="text-[12px] font-semibold uppercase text-gray-500 text-right pr-8">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u, i) => (
            <TableRow key={i} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="text-base font-bold text-gray-900">
                    {u.name}
                  </span>
                  <span className="text-sm text-gray-400">{u.email}</span>
                </div>
              </TableCell>
              <TableCell className="text-center text-gray-600 font-medium">
                {u.age}
              </TableCell>
              <TableCell className="text-center text-gray-400">
                {u.createdAt}
              </TableCell>
              <TableCell className="pr-8 text-right">
                <div className="flex justify-end gap-4">
                  <button className="text-indigo-600 hover:opacity-70 transition-opacity">
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
