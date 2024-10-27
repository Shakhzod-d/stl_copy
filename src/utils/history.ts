import { history } from "..";

// custom history push function
export const historyPush = (path: string) => {
    history.push(path);
};

// custom history replace function
export const historyReplace = (path: string) => {
    history.replace(path);
};

// custom history replace function
export const historyGo = (length: number) => {
    history.go(length);
};

// custom history replace function
export const historyGoBack = () => {
    history.goBack();
};

