import React from "react";

const ProfilePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form className="space-y-4">
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            className="w-full px-4 py-2 border rounded focus:outline-none"
            rows={4}
            placeholder="Tell us about yourself"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Social Links</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none"
            type="text"
            placeholder="Add your social link"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
