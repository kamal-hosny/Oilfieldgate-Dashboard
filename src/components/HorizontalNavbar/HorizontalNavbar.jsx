import React, { useContext, useMemo } from "react";
import AccountBar from "./AccountBar";
import { AllStateContext } from "../../context/AllStateContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


const HorizontalNavbar = () => {
    
    const { mobileSize, openMenu, changeMenuValue } = useContext(AllStateContext);
    
    const menuIcon = useMemo(() => {
        return openMenu ? <MenuIcon /> :  <CloseIcon />;
    }, [openMenu]);

    return (
        <div className="flex justify-between items-center bg-sectionColor border-b-2 border-colorBorder w-full p-4">
            <div className="pageName cursor-pointer" onClick={changeMenuValue}>
                <div className="bg-sectionColorFocus hover:bg-sectionColorHover transition p-3 rounded-lg relative cursor-pointer">
                    {menuIcon}
                </div>
            </div>
            <div className="flex items-center gap-2">
                    <AccountBar />
            </div>
        </div>
    );
};

export default HorizontalNavbar;
