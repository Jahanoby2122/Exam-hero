import React, { useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ApplyTeacher = () => {
  const axiosSecure = UseAxiosSecure();
  const [teacher, setTeacher] = useState({
    fullName: "",
    subject: "",
    email: "",
    phone: "",
    experience: "",
    qualification: "",
    department: "",
    joiningDate: "",
    bio: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!teacher.fullName.trim()) newErrors.fullName = "নাম প্রয়োজন";
    if (!teacher.subject.trim()) newErrors.subject = "বিষয় প্রয়োজন";
    if (!teacher.email.trim()) {
      newErrors.email = "ইমেইল প্রয়োজন";
    } else if (!/^\S+@\S+\.\S+$/.test(teacher.email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা লিখুন";
    }
    if (!teacher.phone.trim()) {
      newErrors.phone = "ফোন নম্বর প্রয়োজন";
    } else if (!/^(?:\+88|01)?\d{11}$/.test(teacher.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "সঠিক ফোন নম্বর লিখুন";
    }
    if (!teacher.experience) newErrors.experience = "অভিজ্ঞতা প্রয়োজন";
    if (!teacher.qualification) newErrors.qualification = "যোগ্যতা প্রয়োজন";
    if (!teacher.department.trim()) newErrors.department = "বিভাগ প্রয়োজন";
    if (!teacher.joiningDate) newErrors.joiningDate = "যোগদানের তারিখ প্রয়োজন";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি",
        text: "দয়া করে সমস্ত প্রয়োজনীয় তথ্য প্রদান করুন",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axiosSecure.post("/teachers", {
        ...teacher,
        profilePic: profilePic ? profilePic.name : "",
      });

      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "সফল",
          text: "শিক্ষক সফলভাবে যুক্ত হয়েছে!",
        });
        setTeacher({
          fullName: "",
          subject: "",
          email: "",
          phone: "",
          experience: "",
          qualification: "",
          department: "",
          joiningDate: "",
          bio: "",
        });
        setProfilePic(null);
        setErrors({});
      } else {
        Swal.fire({
          icon: "error",
          title: "ত্রুটি",
          text: res.data.error || "শিক্ষক যোগ করতে ব্যর্থ হয়েছে",
        });
      }
    } catch (error) {
      console.error("Post Error:", error);
      Swal.fire({
        icon: "error",
        title: "ত্রুটি",
        text: "সার্ভার সমস্যা, আবার চেষ্টা করুন।",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6 mb-10 border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">শিক্ষক যোগ করুন</h2>
        <p className="text-gray-600">নতুন শিক্ষকের তথ্য নিচের ফর্মে পূরণ করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              পূর্ণ নাম <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={teacher.fullName}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="শিক্ষকের পূর্ণ নাম লিখুন"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              বিষয় <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={teacher.subject}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="শিক্ষক কোন বিষয় পড়ান"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              ইমেইল ঠিকানা <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="ইমেইল ঠিকানা লিখুন"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              ফোন নম্বর <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={teacher.phone}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="ফোন নম্বর লিখুন"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              অভিজ্ঞতা (বছর) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="experience"
              value={teacher.experience}
              onChange={handleChange}
              min="0"
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.experience ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="শিক্ষকতা অভিজ্ঞতা"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              শিক্ষাগত যোগ্যতা <span className="text-red-500">*</span>
            </label>
            <select
              name="qualification"
              value={teacher.qualification}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.qualification ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">নির্বাচন করুন</option>
              <option value="Bachelor">স্নাতক</option>
              <option value="Masters">স্নাতকোত্তর</option>
              <option value="PhD">পিএইচডি</option>
            </select>
            {errors.qualification && (
              <p className="mt-1 text-sm text-red-500">{errors.qualification}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              বিভাগ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              value={teacher.department}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.department ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="শিক্ষকের বিভাগ"
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-500">{errors.department}</p>
            )}
          </div>

          {/* Joining Date */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              যোগদানের তারিখ <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="joiningDate"
              value={teacher.joiningDate}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                errors.joiningDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.joiningDate && (
              <p className="mt-1 text-sm text-red-500">{errors.joiningDate}</p>
            )}
          </div>
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            প্রোফাইল ছবি
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-blue-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-xs text-gray-500">
                  {profilePic ? profilePic.name : "SVG, PNG, JPG or GIF (MAX. 5MB)"}
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            সংক্ষিপ্ত জীবনবৃত্তান্ত
          </label>
          <textarea
            name="bio"
            value={teacher.bio}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="শিক্ষকের সংক্ষিপ্ত জীবনবৃত্তান্ত লিখুন"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "সংরক্ষণ করা হচ্ছে..." : "শিক্ষক যোগ করুন"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyTeacher;
