import React from 'react'
import { UserInfo } from './UserInfo'
import { UserRecipes } from './UserRecipes'
import { WithAuth } from '../WithAuth'

const Profile = ({ session }) => (
    <div>
        <UserInfo session={session} />
        <UserRecipes userName={session.getCurrentUser.userName} />
    </div>
);

export default WithAuth(session => session && session.getCurrentUser)(Profile);
