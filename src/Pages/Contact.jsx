import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaChalkboardTeacher, FaBookReader, FaGraduationCap, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const AnimatedCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentType: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    alert('আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।');
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      studentType: '',
      subject: '',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            শিক্ষক-শিক্ষার্থী সংযোগ প্ল্যাটফর্ম
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            এসএসসি ও এইচএসসি শিক্ষার্থীদের জন্য বিশেষায়িত শিক্ষক সংযোগ সেবা
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="space-y-8">
            <AnimatedCard className="card bg-white shadow-xl border-t-4 border-primary">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 flex items-center">
                  <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                    <FaPhone className="text-white text-sm" />
                  </span>
                  যোগাযোগ তথ্য
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                      <FaPhone className="text-primary text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">ফোন নম্বর</h3>
                      <p className="text-gray-600">+৮৮০ ১৭XX-XXXXXX</p>
                      <p className="text-gray-600">+৮৮০ ১৯XX-XXXXXX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                      <FaEnvelope className="text-primary text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">ইমেইল</h3>
                      <p className="text-gray-600">contact@educonnect.com</p>
                      <p className="text-gray-600">support@educonnect.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                      <FaMapMarkerAlt className="text-primary text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">ঠিকানা</h3>
                      <p className="text-gray-600">শিক্ষা সড়ক, ঢাকা-১২১২</p>
                      <p className="text-gray-600">বাংলাদেশ</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                      <FaClock className="text-primary text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">কর্মঘণ্টা</h3>
                      <p className="text-gray-600">শনিবার-বৃহস্পতিবার: সকাল ৯টা - রাত ১০টা</p>
                      <p className="text-gray-600">শুক্রবার: বন্ধ</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Stats Section */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div variants={fadeIn} className="card bg-white shadow-lg border-t-4 border-secondary">
                <div className="card-body p-6">
                  <div className="flex items-center">
                    <div className="bg-secondary/10 p-3 rounded-full mr-4">
                      <FaChalkboardTeacher className="text-secondary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-secondary">১২৫+</h3>
                      <p className="text-gray-600">সক্রিয় শিক্ষক</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="card bg-white shadow-lg border-t-4 border-accent">
                <div className="card-body p-6">
                  <div className="flex items-center">
                    <div className="bg-accent/10 p-3 rounded-full mr-4">
                      <FaBookReader className="text-accent text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-accent">৩,৫০০+</h3>
                      <p className="text-gray-600">নিবন্ধিত শিক্ষার্থী</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="card bg-white shadow-lg border-t-4 border-primary">
                <div className="card-body p-6">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <FaGraduationCap className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-primary">৯৫%</h3>
                      <p className="text-gray-600">সাফল্যের হার</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="card bg-white shadow-lg border-t-4 border-info">
                <div className="card-body p-6">
                  <div className="flex items-center">
                    <div className="bg-info/10 p-3 rounded-full mr-4">
                      <FaUsers className="text-info text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-info">১০+</h3>
                      <p className="text-gray-600">বছরের অভিজ্ঞতা</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <AnimatedCard className="card bg-white shadow-xl border-t-4 border-secondary">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-2">যোগাযোগ করুন</h2>
              <p className="text-gray-600 mb-6">
                নিচের ফর্মটি পূরণ করুন এবং আমরা আপনার সাথে যোগাযোগ করব
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">আপনার নাম</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার পুরো নাম লিখুন" 
                    className="input input-bordered input-primary bg-gray-50" 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">ইমেইল ঠিকানা</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="আপনার ইমেইল ঠিকানা" 
                      className="input input-bordered input-primary bg-gray-50" 
                      required 
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">ফোন নম্বর</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="আপনার ফোন নম্বর" 
                      className="input input-bordered input-primary bg-gray-50" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">শিক্ষার্থীর শ্রেণী</span>
                    </label>
                    <select 
                      name="studentType"
                      value={formData.studentType}
                      onChange={handleChange}
                      className="select select-bordered select-primary bg-gray-50"
                      required
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="SSC">এসএসসি</option>
                      <option value="HSC">এইচএসসি</option>
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">বিষয়</span>
                    </label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="select select-bordered select-primary bg-gray-50"
                      required
                    >
                      <option value="">বিষয় নির্বাচন করুন</option>
                      <option value="Physics">পদার্থবিজ্ঞান</option>
                      <option value="Chemistry">রসায়ন</option>
                      <option value="Mathematics">গণিত</option>
                      <option value="Biology">জীববিজ্ঞান</option>
                      <option value="English">ইংরেজি</option>
                      <option value="Bangla">বাংলা</option>
                      <option value="Other">অন্যান্য</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">বার্তা</span>
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered textarea-primary h-24 bg-gray-50" 
                    placeholder="আপনার বার্তা বা প্রয়োজনীয়তা লিখুন..."
                    required
                  ></textarea>
                </div>
                
                <div className="form-control mt-2">
                  <button 
                    type="submit" 
                    className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                  </button>
                </div>
              </form>
            </div>
          </AnimatedCard>
        </div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center mb-4">সচরাচর জিজ্ঞাসিত প্রশ্ন</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            শিক্ষক-শিক্ষার্থী সংযোগ প্ল্যাটফর্ম সম্পর্কে সাধারণ কিছু প্রশ্ন ও উত্তর
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "কিভাবে একজন শিক্ষক খুঁজে পাব?",
                answer: "আমাদের ওয়েবসাইটে রেজিস্ট্রেশন করার পর, আপনি আপনার প্রয়োজন অনুযায়ী শিক্ষক খুঁজে পেতে পারেন এবং সরাসরি যোগাযোগ করতে পারেন।"
              },
              {
                question: "ক্লাসগুলো কিভাবে নেওয়া হয়?",
                answer: "ক্লাসগুলো অনলাইন এবং অফলাইন উভয়ভাবেই নেওয়া হয়। আপনি আপনার পছন্দমতো পদ্ধতি বেছে নিতে পারেন।"
              },
              {
                question: "ক্লাসের ফি কত?",
                answer: "বিষয় এবং শিক্ষকের qualifications অনুযায়ী ফি ভিন্ন হয়। সাধারণত প্রতি মাসে ২০০০-৫০০০ টাকা পর্যন্ত হয়ে থাকে।"
              },
              {
                question: "কিভাবে পেমেন্ট করতে হয়?",
                answer: "বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করা যায়। নিরাপদ লেনদেনের জন্য আমাদের প্ল্যাটফর্ম ব্যবহার করতে পারেন।"
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card bg-white shadow-lg border-l-4 border-primary hover:shadow-xl transition-shadow duration-300"
              >
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-start">
                    <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;