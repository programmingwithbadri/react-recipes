import React from 'react'

export default function RecipeItem({ name, category }) {
    return (
        <li>
            <h4>{name}</h4>
            <p><strong>{category}</strong></p>
        </li>
    )
}
