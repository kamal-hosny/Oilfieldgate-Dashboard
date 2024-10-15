import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersOrders } from "../../store/usersOrder/act/actGetAllUsersOrder";
import SearchCustomer from "./SearchCustomer";
import Avatar from "react-avatar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import formatDate from "../../util/formatDate";
import { updateStatusUserOrder } from "../../store/usersOrder/act/actUpdateStatusUserOrder";

const getStatusColor = (status) => {
  switch (status) {
    case null:
      return "#1daa61";
    case "viewed":
      return "#9ca3af";
    case "processing":
      return "#eab308";
    case "approved":
      return "#22c55e";
    case "rejected":
      return "#ef4444";
    default:
      return "#000";
  }
};

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // حالة البحث
  const usersOrder = useSelector((state) => state?.allUsersOrder?.records?.data) || [];

  const fetchUsersOrder = useCallback(() => {
    dispatch(getAllUsersOrders());
  }, [dispatch]);

  useEffect(() => {
    fetchUsersOrder();
  }, [fetchUsersOrder]);

  // تحديث قيمة البحث
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

// فلترة الطلبات بناءً على قيمة البحث
const filteredOrders = usersOrder.filter((user) => {
  const userOrder = user?.usersorder?.[0];
  if (!userOrder) return false;

  // فلترة بناءً على contactName، lastName، companyName أو Status
  return (
    (userOrder.contactName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (userOrder.lastName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (userOrder.companyName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.Status?.toLowerCase().includes(searchTerm.toLowerCase()))
  );
});


  const handleCardClick = useCallback(
    (id, _idOrder, statusOrder) => {
      navigate(`/checking-orders/${id}`);
      
      // Create an object to store in localStorage
      const orderDataClicked = {
        _idOrder: _idOrder || null,
        statusOrder: statusOrder || null,
      };

      localStorage.setItem("orderDataClicked", JSON.stringify(orderDataClicked));
    },
    [navigate]
  );

  const handleStatusClick = async (orderId, status) => {
    if (status === null) {
      try {
        const result = await dispatch(updateStatusUserOrder({ id: orderId, Status: "viewed" })).unwrap()
        .then(() => {
          fetchUsersOrder()
        }).catch((error) => {
          console.error('Error updating status:', error);
        });
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    }
  };

  return (
    <>
    <SearchCustomer searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
    <div className="orders flex-1 bg-sectionColor py-2 px-2  h-full overflow-y-scroll">
      <div className="cards flex flex-col gap-2  ">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((user) => {
            const userOrder = user?.usersorder?.[0];
            const { _id, Status, lastOrder } = user;
            if (!userOrder) return null;

            return (
              <div
                key={user?._id}
                className="card flex items-center px-1.5 py-2  gap-2 bg-sectionColorFocus hover:bg-sectionColorHover cursor-pointer border border-colorBorder"
                onClick={() => {
                  handleCardClick(userOrder._id, _id , Status);
                  handleStatusClick(_id, Status);
                }}
              >
                <MemoizedAvatar name={userOrder.contactName || "N/A"} />
                <div className="info text-[10px] relative w-full">
                  <div className="name flex flex-col w-full">
                    <p className="font-semibold text-colorText1 flex gap-1 break-words">
                      {userOrder.contactName || "Unknown"} {userOrder.lastName || ""}
                    </p>
                    <span className="text-colorText2 break-words overflow-hidden whitespace-normal max-w-[150px]">
                      {userOrder.companyName || ""}
                    </span>

                    <div className="flex items-center justify-end gap-1">
                      <div className="time text-colorText2 text-[8px]">
                        {formatDate(lastOrder) || "N/A"}
                      </div>

                      <div>
                        <span
                          className="status h-2 w-2 block rounded-full"
                          style={{ backgroundColor: getStatusColor(Status) }}
                          data-tooltip-id={`status-tooltip-${user?._id}`}
                          data-tooltip-content={Status || "Unknown"}
                        />
                        <ReactTooltip
                          id={`status-tooltip-${user?._id}`}
                          place="top"
                          effect="solid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-colorText2">No orders available</p>
        )}
      </div>
    </div>
    </>
  );
};

// Memoized Avatar component for performance optimization
const MemoizedAvatar = React.memo(({ name }) => (
  <Avatar size="35px" name={name} round={true} textSizeRatio={2} />
));

export default Orders;
