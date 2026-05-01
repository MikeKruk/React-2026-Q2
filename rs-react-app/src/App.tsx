import { Component } from 'react';

import CardList from './features/search/components/CardList';
import SearchSection from './features/search/components/SearchSection';
import Footer from './layout/Footer';
import Header from './layout/Header';

export default class App extends Component {
  render() {
    return (
      <div className="min-h-screen px-4 bg-background flex flex-col">
        <Header />
        <main className="flex-1 my-4 flex flex-col gap-8">
          <SearchSection />
          <CardList />
        </main>
        <Footer />
      </div>
    );
  }
}
