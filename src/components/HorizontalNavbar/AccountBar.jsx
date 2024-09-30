import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import AccountNav from "./AccountNav";

// Memoized Avatar Component
const MemoizedAvatar = memo(({ name }) => {
    return <Avatar size="35px" name={name} round={false} textSizeRatio={2} />;
});
const MemoizedAccountNav = memo(AccountNav);

const AccountBar = () => {
    const [statusAccountNav, setStatusAccountNav] = useState(false);
    const userData = useSelector((state) => state?.loginAuth?.user);

    const toggleAccountNav = () => setStatusAccountNav((prev) => !prev);

    return (
        <div className="AccountBar relative">
            <div
                className="flex items-center gap-2 bg-sectionColorFocus hover:bg-sectionColorHover transition p-1 rounded-lg cursor-pointer"
                onClick={toggleAccountNav}
            >
                <div className="image flex-shrink-0 overflow-hidden rounded-lg">
                    <MemoizedAvatar name={userData?.contactName} />
                </div>
                <div>
                    <div className="info w-[90px] hidden sm:block">
                        <p className="text-sm text-colorText1 font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                            {userData?.contactName + " " + userData?.lastName}
                        </p>
                        <p className="text-colorText2 text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                            Admin
                        </p>
                    </div>
                </div>
                <ArrowDropDownIcon />
            </div>
            {statusAccountNav && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-10 top-16 w-44 sm:w-full right-0 accountNavC"
                >
                    <MemoizedAccountNav />
                </motion.div>
            )}
        </div>
    );
};

export default AccountBar;
