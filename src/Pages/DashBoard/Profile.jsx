import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => console.error(error));
  };

  // Mock data for demonstration
  const userStats = {
    examsCompleted: 12,
    averageScore: 82,
    rank: 156,
    studyHours: 47
  };

  const upcomingExams = [
    { id: 1, name: 'SSC Physics Model Test', date: '15 October 2023' },
    { id: 2, name: 'HSC Higher Mathematics', date: '22 October 2023' },
    { id: 3, name: 'English 2nd Paper', date: '29 October 2023' }
  ];

  const handleClick = ()=>{
    toast.success("Coming soon");
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Banner */}
        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content mb-6">
          <div className="card-body py-4">
            <h2 className="card-title justify-center text-2xl mb-2">অভিনন্দন প্রিয় শিক্ষার্থী!</h2>
            <p className="text-center">
              Exam Hero তে রেজিস্ট্রেশন করার জন্য ধন্যবাদ। আমাদের সকল কার্যক্রম আপাতত আমাদের Exam Hero App এ অনুষ্ঠিত হবে।
            </p>
          </div>
        </div>

        {/* App Download Notice */}
        <div className="alert alert-info mb-6">
          <div className="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <label>
              <span className="font-bold">বিঃদ্রঃ</span> আমাদের সকল সার্ভিস উপভোগ করতে আমাদের অ্যাপ ইন্সটল করুন। <span className="font-bold">অবশ্যই নতুন করে রেজিস্ট্রেশন করতে হবে App ডাউনলোড করার পর।</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Card */}
          <div className="card w-full lg:w-1/3 bg-base-100 shadow-xl h-fit">
            <figure className="px-10 pt-10">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} alt="User Avatar" />
                </div>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl font-bold">{user?.displayName || 'Student'}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            
              
              <div className="divider my-2"></div>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Member since</span>
                  <span className="text-gray-600">Jan 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account type</span>
                  <span className="text-gray-600">Premium</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last active</span>
                  <span className="text-gray-600">Today</span>
                </div>
              </div>
              
              <div className="card-actions mt-6 w-full">
                <button className="btn btn-primary w-full" onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="w-full lg:w-2/3 space-y-6">
        
            
            {/* Upcoming Exams */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Upcoming Exams</h2>
                <div className="space-y-4">
                  {upcomingExams.map(exam => (
                    <div key={exam.id} className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{exam.name}</h3>
                        <p className="text-sm text-gray-500">Scheduled: {exam.date}</p>
                      </div>
                      <button onClick={handleClick} className="btn btn-sm btn-primary">Prepare</button>
                    </div>
                  ))}
                </div>
                <div className="card-actions justify-end mt-4">
                  <button onClick={handleClick} className="btn btn-ghost btn-sm">View all exams</button>
                </div>
              </div>
            </div>
            
            {/* Recommended Content */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Recommended For You</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Physics 2nd Paper MCQ Practice</h3>
                      <p className="text-sm text-gray-600">Based on your recent performance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary/20 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">English 1st Paper Grammar Test</h3>
                      <p className="text-sm text-gray-600">Improve your grammar skills</p>
                    </div>
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button onClick={handleClick} className="btn btn-primary btn-sm">Explore more content</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;