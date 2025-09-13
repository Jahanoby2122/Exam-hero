import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChalkboardTeacher, FaGraduationCap, FaBook, FaClock, FaEnvelope, FaPhone } from "react-icons/fa";

const AllTeahers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const API_URL = "http://localhost:5000";

  // Fetch approved teachers only
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/teachers`);
      setTeachers(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch teachers", error);
      setError("শিক্ষকদের ডেটা লোড করতে সমস্যা হয়েছে।");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">শিক্ষকদের তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">ত্রুটি</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchTeachers}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            আমাদের <span className="text-blue-600">শিক্ষকবৃন্দ</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            দক্ষ ও অভিজ্ঞ শিক্ষকমণ্ডলী যারা আপনাকে গাইড করবে সাফল্যের পথে
          </p>
        </div>

        {teachers.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-4 mb-4">
              <FaChalkboardTeacher className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">কোনো শিক্ষক পাওয়া যায়নি</h3>
            <p className="text-gray-500">বর্তমানে আমাদের শিক্ষক তালিকায় কেউ নেই।</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-3 mb-3">
                    <FaChalkboardTeacher className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">{teachers.length}</h3>
                  <p className="text-sm font-medium text-gray-600">মোট শিক্ষক</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-3 mb-3">
                    <FaGraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600">
                    {teachers.filter(t => t.experience > 5).length}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">৫+ বছর অভিজ্ঞতা</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="inline-flex items-center justify-center rounded-full bg-purple-100 p-3 mb-3">
                    <FaBook className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-600">
                    {new Set(teachers.map(t => t.subject)).size}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">বিভিন্ন বিষয়</p>
                </div>
              </div>
            </div>

            {/* Teachers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map(teacher => (
                <div key={teacher._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Teacher Image */}
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center relative">
                    {teacher.profilePic ? (
                      <img 
                        src={teacher.profilePic} 
                        alt={teacher.fullName} 
                        className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="h-40 w-40 rounded-full bg-blue-300 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-4xl text-white font-bold">
                          {teacher.fullName ? teacher.fullName.charAt(0).toUpperCase() : 'T'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Teacher Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.fullName}</h3>
                    <p className="text-blue-600 font-medium mb-3">{teacher.subject}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      {teacher.department && (
                        <div className="flex items-center">
                          <FaGraduationCap className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{teacher.department}</span>
                        </div>
                      )}
                      
                      {teacher.experience && (
                        <div className="flex items-center">
                          <FaClock className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{teacher.experience} বছর অভিজ্ঞতা</span>
                        </div>
                      )}
                      
                      {teacher.qualification && (
                        <div className="flex items-center">
                          <FaBook className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{teacher.qualification}</span>
                        </div>
                      )}
                    </div>

                    {teacher.bio && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 text-sm line-clamp-3">{teacher.bio}</p>
                      </div>
                    )}

                    <div className="mt-6 flex space-x-3">
                      {teacher.email && (
                        <a 
                          href={`mailto:${teacher.email}`}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm flex items-center justify-center transition-colors"
                        >
                          <FaEnvelope className="h-4 w-4 mr-1" />
                          ইমেইল
                        </a>
                      )}
                      
                      {teacher.phone && (
                        <a 
                          href={`tel:${teacher.phone}`}
                          className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm flex items-center justify-center transition-colors"
                        >
                          <FaPhone className="h-4 w-4 mr-1" />
                          কল
                        </a>
                      )}
                    </div>

                    <button 
                      onClick={() => setSelectedTeacher(teacher)}
                      className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      আরও জানুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Teacher Detail Modal */}
        {selectedTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">শিক্ষক বিবরণ</h3>
                  <button 
                    onClick={() => setSelectedTeacher(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col items-center mb-6">
                  {selectedTeacher.profilePic ? (
                    <img 
                      src={selectedTeacher.profilePic} 
                      alt={selectedTeacher.fullName} 
                      className="h-32 w-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
                    />
                  ) : (
                    <div className="h-32 w-32 rounded-full bg-blue-300 flex items-center justify-center border-4 border-blue-100 shadow-md">
                      <span className="text-4xl text-white font-bold">
                        {selectedTeacher.fullName ? selectedTeacher.fullName.charAt(0).toUpperCase() : 'T'}
                      </span>
                    </div>
                  )}
                  <h4 className="text-xl font-bold mt-4">{selectedTeacher.fullName}</h4>
                  <p className="text-blue-600 font-medium">{selectedTeacher.subject}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedTeacher.department && (
                    <div>
                      <h5 className="font-medium text-gray-700">বিভাগ</h5>
                      <p>{selectedTeacher.department}</p>
                    </div>
                  )}
                  
                  {selectedTeacher.experience && (
                    <div>
                      <h5 className="font-medium text-gray-700">অভিজ্ঞতা</h5>
                      <p>{selectedTeacher.experience} বছর</p>
                    </div>
                  )}
                  
                  {selectedTeacher.qualification && (
                    <div>
                      <h5 className="font-medium text-gray-700">শিক্ষাগত যোগ্যতা</h5>
                      <p>{selectedTeacher.qualification}</p>
                    </div>
                  )}
                  
                  {selectedTeacher.joiningDate && (
                    <div>
                      <h5 className="font-medium text-gray-700">যোগদানের তারিখ</h5>
                      <p>{selectedTeacher.joiningDate}</p>
                    </div>
                  )}
                  
                  {selectedTeacher.email && (
                    <div>
                      <h5 className="font-medium text-gray-700">ইমেইল</h5>
                      <a href={`mailto:${selectedTeacher.email}`} className="text-blue-600 hover:underline">
                        {selectedTeacher.email}
                      </a>
                    </div>
                  )}
                  
                  {selectedTeacher.phone && (
                    <div>
                      <h5 className="font-medium text-gray-700">ফোন নম্বর</h5>
                      <a href={`tel:${selectedTeacher.phone}`} className="text-blue-600 hover:underline">
                        {selectedTeacher.phone}
                      </a>
                    </div>
                  )}
                </div>
                
                {selectedTeacher.bio && (
                  <div className="mb-6">
                    <h5 className="font-medium text-gray-700">জীবনবৃত্তান্ত</h5>
                    <p className="mt-2 text-gray-600">{selectedTeacher.bio}</p>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedTeacher(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTeahers;