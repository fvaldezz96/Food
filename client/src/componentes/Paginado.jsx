import React from 'react'
import '../style/Paginado.css';

export const Paginado = ({ currentRecipePage, todasLasRecetas, page }) => {
  const numberPage = [];
  for (let i = 1; i <= Math.ceil(todasLasRecetas / currentRecipePage); i++) {
    numberPage.push(i)
  }

  return (
    <div className='general'>
      <nav className="numberContainer">
        <div>
          {
            numberPage?.map((e) => (
              <a className="number" key={e} onClick={() => page(e)}>{e}</a>
            ))
          }
        </div>
      </nav>
    </div>
  )
}
