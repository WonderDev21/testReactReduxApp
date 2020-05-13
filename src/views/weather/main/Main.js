import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getWeatherForcast } from '../reducer';
import { isPending, needsLoading, hasFailed } from 'libs/state';
import Header from 'components/Header';
import DayItem from 'components/DayItem';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';

const override = css`
  display: block;
  margin: 2 auto;
  width: 4,
  height: 35,
  radius: 2,
  border-color: red;
`;

const Main = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.weather.state);
  const info = useSelector((state) => state.weather.weather_info);

  useEffect(() => {
    // dispatch(getWeatherForcast({ city: 'London' }));
  }, [dispatch]);

  const onSubmitSearch = (city) => {
    dispatch(getWeatherForcast({ city: city }));
  };

  return (
    <Container>
      <Header onSubmitSearch={onSubmitSearch} />
      <Row noGutters>
        <Col className="text-center mt-5">
          {needsLoading(state, true) && (
            <h6 className="notification">Please input your city.</h6>
          )}
          {hasFailed(state) && (
            <h6 className="notification">Sorry! Cannot find data.</h6>
          )}
          {isPending(state) ? (
            <ScaleLoader
              css={override}
              color={`rgb(239, 108, 84)`}
              loading={true}
            />
          ) : (
            info.list &&
            info.list.map((item, index) => {
              return <DayItem data={item} city={info.city} key={index} />;
            })
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
