import React, { InputHTMLAttributes } from "react";

export type ThemeProps = "dark" | "light";
export type UserTypes = 1 | 2 | 3;
export type TableStatus = 1 | 2;
export type IVoid = () => void;
export type MethodProps = "post" | "get" | "put" | "patch" | "delete";
export type ISetState<S> = React.Dispatch<React.SetStateAction<S>>;
export type IInputAttr = InputHTMLAttributes<HTMLInputElement>;
export type IPageData<T> = { data: T; total: number };
export type IHideMessage = { hideMessage: boolean };
