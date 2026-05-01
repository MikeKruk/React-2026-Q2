import { Component } from 'react';

import Footer from './layout/Footer';
import Header from './layout/Header';

export default class App extends Component {
  render() {
    return (
      <div className="min-h-screen px-4 bg-background flex flex-col">
        <Header />
        <main className='flex-1'>
          <section>search</section>
          <section>result</section>
        </main>
        <Footer />
      </div>
    );
  }
}
