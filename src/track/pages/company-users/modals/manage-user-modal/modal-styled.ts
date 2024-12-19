import { Button, Checkbox, Input, Radio, Tabs } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const TabBtn = styled(Button)<{ $active: boolean }>`
  border-radius: 10px;
  padding: 15px 20px;
  height: 49px;
  background: ${({ $active, theme }) =>
    $active ? theme.btnActive : "#F3F3F4"} !important;
  color: ${({ $active }) => ($active ? " #fff" : "#000")};
  border: none;
  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.btnActive : "#F3F3F4"} !important;
    opacity: 0.9;
    color: ${({ $active }) => ($active ? " #fff" : "#000")} !important;
  }
`;

export const CustomInput = styled(Input)<{ $margin?: string }>`
  border-radius: 10px;
  padding: 20px !important;
  width: 100%;
  color: #000 !important;
  font-weight: 500;
  background: #f9f9fa;
  margin: ${({ $margin }) => $margin};
  &::placeholder {
    color: #000 !important;
    font-weight: 500;
  }
`;

export const TextAria = styled.textarea`
  border-radius: 10px;
  padding: 25px 20px;
  width: 100%;
  height: 150px;
  background: ${({ theme }) => theme.textAriaBg};
  color: ${({ theme }) => theme.clr};
  border: none;
  outline: none;
  margin-bottom: 20px;
  &::placeholder {
    color: ${({ theme }) => theme.clr};
  }
`;

export const Btn = styled(Button)<{ $type?: string }>`
  border-radius: 10px;
  padding: 20px 25px;
  width: 200px;
  height: 59px;
  min-width: 200px;
  color: ${({ $type }) => ($type === "add" ? "#FFF" : "#000")};
  background: ${({ $type }) => ($type === "add" ? "#FC973A" : "#f3f3f4")};
  &:hover {
    background: ${({ $type }) => ($type ? " #FC973A" : "#F3F3F4")} !important;
    opacity: 0.9;
    color: ${({ $type }) => ($type ? " #fff" : "#000")} !important;
  }
`;

export const StyledCheckbox = styled(Checkbox)<{ checked: boolean }>`
  && {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ checked, theme }) =>
      checked ? "#FC973A" : theme.textAriaBg};
    color: ${({ checked }) => (checked ? "#FFF" : "#5D5E5F")};
    border-radius: 10px;
    font-size: 14px;
    font-weight: 400;

    .ant-checkbox-inner {
      display: none; /* Checkbox ichidagi default square ni yo'q qilish */
    }

    &:hover {
      border-color: #fc973a;
    }
  }
`;

export const StyledTabs = styled(Tabs)`
  && .ant-tabs-nav {
    margin: 0 !important;
    padding: 0 !important;
    display: flex !important;
    justify-content: flex-end !important; /* O'ng tomonga chiqarish */
    border-bottom: none !important; /* Default chiziqni o'chirish */

    .ant-tabs-tab {
      background-color: #f5f6fa !important; /* Tab tugmalar orqa foni */
      color: #1f2645 !important; /* Matn rangi */
      border-radius: 8px !important; /* Chekka radius */
      margin: 0 8px !important; /* Tab orasida bo'shliq */
      padding: 6px 12px !important;

      &:hover {
        background-color: #e0e0e0 !important; /* Hover uchun rang */
      }
    }

    .ant-tabs-tab-active {
      background-color: #1f2645 !important; /* Aktiv tab foni */
      color: #ffffff !important; /* Aktiv tab matn rangi */
    }
  }

  && .ant-tabs-ink-bar {
    display: none !important; /* Pastdagi default chiziqni yashirish */
  }
`;

export const GlobalStyles = createGlobalStyle`
  .ant-tabs-nav {
    margin: 0 !important;
    display: flex !important;
    justify-content: flex-end !important; /* Tab tugmalarini o'ng tomonga chiqarish */
    border-bottom: none !important; /* Uzun pastki chiziqni olib tashlash */
  }

  .ant-tabs-tab {
    background-color: #f5f6fa !important;
    color: #1f2645 !important;
    border-radius: 8px !important;
    margin: 0 5px !important; /* Orasidagi bo'shliq */
    padding: 6px 12px !important;

    &:hover {
      background-color: #e0e0e0 !important;
    }
  }

  .ant-tabs-tab-active {
    background-color: #1f2645 !important;
    color: #ffffff !important;
  }

  .ant-tabs-ink-bar {
    display: none !important; /* Aktiv tab pastidagi chiziq */
  }
`;
