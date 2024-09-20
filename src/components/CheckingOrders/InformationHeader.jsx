import { Button } from '@material-tailwind/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/modal/modalSlice';
import { getOneUser } from '../../store/user/act/actGetOneUser';

const InformationHeader = ({ userId }) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.allUsers?.record?.data);

  const fetchOneUser = useCallback(() => {
    if (userId) {
      dispatch(getOneUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    fetchOneUser();
  }, [fetchOneUser]);

  return (
    <div className="Information-header p-4 bg-[#eceff1] text-white flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-bold text-colorText1 text-sm">
          {data?.contactName || ''} {data?.lastName || ''}
        </span>
        <span className="text-colorText2 text-xs">
          {data?.companyName || ''}
        </span>
      </div>
      <span className="text-colorText1 font-bold">
        <Button onClick={() => dispatch(openModal('UserDetails'))} className="bg-mainColor hover:bg-mainColorHover rounded-sm p-3 py-4">
          Show user details
        </Button>
      </span>
    </div>
  );
};

export default InformationHeader;
