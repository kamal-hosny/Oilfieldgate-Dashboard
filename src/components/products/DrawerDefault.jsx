import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import TuneIcon from "@mui/icons-material/Tune";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Select from "react-select";

export function DrawerDefault() {
  const [open, setOpen] = useState(false);
  const [categoryMaterialValue, setCategoryMaterialValue] = useState(null); // تعديل الاسم هنا
  const [categoryValue, setCategoryValue] = useState(null);
  const [brandValue, setBrandValue] = useState(null);
  const [conditionValue, setConditionValue] = useState(null);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const mockMaterialData = [
    { label: "Metal", value: "Metal" },
  ];

  const mockCategoryData = [
    { label: "Electronics", value: "Electronics" },
    { label: "Furniture", value: "Furniture" },
  ];

  const mockBrandData = [
    { label: "Brand A", value: "Brand A" },
    { label: "Brand B", value: "Brand B" },
  ];

  const mockConditionData = [
    { label: "New", value: "New" },
    { label: "Used", value: "Used" },
  ];

  const valueMaterialCategory = useSelector((state) => state?.allMaterialCategories?.records?.data?.map((item) => ({ label: item.name, value: item.name }))) || mockMaterialData; // تعديل المتغير هنا
  const valueCategory = useSelector((state) => state?.allCategories?.records?.data?.map((item) => ({ label: item.name, value: item.name }))) || mockCategoryData;
  const valueBrand = useSelector((state) => state?.allBrands?.records?.data?.map((item) => ({ label: item.name, value: item.name }))) || mockBrandData;
  const valueCondition = useSelector((state) => state?.allConditions?.records?.data?.map((item) => ({ label: item.name, value: item.name }))) || mockConditionData;

  return (
    <React.Fragment>
      <Helmet>
        <style type="text/css">{`
        ${openDrawer === true && 'overflow: hidden;'}
        `}</style>
      </Helmet>
      <Button onClick={openDrawer} className="rounded-e-full p-2 h-[42px]">
        Filters <TuneIcon />
      </Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4 bg-sectionColor">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" className="text-colorText1">
            Filters
          </Typography>
          <IconButton
            variant="text"
            className="text-colorText2 hover:text-colorText1"
            onClick={closeDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        <div className="flex flex-col gap-8">
          <div className="w-full flex flex-col gap-2">
            <label className="text-colorText1">Select Category Material </label> {/* تعديل التسمية هنا */}
            <Select
              classNamePrefix="select"
              value={categoryMaterialValue}
              onChange={setCategoryMaterialValue}
              options={valueMaterialCategory} // تعديل المتغير هنا
              isClearable
              isSearchable
            />

            <label className="text-colorText1">Select Category</label>
            <Select
              classNamePrefix="select"
              value={categoryValue}
              onChange={setCategoryValue}
              options={valueCategory}
              isClearable
              isSearchable
            />

            <label className="text-colorText1">Select Brand</label>
            <Select
              classNamePrefix="select"
              value={brandValue}
              onChange={setBrandValue}
              options={valueBrand}
              isClearable
              isSearchable
            />

            <label className="text-colorText1">Select Condition</label>
            <Select
              classNamePrefix="select"
              value={conditionValue}
              onChange={setConditionValue}
              options={valueCondition}
              isClearable
              isSearchable
            />

          </div>
        </div>
      </Drawer>
    </React.Fragment>
  ); 
}
