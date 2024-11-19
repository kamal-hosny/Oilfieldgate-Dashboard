import React, { useContext, useMemo } from "react";
import { AllStateContext } from "../../context/AllStateContext";
import TuneIcon from '@mui/icons-material/Tune';
import logo from "../../assets/logo/logo.png";
import { NavLink } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const VerticalNavbar = () => {
    const dispatch = useDispatch();
    const { mobileSize, openMenu, changeMenuValue } = useContext(AllStateContext);

    const handleCreateUserOrderClick = () => {
        dispatch(openModal("CreateUserOrderModal"));
    };

    const menuItems = [
        {
            title: "Products",
            icon: <InventoryIcon fontSize="small" />,
            path: "/products",
        },
        {
            title: "Checking Orders",
            icon: <GroupsIcon fontSize="small" />,
            path: "/checking-orders",
        },
        {
            title: "Create Customer Order",
            icon: <GroupAddIcon fontSize="small" />,
            path: null,
            event: handleCreateUserOrderClick,
        },
        {
            title: "Create Specific",
            icon: <TuneIcon fontSize="small" />,
            path: "/create-specific",
        },
    ];

    const renderedMenuItems = useMemo(() => {
        return menuItems.map((item, index) => (
            <li key={index} className="cursor-pointer">
                {item.path ? (
                    <NavLink
                        onClick={() => {
                            openMenu === false && changeMenuValue(true);
                        }}
                        to={item.path}
                        className={({ isActive }) =>
                            `${openMenu ? "p-[15px] w-12 " : "w-full"
                            } flex items-center h-12 whitespace-nowrap gap-2 p-3 transition-all relative text-colorText2 rounded-lg my-1 sm:text-base text-xs ${isActive
                                ? "bg-mainColor text-sectionColor hover:bg-mainColorHover text-white"
                                : "hover:bg-sectionColor"
                            }`
                        }
                    >
                        {item.icon}
                        {!openMenu && <span>{item.title}</span>}
                    </NavLink>
                ) : (
                    <div
                        onClick={item.event}
                        className={`${openMenu ? "p-[15px] w-12" : "w-full"
                            } flex items-center h-12 whitespace-nowrap gap-2 p-3 transition-all relative text-colorText2 rounded-lg my-1 sm:text-base text-xs hover:bg-sectionColor`}
                    >
                        {item.icon}
                        {!openMenu && <span>{item.title}</span>}
                    </div>
                )}
            </li>
        ));
    }, [openMenu, menuItems]);

    return (
        <header
            className={`${mobileSize
                ? `${openMenu ? "-left-[300px] fixed" : "left-0 fixed"
                } w-[250px] h-full top-0 z-20`
                : openMenu
                    ? "w-[89px]"
                    : "w-[300px]"
                } transition-all duration-300 p-5 ${mobileSize ? "fixed" : "relative"
                } v-nav flex-col h-screen gap-10 bg-sectionColor`}
        >
            <span
                className={`${mobileSize
                    ? `${openMenu ? "" : ""}`
                    : `${openMenu ? "w-[89px]" : "w-[280px] left-0"} h-full`} 
                bg-sectionColor fixed top-0 left-0 -z-10 transition-all duration-300`}
            ></span>

            {/* Logo */}
            <div className={`gap-2 logo flex items-center`}>
                <div className="flex items-center justify-center">
                    <div className="image w-10 h-10">
                        <img className="w-10 h-10" src={logo} alt="logo" />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="py-6">
                <ul className="flex flex-col gap-20">
                    <div>
                        <p className={`text-sm font-semibold mb-2 transition-opacity whitespace-nowrap duration-300 ${openMenu ? "opacity-0" : "opacity-100"}`}>MENU</p>
                        {renderedMenuItems}
                    </div>
                    <div>
                        <p className={`text-sm font-semibold mb-2 transition-opacity duration-300 whitespace-nowrap ${openMenu ? "opacity-0" : "opacity-100"}`}>Account management</p>
                        <div
                            className={`${openMenu ? "justify-center w-12" : "w-full"
                                } cursor-pointer flex items-center h-12 gap-2 p-3 transition-all whitespace-nowrap text-colorText2 sm:text-base text-xs rounded-lg my-1 hover:bg-colorBorder`}
                            onClick={() => { dispatch(openModal("LogOut")); }}
                        >
                            <LogoutIcon fontSize="small" />
                            {!openMenu && <span>Log Out</span>}
                        </div>
                    </div>
                </ul>
            </nav>

            {mobileSize && (
                <button
                    onClick={() => changeMenuValue(!openMenu)}
                    className="absolute top-4 right-4 text-white p-2 rounded"
                >
                    {!openMenu && (
                        <div className="bg-sectionColorFocus hover:bg-sectionColorHover transition text-colorText1 p-3 rounded-lg relative cursor-pointer">
                            <CloseIcon />
                        </div>
                    )}
                </button>
            )}
        </header>
    );
};

export default VerticalNavbar;
