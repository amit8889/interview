import React, { Component } from 'react';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Log the error to the console
    console.error('Error caught by ErrorBoundary:', error, info);
    // Update state to indicate that an error occurred
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI here
      return <div>Something went wrong. Please try again later.</div>;
    }
    // Render the child components normally
    return this.props.children;
  }
}

export default Error;
