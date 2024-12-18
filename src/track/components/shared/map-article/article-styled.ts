import styled from "styled-components";

export const CardArticle = styled.article`
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  max-width: 400px !important;
  height: calc(100vh - 175px);
  overflow-y: auto !important;
`;
export const Between = styled.div`
  height: 27px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const Card = styled.div<{ $color: boolean }>`
  // max-width: 350px;
  border-radius: 10px;
  padding: 15px 10px 15px 15px;
  border: ${({ $color }) => ($color ? "1px solid #FC973A" : "")};
  height: 119px;
  background: ${({ theme }) => theme.white};
  // margin-bottom: 5px;
`;
export const Status = styled.div<{ $statusBg: string }>`
  border-radius: 5px;
  padding: 3px 10px;
  height: 27px;

  background: ${({ $statusBg }) =>
    $statusBg === "on"
      ? "#3DA8D5"
      : $statusBg === "sb"
      ? "#FC973A"
      : $statusBg === "off"
      ? "#8C8C9B"
      : "#32BE61"};

  color: ${({ theme }) => theme.blueBtn};
  font-size: 14px;
  font-weight: 500;
`;
export const Title = styled.h3`
  font-weight: 590;
  font-size: 16px;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.clr};
`;

export const TruckNum = styled.p`
  font-weight: 500;
  font-size: 12px;
  margin-left: 22px;
  color: ${({ theme }) => theme.clrGray2};
`;

export const Description = styled.span`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.04em;
  display: flex;
  gap: 10px;
  margin: 15px 0 0 0;
  color: ${({ theme }) => theme.clrGray2};
  p {
    color: #3da8d5;
  }
`;

export const Dots = styled.span`
  width: 3px;
  height: 3px;
  background: #8c8c9b;
  margin: 0 10px 0 10px;
  border-radius: 50%;
`;
