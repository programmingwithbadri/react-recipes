import React from 'react'
import { UserInfo } from './UserInfo'
import { UserRecipes } from './UserRecipes'

const Profile = ({ session }) => {
    return (
        <div>
            <UserInfo session={session} />
            <UserRecipes userName={session.getCurrentUser.userName} />
        </div>
    )
}

export default Profile
