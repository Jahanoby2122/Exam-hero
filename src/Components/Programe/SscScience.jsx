import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { 
  AiOutlineBook, 
  AiOutlineExperiment, 
  AiOutlineCalculator, 
  AiOutlineBarChart,
  AiOutlineTeam,
  AiOutlineClockCircle,
  AiOutlineTrophy,
  AiOutlineQuestionCircle,
  AiOutlineSchedule,
  AiOutlineDollarCircle,
  AiOutlineVideoCamera,
  AiOutlineFileText,
  AiOutlineCheckCircle,
  AiOutlineStar,
  AiOutlineRocket
} from "react-icons/ai";

const SscScience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Sample subjects data
  const subjects = [
    {
      name: "Physics",
      icon: <AiOutlineExperiment className="text-2xl" />,
      description: "Explore the fundamental laws of the universe, from motion to energy and beyond.",
      topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"]
    },
    {
      name: "Chemistry",
      icon: <AiOutlineCalculator className="text-2xl" />,
      description: "Study matter, its properties, how and why substances combine or separate.",
      topics: ["Atomic Structure", "Chemical Bonding", "Organic Chemistry", "Acids & Bases", "Chemical Reactions"]
    },
    {
      name: "Biology",
      icon: <AiOutlineBarChart className="text-2xl" />,
      description: "Understand living organisms, their structure, function, growth, and evolution.",
      topics: ["Cell Biology", "Genetics", "Human Physiology", "Plant Biology", "Ecology"]
    },
    {
      name: "Mathematics",
      icon: <AiOutlineCalculator className="text-2xl" />,
      description: "Develop problem-solving skills through algebra, geometry, and calculus.",
      topics: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics"]
    }
  ];

  // Sample features data
  const features = [
    {
      title: "Expert Teachers",
      description: "Learn from experienced educators with proven track records",
      icon: <AiOutlineTeam className="text-3xl" />
    },
    {
      title: "Flexible Schedule",
      description: "Study at your own pace with 24/7 access to materials",
      icon: <AiOutlineClockCircle className="text-3xl" />
    },
    {
      title: "Practice Tests",
      description: "Regular assessments to track your progress",
      icon: <AiOutlineTrophy className="text-3xl" />
    },
    {
      title: "Doubt Sessions",
      description: "Weekly live sessions to clear your concepts",
      icon: <AiOutlineQuestionCircle className="text-3xl" />
    },
    {
      title: "Structured Curriculum",
      description: "Comprehensive coverage of all SSC Science topics",
      icon: <AiOutlineSchedule className="text-3xl" />
    },
    {
      title: "Affordable Pricing",
      description: "Quality education at an accessible price point",
      icon: <AiOutlineDollarCircle className="text-3xl" />
    }
  ];

  // Sample study materials
  const materials = [
    {
      type: "Video Lessons",
      icon: <AiOutlineVideoCamera className="text-2xl" />,
      count: "200+"
    },
    {
      type: "Practice Questions",
      icon: <AiOutlineFileText className="text-2xl" />,
      count: "1000+"
    },
    {
      type: "Mock Tests",
      icon: <AiOutlineCheckCircle className="text-2xl" />,
      count: "50+"
    },
    {
      type: "Study Notes",
      icon: <AiOutlineBook className="text-2xl" />,
      count: "300+"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">SSC Science Program</h1>
            <p className="text-xl mb-8">Comprehensive preparation for Secondary School Certificate Science curriculum</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn btn-primary btn-lg rounded-full px-8">
                <AiOutlineRocket className="mr-2" /> Enroll Now
              </button>
              <button className="btn btn-outline btn-light btn-lg rounded-full px-8">
                Free Trial
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform skew-y-2 -mb-8"></div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Program Overview</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Our SSC Science program is designed to provide students with a strong foundation in scientific concepts and problem-solving skills needed to excel in their exams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {materials.map((material, index) => (
              <div 
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="card-body text-center">
                  <div className="text-blue-600 flex justify-center mb-4">
                    {material.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{material.count}</h3>
                  <p className="text-gray-600">{material.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Subjects We Cover</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Our comprehensive curriculum covers all major subjects in the SSC Science stream with detailed lessons and practice materials.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subjects.map((subject, index) => (
              <div 
                key={index}
                className="card bg-base-100 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl"
              >
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="text-blue-600 mr-4">
                      {subject.icon}
                    </div>
                    <h3 className="text-xl font-bold">{subject.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{subject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, i) => (
                      <span key={i} className="badge badge-outline badge-primary">{topic}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Program?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">We provide everything you need to succeed in your SSC Science examinations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card bg-base-100 border border-gray-100 hover:border-blue-200 transition-all duration-500 p-6"
              >
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="max-w-3xl mx-auto">Hear from students who have excelled in their SSC exams with our program.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card bg-blue-700 bg-opacity-20 backdrop-blur-sm p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AiOutlineStar key={star} className="text-yellow-400 mx-1" />
                  ))}
                </div>
                <p className="mb-4">"This program completely transformed my understanding of science concepts. The teachers are amazing and the materials are top-notch."</p>
                <div className="flex items-center">
                  <div className="avatar placeholder mr-4">
                    <div className="bg-blue-800 text-white rounded-full w-12">
                      <span>ST</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Student Name</h4>
                    <p>SSC Science, 2023</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Excel in SSC Science?</h2>
            <p className="text-gray-600 mb-8">Join thousands of students who have achieved academic success with our program.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn btn-primary btn-lg rounded-full px-8">
                <AiOutlineRocket className="mr-2" /> Enroll Now
              </button>
              <button className="btn btn-outline btn-primary btn-lg rounded-full px-8">
                Contact Us
              </button>
            </div>
            <p className="mt-8 text-gray-500">Have questions? <a href="#" className="text-blue-600 font-medium">Talk to our academic counselor</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SscScience;