import React, { useState, useEffect } from 'react';
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setIsTransitioning(false);
      }, 800);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100' 
                : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            <div className="relative z-10 flex items-center justify-center h-full px-4">
              <div className={`text-center text-white max-w-4xl transition-all duration-1000 ${
                index === currentSlide && !isTransitioning 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto">
                  {slide.description}
                </p>
                <a 
                  href={slide.buttonLink} 
                  className="btn btn-primary text-lg px-8 py-3 rounded-lg transform hover:scale-105 transition-transform duration-300 inline-flex items-center"
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 btn btn-circle btn-outline btn-sm md:btn-md glass text-white hover:bg-white hover:text-primary transition-all duration-300"
          onClick={goToPrev}
        >
          ❮
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 btn btn-circle btn-outline btn-sm md:btn-md glass text-white hover:bg-white hover:text-primary transition-all duration-300"
          onClick={goToNext}
        >
          ❯
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
        <div className="absolute top-6 right-6 z-20 hidden md:block">
          <div className="bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg">
            <span className="font-semibold">১০,০০০+</span> শিক্ষার্থী আমাদের সাথে সফল
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;