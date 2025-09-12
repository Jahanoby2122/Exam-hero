import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const slideRefs = useRef([]);
  const contentRefs = useRef([]);
  const intervalRef = useRef(null);

  const slides = [
    {
      image: banner1,
      title: "প্রস্তুতি নিন সেরা পরীক্ষার জন্য",
      description: "আমাদের এক্সপার্ট ডিজাইন করা মক টেস্ট এবং স্টাডি মেটেরিয়ালের সাথে পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি নিন",
      buttonText: "শুরু করুন",
      buttonLink: "#exams"
    },
    {
      image: banner2,
      title: "বাংলাদেশের সবচেয়ে বিশ্বস্ত পরীক্ষা প্লাটফর্ম",
      description: "হাজারো শিক্ষার্থীর সাফল্যের গল্প আমাদের সাথে যুক্ত। আপনার সাফল্যের যাত্রা শুরু হোক এখান থেকে",
      buttonText: "আমাদের সম্পর্কে",
      buttonLink: "#about"
    },
    {
      image: banner3,
      title: "যেকোনো পরীক্ষার জন্য সম্পূর্ণ স্টাডি প্যাক",
      description: "বিসিএস, ব্যাংক, বিশ্ববিদ্যালয় ভর্তি বা যে কোন প্রতিযোগিতামূলক পরীক্ষার জন্য সম্পূর্ণ গাইডলাইন",
      buttonText: "কোর্স এক্সপ্লোর করুন",
      buttonLink: "#courses"
    }
  ];

  // Initialize slide refs
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
    contentRefs.current = contentRefs.current.slice(0, slides.length);
  }, [slides.length]);

  // Set up animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation on component mount
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Animation for slide changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate current slide in
      if (slideRefs.current[currentSlide]) {
        gsap.fromTo(slideRefs.current[currentSlide],
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
        );
      }

      // Animate content in with staggered timing
      if (contentRefs.current[currentSlide]) {
        const contentElements = contentRefs.current[currentSlide].children;
        gsap.fromTo(contentElements,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power2.out",
            delay: 0.3
          }
        );
      }

      // Animate badge if it's the first slide
      if (currentSlide === 0) {
        gsap.fromTo(".info-badge",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.7)", delay: 1 }
        );
      }

    }, heroRef);

    return () => ctx.revert();
  }, [currentSlide]);

  // Auto slide with cleanup
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 6000);
  };

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    
    // Animate current slide out
    gsap.to(slideRefs.current[currentSlide], {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlide(index);
      }
    });
    
    startAutoSlide(); // Reset timer on manual navigation
  };

  const goToPrev = () => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  };

  return (
    <div ref={heroRef} className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh]  overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            ref={el => slideRefs.current[index] = el}
            className={`absolute inset-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            <div className="relative z-10 flex items-center justify-center h-full px-4">
              <div 
                ref={el => contentRefs.current[index] = el}
                className="text-center text-white max-w-4xl xl:max-w-6xl"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8 max-w-3xl xl:max-w-5xl mx-auto leading-relaxed">
                  {slide.description}
                </p>
                <a 
                  href={slide.buttonLink} 
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base md:text-lg px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {slide.buttonText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation buttons */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110"
          onClick={goToPrev}
        >
          <span className="text-xl md:text-2xl">❮</span>
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110"
          onClick={goToNext}
        >
          <span className="text-xl md:text-2xl">❯</span>
        </button>
        
        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-300'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Additional info badge */}
        <div className="absolute top-6 right-6 z-20 hidden md:block info-badge">
          <div className="bg-blue-600/90 text-white px-5 py-3 rounded-lg shadow-lg text-lg font-medium backdrop-blur-sm">
            <span className="font-bold">১০,০০০+</span> শিক্ষার্থী আমাদের সাথে সফল
          </div>
        </div>

        {/* Scroll indicator for desktop */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 hidden lg:flex flex-col items-center">
          <span className="text-white text-sm mb-2">স্ক্রল করুন</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;