import React from 'react'
import '../style/Paginado.css';

export const Paginado = ({ currentRecipePage, todasLasRecetas, page }) => {
  const numberPage = [];
  for (let i = 1; i <= Math.ceil(todasLasRecetas / currentRecipePage); i++) {
    numberPage.push(i)
  }

  return (
    <div className='general'>
      <nav className="numPage">
        <div>
          {
            numberPage?.map((e) => (
              <button className="number" key={e} onClick={() => page(e)}>{e}</button>
            ))
          }
        </div>
      </nav>
    </div>
  )
}
