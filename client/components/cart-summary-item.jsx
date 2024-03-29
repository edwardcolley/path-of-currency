import React from 'react';
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { Quantity } from './quantity';

export class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false,
      value: this.props.input.quantity,
      initValue: this.props.input.quantity,
      updateFunction: null,
      deleteModal: false
    };
    this.iconID = 'cartUpdateIcon' + this.props.input.product_id;
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
  }

  increment() {
    let newValue = this.state.value + 1;
    if (newValue > this.state.initValue || newValue < this.state.initValue) {
      document.getElementById(this.iconID).classList.add('zoom');
    } else if (newValue == this.state.initValue) {
      document.getElementById(this.iconID).classList.remove('zoom');
    }
    this.setState(prevState => ({
      value: ++prevState.value
    }));

  }

  decrement() {
    let newValue = this.state.value - 1;
    if (newValue > this.state.initValue || newValue < this.state.initValue) {
      document.getElementById(this.iconID).classList.add('zoom');
    } else if (newValue == this.state.initValue) {
      document.getElementById(this.iconID).classList.remove('zoom');
    }
    this.setState(prevState => ({
      value: prevState.value > 1 ? --prevState.value : 1
    }));
  }

  deleteItem() {
    this.setState({
      removed: true
    });
    this.props.delete(this.props.input);

  }

  updateItem() {
    if (this.state.value < this.state.initValue || this.state.value > this.state.initValue) {
      this.props.update(this.props.input, this.state.value);
      this.props.modal();
      document.getElementById(this.iconID).classList.remove('zoom');

    }
    this.setState({
      initValue: this.state.value
    });
  }

  toggleDeleteModal() {
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal
    }));
  }

  render() {
    const unitPrice = '$' + ((this.props.input.price / 100).toFixed(2));
    const totalPrice = '$' + ((this.state.value) * (this.props.input.price / 100)).toFixed(2);
    return (
      <React.Fragment>
        <tr>
          <td>
            <Row className="text-center">
              <Col>
                <img
                  className="zoom3"
                  height="50"
                  width="50"
                  src={this.props.input.image}
                  alt="item image"
                />
              </Col>
            </Row>
          </td>
          <td>
            <Row className="text-center mt-3">
              <Col>
                <Button
                  onClick={() => this.props.details('product details', this.props.input.product_id)}
                  color="link"
                  className="cartLink">{this.props.input.name}
                </Button>
              </Col>
            </Row>
          </td>
          <td>
            <Row className="text-right mt-3">
              <Col>
                {unitPrice}
              </Col>
            </Row>
          </td>
          <td>
            <Row className="text-right mt-3">
              <Col>
                {totalPrice}
              </Col>
            </Row>
          </td>
          <td>
            <Row className="mt-2">
              <Col>
                <Quantity
                  increment={this.increment}
                  decrement={this.decrement}
                  quantity={this.state.value}
                />
              </Col>
            </Row>
          </td>
          <td>
            <Row className="text-center">
              <Col>
                <i
                  className="far fa-edit fa-lg mt-3"
                  id={this.iconID}
                  onClick={this.updateItem}>
                </i>
              </Col>
            </Row>
          </td>
          <td>
            <Row className="text-center">
              <Col>
                <i
                  className="fas fa-trash-alt fa-lg mt-3 trashIcon zoom"
                  onClick={this.toggleDeleteModal}>
                </i>
              </Col>
            </Row>
          </td>
        </tr>
        <Modal
          isOpen={this.state.deleteModal}
          toggle={this.toggleDeleteModal}>
          <ModalHeader
            toggle={this.toggleDeleteModal}>Are you sure you want to remove this?
          </ModalHeader>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.deleteItem}>Remove Item</Button>{' '}
            <Button
              color="secondary"
              onClick={this.toggleDeleteModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }

}
