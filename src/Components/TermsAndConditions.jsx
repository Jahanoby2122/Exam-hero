import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const TermsAndConditions = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: 'acceptance', title: 'শর্তাবলীর গ্রহণযোগ্যতা' },
    { id: 'eligibility', title: 'যোগ্যতা' },
    { id: 'use-of-service', title: 'সেবার ব্যবহার' },
    { id: 'content', title: 'কনটেন্ট ও বৌদ্ধিক সম্পদ' },
    { id: 'payments', title: 'পেমেন্ট ও সাবস্ক্রিপশন' },
    { id: 'ai-tutor', title: 'এআই টিউটর দাবিত্যাগ' },
    { id: 'community', title: 'কমিউনিটি নির্দেশিকা' },
    { id: 'liability', title: 'দায় সীমাবদ্ধতা' },
    { id: 'privacy', title: 'গোপনীয়তা ও ডেটা' },
    { id: 'termination', title: 'সমাপ্তি' },
    { id: 'changes', title: 'শর্তাবলীতে পরিবর্তন' },
    { id: 'contact', title: 'যোগাযোগ করুন' },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation */}
      <div className={`navbar fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-base-100 shadow-md' : 'bg-transparent'}`}>
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">এক্সাম হিরো</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}
                  className="text-sm"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/" className="btn btn-primary">হোম পেজ</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">ব্যবস্থা ও শর্তাবলী</h1>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            এক্সাম হিরোতে আপনাকে স্বাগতম। এই অ্যাপ্লিকেশন ডাউনলোড, ইনস্টল বা ব্যবহার করার মাধ্যমে আপনি এই ব্যবস্থা ও শর্তাবলীর দ্বারা আবদ্ধ হতে সম্মত হন। অ্যাপটি ব্যবহার করার আগে অনুগ্রহ করে এগুলো সাবধানে পড়ুন।
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar for section navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-base-100 rounded-box shadow p-4">
              <h2 className="text-xl font-bold mb-4">বিষয়সূচি</h2>
              <ul className="menu">
                {sections.map(section => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(section.id);
                      }}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms Content */}
          <div className="lg:w-3/4">
            <div className="bg-base-100 rounded-box shadow p-6 md:p-8">
              {/* Acceptance of Terms */}
              <div id="acceptance" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">১. শর্তাবলীর গ্রহণযোগ্যতা</h2>
                <p className="mb-4">
                  এক্সাম হিরো ব্যবহার করার মাধ্যমে আপনি এই ব্যবস্থা ও শর্তাবলী এবং আমাদের গোপনীয়তা নীতি মেনে নিতে সম্মত হন। আপনি যদি সম্মত না হন, অনুগ্রহ করে অ্যাপটি ব্যবহার বন্ধ করুন।
                </p>
              </div>

              {/* Eligibility */}
              <div id="eligibility" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">২. যোগ্যতা</h2>
                <p className="mb-4">
                  এই অ্যাপটি এসএসসি, এইচএসসি এবং অনুরূপ বোর্ড পরীক্ষার জন্য প্রস্তুতিমূলক শিক্ষার্থীদের জন্য তৈরি। অ্যাপটি ব্যবহার করার জন্য আপনার বয়স সর্বনিম্ন ১৩ বছর হতে হবে।
                </p>
              </div>

              {/* Use of Service */}
              <div id="use-of-service" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">৩. সেবার ব্যবহার</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li className="mb-2">অ্যাপটি শুধুমাত্র শিক্ষাগত উদ্দেশ্যে ব্যবহার করতে হবে।</li>
                  <li className="mb-2">ব্যবহারকারীদের অবশ্যই অ্যাপটি হ্যাক করা, এর কার্যক্রমে বিঘ্ন সৃষ্টি করা বা ক্ষতিকর কনটেন্ট প্রবেশ করানোর চেষ্টা করা থেকে বিরত থাকতে হবে।</li>
                  <li className="mb-2">প্রতিটি অ্যাকাউন্ট ব্যক্তিগত; অনুমতি ছাড়া এটি বিক্রি, ভাগ বা স্থানান্তর করা যাবে না।</li>
                </ul>
              </div>

              {/* Content & Intellectual Property */}
              <div id="content" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">৪. কনটেন্ট ও বৌদ্ধিক সম্পদ</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li className="mb-2">সমস্ত পড়াশোনার সামগ্রী, ভিডিও সমাধান, পিডিএফ, এআই-জেনারেটেড উত্তর এবং অন্যান্য কনটেন্ট এক্সাম হিরো এবং তার অংশীদারদের বৌদ্ধিক সম্পদ।</li>
                  <li className="mb-2">লিখিত সম্মতি ছাড়া কনটেন্ট কপি, পুনরায় বিতরণ বা অ্যাপের বাইরে ব্যবহার করা যাবে না।</li>
                  <li className="mb-2">অননুমোদিত ব্যবহার অ্যাকাউন্ট স্থগিতকরণ বা আইনি পদক্ষেপের কারণ হতে পারে।</li>
                </ul>
              </div>

              {/* Payments & Subscriptions */}
              <div id="payments" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">৫. পেমেন্ট ও সাবস্ক্রিপশন</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li className="mb-2">কিছু ফিচার বিনামূল্যে উপলব্ধ; প্রিমিয়াম ফিচারের জন্য পেমেন্ট বা সাবস্ক্রিপশনের প্রয়োজন হতে পারে।</li>
                  <li className="mb-2">প্রযোজ্য আইন দ্বারা প্রয়োজন না হলে, সমস্ত পেমেন্ট চূড়ান্ত এবং ফেরতযোগ্য নয়।</li>
                  <li className="mb-2">ব্যবহারকারীদের বৈধ পেমেন্ট পদ্ধতি বজায় রাখার দায়িত্ব তাদের নিজস্ব।</li>
                </ul>
              </div>

              {/* AI Tutor Disclaimer */}
              <div id="ai-tutor" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">৬. এআই টিউটর দাবিত্যাগ</h2>
                <p className="mb-4">
                  এআই টিউটর তাৎক্ষণিক উত্তর ও সহায়তা প্রদান করে, কিন্তু এর নির্ভুলতা নিশ্চিত করা হয় না। শিক্ষার্থীদেরকে শিক্ষক বা নির্ভরযোগ্য উৎসের সাথে উত্তর যাচাই করে নেওয়ার জন্য উৎসাহিত করা হয়।
                </p>
              </div>

              {/* Community Guidelines */}
              <div id="community" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">৭. কমিউনিটি নির্দেশিকা</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li className="mb-2">স্টুডেন্ট কমিউনিটিতে পারস্পরিক সম্মানের সাথে যোগাযোগ বাধ্যতামূলক।</li>
                  <li className="mb-2">ক্ষতিকর, অপমানজনক বা অনুপযুক্ত কনটেন্ট নিষিদ্ধ।</li>
                  <li className="mb-2">নিয়ম লঙ্ঘনের ফলে কনটেন্ট মুছে ফেলা, অ্যাকাউন্ট সাময়িক বা স্থায়ীভাবে বাতিল করা হতে পারে।</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div id="liability" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">৮. দায় সীমাবদ্ধতা</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li className="mb-2">পরীক্ষার ফলাফল, পারফরম্যান্স বা অ্যাপ ব্যবহারের ফলে সৃষ্ট যে কোনো ফলাফলের জন্য এক্সাম হিরো দায়ী নয়।</li>
                  <li className="mb-2">আমরা শিক্ষাগত সহায়তা প্রদান করি, কিন্তু সাফল্য শিক্ষার্থীর নিজ প্রচেষ্টার উপর নির্ভর করে।</li>
                </ul>
              </div>

              {/* Privacy & Data */}
              <div id="privacy" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">৯. গোপনীয়তা ও ডেটা</h2>
                <p className="mb-4">
                  অ্যাপ ব্যবহার করার মাধ্যমে আপনি আমাদের গোপনীয়তা নীতিতে সম্মত হন, যা নিয়ন্ত্রণ করে আমরা কীভাবে ডেটা সংগ্রহ, ব্যবহার এবং সুরক্ষা করি। আমরা অনুমোদন ছাড়া তৃতীয় পক্ষের সাথে ব্যক্তিগত ডেটা বিক্রি বা ভাগ করি না।
                </p>
              </div>

              {/* Termination */}
              <div id="termination" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">১০. সমাপ্তি</h2>
                <p className="mb-4">
                  আমরা এই শর্তাবলী লঙ্ঘনকারী অ্যাকাউন্টগুলি পূর্ব জানানো ছাড়াই স্থগিত বা সমাপ্ত করতে পারি।
                </p>
              </div>

              {/* Changes to Terms */}
              <div id="changes" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">১১. শর্তাবলীতে পরিবর্তন</h2>
                <p className="mb-4">
                  এক্সাম হিরো যেকোনো সময় এই শর্তাবলী আপডেট বা পরিবর্তন করার অধিকার সংরক্ষণ করে। উল্লেখযোগ্য পরিবর্তনগুলি ব্যবহারকারীদেরকে জানানো হবে।
                </p>
              </div>

              {/* Contact Us */}
              <div id="contact" className="mb-8 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4">১২. যোগাযোগ করুন</h2>
                <p className="mb-4">
                  এই ব্যবস্থা ও শর্তাবলী সম্পর্কে আপনার যদি কোন প্রশ্ন থাকে, তবে আমাদের সাথে যোগাযোগ করুন:
                </p>
                <div className="bg-primary text-primary-content p-4 rounded-box">
                  <p className="font-semibold">📧 support@examhero.app</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="text-center mt-8">
                <p className="mb-4">এই শর্তাবলী পড়ার জন্য আপনাকে ধন্যবাদ</p>
                <Link to="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
