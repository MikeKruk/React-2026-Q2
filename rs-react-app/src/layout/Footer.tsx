import { Component } from 'react';

export default class Footer extends Component {
  year = new Date().getFullYear();

  render() {
    return (
      <footer>
        <div className="flex flex-row justify-between">
          <div>
            <p className='max-sm:text-sm'>© {this.year} All rights reserved</p>
          </div>
          <p>
            Created by{' '}
            <a
              href="https://github.com/MikeKruk"
              aria-label="Link to MikeKruk github profile"
              target="_blank"
              rel="noreferrer"
              className="
              max-sm:text-sm font-bold
              hover:underline
              active:text-blue-500
              "
            >
              MikeKruk
            </a>
          </p>
        </div>
      </footer>
    );
  }
}
