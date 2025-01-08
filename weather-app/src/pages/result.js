import React from 'react';
import Current from '../components/current';
import Future from '../components/future';

export default function Result() {
    return (
        <div>
        <Current />
        <div id='five-area'>
        <Future />
        </div>
        </div>
    );
}