import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import pages from 'pages';

let root = createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<pages.Home />} />
            <Route path='/example' element={<pages.Example />} />
            <Route path='/subpage/*' element={<pages.Subpage />} />
        </Routes>
    </BrowserRouter>
);