import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { imgUrl_500 } from "../../../constants/constant";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";

const Container = styled.div`
  margin-top: 120px;
`;

const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const MovieImg = styled.div`
  height: 250px;
`;

const MovieInformation = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MovieTitle = styled.li`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
`;

const VoteAverage = styled.li`
  font-size: 18px;
  margin-top: 10px;
  span {
    margin: 0 10px;
  }
`;

export const Movies = ({ movieData, title }) => {
  const params = {
    breakpoints: {
      320: {
        slidesPerView: 2.2,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 5.2,
        spaceBetween: 20,
      },
    },
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Swiper modules={[Navigation]} navigation {...params}>
        {movieData &&
          movieData.map((play) => (
            <SwiperSlide key={play.id}>
              <Link to={`detail/${play.id}`}>
                <MovieImg
                  style={{
                    background: `url(${
                      play.backdrop_path
                        ? `${imgUrl_500}${play.backdrop_path}`
                        : "https://blog.kakaocdn.net/dn/v5P3S/btqSjAo1POM/ZeJnArZDPkEHwKoC87Mt21/img.png"
                    }) no-repeat center / cover`,
                  }}
                />
                <MovieInformation>
                  <MovieTitle>{play.title}</MovieTitle>
                  <VoteAverage>
                    평점<span>:</span>
                    {play.vote_average}
                  </VoteAverage>
                </MovieInformation>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
};
