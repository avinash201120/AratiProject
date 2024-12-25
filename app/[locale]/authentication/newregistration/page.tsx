"use client";

import Image from "next/image";
import React, { useState } from "react";

const RegistrationForm = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    schoolCategory: "",
    schoolName: "",
    town: "",
    email: "",
  });

  const handleRoleChange = (e: any) => {
    setRole(e.target.value);
    setFormData({
      firstName: "",
      lastName: "",
      country: "",
      schoolCategory: "",
      schoolName: "",
      town: "",
      email: "",
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const getImageSrc = () => {
    switch (role) {
      case "citizen":
        return "/citizen.svg";
      case "merchant":
        return "/merchant.svg";
      default:
        return "/student.svg";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 animate-fadeIn">
      <div className="lg:w-1/2 bg-indigo-500 flex items-center justify-center transition-opacity duration-700 ease-in-out">
        <Image
          src={getImageSrc()}
          alt={role}
          width={100}
          height={100}
          className="w-full h-full object-cover opacity-90 animate-fadeIn"
        />
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center px-8 py-12 bg-white shadow-xl rounded-lg m-4 animate-slideUp">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          Create an Account
        </h1>
        <p className="mb-6 text-gray-600 text-lg">
          Join as a student, citizen, or merchant and contribute to
          eco-solidarity.
        </p>

        <div className="mb-6">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            I want to:
          </label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="student">Become an Eco-Solidarity Student</option>
            <option value="citizen">Become an Eco-Solidarity Citizen</option>
            <option value="merchant">Become an Eco-Merchant</option>
          </select>
        </div>

        <form
          id="registration-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
            />

            {role === "student" && (
              <>
                <select
                  name="schoolCategory"
                  value={formData.schoolCategory}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
                >
                  <option value="">Select School Category</option>
                  <option value="High School">High School</option>
                  <option value="University">University</option>
                </select>
                <input
                  type="text"
                  name="schoolName"
                  placeholder="School Name"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
                />
              </>
            )}

            {["citizen", "merchant"].includes(role) && (
              <input
                type="text"
                name="town"
                placeholder="Town"
                value={formData.town}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg font-medium transition-transform transform hover:scale-105"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

// "use client";

// import Image from "next/image";
// import React, { useState } from "react";

// const RegistrationForm = () => {
//   const [role, setRole] = useState("student");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     country: "",
//     schoolCategory: "",
//     schoolName: "",
//     town: "",
//     email: "",
//   });

//   const handleRoleChange = (e: any) => {
//     setRole(e.target.value);
//     setFormData({
//       firstName: "",
//       lastName: "",
//       country: "",
//       schoolCategory: "",
//       schoolName: "",
//       town: "",
//       email: "",
//     });
//   };

//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 animate-fadeIn">
//       <div className="lg:w-1/2 bg-indigo-500 flex items-center justify-center transition-opacity duration-700 ease-in-out">
//         <Image
//           src="/highq.svg"
//           alt="students"
//           width={100}
//           height={100}
//           className="w-full h-full object-cover opacity-90 animate-fadeIn"
//         />
//       </div>

//       <div className="lg:w-1/2 flex flex-col justify-center px-8 py-12 bg-white shadow-xl rounded-lg m-4 animate-slideUp">
//         <h1 className="text-3xl font-bold text-indigo-700 mb-4">
//           Create an Account
//         </h1>
//         <p className="mb-6 text-gray-600 text-lg">
//           Join as a student, citizen, or merchant and contribute to
//           eco-solidarity.
//         </p>

//         <div className="mb-6">
//           <label
//             htmlFor="role"
//             className="block mb-2 text-sm font-medium text-gray-700"
//           >
//             I want to:
//           </label>
//           <select
//             id="role"
//             value={role}
//             onChange={handleRoleChange}
//             className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           >
//             <option value="student">Become an Eco-Solidarity Student</option>
//             <option value="citizen">Become an Eco-Solidarity Citizen</option>
//             <option value="merchant">Become an Eco-Merchant</option>
//           </select>
//         </div>

//         <form
//           id="registration-form"
//           onSubmit={handleSubmit}
//           className="space-y-6"
//         >
//           <div className="grid grid-cols-1 gap-6">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
//             />

//             {role === "student" && (
//               <>
//                 <select
//                   name="schoolCategory"
//                   value={formData.schoolCategory}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
//                 >
//                   <option value="">Select School Category</option>
//                   <option value="High School">High School</option>
//                   <option value="University">University</option>
//                 </select>
//                 <input
//                   type="text"
//                   name="schoolName"
//                   placeholder="School Name"
//                   value={formData.schoolName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
//                 />
//               </>
//             )}

//             {["citizen", "merchant"].includes(role) && (
//               <input
//                 type="text"
//                 name="town"
//                 placeholder="Town"
//                 value={formData.town}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
//               />
//             )}

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform transform hover:scale-105"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg font-medium transition-transform transform hover:scale-105"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;

// "use client";

// import React, { useState } from "react";

// const RegistrationForm = () => {
//   const [role, setRole] = useState("student");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     country: "",
//     schoolCategory: "",
//     schoolName: "",
//     town: "",
//     email: "",
//   });

//   const handleRoleChange = (e: any) => {
//     setRole(e.target.value);
//     setFormData({
//       firstName: "",
//       lastName: "",
//       country: "",
//       schoolCategory: "",
//       schoolName: "",
//       town: "",
//       email: "",
//     });
//   };

//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen">
//       <div className="lg:w-1/2 bg-gray-100">
//         <Image
//           src="/path/to/eco-solidarity.jpg"
//           alt="Eco-Solidarity"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="lg:w-1/2 flex flex-col justify-center px-8 py-12">
//         <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
//         <p className="mb-6 text-gray-700">
//           Join as a student, citizen, or merchant and contribute to
//           eco-solidarity.
//         </p>

//         <div className="mb-6">
//           <label
//             htmlFor="role"
//             className="block mb-2 text-sm font-medium text-gray-700"
//           >
//             I want to:
//           </label>
//           <select
//             id="role"
//             value={role}
//             onChange={handleRoleChange}
//             className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           >
//             <option value="student">Become an Eco-Solidarity Student</option>
//             <option value="citizen">Become an Eco-Solidarity Citizen</option>
//             <option value="merchant">Become an Eco-Merchant</option>
//           </select>
//         </div>

//         <form
//           id="registration-form"
//           onSubmit={handleSubmit}
//           className="space-y-4"
//         >
//           <div className="grid grid-cols-1 gap-4">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />

//             {role === "student" && (
//               <>
//                 <select
//                   name="schoolCategory"
//                   value={formData.schoolCategory}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   <option value="">Select School Category</option>
//                   <option value="High School">High School</option>
//                   <option value="University">University</option>
//                 </select>
//                 <input
//                   type="text"
//                   name="schoolName"
//                   placeholder="School Name"
//                   value={formData.schoolName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </>
//             )}

//             {role === "citizen" && (
//               <input
//                 type="text"
//                 name="town"
//                 placeholder="Town"
//                 value={formData.town}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             )}

//             {role === "merchant" && (
//               <input
//                 type="text"
//                 name="town"
//                 placeholder="Town"
//                 value={formData.town}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             )}

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
