import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {
  render() {
    return (
      <Card className="cards">
        <h3>MOVIES</h3>
        <Card.Body style={{ backgroundColor: 'white' }}>
          {this.props.movieData &&
            this.props.movieData.map((movie, index) => (
              <Card.Text key={index}>
                Date: {movie.title}
                <br />
                Description: {movie.overview}
              </Card.Text>
            ))}
        </Card.Body>
      </Card>
    );
  }
}

export default Movie;
