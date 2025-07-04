import { plugin } from 'mongoose';

/** @type {import('tailwindcss').config} */
export default {
  content:[
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#1E40AF"
      }
    },
  },
  plugins: [],
}