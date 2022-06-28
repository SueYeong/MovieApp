import styled from "styled-components";
import { mainStyle } from "../styles/globalStyle";

const Section = styled.div`
  padding: ${mainStyle.padding};
`;

export const Container = ({ children }) => {
  return <Section>{children}</Section>;
};
