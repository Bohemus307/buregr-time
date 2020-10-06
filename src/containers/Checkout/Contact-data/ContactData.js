import React, { Component } from 'react';

import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = { 
    orderForm: {
      name: {
        elementType: 'imput',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      address: {
      street: {
        elementType: 'imput',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: ''
      },
      zipcode: {
        elementType: 'imput',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: ''
      },
      country: {
        elementType: 'imput',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'slowest', displayValue: 'Slowest'}]
        },
        value: ''
      }
    },
    loading: false,
    }
  }

  orderHandler = (event) => {
    event.preventDefault()
    // request 
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({ loading:false });
      this.props.history.push('/');

    })
    .catch((error) => {
      this.setState({ loading:false });
    })
  }

  render() {
    let form = (
      <form>
        <Input inputtype="input" className={classes.Input} type='text' name='name' placeholder='your Name' />
        <Input inputtype="input" className={classes.Input} type='text' name='email' placeholder='your Mail' />
        <Input inputtype="input" className={classes.Input} type='text' name='street' placeholder='Street' />
        <Input inputtype="input" className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
