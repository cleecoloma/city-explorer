import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Food extends React.Component {
  render() {
    return (
      <Card
        className="cards"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3>FOOD TRUCKS</h3>
        <div style={{ overflow:'auto', height: '550px' }}>
          {this.props.foodData &&
            this.props.foodData.map((food, index) => (
              <Card.Body
                key={index}
                style={{
                  backgroundColor: 'lightgray',
                  borderRadius: '6px',
                  margin: '1rem 1rem',
                }}
              >
                <Card.Text>
                  <strong>Name: {food.name}</strong> <br />
                  Address: {food.displayAddress} <br />
                  Rating: {food.rating} <br />
                  Reviews: {food.reviewCount} <br />
                </Card.Text>
                <Button
                  style={{
                    width: '3rem',
                    textAlign: 'center',
                    margin: '0 auto',
                  }}
                  variant="primary"
                  size="sm"
                  href={food.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </Button>
              </Card.Body>
            ))}
        </div>
      </Card>
    );
  }
}

export default Food;
