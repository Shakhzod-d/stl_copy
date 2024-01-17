import { message } from "antd";

const successMessage = (title: string) => {
     title && message.success(title)
}

const warningMessage = (title: string) => {
     title && message.warning(title)
}

const errorMessage = (title: string) => {
     title && message.error(title)
}

export { successMessage, warningMessage, errorMessage }