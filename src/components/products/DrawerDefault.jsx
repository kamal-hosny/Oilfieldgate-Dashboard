// React
import React, { useState, useEffect, useCallback } from "react";
// Redux
import { useSelector } from "react-redux";
// Material-tailwind
import { Drawer, Button, Typography, IconButton } from "@material-tailwind/react";
// Icons
import TuneIcon from "@mui/icons-material/Tune";
// Other-libraries
import Select from "react-select";


export function DrawerDefault({ filterValues, setFilterValues }) {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const valueMaterialCategory = useSelector((state) =>
    state?.allMaterialCategories?.records?.data?.map((item) => ({
      label: item.name,
      value: item.name,
    }))
  );
  const valueCategory = useSelector((state) =>
    state?.allCategories?.records?.data?.map((item) => ({
      label: item.name,
      value: item.name,
    }))
  );
  const valueBrand = useSelector((state) =>
    state?.allBrands?.records?.data?.map((item) => ({
      label: item.name,
      value: item.name,
    }))
  );
  const valueCondition = useSelector((state) =>
    state?.allConditions?.records?.data?.map((item) => ({
      label: item.name,
      value: item.name,
    }))
  );

  const handleFilterChange = useCallback((field, selectedOption) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: selectedOption, // احفظ الكائن الكامل { label, value }
    }));
  }, [setFilterValues]);
  

  return (
    <React.Fragment>
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
            <label className="text-colorText1">Select Category Material </label>
            <Select
              classNamePrefix="select"
              value={filterValues.materialCategory}
              onChange={(value) => handleFilterChange("materialCategory", value)}
              options={valueMaterialCategory}
              isClearable
              isSearchable
            />

            <label className="text-colorText1">Select Category</label>
            <Select
              classNamePrefix="select"
              value={filterValues.category}
              onChange={(value) => handleFilterChange("category", value)}
              options={valueCategory}
              isClearable
              isSearchable
            />

            <label className="text-colorText1">Select Brand</label>
            <Select
              classNamePrefix="select"
              value={filterValues.brand}
              onChange={(value) => handleFilterChange("brand", value)}
              options={valueBrand}
              isClearable
              isSearchable
            />

            <label className="text-colorText1">Select Condition</label>
            <Select
              classNamePrefix="select"
              value={filterValues.condition}
              onChange={(value) => handleFilterChange("condition", value)}
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
