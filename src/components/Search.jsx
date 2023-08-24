import React from 'react';
import Map from './Map';
import Weather from './Weather';
import Error from './Error';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;
const SERVER_URL = import.meta.env.VITE_EXPRESS_SERVER_URL;

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

  handleForm = async (e) => {
    e.preventDefault();
    console.log(API_KEY);
    console.log(this.state.searchQuery);
    try {
      let locationResponse = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`
      );
      console.log('LocationIQ - Successful: ', locationResponse.data);
      let currentLocation = locationResponse.data[0];
      this.setState({ location: currentLocation });
      //another request to our express server after the 1st request finishes. This is a promise.
      let weatherBitResponse = await axios.get(
        `${SERVER_URL}/weather?searchQuery=${this.state.searchQuery}&lon=${currentLocation.lon}&lat=${currentLocation.lat}`
      );
      console.log('Weather - Successful: ', weatherBitResponse.data);
      this.setState({ weatherData: weatherBitResponse.data });
    } catch (error) {
      // this.setState({ warningStatus: error.response.status });
      // this.setState({ warningMessage: error.message });
      this.toggleModal();
      console.log('LocationIQ - Unsuccessful: ', error);
    }
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
          <Button variant="success" size="lg" type="submit">
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
        <div className="display">
          <Map
            cityName={
              this.state.location ? this.state.location.display_name : ''
            }
            latitude={this.state.location ? this.state.location.lat : ''}
            longitude={this.state.location ? this.state.location.lon : ''}
          />
          <Weather
            weatherData={this.state.weatherData ? this.state.weatherData : ''}
          />
        </div>
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
