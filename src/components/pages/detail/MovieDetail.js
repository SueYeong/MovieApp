import { useState } from "react";
import styled from "styled-components";
import { imgUrl, imgUrl_500 } from "../../../constants/constant";
import { mainStyle } from "../../../styles/globalStyle";

const Wrap = styled.div`
  width: 100%;
`;

const Bg = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: ${mainStyle.padding};
  padding: 100px 0;
  @media screen and (max-width: 500px) {
    padding: ${mainStyle.moPadding};
    flex-direction: column;
  }
`;

const Con = styled.div`
  width: 45%;
  &:nth-child(1) {
    height: 80vh;
    @media screen and (max-width: 500px) {
      margin-top: 100px;
    }
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 40px;
  @media screen and (max-width: 500px) {
    margin-top: 30px;
    font-size: 45px;
  }
`;

const Release = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Genres = styled.ul`
  font-size: 20px;
  font-weight: 600;
  li {
    list-style: disc;
    margin-bottom: 5px;
  }
  margin: 20px 0 0 25px;
`;

const RunTime = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
`;

const Desc = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 2rem;
  margin-top: 30px;
  opacity: 0.8;
  letter-spacing: 0.5px;
`;

const More = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const PlusBtn = styled.div`
  font-size: 25px;
  margin-left: 10px;
  cursor: pointer;
`;

const CastTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

const CastWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  @media screen and (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CastImg = styled.div`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin-top: 20px;
`;

const CastName = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin-top: 10px;
`;

export const MovieDetail = ({ movieData, credit }) => {
  const [more, setMore] = useState("4");
  const creditdata = credit.slice(0, more);
  return (
    <Wrap
      style={{
        background: `url(${
          movieData.backdrop_path
            ? `${imgUrl}${movieData.backdrop_path}`
            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
        }) no-repeat center / cover`,
      }}
    >
      <Bg>
        <Con
          style={{
            background: `url(${
              movieData.backdrop_path
                ? `${imgUrl}${movieData.poster_path}`
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }) no-repeat center / contain`,
          }}
        />
        <Con>
          <Title>{movieData.title}</Title>
          <Release>개봉일: {movieData.release_date}</Release>
          <RunTime>{movieData.runtime} 분</RunTime>
          <Genres>
            {movieData.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </Genres>
          <Desc>{movieData.overview}</Desc>
          <More>
            <CastTitle>출연인물</CastTitle>
            <PlusBtn onClick={() => setMore(`${more === "4" ? "28" : "4"}`)}>
              +
            </PlusBtn>
          </More>
          <CastWrap>
            {creditdata.map((credits) => (
              <div>
                <CastImg
                  style={{
                    background: `url(${
                      credits.profile_path
                        ? `${imgUrl_500}${credits.profile_path}`
                        : "https://www.pngkit.com/png/full/372-3729814_profile-icon-my-profile-icon-png.png"
                    }) no-repeat center / cover`,
                  }}
                ></CastImg>
                <CastName>{credits.name}</CastName>
              </div>
            ))}
          </CastWrap>
        </Con>
      </Bg>
    </Wrap>
  );
};
