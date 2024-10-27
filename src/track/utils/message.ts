import { message } from "antd";

const successMessage = (title: string) => {
  if (title) {
    message.success(title);
  }
};

const warningMessage = (title: string) => {
  if (title) {
    message.warning(title);
  }
};

const errorMessage = (title: string) => {
  if (title) {
    message.error(title);
  }
};

export { successMessage, warningMessage, errorMessage };
