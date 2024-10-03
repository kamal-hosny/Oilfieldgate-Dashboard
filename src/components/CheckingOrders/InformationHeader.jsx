import React, { memo } from "react";
import { Button } from "@material-tailwind/react";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Tooltip as ReactTooltip } from "react-tooltip";

const InformationHeader = ({ userData, allUserOrders }) => {
  const dispatch = useDispatch();

  return (
    <div className="Information-header p-4 bg-[#eceff1] text-white flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-bold text-colorText1 text-sm">
          {userData?.contactName || ""} {userData?.lastName || ""}
        </span>
        <span className="text-colorText2 text-xs">
          {userData?.companyName || ""}
        </span>
      </div>
      <span className="text-colorText1 flex gap-2 font-bold">
        <Button
          data-tooltip-id="create-request"
          data-tooltip-content="Create a new request"
          onClick={() => dispatch(openModal("CreateNewRequest"))}
          className="bg-green-600 hover:bg-green-700 rounded-lg p-2"
        >
          <PlaylistAddIcon />
        </Button>

        <ReactTooltip id="create-request" place="top" effect="solid" />
        <Button
                  data-tooltip-id="user-data-tooltip"
                  data-tooltip-content="User Data"
          onClick={() => dispatch(openModal("UserDetails"))}
          className="bg-mainColor hover:bg-mainColorHover rounded-lg p-2"
        >
          <PersonIcon />
        </Button>
        <ReactTooltip id="user-data-tooltip" place="top" effect="solid" />
      </span>
    </div>
  );
};

export default memo(InformationHeader);
