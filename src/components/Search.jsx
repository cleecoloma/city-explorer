import React from 'react';
import Map from './Map';
import Weather from './Weather';
import Food from './Food'
import Movie from './Movie';
import Error from './Error';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Loading from './Loading';

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;
const SERVER_URL = import.meta.env.VITE_EXPRESS_SERVER_URL;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: null,
      location: null,
      warningError: null,
      modalShow: false,
      weatherData: null,
      movieData: null,
      isVisible: false,
      foodData: null,
    };
  }

  setSearchQuery = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  handleVisibility = () => {
    this.setState({ 
      isVisible: !this.state.isVisible,
    })
  }

  handleForm = async (e) => {
    e.preventDefault();
    console.log(this.state.searchQuery);
    try {
      let locationResponse = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`
      );
      console.log('LocationIQ - Successful: ', locationResponse.data);
      let currentLocation = locationResponse.data[0];
      this.setState({ location: currentLocation });
      let weatherResponse = await axios.get(
        `${SERVER_URL}/weather?lon=${currentLocation.lon}&lat=${currentLocation.lat}`
      );
      let movieResponse = await axios.get(
        `${SERVER_URL}/movie?searchQuery=${this.state.searchQuery}`
      );
      let foodResponse = await axios.get(
        `${SERVER_URL}/food?lon=${currentLocation.lon}&lat=${currentLocation.lat}`
      );
      console.log('Weather Successful: ', weatherResponse.data);
      console.log('Movie Successful: ', movieResponse.data);
      console.log('Food Successful: ', foodResponse.data)
      this.setState({
        weatherData: weatherResponse.data,
        movieData: movieResponse.data,
        foodData: foodResponse.data
      });
    } catch (error) {
      this.toggleModal();
      // console.log('LocationIQ - Unsuccessful: ', error);
      this.setState({
        warningError: error,
      });
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
              required
            />
          </Form.Group>
          <Button variant="success" size="lg" type="submit">
            Explore!
          </Button>
          <p id="cityThings">
            {this.state.searchQuery && (
              <h2>
                Discover the charms of{' '}
                <span id="cityInput">
                  {this.state.searchQuery.toUpperCase()}
                </span>
              </h2>
            )}
          </p>
        </Form>
        <Loading isVisible={this.state.isVisible} />
        <div className="displayLocation">
          {this.state.location && (
            <>
              <Map
                cityName={
                  this.state.location ? this.state.location.display_name : null
                }
                latitude={this.state.location ? this.state.location.lat : null}
                longitude={this.state.location ? this.state.location.lon : null}
              />
              <Weather
                weatherData={
                  this.state.weatherData ? this.state.weatherData : null
                }
              />
              <Food
                foodData={this.state.foodData ? this.state.foodData : null}
              />
            </>
          )}
        </div>
        <div className="displayMovies">
          {this.state.movieData &&
            this.state.movieData.map((movie, index) => (
              <Movie key={index} movieData={movie} />
            ))}
        </div>
        <Error
          responseError={this.state.warningError}
          toggleModal={this.toggleModal}
          modalShow={this.state.modalShow}
        />
      </>
    );
  }
}

export default Search;
