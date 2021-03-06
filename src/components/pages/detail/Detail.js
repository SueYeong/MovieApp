import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { ScrollTop } from "../../../ScrollTop";
import { Loading } from "../../Loading";
import { PageTitle } from "../../PageTitle";
import { MovieDetail } from "./MovieDetail";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Container } from "../../Container";
import { imgUrl_500 } from "../../../constants/constant";

const Iframe = styled.iframe`
  width: 100%;
  height: 700px;
  @media screen and (max-width: 500px) {
    height: 60vh;
  }
`;

const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
  margin: 120px 0 30px 0;
`;

const ConWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 30px;
  row-gap: 50px;
  @media screen and (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 10px;
  }
`;

const Con = styled.div`
  height: 250px;
  @media screen and (max-width: 500px) {
    height: 150px;
  }
`;

const STitle = styled.h3`
  font-size: 18px;
  margin-top: 20px;
  @media screen and (max-width: 500px) {
    margin-top: 10px;
  }
`;

export const Detail = () => {
  const [movieData, setMovieData] = useState();
  const [trailer, setTrailer] = useState();
  const [credit, setCredit] = useState();
  const [similar, setSimilar] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  // =>url주소에 있는 변수값을 가져옴

  useEffect(() => {
    const detailDate = async () => {
      try {
        const { data } = await movieApi.movieDetail(id);
        setMovieData(data);
        const {
          data: { results },
        } = await movieApi.video(id);
        setTrailer(results);
        const {
          data: { cast },
        } = await movieApi.credits(id);
        setCredit(cast);
        const {
          data: { results: alike },
        } = await movieApi.similar(id);
        setSimilar(alike);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    detailDate();
  }, [id]);

  const params = {
    breakpoints: {
      320: {
        slidesPerView: 2.2,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
    },
  };

  return (
    <div>
      <PageTitle title={"Detail"} />
      <ScrollTop />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {movieData && <MovieDetail movieData={movieData} credit={credit} />}
          <Container>
            {trailer.length > 0 ? <Title>트레일러</Title> : null}
            <Swiper modules={[Navigation]} navigation {...params}>
              {trailer &&
                trailer.map((trail) => (
                  <SwiperSlide key={trail.id}>
                    <Iframe
                      src={`https://www.youtube.com/embed/${trail.key}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></Iframe>
                  </SwiperSlide>
                ))}
            </Swiper>

            <Title>관련 영화</Title>
            <ConWrap>
              {similar &&
                similar.map((simil) => (
                  <div key={simil.id}>
                    <Link to={`/detail/${simil.id}`}>
                      <Con
                        style={{
                          background: `url(${
                            simil.backdrop_path
                              ? `${imgUrl_500}${simil.backdrop_path}`
                              : `https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg`
                          }) no-repeat center / cover`,
                        }}
                      ></Con>
                      <STitle>{simil.title}</STitle>
                    </Link>
                  </div>
                ))}
            </ConWrap>
          </Container>
        </div>
      )}
    </div>
  );
};
