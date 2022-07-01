import { useEffect, useState } from "react";
import { movieApi } from "../../../api";
import { movieNum } from "../../../constants/constant";
import { Loading } from "../../Loading";
import { MainBanner } from "./MainBanner";
import { Container } from "../../Container";
import { Movies } from "./Movies";
import { PageTitle } from "../../PageTitle";

export const Home = () => {
  const [playing, setPlaying] = useState();
  const [rated, setRated] = useState();
  const [comming, setComming] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const movieData = async () => {
      try {
        const {
          data: { results: playingData },
        } = await movieApi.nowPlaying();
        // console.log(results[0].title);
        // console.log(playing.date.results);
        // console.log(await movieApi.nowPlaying());
        setPlaying(playingData);

        const {
          data: { results: ratedData },
        } = await movieApi.topRated();
        // => 비구조화 할당 이용시 변수명 변경할땐
        // 변수명:변경할명
        setRated(ratedData);

        const {
          data: { results: upCommingData },
        } = await movieApi.upComming();
        setComming(upCommingData);

        // setTimeout(() => {
        setLoading(false);
        // }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    movieData();
  }, []);

  // console.log(`현재상영 영화:`, playing);
  // console.log("인기 영화:", rated);
  // console.log("개봉예정 영화:", comming);

  return (
    <div>
      <PageTitle title={"Home"} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {playing && (
            <>
              <MainBanner playData={playing[movieNum]} />
              <Container>
                <Movies movieData={playing} title={"현재 상영 영화"} />
                <Movies movieData={rated} title={"인기 영화"} />
                <Movies movieData={comming} title={"개봉 예정 영화"} />
              </Container>
            </>
          )}
        </>
      )}
    </div>
  );
};
