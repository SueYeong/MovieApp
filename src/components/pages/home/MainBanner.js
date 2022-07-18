import { faCirclePlay, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { imgUrl } from "../../../constants/constant";
import { mainStyle } from "../../../styles/globalStyle";

const Banner = styled.section`
  height: 80vh;
  padding: ${mainStyle.padding};
  padding-top: 250px;
  position: relative;
  @media screen and (max-width: 500px) {
    height: 100vh;
    position: relative;
  }
`;

const Title = styled.div`
  max-width: 650px;
  /* width: 100%; */
  font-size: 80px;
  font-weight: 700;
  line-height: 6rem;
  position: relative;
  z-index: 8;
  @media screen and (max-width: 500px) {
    /* width: 100%; */
    font-size: 45px;
    line-height: 4rem;
    position: absolute;
    bottom: 20%;
    left: 20px;
  }
`;

const Desc = styled.div`
  max-width: 700px;
  width: 100%;
  font-size: 18px;
  margin-top: 20px;
  line-height: 2rem;
  opacity: 0.9;
  font-weight: 300;
  position: relative;
  z-index: 8;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Preview = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
  position: relative;
  z-index: 8;
  cursor: pointer;
  svg {
    margin-left: 10px;
  }
  @media screen and (max-width: 500px) {
    position: absolute;
    bottom: 15%;
    left: 20px;
  }
`;

const PopUp = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(props) => props.displayresult};
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  font-size: 40px;
  z-index: 9;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 28px;
    top: 25px;
    right: 22px;
  }
`;

const Iframe = styled.iframe`
  width: 80%;
  height: 700px;
  border: 1px solid white;
  @media screen and (max-width: 500px) {
    height: 70vh;
  }
`;

const BlackBg = styled.div`
  width: 100%;
  height: 60vh;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(0, 0, 0, 0.7) 74%
  );
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const MainBanner = ({ playData }) => {
  // console.log(playData.id);
  const [previewData, setPreviewData] = useState();
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    const homedata = async () => {
      const {
        data: { results },
      } = await movieApi.video(playData.id);
      setPreviewData(results[0].key);
    };
    // console.log(previewdata);
    homedata();
  }, []);

  return (
    <Banner
      style={{
        background: `url(${imgUrl}${playData.backdrop_path}) no-repeat center / cover`,
      }}
    >
      <Title>{playData.title}</Title>
      <Desc>{playData.overview.slice(0, 100) + "..."}</Desc>
      <Preview onClick={() => setDisplay("flex")}>
        미리보기
        <FontAwesomeIcon icon={faCirclePlay} />
      </Preview>
      {previewData ? (
        <PopUp displayresult={display}>
          <CloseBtn onClick={() => setDisplay("none")}>
            <FontAwesomeIcon icon={faClose} />
          </CloseBtn>
          <Iframe
            src={`https://www.youtube.com/embed/${previewData}`}
            allowfullscreen
          ></Iframe>
        </PopUp>
      ) : null}
      <BlackBg />
    </Banner>
  );
};
