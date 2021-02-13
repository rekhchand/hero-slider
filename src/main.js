import { gsap } from "gsap";

const revealBg = document.querySelector('.reveal-bg'),
      logo = document.querySelector('.logo'),
      navLinks = document.querySelectorAll('.navbar li'),
      heroSpans = document.querySelectorAll('.hero .line-inner'),
      heroButton = document.querySelector('.hero button'),
      videoBtn = document.querySelector('.video'),
      sliderContent = document.querySelectorAll('.slide .slide-content'),
      sliderContentBar = document.querySelectorAll('.slide .bar');

revealBg.style.height = "100%";

window.onload = function() {
  let loading = document.querySelector('header .loading');
  loading.style.animation = `loading ${intervalTime}ms linear infinite`;

  document.querySelector('header').style.opacity = "1";

  let tl = gsap.timeline();

  tl.fromTo(revealBg, { height: "100%" }, {
    duration: 1,
    height: 0,
    ease: "power3.out"
  }, "0.1")
  
  tl.from([logo, navLinks, ".navbar button"], {
    duration: 0.7,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: "power3.out"
  }, "-=0.2")
  
  tl.from(heroSpans, {
    duration: 1,
    y: 120,
    stagger: 0.15,
    ease: "power3.out"
  }, "-=1.1")
  
  tl.from(heroButton, {
    duration: 0.5,
    y: 20,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.55")
  
  tl.from(videoBtn, {
    duration: 0.5,
    y: 20,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.4")
  
  tl.from(sliderContent, {
    duration: 0.7,
    y: 20,
    opacity: 0,
  }, "-=0.6")
  
  tl.from(sliderContentBar, {
    duration: 0.5,
    width: "100%",
    ease: "power3.out"
  }, "-=0.2")
  
  
  // ------------------------------
  // Header Slider
  // ------------------------------
  const slides = document.querySelectorAll('header .slide');
  let n = slides.length;
  const auto = true;
  const intervalTime = 7000;
  let slideInterval;
  
  // number of Dots
  const dots = document.querySelector('header .slider-dots');
  
  for(let i = 0; i < n; i++) {
    var dot = document.createElement('span');
    dots.appendChild(dot);
  }
  dots.firstElementChild.classList.add('current');
  const spanDots = document.querySelectorAll('header .slider-dots span');
  
  const nextAnim = () => {
  
    gsap.fromTo(".slide.current",
    { x: "100%" }, 
    {
      duration: 1,
      x: 0,
      ease: "power3.out"
    });
  
    gsap.fromTo(".slide.current",
    { scale: 1.2, },
    {
      duration: 1,
      scale: 1,
      ease: "power3.out"
    });
    
    gsap.fromTo(sliderContentBar, 
      { width: "100%", }, 
      {
      duration: 0.5,
      delay: 0.7,
      width: 5,
      ease: "power3.out"
    });
  
  }
  
  const nextSlide = () => {
      
    // Reset
    const current = document.querySelector('header .slide.current');
    current.classList.remove('current');
    slides.forEach ((slide) => {
      if (slide.classList.contains('previous')) {
        slide.classList.remove('previous');
      }
    });
    current.classList.add('previous');
  
    const dotCurrent = document.querySelector('header .slider-dots span.current');
    dotCurrent.classList.remove('current');
    
    // Logic
    if (current.nextElementSibling) {
      current.nextElementSibling.classList.add('current');
      dotCurrent.nextElementSibling.classList.add('current');
    } else {
      slides[0].classList.add('current');
      spanDots[0].classList.add('current');
    }
    setTimeout(() => {
      current.classList.remove('current');
      dotCurrent.classList.remove('current');
    });
  
    nextAnim();
  };

  const resetAutoAnim = () => {
    if(auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
        
      loading.style.animation = `none`;
      loading.offsetWidth;
      loading.style.animation = `loading ${intervalTime}ms linear infinite`;
    }
  }
  
  spanDots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
        
      // Reset
      const current = document.querySelector('header .slide.current');
      current.classList.remove('current');
      slides.forEach ((slide) => {
        if (slide.classList.contains('previous')) {
          slide.classList.remove('previous');
        }
      });
      current.classList.add('previous');
  
      const dotCurrent = document.querySelector('header .slider-dots span.current');
      dotCurrent.classList.remove('current');
  
      // Logic
      if(!dot.classList.contains('current')) {
        dot.classList.add('current');
  
        slides[i].classList.add('current');
      }
  
      nextAnim();
  
      resetAutoAnim();
    });
  });
  
  if(auto) {
    slideInterval = setInterval(nextSlide, intervalTime);
    loading.style.animation = `loading ${intervalTime}ms linear infinite`;
  }

}
