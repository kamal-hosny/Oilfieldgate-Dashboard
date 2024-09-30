// React
import React from "react";
// Icons
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({lastPage , currentPage, setCurrentPage }) {

    const next = () => {
      if (currentPage === lastPage) return;
   
      setCurrentPage(currentPage + 1);
    };
   
    const prev = () => {
      if (currentPage === 1) return;
   
      setCurrentPage(currentPage - 1);
    };
   
    return (
      <div className="flex items-center gap-8">
        <IconButton
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
        <Typography color="gray" className="font-normal">
          Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
          <strong className="text-gray-900">{lastPage || 1}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={currentPage === 10}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>
    );
}

