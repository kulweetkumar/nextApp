import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContactData } from '../apiServices/api'; // Import your API function
// import { setContactData } from '../Redux/contactSlice'; // Import your slice action to update Redux state

export default function Home() {
  const contactData = useSelector((state) => state.contact.data); // Assuming contact data is stored in Redux state
  const dispatch = useDispatch();
  console.log('=======================================');

  useEffect(() => {
    console.log('=======================================');
    const fetchData = async () => {
      try {
        const response = await getContactData(); 
        // dispatch(setContactData(response.data)); 
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchData(); 
  }, [dispatch]); 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Home Page</h1>
        <div>
          {/* Display your contact data */}
          {contactData && (
            <div>
              <h2>Contact Data</h2>
              <p>Name: {contactData.name}</p>
              <p>Email: {contactData.email}</p>
              <p>Message: {contactData.message}</p>
              {/* Add more fields as needed */} 
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
