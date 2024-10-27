import { Link } from "react-router-dom";
import { Main } from "../../utils";
import { Container } from "./not-found-styled";
import { Text } from "../../utils/constants";
import { PrimaryBtn } from "../units/units-styled";

export const NotFound = () => {
  return (
    <Main>
      <Container>
        <Text size={60}> Not Found   : (</Text>
        <Link to={"/"}>
        <PrimaryBtn>Go Back</PrimaryBtn>
        </Link>
      </Container>
    </Main>
  );
};
