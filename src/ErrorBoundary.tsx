import {Component, ErrorInfo, ReactNode} from "react";
import { Link } from "react-router-dom";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(
            `ErrorBoundary component caught an error`,
            error,
            errorInfo
        );
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>
                    There was an error with this listing.{" "}
                    <Link to="/">Click here</Link> to back to the home page.
                </h2>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
