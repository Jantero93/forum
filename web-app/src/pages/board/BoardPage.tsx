import React from 'react';
import BoardCard from '~/pages/board/BoardCard';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import { BoardDto } from '~/data/boards/boadType';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';

const BoardPage = () => {
  const { response } = useFetch<BoardDto[]>(`${env.API_URL}/boards`, 'GET');
  console.log('response', response);
  return (
    <NavbarLayout>
      <div className="flex flex-col items-center flex-grow gap-5">
        {response?.map(({ id, name, description }) => (
          <BoardCard
            key={id}
            boardId={id}
            name={name}
            description={description}
          />
        ))}
      </div>
    </NavbarLayout>
  );
};

export default BoardPage;
