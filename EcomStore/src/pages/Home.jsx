import React from 'react';
import './home.css'; 
import Navbar from '../components/Navbar';
import Nfolded from '../photos/Nfolded.avif';
import Leaf from '../photos/Leaf2.jpg';

const Home = () => {
  return (
  

    <section>
    <div className="containerNav">
      <Navbar />
   <div class="background-gif">
     
    </div>

</div>
    <div className="home">
      <div id='box1' class="sand">
      <h1 id='text1'>At Olive & Oak, we embrace the elegance of simplicity and the beauty of nature. Our brand is a harmonious blend of minimalistic design and earth-positive values, crafted for those who seek authenticity in every thread.</h1>
      </div>
      <div id='box2' class="sand">
      <h1 id='text2'>We believe in fashion that respects the planet. That's why we prioritize sustainable materials and ethical production methods. Our fabrics are sourced responsibly, and our manufacturing processes are designed to minimize environmental impact, ensuring that our footprint is as light as possible.</h1>
      </div>
      <img id='Nfolded' src={Nfolded} alt="" />
      <img id='Leaf' src={Leaf} alt="" />
      <p></p>
    </div>
    </section>

    
  );
};

export default Home;
