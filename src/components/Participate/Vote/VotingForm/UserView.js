import React, { useState } from 'react';
import Records from '../../../../politician.json';
import 'tailwindcss/tailwind.css';

function Userview() {
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const handleRadioChange = (candidate) => {
    setSelectedCandidate(candidate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <form action="" method="POST">
          {Records &&
            Records.map((record) => {
              const isSelected = selectedCandidate === record.name;

              return (
                <div className={"mt-6"} key={record.id}>
                  <label
                    className={`block cursor-pointer p-2 ${
                      isSelected ? 'border-2 border-blue-500' : ''
                    }`}
                  >
                    <table className="w-full border-collapse table-auto">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="p-2">
                            <img
                              src={record.image}
                              alt={record.name}
                              className="w-64 h-64 object-cover rounded-lg"
                            />
                          </td>
                          <td className="p-2 text-xl font-semibold">{record.name}</td>
                          <td className="p-2 hidden">
                            <input
                              type='radio'
                              name="candidate"
                              value={record.name}
                              checked={isSelected}
                              onChange={() => handleRadioChange(record.name)}
                              className="border-2 border-gray-300 text-gray-600 py-2 px-4 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </label>
                </div>
              );
            })}
          <button
            className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-8'
            type="submit"
          >
            Vote
          </button>
        </form>
      </div>
    </div>
  );
}

export default Userview;