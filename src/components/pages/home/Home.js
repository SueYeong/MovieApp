import { useEffect } from "react";
import { movieApi } from "../../../api";

export const Home = () => {
  useEffect(() => {
    const movieData = async () => {
      const {
        data: { results },
      } = await movieApi.nowPlaying();
      console.log(results[0].title);
      // console.log(playing.date.results);
      // console.log(await movieApi.nowPlaying());
    };
    movieData();
  }, []);

  return <div>Home</div>;
};
