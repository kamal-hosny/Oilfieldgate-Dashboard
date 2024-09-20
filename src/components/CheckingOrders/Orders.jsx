import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersOrders } from "../../store/usersOrder/act/actGetAllUsersOrder";
import SearchCustomer from "./SearchCustomer";
import Avatar from "react-avatar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { AllStateContext } from "../../context/AllStateContext";

const getStatusColor = (status) => {
  switch (status) {
    case "quoted":
      return "#f97316";
    case "sent":
      return "#3b82f6";
    case "approved":
      return "#22c55e";
    case "on-hold":
      return "#eab308";
    case "rejected":
      return "#ef4444";
    default:
      return "#9ca3af";
  }
};

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersorder =
    useSelector(
      (state) => state?.allUsersOrder?.records?.data?.[0]?.usersorder
    ) || [];

  const { mobileSize } = useContext(AllStateContext);

  // Fetching users order
  const fetchUsersOrder = useCallback(() => {
    dispatch(getAllUsersOrders());
  }, [dispatch]);

  useEffect(() => {
    fetchUsersOrder();
  }, [fetchUsersOrder]);

  // Memoize the handleCardClick to prevent re-creation on each render
  const handleCardClick = useCallback(
    (id) => {
      if (mobileSize) {
        navigate(`/checking-orders/co-mobile-size/${id}`);
      } else {
        navigate(`/checking-orders/${id}`);
      }
    },
    [navigate, mobileSize]
  );

  return (
    <div className="orders flex-1 bg-sectionColor py-2 px-2 h-full">
      <SearchCustomer />
      <div className="cards flex flex-col gap-2 overflow-y-auto h-full">
        {usersorder.length > 0 ? (
          usersorder.map((user) => (
            <div
              key={user._id}
              className="card flex items-center p-2 gap-2 bg-sectionColorFocus hover:bg-sectionColorHover cursor-pointer border border-colorBorder"
              onClick={() => handleCardClick(user._id)}
            >
              <Avatar
                size="35px"
                name={user.name || "N/A"}
                round={true}
                textSizeRatio={2}
              />
              <div className="info text-xs relative w-full">
                <div className="name flex flex-col w-full">
                  <p className="font-semibold text-colorText1 flex gap-1 break-words">
                    {user?.contactName || "Unknown"} {user?.lastName || ""}
                  </p>
                  <span className="text-colorText2 break-words overflow-hidden whitespace-normal max-w-[150px]">
                    {user?.companyName || ""}
                  </span>

                  <div className="flex items-center justify-end gap-1">
                    <div className=" time text-colorText2 text-[10px]">
                      {user.time || "N/A"}
                    </div>

                    <div>
                      <span
                        className="status h-2 w-2 block rounded-full"
                        style={{ backgroundColor: getStatusColor(user.status) }}
                        data-tooltip-id={`status-tooltip-${user._id}`}
                        data-tooltip-content={user.status || "Unknown"}
                      />
                      <ReactTooltip
                        id={`status-tooltip-${user._id}`}
                        place="top"
                        effect="solid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-colorText2">No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
