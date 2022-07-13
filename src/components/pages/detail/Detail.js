import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { imgUrl } from "../../../constants/constant";

const Iframe = styled.iframe`
  width: 100%;
  height: 700px;
  margin-top: 150px;
  @media screen and (max-width: 500px) {
    height: 60vh;
    margin-top: 100px;
  }
`;

const ConWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 30px;
  row-gap: 50px;
  margin-top: 150px;
  margin-top: 120px;
`;

const Con = styled.div`
  height: 250px;
`;

export const Detail = () => {
  const [movieData, setMovieData] = useState();
  const [trailer, setTrailer] = useState();
  const [similar, setSimilar] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  // =>url주소에 있는 변수값을 가져옴

  useEffect(() => {
    const detailDate = async () => {
      const { data } = await movieApi.movieDetail(id);
      setMovieData(data);
      const {
        data: { results },
      } = await movieApi.video(id);
      setTrailer(results);
      const {
        data: { results: simil },
      } = await movieApi.similar(id);
      setSimilar(simil);
      setLoading(false);
    };
    detailDate();
  }, [id]);
  // console.log(trailer);
  // console.log(movieApi.similar(id));

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
          {movieData && <MovieDetail movieData={movieData} />}
          <Container>
            <Swiper modules={[Navigation]} navigation {...params}>
              {trailer &&
                trailer.map((trail) => (
                  <SwiperSlide key={trail.id}>
                    <Iframe
                      src={`https://www.youtube.com/embed/${trail.key}`}
                      allowfullscreen
                    ></Iframe>
                  </SwiperSlide>
                ))}
            </Swiper>

            <ConWrap>
              {similar &&
                similar.map((simil) => (
                  <Con
                    style={{
                      background: `url(${imgUrl}${simil.backdrop_path}) no-repeat center / cover`,
                    }}
                  ></Con>
                ))}
            </ConWrap>
          </Container>
        </div>
      )}
    </div>
  );
};
