import React from 'react'

const Card = ({ title, desc }) => {
  
    return (
    <div className="colInnerActive">
        <h2>{title}</h2>
        <p>{desc}</p>
        <div className="leftSideBorder"></div>
    </div>
  )
}

export default Card