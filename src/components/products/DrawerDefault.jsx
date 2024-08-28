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

export function DrawerDefault() {
  const [open, setOpen] = useState(false);
  const [materialValue, setMaterialValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [dimensionValue, setDimensionValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [conditionValue, setConditionValue] = useState("");
  const [modelNumberValue, setModelNumberValue] = useState("");

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  // Example mock data
  const mockMaterialData = [
    { attributes: { name: "Wood" } },
    { attributes: { name: "Metal" } },
    { attributes: { name: "Plastic" } },
  ];

  const mockCategoryData = [
    { attributes: { name: "Electronics" } },
    { attributes: { name: "Furniture" } },
  ];

  const mockDimensionData = [
    { attributes: { name: "Small" } },
    { attributes: { name: "Medium" } },
    { attributes: { name: "Large" } },
  ];

  const mockBrandData = [
    { attributes: { name: "Brand A" } },
    { attributes: { name: "Brand B" } },
  ];

  const mockConditionData = [
    { attributes: { name: "New" } },
    { attributes: { name: "Used" } },
  ];

  const mockModelNumberData = [
    { attributes: { name: "Model 001" } },
    { attributes: { name: "Model 002" } },
  ];

  const valueMaterial = useSelector((state) => state?.allMaterials?.records?.data) || mockMaterialData;
  const valueCategory = useSelector((state) => state?.allCategories?.records?.data) || mockCategoryData;
  const valueDimension = useSelector((state) => state?.allDimensions?.records?.data) || mockDimensionData;
  const valueBrand = useSelector((state) => state?.allBrands?.records?.data) || mockBrandData;
  const valueCondition = useSelector((state) => state?.allConditions?.records?.data) || mockConditionData;
  const valueModelNumber = useSelector((state) => state?.allModelNumbers?.records?.data) || mockModelNumberData;

  return (
    <React.Fragment>
       <Helmet>
        <style type="text/css">{`
        ${openDrawer && 'overflow: hidden;'}
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
            <label className="text-colorText1">Select Material</label>
            <select
              className="border-colorBorder border-2 p-2 w-full cursor-pointer focus:outline-mainColorHover"
              value={materialValue}
              onChange={(e) => setMaterialValue(e.target.value)}
            >
              <option value="" className="cursor-pointer">All</option>
              {valueMaterial?.map((x, index) => (
                <option className="cursor-pointer" key={index} value={x.attributes.name}>
                  {x.attributes.name}
                </option>
              ))}
            </select>

            <label className="text-colorText1">Select Category</label>
            <select
              className="border-colorBorder border-2 p-2 w-full cursor-pointer focus:outline-mainColorHover"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            >
              <option value="" className="cursor-pointer">All</option>
              {valueCategory?.map((x, index) => (
                <option className="cursor-pointer" key={index} value={x.attributes.name}>
                  {x.attributes.name}
                </option>
              ))}
            </select>

            <label className="text-colorText1">Select Dimension</label>
            <select
              className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover cursor-pointer"
              value={dimensionValue}
              onChange={(e) => setDimensionValue(e.target.value)}
            >
              <option value="" className="cursor-pointer">All</option>
              {valueDimension?.map((x, index) => (
                <option className="cursor-pointer" key={index} value={x.attributes.name}>
                  {x.attributes.name}
                </option>
              ))}
            </select>

            <label className="text-colorText1">Select Brand</label>
            <select
              className="border-colorBorder cursor-pointer border-2 p-2 w-full focus:outline-mainColorHover"
              value={brandValue}
              onChange={(e) => setBrandValue(e.target.value)}
            >
              <option value="" className="cursor-pointer">All</option>
              {valueBrand?.map((x, index) => (
                <option className="cursor-pointer" key={index} value={x.attributes.name}>
                  {x.attributes.name}
                </option>
              ))}
            </select>

            <label className="text-colorText1">Select Condition</label>
            <select
              className="border-colorBorder border-2 cursor-pointer p-2 w-full focus:outline-mainColorHover"
              value={conditionValue}
              onChange={(e) => setConditionValue(e.target.value)}
            >
              <option value="" className="cursor-pointer">All</option>
              {valueCondition?.map((x, index) => (
                <option key={index} className="cursor-pointer" value={x.attributes.name}>
                  {x.attributes.name}
                </option>
              ))}
            </select>

            <label className="text-colorText1">Select Model Number</label>
            <select
              className="border-colorBorder border-2 p-2 cursor-pointer w-full focus:outline-mainColorHover"
              value={modelNumberValue}
              onChange={(e) => setModelNumberValue(e.target.value)}
            >
              <option value="" className="cursor-pointer">All</option>
              {valueModelNumber?.map((x, index) => (
                <option key={index} className="cursor-pointer" value={x.attributes.name}>
                  {x.attributes.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
