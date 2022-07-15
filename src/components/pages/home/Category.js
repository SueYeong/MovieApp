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
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 30%;
    height: 50px;
    font-size: 18px;
    text-align: center;
    border-radius: 20px;
  }
`;

export const Category = ({ now, rate, com }) => {
  const [top, setTop] = useState("");
  // const nowTop = now && now.offsetTop - 100;
  // const rateTop = rate && rate.offsetTop - 100;
  // const comTop = com && com.offsetTop - 100;
  // console.log(now, rate, com);
  console.log(rate);
  window.scrollTo({
    top: top,
    left: 0,
    behavior: "smooth",
  });

  return (
    <Wrap>
      <Title>카테고리</Title>
      <CategoryWrap>
        <SCategory onClick={() => setTop(now && now.offsetTop - 100)}>
          현재 상영 영화
        </SCategory>
        <SCategory onClick={() => setTop(rate && rate.offsetTop - 100)}>
          인기 영화
        </SCategory>
        <SCategory onClick={() => setTop(com && com.offsetTop - 100)}>
          개봉 예정 영화
        </SCategory>
      </CategoryWrap>
    </Wrap>
  );
};
