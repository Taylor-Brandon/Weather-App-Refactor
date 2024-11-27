import React from 'react';
import 'dotenv/config';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </Router>
    )
}