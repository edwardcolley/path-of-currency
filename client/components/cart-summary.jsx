import React from 'react';
import { CartSummaryItem } from './cart-summary-item';
import { Container, Row, Col, Button, Table, Modal, ModalHeader, ModalFooter } from 'reactstrap';

export class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  renderCart() {
    var idArray = Object.keys(this.props.cart);
    return idArray.map((id, index) => {
      return (
        <CartSummaryItem details={this.props.details} delete={this.props.delete} modal={this.toggleModal} update={this.props.update} key={id} input={this.props.cart[id]} />
      );
    });
  }

  render() {
    var priceArray = [];
    for (var key in this.props.cart) {
      var itemTotal = (this.props.cart[key]['price']) * parseInt(this.props.cart[key]['quantity']);
      priceArray.push(itemTotal);
    }
    let totalItemPrices = priceArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
    const priceTotalInDollars = '$' + ((totalItemPrices / 100).toFixed(2));
    return (
      <React.Fragment>
        <Row>
          <Col xs={{ size: 10, offset: 1 }} className="checkoutBackground">
            <Row className="poeBanner mt-3 justify-content-center">
              <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">Shopping Cart</h1>
            </Row>
            <Container>
              <Row className="justify-content-around">
                <Button size="sm" color="secondary" onClick={() => this.props.back('catalog', {})} type="button" className="mt-5 mb-3">Shop</Button>
                <h2 className="mt-5 text-white mobileFontHeader">Total: {priceTotalInDollars}</h2>
                {totalItemPrices > 0 &&
               <Button size="sm" color="primary" onClick={() => this.props.back('checkout', {})} type="button" className="mt-5 mb-3">Checkout</Button>
                }
              </Row>
              {totalItemPrices > 0 &&
              <Row className="justify-content-center">
                <Table bordered responsive size="sm" className="ml-1 tableStyle">
                  <thead>
                    <tr>
                      <th className="text-center">Image</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Unit Price</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Update</th>
                      <th className="text-center">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderCart()}
                  </tbody>
                </Table>
              </Row>
              }
              {totalItemPrices === 0 &&
                <Row className="justify-content-center">
                  <p className="text-white font-weight-bold">You have no items in your cart</p>
                </Row>
              }
            </Container>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal}>
          <ModalHeader className="text-center">
              Item has been updated!
          </ModalHeader>
          <ModalFooter>
            <Button onClick={this.toggleModal} color="info">Close</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );

  }
}
