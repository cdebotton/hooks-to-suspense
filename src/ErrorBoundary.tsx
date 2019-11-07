import { Component, ReactNode, ErrorInfo } from 'react';

type Props = {
  fallback: ReactNode;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  state = { error: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
