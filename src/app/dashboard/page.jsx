'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../Redux/contactSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContactData } from '../apiServices/api'; // Import your API function

export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.contacts);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchDataStart());
        const response = await getContactData();
        dispatch(fetchDataSuccess(response.body));
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
        toast.error('Something went wrong');
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-center">Sr.No</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Phone</th>
              <th className="px-4 py-2 text-center">Message</th>
            </tr>
          </thead>
          <tbody>
          {data?.map((contact, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{contact.name}</td>
                <td className="px-4 py-2 text-center">{contact.email}</td>
                <td className="px-4 py-2 text-center">{contact.phone}</td>
                <td className="px-4 py-2 text-center">{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </main>
  );
}
