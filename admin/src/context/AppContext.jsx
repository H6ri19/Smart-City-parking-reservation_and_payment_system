import { createContext } from 'react';

export const AppContext = createContext();
const currrency = '₹';
const AppContextProvider = (props) => {
  const calculatePrice = (duration, pricePerHour) => {
    const hours = Math.ceil(duration / 60); // Convert duration to hours and round up
    return hours * pricePerHour; // Calculate total price
  };
  const value = { calculatePrice };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
