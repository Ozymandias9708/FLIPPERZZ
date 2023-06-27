import React from 'react'
import './SingleCard.css'

export default function SingleCard({card,choiceMaker,flippedState,disabledState}) {

    const flipIt = () => {
      if(!disabledState){
        choiceMaker(card)
      }
        
    }

  return (
      <div className='card' key={card.id}>
            <div className={flippedState ? 'flipped' : ''}> 
              <img className='front' src={card.src} alt="Flipped Card" />
              <img className='cover' src='images/cover.png' onClick={flipIt} alt="Unflipped Card" />
            </div>
          </div>

  )
}
