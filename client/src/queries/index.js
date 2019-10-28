import { gql } from 'apollo-boost';

// Recipe Queries
export const GET_ALL_RECIPES = gql`
query {
    getAllRecipes{
        name
        description
        instructions
        category
        likes
        createdDate  
    }
}
`;

// User Queries
export const GET_CURRENT_USER = gql`
query {
    getCurrentUser{
        userName
        joinedDate
        email 
    }
}
`;

// User mutations
export const SIGNUP_USER = gql`
mutation($userName:String!, $email: String!, $password:String!){
    signUpUser(userName: $userName, email: $email, password: $password){
      token
    }
  }
`;

export const SIGNIN_USER = gql`
mutation($userName:String!, $password:String!){
    signInUser(userName: $userName, password: $password){
      token
    }
  }
`; 