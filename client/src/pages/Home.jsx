import React from 'react'
const Home = ({ isLoggedIn }) => {
  return (
    <div className='flex justify-center items-center text-white text-3xl h-full' class="container">
      Home
      <div class="card">
        <img src="logo.jpg" alt="Card 1"></img>
        <h2>Card 1</h2>
        <p>This is card 1.</p>
        <a href="#">Learn More</a>
      </div>
      <div class="card">
        <img src="logo.jpg" alt="Card 2"></img>
        <h2>Card 2</h2>
        <p>This is card 2.</p>
        <a href="#">Learn More</a>
      </div>
      <div class="card">
        <img src="logo.jpg" alt="Card 3"></img>
        <h2>Card 3</h2>
        <p>This is card 3.</p>
        <a href="#">Learn More</a>
      </div>
    </div>
    
  )
}

export default Home
