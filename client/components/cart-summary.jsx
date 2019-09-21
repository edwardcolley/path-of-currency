import React from 'react';
import { CartSummaryItem } from './cart-summary-item';
import { Container, Row, Button } from 'reactstrap';

export class CartSummary extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.renderCart = this.renderCart.bind(this);
  // }

  convertObject() {
    var cartArray = Object.keys(this.props.cart);
    this.renderCart(cartArray);
  }

  renderCart() {
    var cartArray = Object.keys(this.props.cart);
    return cartArray.map((item, key) => {
      return (
        <CartSummaryItem delete={this.props.delete} key={key} input={this.props.cart[item]} />
      );
    });
  }

  render() {
    console.log('this.props: ', this.props);
    // var cartArray = Object.keys(this.props.cart)
    // console.log('cart-summary: this.props.cart: ', this.props.cart);
    // if (cartArray === 0) {
    //   return (
    //     <React.Fragment>
    //       <Row className="poeBanner mt-3 justify-content-center">
    //         <img height="100" src="/images/poeicon3.jpg" className="mt-3"></img>
    //         <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">My Cart</h1>
    //       </Row>
    //       <Row className="justify-content-around">
    //         <Button color="secondary" onClick={() => this.props.back('catalog', {})} type="button" className="mt-5 mb-3">Back</Button>
    //         <h2 className="text-white mt-5">You have no items in your cart.</h2>
    //         <h2 className="text-white mt-5">Total: $0.00</h2>
    //       </Row>
    //     </React.Fragment>
    //   );
    // } else {
    // Already used ---> const totalItemPrices = this.props.cart.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price), 0);
    // Already used ---> const priceTotalInDollars = '$' + ((totalItemPrices / 100).toFixed(2));
    var priceArray = [];
    console.log('priceArray.length: ', priceArray.length);
    for (var key in this.props.cart) {
      priceArray.push(this.props.cart[key]['price']);
    }
    let totalItemPrices = priceArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
    const priceTotalInDollars = '$' + ((totalItemPrices / 100).toFixed(2));
    console.log(priceTotalInDollars);
    return (
      <React.Fragment>
        <Row className="poeBanner mt-3 justify-content-center">
          <img height="100" src="/images/poeicon3.jpg" className="mt-3"></img>
          <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">My Cart</h1>
        </Row>
        <Container>
          <Row className="justify-content-around">
            <Button color="secondary" onClick={() => this.props.back('catalog', {})} type="button" className="mt-5 mb-3">Back</Button>
            <h2 className="mt-5 text-white">Total: {priceTotalInDollars}</h2>
            {priceTotalInDollars.length > 0 &&
               <Button color="primary" onClick={() => this.props.back('checkout', {})} type="button" className="mt-5 mb-3">Checkout</Button>
            }
          </Row>
          <Row className="justify-content-center">
            {this.renderCart()}
          </Row>
        </Container>
      </React.Fragment>
    );

  }
}
// }
