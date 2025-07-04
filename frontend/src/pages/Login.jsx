import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [vehicle_type, setVehicleType] = useState('');
  const [vehicle_Brand, setVehicleBrand] = useState('');
  const [VehicleNo_Plate, setVehicleNoPlate] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
          dob,
          vehicle_type,
          vehicle_Brand,
          VehicleNo_Plate,
        });

        if (data.success) {
          localStorage.setItem('token', data.token); // ✅ Save token
          setToken(data.token);
          toast.success('Registered successfully!');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token); // ✅ Save token
          setToken(data.token);
          toast.success('Logged in successfully!');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('Auth Error:', error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong'
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book Slots</p>

        {state === 'Sign Up' && (
          <>
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={setName}
            />
            <Input
              label="Date of Birth (Year Only)"
              type="number"
              value={dob}
              onChange={setDob}
            />
            <SelectVehicleType value={vehicle_type} onChange={setVehicleType} />
            <Input
              label="Vehicle Brand"
              type="text"
              value={vehicle_Brand}
              onChange={setVehicleBrand}
            />
            <Input
              label="Vehicle Number Plate"
              type="text"
              value={VehicleNo_Plate}
              onChange={setVehicleNoPlate}
            />
          </>
        )}

        <Input label="Email" type="email" value={email} onChange={setEmail} />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p>
          {state === 'Sign Up'
            ? 'Already have an account?'
            : 'Create a new account?'}{' '}
          <span
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className="text-primary underline cursor-pointer"
          >
            {state === 'Sign Up' ? 'Login here' : 'Click here'}
          </span>
        </p>
      </div>
    </form>
  );
};

const Input = ({ label, type, value, onChange }) => (
  <div className="w-full">
    <p>{label}</p>
    <input
      className="border border-zinc-300 rounded w-full p-2 mt-1"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

const SelectVehicleType = ({ value, onChange }) => (
  <div className="w-full">
    <p>Vehicle Type</p>
    <select
      className="border border-zinc-300 rounded w-full p-2 mt-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    >
      <option value="">Select Vehicle Type</option>
      <option value="2 Wheeler">2 Wheeler</option>
      <option value="4 Wheeler">4 Wheeler</option>
    </select>
  </div>
);

export default Login;
