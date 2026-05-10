import { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className="flex justify-center">
        <h1
          className="
          text-xl font-bold 
          bg-linear-to-r from-yellow-500 to-orange-500 
          bg-clip-text text-transparent"
        >
          Pokémon Explorer
        </h1>
      </header>
    );
  }
}
