import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AdminTeacherApplication = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filter, setFilter] = useState("pending"); // pending, approved, rejected, all
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });

  const API_URL = "http://localhost:5000";

  // Fetch all teachers (admin view)
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/teachers`);
      setTeachers(res.data);
      
      // Calculate stats
      const pending = res.data.filter(t => t.status === "pending").length;
      const approved = res.data.filter(t => t.status === "approved").length;
      const rejected = res.data.filter(t => t.status === "rejected").length;
      
      setStats({
        pending,
        approved,
        rejected,
        total: res.data.length
      });
    } catch (error) {
      console.error("❌ Failed to fetch teachers", error);
      Swal.fire({
        icon: 'error',
        title: 'ত্রুটি!',
        text: 'শিক্ষকদের ডেটা লোড করতে সমস্যা হয়েছে।'
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const updateStatus = async (id, status, comment = "") => {
    try {
      await axios.patch(`${API_URL}/teachers/${id}/status`, { status, adminComment: comment });
      
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'সফল!',
        text: `শিক্ষকের আবেদন ${status === 'approved' ? 'অনুমোদন' : 'প্রত্যাখ্যান'} করা হয়েছে।`,
        timer: 2000,
        showConfirmButton: false
      });
      
      fetchTeachers(); // Refresh list after status change
    } catch (error) {
      console.error(`❌ Failed to update status`, error);
      Swal.fire({
        icon: 'error',
        title: 'ত্রুটি!',
        text: 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।'
      });
    }
  };

  const handleApprove = async (teacher) => {
    const { value: comment } = await Swal.fire({
      title: 'আবেদন অনুমোদন করুন',
      input: 'textarea',
      inputLabel: 'মন্তব্য (ঐচ্ছিক)',
      inputPlaceholder: 'যেকোনো বিশেষ মন্তব্য লিখুন...',
      showCancelButton: true,
      confirmButtonText: 'অনুমোদন করুন',
      cancelButtonText: 'বাতিল করুন',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          resolve();
        });
      }
    });

    if (comment !== undefined) {
      updateStatus(teacher._id, "approved", comment || "কোনো মন্তব্য নেই");
    }
  };

  const handleReject = async (teacher) => {
    const { value: comment } = await Swal.fire({
      title: 'আবেদন প্রত্যাখ্যান করুন',
      input: 'textarea',
      inputLabel: 'কারণ লিখুন*',
      inputPlaceholder: 'আবেদন প্রত্যাখ্যানের কারণ লিখুন...',
      inputValidator: (value) => {
        if (!value) {
          return 'আপনাকে কারণ লিখতে হবে!';
        }
      },
      showCancelButton: true,
      confirmButtonText: 'প্রত্যাখ্যান করুন',
      cancelButtonText: 'বাতিল করুন'
    });

    if (comment) {
      updateStatus(teacher._id, "rejected", comment);
    }
  };

  const filteredTeachers = filter === "all" 
    ? teachers 
    : teachers.filter(t => t.status === filter);

  const statusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-yellow-100 text-yellow-800", text: "বিচারাধীন" },
      approved: { class: "bg-green-100 text-green-800", text: "অনুমোদিত" },
      rejected: { class: "bg-red-100 text-red-800", text: "প্রত্যাখ্যানিত" }
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status].class}`}>
        {statusConfig[status].text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">শিক্ষক আবেদন ব্যবস্থাপনা</h1>
        <p className="text-gray-600">অ্যাডমিন প্যানেল - শিক্ষকদের আবেদন পর্যালোচনা ও অনুমোদন করুন</p>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-blue-600 font-bold text-2xl">{stats.total}</div>
            <div className="text-blue-800 font-medium">মোট আবেদন</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="text-yellow-600 font-bold text-2xl">{stats.pending}</div>
            <div className="text-yellow-800 font-medium">বিচারাধীন</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-green-600 font-bold text-2xl">{stats.approved}</div>
            <div className="text-green-800 font-medium">অনুমোদিত</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="text-red-600 font-bold text-2xl">{stats.rejected}</div>
            <div className="text-red-800 font-medium">প্রত্যাখ্যানিত</div>
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button 
            onClick={() => setFilter("all")} 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            সকল আবেদন
          </button>
          <button 
            onClick={() => setFilter("pending")} 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            বিচারাধীন ({stats.pending})
          </button>
          <button 
            onClick={() => setFilter("approved")} 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "approved" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            অনুমোদিত ({stats.approved})
          </button>
          <button 
            onClick={() => setFilter("rejected")} 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "rejected" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            প্রত্যাখ্যানিত ({stats.rejected})
          </button>
        </div>
      </div>

      {filteredTeachers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700">কোনো আবেদন পাওয়া যায়নি</h3>
          <p className="text-gray-500 mt-2">
            {filter === "pending" 
              ? "বর্তমানে কোনো বিচারাধীন আবেদন নেই" 
              : filter === "approved" 
                ? "কোনো অনুমোদিত আবেদন নেই" 
                : filter === "rejected" 
                  ? "কোনো প্রত্যাখ্যানিত আবেদন নেই" 
                  : "কোনো আবেদন পাওয়া যায়নি"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map(teacher => (
            <div key={teacher._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-800">{teacher.fullName || teacher.name}</h2>
                  {statusBadge(teacher.status)}
                </div>
                
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>{teacher.subject}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{teacher.email}</span>
                  </div>
                  
                  {teacher.phone && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{teacher.phone}</span>
                    </div>
                  )}
                  
                  {teacher.experience && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{teacher.experience} বছর অভিজ্ঞতা</span>
                    </div>
                  )}
                </div>
                
                {teacher.adminComment && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">অ্যাডমিন মন্তব্য:</span> {teacher.adminComment}
                    </p>
                  </div>
                )}
                
                {teacher.status === "pending" && (
                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => handleApprove(teacher)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      অনুমোদন
                    </button>
                    <button
                      onClick={() => handleReject(teacher)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      প্রত্যাখ্যান
                    </button>
                  </div>
                )}
                
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedTeacher(teacher)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    সম্পূর্ণ বিবরণ দেখুন
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">শিক্ষক বিবরণ</h3>
                <button 
                  onClick={() => setSelectedTeacher(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700">পূর্ণ নাম</h4>
                    <p>{selectedTeacher.fullName || selectedTeacher.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">বিষয়</h4>
                    <p>{selectedTeacher.subject}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">ইমেইল</h4>
                    <p>{selectedTeacher.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">ফোন নম্বর</h4>
                    <p>{selectedTeacher.phone || "প্রদান করা হয়নি"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">অভিজ্ঞতা</h4>
                    <p>{selectedTeacher.experience || "প্রদান করা হয়নি"} বছর</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">শিক্ষাগত যোগ্যতা</h4>
                    <p>{selectedTeacher.qualification || "প্রদান করা হয়নি"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">বিভাগ</h4>
                    <p>{selectedTeacher.department || "প্রদান করা হয়নি"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">যোগদানের তারিখ</h4>
                    <p>{selectedTeacher.joiningDate || "প্রদান করা হয়নি"}</p>
                  </div>
                </div>
                
                {selectedTeacher.bio && (
                  <div>
                    <h4 className="font-medium text-gray-700">জীবনবৃত্তান্ত</h4>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedTeacher.bio}</p>
                  </div>
                )}
                
                {selectedTeacher.adminComment && (
                  <div>
                    <h4 className="font-medium text-gray-700">অ্যাডমিন মন্তব্য</h4>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedTeacher.adminComment}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-700">আবেদনের অবস্থা</h4>
                  <div className="mt-1">
                    {statusBadge(selectedTeacher.status)}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                {selectedTeacher.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleApprove(selectedTeacher);
                        setSelectedTeacher(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      অনুমোদন করুন
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedTeacher);
                        setSelectedTeacher(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      প্রত্যাখ্যান করুন
                    </button>
                  </>
                )}
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
  );
};

export default AdminTeacherApplication;