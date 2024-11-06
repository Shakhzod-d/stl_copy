import styled from "styled-components";

export const Item = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ItemTitle = styled.p`
  font-weight: 590;
  font-size: 14px;
  color: ${({ theme }) => theme.clrGray};
  margin-bottom: 5px;
`;

export const Title = styled.p`
  font-weight: 590;
  color: "#303030";
  margin-bottom: 20px;
`;

export const ActiveCard = styled.div<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  gap: 25px;
  justify-content: ${({ $active }) => ($active ? "space-between" : "end")};
`;

export const BoldNum = styled.b`
  font-size: 20px;
  color: ${({ theme }) => theme.clr};
`;
