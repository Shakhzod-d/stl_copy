import styled from "styled-components";

export const Label = styled.p`
  font-size: 14px;
  color: #8c8c9b;
  margin-bottom: 5px;
`;

export const TextContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.white};
  padding: 25px 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.clr};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Note = styled.div`
  width: 100%;
  height: 119px;
  background: ${({ theme }) => theme.white};
  padding: 20px;
  color: #5d5e5f;
  border-radius: 10px;
`;
