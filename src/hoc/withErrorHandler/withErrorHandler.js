import React, { Component } from 'react';

import Modal from '../../components/UI/modal/modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error: null
    }
    componentDidMount () {
      axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req;
      })
      axios.interceptors.response.use( res => res, error => {
        this.setState({
          error: error
        })
      })
    }

    errorConfimerdHandler = () => {
      this.setState({
        error: null
      })
    }

    render () {
      return (
        <Aux >
            <Modal show={this.state.error} clicked={this.errorConfimerdHandler} >
              {this.state.erro ? this.state.error.message : null}
            </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;