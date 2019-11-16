import React from 'react'
import { Link } from 'react-router-dom';

export const UserInfo = ({ session }) => {

    const formatDate = date => {
        const localDate = new Date(date).toLocaleDateString('en-US');
        const localTime = new Date(date).toLocaleTimeString('en-US');

        return `${localDate} at ${localTime}`
    }
    return (
        <div className="App">
            <h3>User Info</h3>
            <p>Username: {session.getCurrentUser.userName}</p>
            <p>Email: {session.getCurrentUser.email}</p>
            <p>Joined Date: {formatDate(session.getCurrentUser.joinedDate)}</p>
            <ul>
                <h3>{session.getCurrentUser.userName}'s favourites</h3>
                {session.getCurrentUser.favourites.map(favourite => (
                    <li key={favourite._id}>
                        <Link to={`/recipe/${favourite._id}`}>
                            <p>{favourite.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            {!session.getCurrentUser.favourites.length &&
                <strong>
                    <p> You have no favourites currently. Go add some! </p>
                </strong>
            }
        </div>
    )
}
