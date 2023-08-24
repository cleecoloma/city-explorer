import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {
  render() {
    let imageUrl = this.props.movieData.imageUrl;
    return (
      <Card className="movieCards">
        <Card.Img
          variant="top"
          src={
            imageUrl
              ? 'https://image.tmdb.org/t/p/w500/' +
                imageUrl
              : 'https://placehold.co/500x750'
          }
        />
        <Card.Body style={{ backgroundColor: 'white' }}>
          <Card.Title>Title: {this.props.movieData.title}</Card.Title>
          <Card.Text>
            Overview: {this.props.movieData.overview.slice(0, 200) + '...'}
            <br />
            Released On: {this.props.movieData.releasedOn}
            <br />
            Average Votes: {this.props.movieData.averageVotes}
            <br />
            Total Votes: {this.props.movieData.totalVotes}
            <br />
            Popularity: {this.props.movieData.popularity}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Movie;
