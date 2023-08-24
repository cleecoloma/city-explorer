import React from 'react';
import Card from 'react-bootstrap/Card';

class Map extends React.Component {
  render() {
    return (
      <Card className="cards">
        <h3>WEATHER</h3>
        <Card.Body style={{ backgroundColor: 'white' }}>
          {this.props.weatherData &&
            this.props.weatherData.map((weather, index) => (
              <Card.Text key={index}>
                Date: {weather.date}
                <br />
                Description: {weather.description}
              </Card.Text>
            ))}
        </Card.Body>
      </Card>
    );
  }
}

export default Map;
