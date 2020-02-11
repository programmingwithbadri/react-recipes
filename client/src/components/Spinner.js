import React from 'react';
import { PacmanLoader } from 'react-spinners';

export const Spinner = () => {
    return (
        <div className="spinner">
            <PacmanLoader color={'#1eaedb'} size={300} margin={'10px'} />
        </div>
    )
}
