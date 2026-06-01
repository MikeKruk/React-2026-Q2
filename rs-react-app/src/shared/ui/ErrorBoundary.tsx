import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  State
> {
  state: State = {
    hasError: false,
  };


  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Caught error:', error, errorInfo);
  }
  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    return hasError ? (
      <div className='min-h-screen flex justify-center items-center bg-background'>
        <h1>Something went wrong. Please refresh the page</h1>
      </div>
    ) : (
      children
    );
  }
}
