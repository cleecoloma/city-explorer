import React from 'react';
import Map from './Map';
import Weather from './Weather';
import Movie from './Movie';
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
      movieData: '',
    };
  }

  setSearchQuery = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  handleForm = async (e) => {
    e.preventDefault();
    // console.log(API_KEY);
    console.log(this.state.searchQuery);
    try {
      let locationResponse = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`
      );
      console.log('LocationIQ - Successful: ', locationResponse.data);
      let currentLocation = locationResponse.data[0];
      this.setState({ location: currentLocation });
      //another request to our express server after the 1st request finishes. This is a promise.
      let weatherAndMovieResponse = await axios.get(
        `${SERVER_URL}/weather?searchQuery=${this.state.searchQuery}&lon=${currentLocation.lon}&lat=${currentLocation.lat}`
      );
      console.log('Successful: ', weatherAndMovieResponse.data);
      console.log(
        weatherAndMovieResponse.data.sendWeatherDataToClient,
        weatherAndMovieResponse.data.sendMovieDataToClient
      );
      this.setState({
        weatherData: weatherAndMovieResponse.data.sendWeatherDataToClient,
        movieData: weatherAndMovieResponse.data.sendMovieDataToClient,
      });
    } catch (error) {
      this.toggleModal();
      console.log('LocationIQ - Unsuccessful: ', error);
      this.setState({
        warningStatus: error.response.status,
        warningMessage: error.message,
      })
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
            {this.state.searchQuery &&
              <h2>
                Discover the charms of{' '}
                <span id="cityInput">
                  {this.state.searchQuery.toUpperCase()}
                </span>
              </h2>
            }
          </p>
        </Form>
        <div className="displayLocation">
          {this.state.location && 
          <>
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
          </>
          }
        </div>
        <div className="displayMovies">
          {this.state.movieData &&
            this.state.movieData.map((movie, index) => (
                <Movie key={index} movieData={movie} />
            ))}
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
