import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 56px;
  justify-content: center;
  @media (max-width: 1500px) {
    gap: 30px;
  }
`;
export const Value = styled.p`
  font-weight: 590;
  font-size: 48px;
  margin-bottom: 15px;
`;
export const Title = styled.p`
  font-weight: 590;
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.clrGray};
`;
export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ChartText = styled.p<{
  $clr?: string;
  $size?: string;
  $media_siz?: string;
}>`
  font-size: ${({ $size }) => $size};
  color: ${({ $clr }) => $clr};
  font-weight: 500;
  @media (max-width: 1480px) {
    font-size: ${({ $media_siz = "13px" }) => $media_siz};
  }
`;

export const StyleFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ResTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.clr};
  @media (max-width: 1685px) {
    font-size: 13px;
  }
`;
export const ResText = styled.p<{ $clr?: string }>`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
  @media (max-width: 1685px) {
    font-size: 13px;
  }
  @media (max-width: 1500px) {
    font-size: 11px;
  }
  color: ${({ theme }) => theme.clrGray};
  color: ${({ $clr }) => $clr};
`;
export const ResValue = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.clr};
  @media (max-width: 1685px) {
    font-size: 13px;
  }
  @media (max-width: 1500px) {
    font-size: 9px;
  }
`;
