import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { ScrollTop } from "../../../ScrollTop";
import { Container } from "../../Container";
import { Loading } from "../../Loading";
import { PageTitle } from "../../PageTitle";
import { MovieDetail } from "./MovieDetail";
import "swiper/css";
import "swiper/css/navigation";

const Iframe = styled.iframe`
  width: 50%;
  height: 700px;
  margin-top: 150px;
  @media screen and (max-width: 500px) {
    height: 60vh;
    margin-top: 100px;
  }
`;

export const Detail = () => {
  const [movieData, setMovieData] = useState();
  const [trailer, setTrailer] = useState();
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
      setLoading(false);
      // console.log(results);
    };
    detailDate();
  }, [id]);
  // console.log(videoData);
  console.log(trailer);

  return (
    <div>
      <PageTitle title={"Detail"} />
      <ScrollTop />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {movieData && <MovieDetail movieData={movieData} />}
          {trailer &&
            trailer.map((trail) => (
              <Iframe
                src={`https://www.youtube.com/embed/${trail.key}`}
                allowfullscreen
              ></Iframe>
            ))}
        </Container>
      )}
    </div>
  );
};
