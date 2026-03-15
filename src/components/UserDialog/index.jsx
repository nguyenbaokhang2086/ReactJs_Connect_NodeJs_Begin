import * as React from "react";
import { Plus, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEFAULT_INITIAL = {
  name: "",
  email: "",
  age: "",
};

const UserDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialData = DEFAULT_INITIAL,
  trigger,
  title = "Thêm người dùng mới",
  triggerText = "Thêm mới",
  submitText = "Tạo mới",
  cancelText = "Hủy bỏ",
  isLoading = false,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  const setDialogOpen = isControlled ? onOpenChange : setInternalOpen;

  const [name, setName] = React.useState(initialData.name || "");
  const [email, setEmail] = React.useState(initialData.email || "");
  const [age, setAge] = React.useState(initialData.age || "");
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (!dialogOpen) {
      setName("");
      setEmail("");
      setAge("");
      setErrors({});
      return;
    }
    setName(initialData.name || "");
    setEmail(initialData.email || "");
    setAge(initialData.age || "");
    setErrors({});
  }, [dialogOpen, initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Tên không được để trống";
    if (!email.trim()) newErrors.email = "Email không được để trống";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email không hợp lệ";
    if (!age) newErrors.age = "Tuổi không được để trống";
    else if (age < 1 || age > 120) newErrors.age = "Tuổi phải từ 1 đến 120";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    await onSubmit?.({ name, email, age });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-all">
            <Plus className="w-5 h-5" />
            <span className="font-medium">{triggerText}</span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="[&>button]:hidden sm:max-w-[480px] rounded-xl p-0 overflow-hidden border-none shadow-2xl bg-white">
        <DialogHeader className="px-6 py-4 border-b border-gray-300 flex flex-row justify-between items-center">
          <DialogTitle className="text-xl font-bold text-gray-800">
            {title}
          </DialogTitle>
          <DialogClose
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="h-6 w-6" />
          </DialogClose>
        </DialogHeader>

        <div>
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-all h-10 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-2 focus-visible:ring-offset-0 ${
                  errors.name
                    ? "border-red-500 focus-visible:border-red-500"
                    : "border-gray-300 focus-visible:border-[#6636f1]"
                }`}
                placeholder="Nhập tên..."
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-all h-10 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-2 focus-visible:ring-offset-0 ${
                  errors.email
                    ? "border-red-500 focus-visible:border-red-500"
                    : "border-gray-300 focus-visible:border-[#6636f1]"
                }`}
                placeholder="example@gmail.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tuổi
              </label>
              <Input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-all h-10 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-2 focus-visible:ring-offset-0 ${
                  errors.age
                    ? "border-red-500 focus-visible:border-red-500"
                    : "border-gray-300 focus-visible:border-[#6636f1]"
                }`}
                disabled={isLoading}
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium h-10 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {cancelText}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium h-10 border-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : submitText}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
