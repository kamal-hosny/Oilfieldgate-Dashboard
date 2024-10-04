import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { openModal } from "../../store/modal/modalSlice";
import { useDispatch } from "react-redux";

const AccountNavItem = [
    {
        onClick: (dispatch) => dispatch(openModal("LogOut")), // Direct dispatch function
        title: "Log out",
        icon: <LogoutIcon />,
        path: null,
    },
];

const ListItemWithLink = ({ item }) => (
    <li className="cursor-pointer px-3 py-3 hover:bg-sectionColorHover text-colorText2 rounded-lg">
        <Link to={item.path} className="flex items-center gap-2">
            {item.icon}
            <span className="whitespace-nowrap overflow-hidden text-sm font-medium">
                {item.title}
            </span>
        </Link>
    </li>
);

const ListItemWithoutLink = ({ item, onClick }) => (
    <li
        className="flex items-center gap-2 cursor-pointer p-3 text-colorText2 hover:bg-sectionColorHover rounded-lg"
        onClick={onClick} // Assign onClick directly
    >
        {item.icon}
        <span className="whitespace-nowrap overflow-hidden text-sm font-medium">
            {item.title}
        </span>
    </li>
);

const AccountNav = () => {
    const dispatch = useDispatch(); // Use dispatch from React-Redux

    const renderedAccountNavItem = useMemo(() => {
        return AccountNavItem.map((item, index) => (
            item.path ? (
                <ListItemWithLink key={index} item={item} />
            ) : (
                <ListItemWithoutLink key={index} item={item} onClick={() => item.onClick(dispatch)} />
            )
        ));
    }, [dispatch]);

    return (
        <div className="accountNav bg-sectionColor border-2 border-colorBorder p-1 rounded-lg">
            <ul className="flex flex-col gap-1">{renderedAccountNavItem}</ul>
        </div>
    );
};

export default AccountNav;
