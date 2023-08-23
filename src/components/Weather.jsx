import React from 'react';
import Card from 'react-bootstrap/Card';

class Map extends React.Component {
  render() {
    return (
      <Card className="cards">
        <h3>WEATHER</h3>
        <Card.Body style={{ backgroundColor: 'white' }}>
          {/* <Card.Title style={{ backgroundColor: 'white' }}>
            Weather Data
          </Card.Title> */}
          <Card.Text style={{ backgroundColor: 'white' }}>
            Date: {this.props.weatherData ? this.props.weatherData[0].date : ''}
            <br />
            Description:{' '}
            {this.props.weatherData
              ? this.props.weatherData[0].description
              : ''}
          </Card.Text>
          <Card.Text style={{ backgroundColor: 'white' }}>
            Date: {this.props.weatherData ? this.props.weatherData[1].date : ''}
            <br />
            Description:{' '}
            {this.props.weatherData
              ? this.props.weatherData[1].description
              : ''}
          </Card.Text>
          <Card.Text style={{ backgroundColor: 'white' }}>
            Date: {this.props.weatherData ? this.props.weatherData[2].date : ''}
            <br />
            Description:{' '}
            {this.props.weatherData
              ? this.props.weatherData[2].description
              : ''}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Map;
