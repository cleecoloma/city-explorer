import React from 'react';
import Card from 'react-bootstrap/Card';

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;

class Map extends React.Component {
  render() {
    return (
      <Card className="cards">
        <h3>LOCATION</h3>
        <Card.Img
          // style={{ height: '400px', width: '400px' }}
          variant="top"
          src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.props.latitude},${this.props.longitude}&zoom=12&size=400x400`}
        />
        <Card.Body style={{ backgroundColor: 'white' }}>
          <Card.Title style={{ backgroundColor: 'white' }}>
            {this.props.cityName}
          </Card.Title>
          <Card.Text style={{ backgroundColor: 'white' }}>
            Latitude: {this.props.latitude}
          </Card.Text>
          <Card.Text style={{ backgroundColor: 'white' }}>
            Longitude: {this.props.longitude}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Map;
