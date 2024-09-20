import React from 'react';
import { useParams } from 'react-router-dom';
import InformationHeader from './InformationHeader';
import InformationAbouTheRequest from './InformationAbouTheRequest';

const Information = () => {
  const { id } = useParams();

  return (
    <>
      {id ? (
        <>
          <InformationHeader userId={id} />
          <div className="p-4 bg-sectionColor h-full overflow-x-auto">
            <InformationAbouTheRequest />
          </div>
        </>
      ) : (
        <div className="p-4 bg-sectionColor flex items-center justify-center overflow-x-auto" style={{ height: 'calc(100vh - 115px)' }}>
          Please select a customer's order to view the details.
        </div>
      )}
    </>
  );
};

export default Information;
