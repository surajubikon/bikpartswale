import SmoothScroll from 'smooth-scroll';

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,            
  speedAsDuration: true,  
});

export default scroll; 
