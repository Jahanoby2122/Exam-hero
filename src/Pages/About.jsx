import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.2 } }
};

// Animated component wrapper
const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerChildren}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "বিশেষজ্ঞ মেন্টর",
      description: "বিষয়ভিত্তিক বিশেষজ্ঞদের দ্বারা তৈরি করা কোর্স এবং গাইডলাইন। আমাদের মেন্টররা বিভিন্ন সরকারি পরীক্ষায় উত্তীর্ণ এবং অভিজ্ঞতা সম্পন্ন।"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "বিস্তারিত এনালিটিক্স",
      description: "বিস্তারিত performance analysis এবং improvement suggestions. আপনার দুর্বলতা চিহ্নিত করে সেগুলো কাটিয়ে উঠার জন্য personalized পরামর্শ প্রদান।"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "কমিউনিটি সাপোর্ট",
      description: "এক্সপার্ট এবং peer community-এর সাথে আলোচনা এবং doubt clearing. গ্রুপ স্টাডি, লাইভ সেশন এবং ফোরামের মাধ্যমে শেখার অভিজ্ঞতা সম্পন্ন করুন।"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "নিয়মিত আপডেট",
      description: "পরীক্ষার সিলেবাস এবং প্রশ্ন প্যাটার্ন的变化 অনুযায়ী নিয়মিত content আপডেট। সর্বশেষ পরীক্ষার trend অনুসারে study materials উন্নত করা।"
    }
  ];

  const teamMembers = [
    {
      name: "ড. আহমেদ হোসেন",
      role: "প্রধান একাডেমিক উপদেষ্টা",
      bio: "১৫ বছরের বেশি অভিজ্ঞতা সহ বিসিএস ক্যাডার এবং শিক্ষা বিশেষজ্ঞ।",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "প্রফেসর সেলিনা আক্তার",
      role: "কন্টেন্ট ডিরেক্টর",
      bio: "১০ বছরের বেশি সময় ধরে পরীক্ষা প্রস্তুতি বিষয়ে কোর্স ডিজাইন করছেন।",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "রিয়াদুল ইসলাম",
      role: "সিনিয়র মেন্টর",
      bio: "বাংলাদেশের শীর্ষস্থানীয় বিশ্ববিদ্যালয়ের স্নাতকোত্তর এবং পরীক্ষা প্রস্তুতি বিশেষজ্ঞ।",
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "তানজিনা আহমেদ",
      role: "স্টুডেন্ট সাপোর্ট ম্যানেজার",
      bio: "শিক্ষার্থীদের প্রয়োজন বুঝে এবং তাদের সাফল্যের পথ সুগম করতে বিশেষভাবে দক্ষ।",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const milestones = [
    { year: "2015", event: "প্ল্যাটফর্ম চালু", description: "১০০ শিক্ষার্থী নিয়ে যাত্রা শুরু" },
    { year: "2017", event: "১০০০+ সফল শিক্ষার্থী", description: "প্রথমবারের মতো ১০০০ শিক্ষার্থী বিভিন্ন পরীক্ষায় সফলতা" },
    { year: "2019", event: "মোবাইল অ্যাপ লঞ্চ", description: "Android এবং iOS অ্যাপ চালু, শিক্ষার্থীদের জন্য আরও সুবিধা" },
    { year: "2021", event: "৫০+ বিশেষজ্ঞ মেন্টর", description: "বিষয়ভিত্তিক বিশেষজ্ঞদের একটি শক্তিশালী টিম গঠন" },
    { year: "2023", event: "১০,০০০+ সফল শিক্ষার্থী", description: "মাইলস্টোন অর্জন - ১০,০০০+ শিক্ষার্থীর সাফল্য" }
  ];

  const testimonials = [
    {
      name: "রোকেয়া সুলতানা",
      role: "বিসিএস ক্যাডার",
      content: "এই প্ল্যাটফর্মের মাধ্যমে আমি আমার বিসিএস পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি নিতে পেরেছি। বিশেষ করে মক টেস্ট এবং এনালিটিক্স সিস্টেম অসাধারণ।",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "আরফাতুল ইসলাম",
      role: "ব্যাংক কর্মকর্তা",
      content: "মেন্টরদের উপযুক্ত গাইডলাইন এবং নোটস আমার ব্যাংক জব পরীক্ষায় সফল হতে সহায়তা করেছে। কমিউনিটি সাপোর্টও খুব ভালো।",
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "নুসরাত জাহান",
      role: "প্রাথমিক শিক্ষক",
      content: "নিয়মিত আপডেটেড কন্টেন্ট এবং লাইভ ক্লাসের মাধ্যমে আমি প্রাথমিক শিক্ষক নিয়োগ পরীক্ষায় সফল হয়েছি। ধন্যবাদ পুরো টিমকে।",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section className="py-20 bg-base-100 overflow-hidden" id="about">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <AnimatedSection className="text-center mb-16">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-primary mb-4">
            আমাদের সম্পর্কে
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            বাংলাদেশের অন্যতম সেরা অনলাইন পরীক্ষা প্রস্তুতি প্ল্যাটফর্ম
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-1 bg-secondary mx-auto"></motion.div>
        </AnimatedSection>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
                <div className="text-white text-center p-8 relative z-10">
                  <h3 className="text-3xl font-bold mb-4">সাফল্যের গল্প</h3>
                  <p className="text-xl">১০,০০০+ শিক্ষার্থী আমাদের মাধ্যমে তাদের কাঙ্খিত পরীক্ষায় সফল হয়েছেন</p>
                </div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                Since 2015
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">কেন আমাদের নির্বাচন করবেন?</h3>
              <p className="text-lg text-gray-600 mb-6">
                আমরা বাংলাদেশের শিক্ষার্থীদের জন্য সবচেয়ে কার্যকরী পরীক্ষা প্রস্তুতি সেবা প্রদান করি। আমাদের বিশেষজ্ঞদের দ্বারা ডিজাইন করা কোর্স এবং মক টেস্টের মাধ্যমে আপনি পাবেন সেরা প্রস্তুতি।
              </p>
              <p className="text-lg text-gray-600">
                ২০১৫ সাল থেকে আমরা পরীক্ষা প্রস্তুতিতে শিক্ষার্থীদের সাহায্য করে আসছি। আমাদের বিশেষজ্ঞ মেন্টররা প্রতিটি শিক্ষার্থীর দুর্বলতা চিহ্নিত করে তা কাটিয়ে উঠার জন্য প্রয়োজনীয় guidance প্রদান করে থাকেন।
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-primary">১০,০০০+</h4>
                <p className="text-gray-600">সফল শিক্ষার্থী</p>
              </div>
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-secondary">৫০০+</h4>
                <p className="text-gray-600">মক টেস্ট</p>
              </div>
              <div className="bg-accent/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-accent">১০০+</h4>
                <p className="text-gray-600">বিশেষজ্ঞ মেন্টর</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-primary">৯৮%</h4>
                <p className="text-gray-600">সাফল্যের হার</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary px-8">আমাদের কোর্স</button>
              <button className="btn btn-outline btn-primary px-8">ফ্রী ট্রায়াল</button>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <AnimatedSection className="mb-20">
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            আমাদের বিশেষ সুবিধাসমূহ
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Mission Vision Section */}
        <AnimatedSection className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={fadeInRight} className="bg-primary/10 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-primary p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">আমাদের লক্ষ্য</h3>
              </div>
              <p className="text-lg text-gray-700">
                বাংলাদেশের প্রতিটি শিক্ষার্থী যেন তাদের পূর্ণ সম্ভাবনা বিকাশ করতে পারে এবং কাঙ্খিত পরীক্ষায় সাফল্য অর্জন করতে পারে—এটাই আমাদের মূল লক্ষ্য। আমরা চাই প্রতিটি মেধাবী শিক্ষার্থী যেন উপযুক্ত নির্দেশনা ও সহায়তা পায়।
              </p>
            </motion.div>
            
            <motion.div variants={fadeInLeft} className="bg-secondary/10 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-secondary p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary">আমাদের Vision</h3>
              </div>
              <p className="text-lg text-gray-700">
                ডিজিটাল বাংলাদেশের vision কে সামনে রেখে আমরা গড়ে তুলতে চাই একটি comprehensive learning platform, যেখানে শিক্ষার্থীরা তাদের প্রয়োজনীয় সব resources পাবে একই জায়গায়।
              </p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection className="mb-20">
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            শিক্ষার্থীদের Success Stories
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-base-200 p-6 rounded-lg shadow-md relative"
              >
                <div className="absolute -top-4 -left-4 bg-primary text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-primary text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection className="mb-20">
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
           “আমাদের বিশেষজ্ঞ দল
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm">{member.bio}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Milestones Section */}
        <AnimatedSection className="mb-20">
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            আমাদের যাত্রা
          </motion.h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-xl font-bold text-primary">{milestone.year}</h4>
                      <h5 className="text-lg font-semibold mb-2">{milestone.event}</h5>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="text-center py-16 bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
              আপনার সাফল্যের যাত্রা শুরু করুন আজই!
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              বাংলাদেশের সেরা পরীক্ষা প্রস্তুতি প্ল্যাটফর্মে যোগ দিন এবং আপনার কাঙ্খিত চাকরি বা শিক্ষায় প্রবেশের স্বপ্ন পূরণ করুন।
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <button className="btn btn-accent px-8 text-white">ফ্রী ট্রায়াল শুরু করুন</button>
              <button className="btn btn-outline btn-white px-8">কোর্স এক্সপ্লোর করুন</button>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;