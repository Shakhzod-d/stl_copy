import { DatePicker } from "antd";
import styled from "styled-components";

import "antd/dist/antd.css"; // Ant Designning default uslublari

const { RangePicker, TimePicker } = DatePicker;

export const DataPickerContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.textAriaBg} !important;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px !important;
`;

export const StyledDatePicker = styled(TimePicker)`
  .ant-picker {
    background-color: red !important; /* Backgroundni butunlay olib tashlash */
    border: 1px solid #d9d9d9; /* Default border */
    border-radius: 8px; /* Agar kerak bo'lsa */
    transition: all 0.3s;
  }

  .ant-picker-input input {
    background-color: transparent !important; /* Ichki input backgroundini olib tashlash */
  }

  .ant-picker-suffix {
    display: none; /* Suffix (icon) ni olib tashlash */
  }

  .ant-picker:hover,
  .ant-picker-focused {
    border-color: #fc973a !important; /* Hover/focus border rangi */
  }
`;

export const StyledRangePicker = styled(RangePicker)`
  .ant-picker {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background: ${({ theme }) => theme.white} !important; /* Background rangi */
    border: none !important; /* Borderni olib tashlash */
    border-radius: 0 !important; /* Radiusni olib tashlash */
    box-shadow: none !important; /* Shadowni olib tashlash */

    &:hover,
    &:focus,
    &:active {
      border: none !important;
      box-shadow: none !important; /* Focus bo'lganda shadowni olib tashlash */
    }
  }

  .ant-picker-input {
    width: 80% !important;
    font-size: 14px; /* Matn o'lchami */
    color: #5d5e5f; /* Matn rangi */
    // background: ${({ theme }) => "red"};
  }

  .ant-picker-suffix {
    display: none; /* Default suffix (icon) ni olib tashlash */
  }
`;

// Styled Container
export const Container = styled.div`
  width: 360px;
  height: 54px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.white};
  border-radius: 10px;
  padding: 15px;

  .custom-icon {
    font-size: 20px;
    color: #666;
    margin-right: 8px;
  }

  .search-icon {
    margin-left: auto;
    font-size: 18px;
    color: #bfbfbf;
    cursor: pointer;

    &:hover {
      color: #8c8c8c;
    }
  }
`;
