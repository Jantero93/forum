import React from 'react';
import { useParams } from 'react-router-dom';

const SingleTopicPage = () => {
  const { id: _id } = useParams();

  console.log('_id', _id);

  return (
    <div>
      <p>SingleTopicPage</p>
    </div>
  );
};

export default SingleTopicPage;
