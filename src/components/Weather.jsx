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
                Date:{' '}
                {this.props.weatherData[0].date}
                <br />
                Description:{' '}
                {this.props.weatherData[0].description}
              </Card.Text>
            ))}
        </Card.Body>
      </Card>
    );
  }
}

export default Map;
