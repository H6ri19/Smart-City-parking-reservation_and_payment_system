import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(''); // ✅ define msg state
  const { backendUrl } = useContext(AppContext); // ✅ get from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        { email }
      );
      setMsg(data.message);
      toast.success(data.message);
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Something went wrong');
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          type="submit"
        >
          Send Reset Link
        </button>
        {msg && <p className="text-sm text-center text-green-700">{msg}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
