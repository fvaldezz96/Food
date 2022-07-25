import React from 'react'

export const Paginado = ({ currentRecipePage, allRecipe, page }) => {

  const numberPage = [];
  for (let i = 1; i <= Math.ceil(allRecipe / currentRecipePage); i++) {
    numberPage.push(i)
  }
  return (
    <nav>
      <div>
        {
          numberPage && numberPage.map(e => (
            <a
              key={e}
              onClick={() => page(e)}>{e}
            </a>
          ))
        }
      </div>
    </nav>
  )
}
