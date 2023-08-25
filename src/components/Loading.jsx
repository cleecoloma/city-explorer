import React from 'react'

class Loading extends React.Component {
  render() {
    return (
    <>
      {this.props.isVisible && <p>LOADING. Please wait...</p>}
    </>);
  }
}

export default Loading;
