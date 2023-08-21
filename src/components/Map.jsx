import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Map extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem', alignItem: 'center' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{this.props.cityName}</Card.Title>
          <Card.Text>
            Latitude: {this.props.latitude}
          </Card.Text>
          <Card.Text>
            Longitude: {this.props.longitude}
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    );
  }
}

export default Map;
