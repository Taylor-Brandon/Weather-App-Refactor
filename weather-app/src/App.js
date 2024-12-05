import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Result from './pages/result';
import './styles/style.css';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    )
}