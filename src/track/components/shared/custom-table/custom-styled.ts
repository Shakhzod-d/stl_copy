import styled from "styled-components";

export const TableContainer = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  // height: 100px;
  // overflow-y: auto;
  // border: 1px solid red;
`;

export const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  color: ${({ theme }) => theme.clr};
`;

export const TableRow = styled.tr`
  // border: 1px solid red;
  border-radius: 10px;
  padding: 25px;
  background: ${(props) => props.theme.white};
  position: relative;
  height: 77px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
export const HoverContainer = styled.div``;
export const TableData = styled.td<{ color: string | number }>`
  padding: 10px;
  // background: #ddd;
  border-bottom: 6px solid ${(props) => props.theme.mainBg};
  text-align: left;
  color: ${({ color }) => color};
  position: relative;
  cursor: pointer;
  &:first-child {
  }
`;

// Borders
export const BorderLBottom = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 8px;
  height: 10px;
  background: ${(props) => props.theme.mainBg};

  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    background: ${(props) => props.theme.white};

    border-bottom-left-radius: 50px;

    z-index: 10;
  }
`;
export const BorderLTop = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 8px;
  height: 10px;
  background: ${(props) => props.theme.mainBg};

  &:before {
    content: "";
    position: absolute;
    left: -0;
    bottom: 0;
    width: 10px;
    height: 10px;
    background: ${(props) => props.theme.white};

    border-top-left-radius: 50px;
    // border-bottom-right-radius: 10px;
    z-index: 10;
  }
`;
export const BorderRTop = styled.span`
  position: absolute;
  right: 0px;
  top: 0;
  width: 8px;
  height: 10px;
  background: ${(props) => props.theme.mainBg};

  &:before {
    content: "";
    position: absolute;
    left: -2px;
    bottom: 0;
    width: 10px;
    height: 10px;
    background: ${(props) => props.theme.white};
    border-top-right-radius: 50px;
    z-index: 10;
  }
`;
export const BorderRBottom = styled.span`
  position: absolute;
  right: 0px;
  bottom: 0;
  width: 8px;
  height: 10px;
  background: ${(props) => props.theme.mainBg};
  // #f3f3f4;
  &:before {
    content: "";
    position: absolute;
    left: -2px;
    bottom: 0;
    width: 10px;
    height: 10px;
    background: ${(props) => props.theme.white};
    border-bottom-right-radius: 50px;
    z-index: 10;
  }
`;

export const StatusBadge = styled.span<{
  $status?: string | number | JSX.Element;
}>`
  padding: 5px 10px;
  border-radius: 5px;
  color: ${({ $status }) =>
    $status == "Intermediate" || $status == "Power Off" || $status == "Power On"
      ? "#8C8C9B"
      : "#fff"};
  background-color: ${({ $status }) =>
    $status === "DR" || $status === "ON"
      ? "#28a745"
      : $status === "SB"
      ? "#ffc107"
      : $status == "" ||
        $status == "Intermediate" ||
        $status == "Power Off" ||
        $status == "Power On"
      ? "#fff"
      : "#6c757d"};
`;

export const HoverBox = styled.div`
  background: ${({ theme }) => theme.white};
  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid ${({ theme }) => theme.white}; 
    transform: rotate(180deg);
    border-radius: 20px;
    margin: 20px;
    bottom: -35px;
    left: 35px;
    z-index: -1;
    box-shadow: 0 10px 60px 0 rgba(0, 0, 0, 0.1);
  }
`;
