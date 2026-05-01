import { Component } from 'react';
import Card from './Card';

export default class CardList extends Component {
  render() {
    return (
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} />
        ))}
      </section>
    );
  }
}
