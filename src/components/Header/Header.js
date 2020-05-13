import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
const Header = ({ onSubmitSearch }) => {
  const [city, setCity] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    if (city === '') {
      return;
    }
    onSubmitSearch(city);
  };

  return (
    <div className="header mt-3">
      <h3 className="mb-2"> Weather in your city!</h3>
      <div className="header__searchContainer">
        <div>
          <form onSubmit={onSearch}>
            <InputGroup>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="city"
              />
              <InputGroupAddon addonType="append">
                <Button type="submit">Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
      </div>
    </div>
  );
};

Header.prototype = {
  onSubmitSearch: PropTypes.func.isRequired,
};

export default Header;
