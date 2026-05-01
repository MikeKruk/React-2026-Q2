import { Component } from 'react';

export default class Card extends Component {
  render() {
    return (
      <div className="border border-gray-500 rounded-md p-4">
        <div>Image</div>
        <div>Name</div>
        <div>Description</div>
      </div>
    );
  }
}
