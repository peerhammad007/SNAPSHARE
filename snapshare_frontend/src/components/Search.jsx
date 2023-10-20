import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== undefined && typeof searchTerm === 'string' && searchTerm.trim() !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      // Handle the case when searchTerm is empty or not a string.
      // You might want to reset the pins or handle it differently.
      // For now, let's set pins to an empty array.
      setPins([]);
      setLoading(false);
    }
  }, [searchTerm]);
  

  return (
    <div>

      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
