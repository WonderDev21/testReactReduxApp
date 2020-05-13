import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Badge } from 'reactstrap';
import { kToC } from 'libs/validate';

const DayItem = ({ data, city }) => {
  const clothes = (condition) => {
    if (
      condition.toLowerCase() === 'rain' ||
      condition.toLowerCase() === 'shower rain' ||
      condition.toLowerCase() === 'rain' ||
      condition.toLowerCase() === 'thunderstorm' ||
      condition.toLowerCase() === 'rain' ||
      condition.toLowerCase() === 'snow'
    ) {
      return 'Umbrella';
    } else {
      return 'Jacket';
    }
  };

  return (
    <>
      <Row>
        <Col xs={2} className="text-center">
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt="icon"
          />
        </Col>
        <Col xs={8} className="text-left">
          <h6 className="weather__top">
            <span className="weather__city">
              {city.name}, {city.country}{' '}
            </span>
            <img
              src={`http://openweathermap.org/images/flags/${city.country.toLowerCase()}.png`}
              alt="flag"
            />{' '}
            <i className="font-weight-bold">{data.weather[0].description}</i>
          </h6>
          <h6>
            <Badge color="dark" pill>
              <strong>{kToC(data.main.temp)}°С</strong>
            </Badge>{' '}
            <span className="font-weight-normal">
              temperature from {kToC(data.main.temp_min)}°С to{' '}
              {kToC(data.main.temp_max)}°С{', '}
              wind {data.wind.speed}m/s. coulds {data.clouds.all} %,
              {data.main.pressure} hpa
            </span>
          </h6>
          <h6 className="font-weight-normal">
            Date:{' '}
            <span className="weather__city font-weight-normal">
              [{data.dt_txt}]
            </span>
          </h6>
        </Col>
        <Col xs={2}>
          <h5 className="font-weight-bold">{clothes(data.weather[0].main)}</h5>
        </Col>
      </Row>
      <hr />
    </>
  );
};

DayItem.prototype = {
  data: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
};

export default DayItem;
