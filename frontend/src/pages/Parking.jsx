import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import Relatedpark from '../components/Relatedpark';

const Parking = () => {
  const { speciality } = useParams();
  const { parking } = useContext(AppContext);
  const navigate = useNavigate();
  const [filterpark, setFilterpark] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      setFilterpark(parking.filter((p) => p.speciality === speciality));
    } else {
      setFilterpark(parking);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, parking]);

  return (
    <div className="px-4 sm:px-10">
      <p className="text-gray-600 mt-6">
        Browse through available parking zones by type
      </p>

      {/* -------Sidebar filters */}
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          {[
            'Car Parking',
            'Bike Parking',
            'Bus Parking',
            'Truck Parking',
            'Accessible (Disabled) Parking',
            'EV Charging Zone',
          ].map((type, i) => (
            <p
              key={i}
              onClick={() =>
                speciality === type
                  ? navigate('/parking')
                  : navigate(`/parking/${type}`)
              }
              className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer"
            >
              {type}
            </p>
          ))}
        </div>

        {/* -------Filtered parking cards */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterpark.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/booked/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              <img
                className="bg-blue-50 w-full h-44 object-cover"
                src={item.image}
                alt={item.location}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'Available'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  ></span>
                  <p
                    className={`${
                      item.status === 'Available'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {item.location}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* -------Related Recommendations */}
      {/* {speciality && <Relatedpark speciality={speciality} parkID={null} />} */}
    </div>
  );
};

export default Parking;
