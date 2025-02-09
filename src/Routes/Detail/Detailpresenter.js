import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 40px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(8px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
    margin-right: 40px;
`;

const Data = styled.div`
    width: 70%;
`;

const Title = styled.h3`
    font-size: 38px;
    margin-bottom: 8px;
`;

const ItemContainer = styled.div`
    margin: 20px 20px;
    color: #81ecec;
`;

const Item = styled.span`
    font-size: 15px;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 17px;
    line-height: 1.8;
    width: 80%;
    opacity: 0.8;
`;


const DetailPresenter = ({ result, loading, error }) => (
    loading ? (
      <>
        <Helmet>
          <title>Loading | Mingflix</title>
        </Helmet>
        <Loader />
      </>
    ) : (
        <Container>
          <Helmet>
            <title>
                {result.original_title ? result.original_title : result.original_name} | Mingflix{" "}
            </title>  
          </Helmet>
          <Backdrop
             bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
          />
          <Content>
              <Cover 
                bgImage={
                    result.poster_path
                     ? `https://image.tmdb.org/t/p/original${result.poster_path}` 
                     : require("../../assets/noPosterSmall.png")
                }
              />
              <Data>
                 <Title>
                     {result.original_title 
                        ? result.original_title 
                        : result.original_name }
                 </Title>
                 <ItemContainer>
                    <Item>
                       {result.release_date 
                          ? result.release_date.substring(0, 4)
                          : result.first_air_date.substring(0, 4)}
                    </Item>
                    <Divider>◦</Divider>
                    <Item>
                        {result.runtime ? result.runtime : result.episode_run_time[0]} min
                    </Item>
                    <Divider>◦</Divider>
                    <Item>
                        {result.genres &&
                           result.genres.map((genre, index) =>
                             index === result.genres.length - 1
                               ? genre.name
                               : `${genre.name} / `
                        )}
                    </Item>
                 </ItemContainer>
                 <Overview>{result.overview}</Overview> 
              </Data> 
          </Content>                
        </Container>)
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;