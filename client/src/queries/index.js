import { gql } from 'apollo-boost';

export const GET_ALL_RECIPES = gql `
query {
    name,
    description,
    instructions,
    category,
    likes,
    createdDate  
}
`;