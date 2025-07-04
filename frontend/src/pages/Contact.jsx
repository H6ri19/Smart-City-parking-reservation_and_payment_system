// import React from 'react';
// import { assets } from '../assets/assets';

// const contact = () => {
//   return (
//     <div>
//       <div className="text-center text-2xl pt-10 tex-gray-500">
//         <p className="text-center text-2xl text-gray-500 font-medium mb-10">
//           CONTACT <span className="text-gray-700 font-semibold">US</span>
//         </p>
//       </div>
//       <div>
//         <img src={assets.contact_image} alt='' />
//         <div>
//         <p></p>
//         <p></p>
//         <p></p>
//         <p></p>
//         <p></p>
//         <p></p>
//         <p></p>
//         <p></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default contact;

import React from 'react';

const Contact = () => {
  return (
    <div className="px-6 md:px-16 py-10">
      {/* Header */}
      <div className="text-center text-2xl text-gray-600 font-medium mb-10">
        CONTACT <span className="text-gray-800 font-semibold">US</span>
      </div>

      {/* Info Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-sm text-gray-600">
            Need help with booking, support, or have business inquiries? We're
            here to help you navigate your parking needs efficiently.
          </p>

          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <div>
              <strong>📍 Address:</strong>
              <br />
              CitySpot Headquarters, Anna Salai, Chennai, Tamil Nadu, India
            </div>

            <div>
              <strong>📞 Phone:</strong>
              <br />
              +91-9876543210
            </div>
            <div>
              <strong>📧 Email:</strong>
              <br />
              support@cityspot.in
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 border rounded-lg p-6 shadow-sm bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Send a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-primary"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-primary"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map or Embed (Optional) */}
      <div className="mt-10">
        <iframe
          title="Google Map"
          className="w-full h-72 border rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.973113046434!2d80.24958341535233!3d13.082680790772896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265dd3b76c169%3A0x6b9fa2cc9829d299!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1718790000000!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
