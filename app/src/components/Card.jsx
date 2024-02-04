import React from 'react'

const Card = ({ children }) => {
  return (
    <div
      className="w-full
bg-gray-100  rounded-xl p-3 shadow-lg"
    >
      {children}
    </div>
  )
}

export default Card
