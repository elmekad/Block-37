import React from 'react';
import '../pages/Home.css'; 
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
      <h1>At Olive & Oak, we embrace the elegance of simplicity and the beauty of nature. Our brand is a harmonious blend of minimalistic design and earth-positive values, crafted for those who seek authenticity in every thread.</h1>
      </div>
      <div id='box2' class="sand">
      <h1></h1>
      </div>
      <img id='Nfolded' src={Nfolded} alt="" />
      <img id='Leaf' src={Leaf} alt="" />
      <p></p>
    </div>
    </section>

    
  );
};

export default Home;
