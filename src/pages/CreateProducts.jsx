import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [previews, setPreviews] = useState([]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });
    Object.keys(data).forEach((key) => {
      if (key !== "images") {
        formData.append(key, data[key]);
      }
    });
    console.log(data);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form
        className="py-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="md:flex-row flex-col flex justify-between items-start gap-3">
          <div className="grid grid-cols-6 gap-2 w-full bg-sectionColor p-3 rounded-md border-2 border-colorBorder shadow flex-1">
            {/* Product Name */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Product Name:</label>
              <input
                type="text"
                {...register("productName", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.productName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Price */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Price:</label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.price && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Currency */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Currency:</label>
              <input
                type="text"
                {...register("currency", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.currency && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Material Reference Number */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Material Ref No:</label>
              <input
                type="text"
                {...register("materialRefNo", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.materialRefNo && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Dimension */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Dimension:</label>
              <input
                type="text"
                {...register("dimension", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.dimension && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Unit of Measurement */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Unit of Measurement:</label>
              <input
                type="text"
                {...register("unitOfMeasurement", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.unitOfMeasurement && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Condition */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Condition:</label>
              <input
                type="text"
                {...register("condition", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.condition && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Categories */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Categories:</label>
              <input
                type="text"
                {...register("categories", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.categories && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Supply Availability */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Supply Availability:</label>
              <input
                type="number"
                {...register("supplyAvailability", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.supplyAvailability && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 w-full">
            <label
              htmlFor="file"
              className="cursor-pointer bg-sectionColor p-8 flex rounded-md border-2 w-full h-[250px] border-colorBorder shadow justify-center items-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <svg viewBox="0 0 640 512" className="h-12 fill-gray-700 mb-5">
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                </svg>
                <p className="text-colorText2">Drag and Drop</p>
                <p className="text-colorText2">or</p>
                <span className="bg-gray-700 text-white px-4 py-1 rounded-lg transition-all duration-300 hover:bg-black">
                  Browse file
                </span>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
                {...register("images", {
                  required: true,
                  onChange: handleImageUpload,
                })}
                multiple
              />
            </label>
            {errors.images && (
              <span className="text-red-500">This field is required</span>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {previews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center">
          <button className="bg-gray-600 text-white p-2 rounded-md">Cancel</button>
          <button type="submit" className="bg-mainColor text-white p-2 rounded-md">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProducts;
