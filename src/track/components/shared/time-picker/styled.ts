import { Calendar } from "antd";
import styled from "styled-components";

export const StyledCalendar = styled(Calendar)`
  border-bottom: 1px solid ${({ theme }) => theme.clrGray2};

  thead {
    opacity: 0.5 !important;
  }

  * {
    border: 0 !important;
    font-size: 20px !important;
    font-weight: 400 !important;
    line-height: 25px !important;
    letter-spacing: -0.4px !important;
    color: ${({ theme }) => theme.clr} !important;
  }

  .ant-picker-calendar-header {
    justify-content: start !important;
    flex-direction: row-reverse !important;
    background: ${({ theme }) => theme.white} !important;

    .ant-select-selector {
      background: ${({ theme }) => theme.white} !important;
      padding: 0 !important;
      gap: 0 !important;
    }

    .ant-select-arrow {
      display: none !important;
    }

    * {
      color: ${({ theme }) => theme.clr} !important;
      font-size: 20px !important;
      font-weight: 600 !important;
      line-height: 22px !important;
      letter-spacing: -0.5px !important;
    }

    *::after {
      display: none !important;
    }
  }

  .ant-picker-calendar-mode-switch {
    display: none !important;
  }

  .ant-picker-panel {
    background: ${({ theme }) => theme.white} !important;
  }

  .ant-picker-calendar-date {
    width: 44px !important;
    height: 44px !important;
    border-radius: 50% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: ${({ theme }) => theme.textAriaBg};
    &:hover {
      background: transparent !important;
    }
  }

  .ant-picker-cell-today {
    * {
      color: #fc973a !important;
      background: transparent !important;
    }
  }
  .ant-picker-cell-selected {
    & > div {
      background: rgba(252, 152, 58, 0.18) !important;
      border-radius: 50%;
    }
    * {
      transition: 0.3s;
      color: #fc973a !important;
      font-size: 24px !important;
    }
  }
`;

export const P = styled.p`
  color: ${({ theme }) => theme.clr};
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.4px;
`;

export const Div = styled.div`
  border-radius: 9px;
  background: ${({ theme }) => theme.textAriaBg};
  display: flex;
  align-items: center;
`;

export const Modal = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  z-index: 999;
  max-width: 361px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.white};
  padding: 10px 16px;
  box-shadow: ${({ theme }) => theme.selectShadow};
`;
