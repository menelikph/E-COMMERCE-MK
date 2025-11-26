import { toast } from "react-toastify";

// Toast success
export const notifySuccess = (message: string) => {
  toast.success(message);
};

// Toast error 
export const notifyError = (message: string) => {
  toast.error(message);
};

// Toast info
export const notifyInfo = (message: string) => {
  toast.info(message);
};
