import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ResetPassword = () => {
  const { token } = useParams(); // ✅ grabs token from /reset-password/:token
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');

  const { backendUrl } = useContext(AppContext); // ✅ get from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/reset-password/${token}`,
        {
          newPassword,
        }
      );

      toast.success(data.message);
      setMsg(data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Something went wrong');
      setMsg(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="border p-2 w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>
        {msg && <p className="text-center text-sm text-red-600">{msg}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
