import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { userQuery } from '../utils/data';
import { client } from '../client';

import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components';

const Pins = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState();
  // console.log(user);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
      // console.log(user);
    });
  }, []);

  return (
    <div className='px-2 md:px5'>
      <div className='bg-gray-50'>
        <Navbar SearchTerm={searchTerm} setSearchTerm ={setSearchTerm} user={user && user} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetail user={user && user} />} />
          <Route path="/create-pin" element={<CreatePin user={user && user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>

    </div>
  )
}

export default Pins