import React from 'react'
import '../style/Paginado.css';

export const Paginado = ({ currentRecipePage, allRecipe, page }) => {

  const numberPage = [];
  for (let i = 1; i <= Math.ceil(allRecipe / currentRecipePage); i++) {
    numberPage.push(i)
  }
  return (
    <div className='general'>
      <nav className="numberContainer">
        <div>
          {
            numberPage && numberPage.map(e => (
              <a
                className="number"
                key={e} onClick={() => page(e)}>{e}</a>
            ))
          }
        </div>
      </nav>
    </div>
  )
}
