import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    return <p className="text-center text-red-500">আপনি লগইন করেননি।</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });
      setMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে ✅");
    } catch (error) {
      console.error(error);
      setMessage("কিছু সমস্যা হয়েছে ❌");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">আপনার প্রোফাইল</h2>

      <div className="flex flex-col items-center">
        <img
          src={photoURL || "https://via.placeholder.com/150"}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border mb-4"
        />
        <p className="text-lg font-semibold">{user.email}</p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleUpdate}>
        <div>
          <label className="block text-sm font-medium">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="নাম লিখুন"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">প্রোফাইল ছবি URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="ছবির লিংক দিন"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "আপডেট হচ্ছে..." : "প্রোফাইল আপডেট করুন"}
        </button>
      </form>

      {message && <p className="text-center text-green-600 mt-3">{message}</p>}
    </div>
  );
};

export default Profile;
