import { Helmet } from "react-helmet-async";

export const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>Sue-Movie ㅣ {title}</title>
    </Helmet>
  );
};
