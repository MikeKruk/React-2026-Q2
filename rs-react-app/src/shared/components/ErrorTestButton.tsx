import { Component } from 'react';

interface State {
  crash: boolean;
}

export default class ErrorTestButton extends Component {
  state: State = {
    crash: false,
  };

  handelClick = () => {
    this.setState({ crash: true });
  }
  render() {
    const { crash } = this.state;
    if (crash) throw new Error('Test error');
    return (
      <button
        className="    
        w-full max-w-1/3 md:max-w-35 p-0.5 rounded-md
        border border-gray-500"
        onClick={this.handelClick}
      >
        Throw error
      </button>
    );
  }
}
