import React from 'react';
import Map from './Map';
import Weather from './Weather';
import Error from './Error';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      location: null,
      warningStatus: '',
      warningMessage: '',
      modalShow: false,
      weatherData: '',
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
        console.log('LocationIQ - Successful: ', response.data);
        // let currentLocation = response.data[0];
        this.setState({ location: response.data[0] });
        return axios.get(
          `http://localhost:3001/weather?searchQuery=${this.state.searchQuery}&lon=${response.data[0].lon}&lat=${response.data[0].lat}`
        ); //another request to our express server after the 1st request finishes. This is a promise.
      })
      .then((response) => {
        console.log('Weather - Successful: ', response);
        this.setState({ weatherData: response.data });
      })
      .catch((error) => {
        this.setState({ warningStatus: error.response.status });
        this.setState({ warningMessage: error.message });
        this.toggleModal();
        console.log('LocationIQ - Unsuccessful: ', error);
      });
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  toggleModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  render() {
    return (
      <>
        <Form style={{ marginBottom: '1rem' }} onSubmit={this.handleForm}>
          <Form.Group controlId="formBasicText">
            <Form.Label className="searchHeader">
              <h2>Explore a City</h2>
            </Form.Label>
            <Form.Control
              className="searchInput"
              type="text"
              placeholder="Enter city name here"
              onChange={this.handleChange}
              style={{ width: '30rem' }}
              required
            />
          </Form.Group>
          <Button
            variant="success"
            size="lg"
            type="submit"
          >
            Explore!
          </Button>
          <p id="cityThings">
            {this.state.searchQuery ? (
              <h2>
                Discover the charms of{' '}
                <span id="cityInput">
                  {this.state.searchQuery.toUpperCase()}
                </span>
              </h2>
            ) : null}
          </p>
        </Form>
        <Map
          cityName={this.state.location ? this.state.location.display_name : ''}
          latitude={this.state.location ? this.state.location.lat : ''}
          longitude={this.state.location ? this.state.location.lon : ''}
        />
        <Weather
          latitude={this.state.location ? this.state.location.lat : ''}
          longitude={this.state.location ? this.state.location.lon : ''}
          weatherData={this.state.weatherData ? this.state.weatherData : ''}
        />
        <Error
          responseStatus={this.state.warningStatus}
          responseMessage={this.state.warningMessage}
          toggleModal={this.toggleModal}
          modalShow={this.state.modalShow}
        />
      </>
    );
  }
}

export default Search;
