import { Button } from "antd";
import { NavLink } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
const expandAnimation = keyframes`
  from {
    width: 100px;
  }
  to {
    width: 300px;
  }
`;
export const SidebarContainer = styled.article<{ $active: boolean }>`
  width: 100%;
  // max-width: 240px;
  max-width: ${({ $active }) => ($active ? "240px" : "100px")};
  // max-width: 240px;
  height: 100vh;
  // transition: max-width 0.2s ease, width 0.02s ease;
  padding: 10px;
  display: flex;
  flex-direction: column;
  ${({ $active }) =>
    $active &&
    css`
      // animation: ${expandAnimation} 0.02s ease-in;
    `}
`;

export const Img = styled.img`
  width: 100%;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  margin: 10px 0;
`;
export const PageBtn = styled(NavLink)<{ $active?: boolean; $p?: string }>`
  * {
    cursor: pointer;
  }
  border-radius: 10px;
  padding: ${({ $p = "15px 20px" }) => $p};
  // height: 60px;
  width: 100%;
  max-width: 220px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;

  gap: 10px;

  color: #fff;
  display: flex;
  justify-content: ${({ $active }) => (!$active ? "center" : "start")};
  align-items: center;
  p {
    font-weight: 500;
    font-size: 17px;
  }
  &.active {
    background-color: #fff;
    color: #000;
  }
`;
export const Exit = styled(Button)`
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 220px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    opacity: 0.8;
  }
`;
export const TabBtn = styled.div<{ $active?: boolean }>`
  border-radius: 10px;
  width: ${({ $active }) => ($active ? "220px" : "100%")};
  // min-height: 70px;
  transition: max-width 0.4s ease, width 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
  color: #fff;
  overflow: hidden;
  ${({ $active }) =>
    !$active
      ? `display:flex; 
    justify-content:center;
    align-items:start; `
      : ""};
  * {
    cursor: pointer;
  }
`;
export const BtnWrap = styled.div`
  padding: 15px 20px;
  display: flex;
  gap: 10px;
  height: 48px;
  align-items: center;
`;
export const PageActive = styled(NavLink)`
  display: block;
  padding: 15px 20px;

  color: white;
  width: 100%;
  // height: 49px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    background: rgba(255, 255, 255, 0.1);
  }
`;
export const User = styled.div<{ $background?: string; color?: string }>`
  display: flex;
  padding: 15px 20px;
  align-items: center;
  cursor: pointer;
  width: 100%;
  max-width: 220px;
  gap: 10px;
  border-radius: 10px;
  background: ${({ $background }) =>
    $background ? $background : "rgba(255, 255, 255, 0.15)"};

  img {
    width: 42px;
    height: 42px;
    margin: 0 !important;
    border-radius: 50%;
  }

  h2 {
    color: ${({ color }) => (color ? color : "#fff")};
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }
`;

export const StyleLogo = styled.img`
  width: 135px;
  height: 45px;
`;

export const ArrowBtn = styled.div<{ $active: boolean }>`
  ${({ $active }) => $active && `transform: rotate(180deg)`};
  cursor: pointer;
`;
export const StyleFlex = styled.div<{ $active: boolean }>`
  margin-bottom: 25px;

  display: flex;

  justify-content: ${({ $active }) => (!$active ? "center" : "space-between")};
  align-items: center;
`;

export const CompanyIcon = styled.div`
  width: 40px;
  height: 40px;
  background: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: #fff;
  }
`;
