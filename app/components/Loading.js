import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
  }

  static defaultProps = {
    text: 'Loading',
    speed: 300,
  }

  state = {
    text: this.props.text,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.text == this.props.text + '---') {
        this.setState(()=>({ text: this.props.text }));
      } else {
        this.setState((prevState)=>({ text: prevState.text + '-' }));
      }
    }, this.props.speed);
  }

  componentWillUnmount() {
    console.log('Clearing interval');
    window.clearInterval(this.interval);
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        {text}
      </div>
    )
  }

}

export default Loading;
