import React from 'react';
import Map from './Map';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      location: null,
    };
  }

  setSearchQuery = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  handleForm = (e) => {
    e.preventDefault();
    console.log(API_KEY);
    console.log(this.state.searchQuery);
    axios
      .get(
        `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`
      )
      .then((response) => {
        console.log('Successful: ', response.data);
        this.setState({ location: response.data[0] });
      })
      .catch((error) => {
        console.log('Unsuccessful: ', error);
      });
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    return (
      <>
        <Form style={{ marginBottom: '1rem' }} onSubmit={this.handleForm}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Search a City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city name here"
              onChange={this.handleChange}
              style={{ width:'20rem' }}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        <Map
          cityName={this.state.location ? this.state.location.display_name : ''}
          latitude={this.state.location ? this.state.location.lat : ''}
          longitude={this.state.location ? this.state.location.lon: ''}
        />
      </>
    );
  }
}

export default Search;
