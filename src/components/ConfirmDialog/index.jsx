import * as React from "react";
import { AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ConfirmDialog = ({
  open,
  onOpenChange,
  title = "Xác nhận xóa",
  description = "Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.",
  confirmText = "Đồng ý xóa",
  cancelText = "Hủy",
  onConfirm,
  trigger,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent className="sm:max-w-[420px] rounded-xl p-0 overflow-hidden border-none shadow-2xl bg-white">
        <div className="p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <DialogTitle className="text-lg font-bold text-gray-900 mb-2">
            {title}
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-500 mb-6">
            {description}
          </DialogDescription>

          <div className="flex gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                {cancelText}
              </Button>
            </DialogClose>

            <Button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
