import { useState } from "react";
import styled from "styled-components";

const Wrap = styled.section`
  margin-top: 120px;
`;

const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const CategoryWrap = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SCategory = styled.li`
  width: 20%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 50px;
  font-size: 25px;
  font-weight: 700;
`;

export const Category = () => {
  const [top, setTop] = useState("");
  window.scrollTo({
    top: top,
    left: 0,
    behavior: "smooth",
  });

  return (
    <Wrap>
      <Title>카테고리</Title>
      <CategoryWrap>
        <SCategory onClick={() => setTop("1000")}>현재 상영 영화</SCategory>
        <SCategory onClick={() => setTop("1496")}>인기 영화</SCategory>
        <SCategory onClick={() => setTop("2128")}>개봉 예정 영화</SCategory>
      </CategoryWrap>
    </Wrap>
  );
};