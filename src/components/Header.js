import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../styles/globalStyle";

const SHeader = styled.div`
  width: 100%;
  max-width: 100%;
  height: 80px;
  padding: ${mainStyle.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: ${(props) => props.bgColor};
  transition: 0.5s;
  @media screen and (max-width: 500px) {
    padding: ${mainStyle.moPadding};
  }
`;

const Logo = styled.h3`
  font-size: 28px;
  font-weight: 800;
  position: relative;
  z-index: 10;
  a {
    color: ${mainStyle.mainColor};
  }
  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

const MenuWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Menu = styled.li`
  margin-left: 100px;
  font-size: 18px;
  font-weight: 500;
  @media screen and (max-width: 500px) {
    margin-left: 20px;
  }
`;

const MoMenu = styled.div`
  display: none;
  @media screen and (max-width: 500px) {
    display: block;
  }
`;

const MoMenuWrap = styled.ul`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: ${(props) => props.leftResults};
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.5s;
  li {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 100px;
    &:nth-child(1) {
      font-size: 24px;
    }
  }
`;

const MenuBtn = styled.div`
  font-size: 24px;
`;

const CloseBtn = styled.li`
  position: absolute;
  top: 27px;
  right: 20px;
  z-index: 10;
`;

export const Header = () => {
  const [bg, setBg] = useState("");
  const [left, setLeft] = useState("100%");

  const handleScrollHeader = () => {
    const sct = window.pageYOffset;
    if (sct > 500) {
      setBg("#1d1d1d");
    } else {
      setBg("transparent");
    }
  };

  window.addEventListener("scroll", handleScrollHeader);

  return (
    <SHeader bgColor={bg}>
      <Logo>
        <Link to={"/"}>Sue-Movie</Link>
      </Logo>

      <MenuWrap>
        <Menu>
          <Link to={"/"}>Home</Link>
        </Menu>
        <Menu>
          <Link to={"/search"}>Search</Link>
        </Menu>
      </MenuWrap>

      <MoMenu>
        <MenuBtn onClick={() => setLeft(0)}>
          <FontAwesomeIcon icon={faBars} />
        </MenuBtn>
        <MoMenuWrap leftResults={left}>
          <CloseBtn onClick={() => setLeft("100%")}>
            <FontAwesomeIcon icon={faClose} />
          </CloseBtn>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/search"}>Search</Link>
          </li>
        </MoMenuWrap>
      </MoMenu>
    </SHeader>
  );
};
