import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Error extends React.Component {
  render() {
    return (
      <Modal show={this.props.modalShow} onHide={this.props.toggleModal}>
        <Modal.Header
          style={{ fontSize: '150%', fontWeight: 'bold', backgroundColor: 'white' }}
          closeButton
        >
          Error: {this.props.responseStatus}
        </Modal.Header>
        <Modal.Body style={{ width: '500px', backgroundColor: 'white' }}>
          Error Message: {this.props.responseMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => this.props.toggleModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Error;
