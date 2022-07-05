import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { imgUrl } from "../../../constants/constant";
import { Container } from "../../Container";
import { Loading } from "../../Loading";
import { PageTitle } from "../../PageTitle";

const SearchWrap = styled.div`
  margin-top: 150px;
`;

const Input = styled.input`
  all: unset;
  /* => 반드시 제일 윗쪽 */
  width: 100%;
  border: 1px solid #555;
  padding: 20px;
  box-sizing: border-box;
  font-size: 20px;
  &::placeholder {
    font-size: 20px;
  }
`;

const ConWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 30px;
  row-gap: 50px;
  margin-top: 150px;
`;

const Con = styled.div`
  /* width: 200px; */
`;

const Bg = styled.div`
  height: 300px;
`;

const Title = styled.h3`
  margin-top: 10px;
  font-size: 18px;
`;

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const searchMoive = async () => {
    const { search: term } = getValues();
    // =>getValues는 인풋태그에 작성된 내용을 가져옴
    setLoading(true);
    try {
      const {
        data: { results },
      } = await movieApi.search(term);

      if (results.length <= 0) {
        setError("results", {
          message: "영화가 없어요!",
        });
        // =>setError("에러이름", {massage:"값"})
        // =>useForm에 있는 속성으로 에러를 설정할수 있음
      } else {
        setSearchTerm(results);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);
  // =>폼상태에 에러처리 담당

  console.log(searchTerm);

  return (
    <div>
      <PageTitle title={"Search"} />

      <Container>
        <SearchWrap>
          <form onSubmit={handleSubmit(searchMoive)}>
            <Input
              {...register("search", {
                required: "내용은 필수 입니다",
                onChange() {
                  clearErrors("results");
                },
              })}
              type="text"
              placeholder="영화 검색..."
            />

            {errors?.search?.message}
            {/* =>Optional chaining */}
            {errors?.results?.message}
          </form>
        </SearchWrap>

        {loading ? (
          <Loading />
        ) : (
          <>
            {searchTerm && (
              <ConWrap>
                {searchTerm.map((term) => (
                  <Con key={term.id}>
                    <Link to={`/detail/${term.id}`}>
                      <Bg
                        style={{
                          background: `url(${imgUrl}${term.backdrop_path}) no-repeat center / cover`,
                        }}
                      />
                      <Title>{term.title}</Title>
                    </Link>
                  </Con>
                ))}
              </ConWrap>
            )}
          </>
        )}
      </Container>
    </div>
  );
};
