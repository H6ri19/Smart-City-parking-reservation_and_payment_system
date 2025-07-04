import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('vehicle_type', userData.vehicle_type);
      formData.append('vehicle_Brand', userData.vehicle_Brand);
      formData.append('VehicleNo_Plate', userData.VehicleNo_Plate);
      formData.append('address', JSON.stringify(userData.address));
      image && formData.append('image', image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    userData && (
      <div className="max-w-3xl mx-auto p-6 sm:p-10">
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-10">
          {/* Profile Header */}
          <div className="flex items-center gap-6">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=""
                  />
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={image ? '' : assets.upload_icon}
                    alt=""
                  />
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
                src={userData.image}
                alt="Profile"
              />
            )}

            <div>
              {isEdit ? (
                <input
                  className="text-2xl font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-primary"
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              ) : (
                <h2 className="text-2xl font-semibold text-gray-800">
                  {userData.name}
                </h2>
              )}
              <p className="text-sm text-gray-500 mt-1">User Profile</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Contact Info */}
          <SectionTitle title="Contact Information" />
          <Field label="Email" value={userData.email} />
          <EditableField
            label="Phone"
            value={userData.phone}
            editable={isEdit}
            onChange={(val) => setUserData((prev) => ({ ...prev, phone: val }))}
          />
          <EditableField
            label="Address"
            value={`${userData.address.line1}, ${userData.address.line2}`}
            editable={isEdit}
            multiline
            onChange={(val) =>
              setUserData((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  line1: val.split(',')[0] || '',
                  line2: val.split(',').slice(1).join(', ') || '',
                },
              }))
            }
          />

          <hr className="my-6" />

          {/* Basic Info */}
          <SectionTitle title="Basic Information" />
          <EditableSelect
            label="Gender"
            value={userData.gender}
            editable={isEdit}
            options={['Male', 'Female']}
            onChange={(val) =>
              setUserData((prev) => ({ ...prev, gender: val }))
            }
          />
          <EditableField
            label="Birthday"
            value={userData.dob}
            type="date"
            editable={isEdit}
            onChange={(val) => setUserData((prev) => ({ ...prev, dob: val }))}
          />

          <hr className="my-6" />

          {/* Vehicle Info */}
          <SectionTitle title="Vehicle Information" />
          <EditableSelect
            label="Vehicle Type"
            value={userData.vehicle_type}
            editable={isEdit}
            options={['2 Wheeler', '4 Wheeler']}
            onChange={(val) =>
              setUserData((prev) => ({ ...prev, vehicle_type: val }))
            }
          />
          <EditableField
            label="Vehicle Brand"
            value={userData.vehicle_Brand}
            editable={isEdit}
            onChange={(val) =>
              setUserData((prev) => ({ ...prev, vehicle_Brand: val }))
            }
          />
          <EditableField
            label="Vehicle Number Plate"
            value={userData.VehicleNo_Plate}
            editable={isEdit}
            onChange={(val) =>
              setUserData((prev) => ({ ...prev, VehicleNo_Plate: val }))
            }
          />

          {/* Buttons */}
          <div className="flex justify-end mt-10">
            <button
              onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
              className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow hover:bg-opacity-90 transition-all"
            >
              {isEdit ? 'Save Information' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const SectionTitle = ({ title }) => (
  <h3 className="text-base font-semibold text-gray-700 mb-4">{title}</h3>
);

const Field = ({ label, value }) => (
  <div className="mb-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-gray-700">{value}</p>
  </div>
);

const EditableField = ({
  label,
  value,
  editable,
  onChange,
  type = 'text',
  multiline = false,
}) => (
  <div className="mb-3">
    <p className="text-sm text-gray-500">{label}</p>
    {editable ? (
      multiline ? (
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    ) : (
      <p className="text-gray-700">{value}</p>
    )}
  </div>
);

const EditableSelect = ({ label, value, editable, onChange, options }) => (
  <div className="mb-3">
    <p className="text-sm text-gray-500">{label}</p>
    {editable ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <p className="text-gray-700">{value}</p>
    )}
  </div>
);

export default MyProfile;
