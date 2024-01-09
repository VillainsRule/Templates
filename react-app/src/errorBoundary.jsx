import React from 'react';
import pages from '@pages';

export class ErrorBoundary extends React.Component {
    state = {
        error: ''
    };

    constructor(props) {
        super(props);
    };

    static getDerivedStateFromError(error) {
        return {
            error
        };
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error
        });
        console.error(error, errorInfo);
    };

    render() {
        if (this.state.error !== '') return (<pages.Error title='ultra rare error' description={'there was a very rare error showing annotate to you. reload the page, and if this error persists, please contact developers.'} />);
        return this.props.children;
    };
};