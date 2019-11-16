import React from 'react'
import { UserInfo } from './UserInfo'

const Profile = ({ session }) => {
    return (
        <div>
            <UserInfo session={session} />
        </div>
    )
}

export default Profile
