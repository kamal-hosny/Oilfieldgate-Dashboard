import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InformationHeader from './InformationHeader';
import InformationAbouTheRequest from './InformationAbouTheRequest';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../../store/user/act/actGetOneUser';
import { getUserOrders } from '../../store/usersOrder/act/actGetUserOrders';

const Information = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userData = useSelector(state => state?.allUsers?.record?.data);
  const allUserOrders = useSelector(state => state?.allUsersOrder?.recordsUserOrder?.data);

  const fetchOneUser = useCallback(() => {
    if (id) {
      dispatch(getOneUser(id));
    }
  }, [dispatch, id]);

  const fetchAllUserOrders = useCallback(() => {
    if (id) {
      dispatch(getUserOrders(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      fetchAllUserOrders();
      fetchOneUser();
    }
  }, [fetchOneUser, fetchAllUserOrders, id]);

  if (!id) {
    return (
      <div className="p-4 bg-sectionColor flex items-center justify-center overflow-x-auto" style={{ height: 'calc(100vh - 115px)' }}>
        Please select a customer's order to view the details.
      </div>
    );
  }

  return (
    <>
      <InformationHeader userData={userData} allUserOrders={allUserOrders} />
      <div className="p-4 bg-sectionColor h-full overflow-x-auto">
        {!allUserOrders || allUserOrders.length === 0 ? (
          <div>There is no information for this request.</div>
        ) : (
          <InformationAbouTheRequest allUserOrders={allUserOrders} />
        )}
      </div>
    </>
  );
};

export default Information;
