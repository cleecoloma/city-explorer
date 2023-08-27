import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Food extends React.Component {
  render() {
    return (
      <Card className="cards">
        <h3>FOOD TRUCKS</h3>
        {this.props.foodData &&
          this.props.foodData.map((food, index) => (
            <>
              <Card.Body style={{ backgroundColor: 'white' }}>
                <Card.Text key={index}>
                  Name: {food.name}
                  Address: {food.displayAddress}
                  Rating: {food.rating}
                  Reviews: {food.reviewCount}
                </Card.Text>
              </Card.Body>
              <Button
                key={index}
                variant="primary"
                size="sm"
                href={food.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </Button>
            </>
          ))}
      </Card>
    );
  }
}

export default Food;
