import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import pages from '@pages';
import { ErrorBoundary } from './errorBoundary';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<pages.Home />} />
                <Route path='/example' element={<pages.Example />} />
                <Route path='/subpage/*' element={<pages.Subpage />} />
                <Route path='*' element={<pages.Error title='404' description={'We can\'t seem to find the requested page. Check the link and try again.'} />} />
            </Routes>
        </BrowserRouter>
    );
};

let root = createRoot(document.getElementById('root'))
root.render(<ErrorBoundary> <App /> </ErrorBoundary>);
export default root;