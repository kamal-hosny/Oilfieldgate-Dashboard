import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import withGuard from "../util/withGuard";
import ImageUploading from "react-images-uploading";
import CloseIcon from "@mui/icons-material/Close";
import { createProduct } from "../store/products/act/actCreateProduct";
import { toast } from "react-toastify";
import { createMainImg } from "../store/productCreateMainImg/act/actCreateMainImg";
import { createImgs } from "../store/productCreateImgs/act/actCreateImgs";
import Loading from "../components/UI/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { uploadPdfOneProducts } from "../store/products/act/acrEditPdfOneProducts";

const CreateProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()



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

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [sentMainImage, setSentMainImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const maxNumber = 10;

  const onSubmit = async (data) => {
    try {
      const pdfFile = data.document && data.document.length > 0 ? data.document[0] : null;


      // if (!images.length) {
      //   alert("Please upload at least one image.");
      //   return;
      // }

      // if (!data.document || data.document.length === 0) {
      //   alert("Please upload a PDF document.");
      //   return;
      // }

      const formData = new FormData();
      setLoading(true);
      // formData.append("product_name", data.productName);
      // formData.append("price", data.price);
      // formData.append("model_number", data.modelNumber);
      // formData.append("category", data.category);
      // formData.append("dimension", data.dimension);
      // formData.append("unit_of_measurement", data.unitOfMeasurement);
      // formData.append("condition", data.condition);
      // formData.append("brand", data.brand);
      // formData.append("weight", data.Weight);
      // formData.append("size", data.size);
      // formData.append("HNS_code", data.HNSCode);
      // formData.append("material_category", data.materialCategory);
      // formData.append("instock", data.instock);
      // formData.append("description", data.description);
      // formData.append("currency", "AED");

      const productData = {
        product_name: data.productName,
        price: Number(data.price),
        model_number: data.modelNumber,
        category: data.category,
        Dimension: data.dimension,
        Unit_of_Measurement: data.unitOfMeasurement,
        condition: data.condition,
        brand: data.brand,
        weight: data.Weight,
        size: data.size,
        HNS_code: data.HNSCode,
        material_Category: data.materialCategory,
        instock: Number(data.instock),
        Description: data.description,
        Currency: "AED",


      }


      const response = await dispatch(
        createProduct(productData)
        );


      const { insertedId } = response?.payload?.data;

        console.log(insertedId);

      if (!insertedId) {
        throw new Error("Failed to insert product data.");
      }

      if (sentMainImage) {
        const formDataMainImg = new FormData();
        formDataMainImg.append("main_img", sentMainImage);

        await dispatch(
          createMainImg({
            id: insertedId,
            mainImg: formDataMainImg,
          })
        );
      }


          // رفع ملف الـ PDF إذا تم تحميله، أو استخدام الملف السابق
    if (pdfFile) {
      const formDataPdf = new FormData();
      formDataPdf.append("file", pdfFile);
    
      await dispatch(uploadPdfOneProducts({
        _id: insertedId,
        pdf: pdfFile, // لا داعي لاستدعاء formData.get()
      }));
    }


      for (const image of images) {
        const formDataImg = new FormData();
        formDataImg.append("imgs", image.file);

        await dispatch(
          createImgs({
            id: insertedId,
            imgs: formDataImg,
          })
        );
      }

      toast.success("Product and images uploaded successfully!");
      setLoading(false);
      navigate('/products');
      
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message || "Failed to create product or upload images.");
    }
  };

  const onChangeImage = (imageList) => {
    setImages(imageList);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSentMainImage(file);
      setMainImage(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (mainImage) {
        URL.revokeObjectURL(mainImage);
      }
    };
  }, [mainImage]);

  return (
    <>
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
                min="0"
                type="number"
                {...register("price", {
                  required: true,
                  validate: (value) => value >= 0 || "Price cannot be negative",
                })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.price && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Model Number */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Model Number:</label>
              <input
                type="text"
                {...register("modelNumber", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.modelNumber && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Supply Availability */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">instock:</label>
              <input
                type="number"
                min="0"
                {...register("instock", {
                  required: true,
                  validate: (value) => value >= 0 || "Price cannot be negative",
                })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.instock && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* HNS Code    */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">HNS Code :</label>
              <input
                type="text"
                {...register("HNSCode", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.HNSCode && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Material Category */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Material Category:</label>
              <Select
                classNamePrefix="select"
                options={valueMaterialCategory}
                isClearable
                isSearchable
                onChange={(selected) =>
                  setValue("materialCategory", selected?.value)
                }
              />
              {errors.materialCategory && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Category:</label>
              <Select
                classNamePrefix="select"
                options={valueCategory}
                isClearable
                isSearchable
                onChange={(selected) => setValue("category", selected?.value)}
              />
              {errors.category && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Brand */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Brand:</label>
              <Select
                classNamePrefix="select"
                options={valueBrand}
                isClearable
                isSearchable
                onChange={(selected) => setValue("brand", selected?.value)}
              />
              {errors.brand && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Condition */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Condition:</label>
              <Select
                classNamePrefix="select"
                options={valueCondition}
                isClearable
                isSearchable
                onChange={(selected) => setValue("condition", selected?.value)}
              />
              {errors.condition && (
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
            {/* Weight  */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Weight :</label>
              <input
                type="text"
                {...register("Weight", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.Weight && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* size    */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Size :</label>
              <input
                type="text"
                {...register("size", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.size && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* UOM */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">UOM:</label>
              <input
                type="text"
                {...register("unitOfMeasurement", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.unitOfMeasurement && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Description  */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Description :</label>
              <textarea
                name=""
                id=""
                {...register("description", { required: true })}
                className="border-colorBorder h-48 border-2 p-2 w-full focus:outline-mainColorHover"
              ></textarea>
              {errors.description && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Document  */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Add PDF Document:</label>
              <input
                {...register("document")}
                type="file"
                accept=".pdf" // Ensure only PDFs are uploaded
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.document && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="flex gap-4 flex-col justify-center flex-1">
            <div className=" flex flex-col w-full gap-4">
              <label className="text-colorText1">Main image:</label>
              <label
                htmlFor="mainFile"
                className="cursor-pointer bg-sectionColor flex rounded-md border-2 w-[300px] h-[300px] border-colorBorder shadow justify-center items-center"
              >
                {mainImage ? (
                  <div className="images relative w-full h-full">
                    <img
                      className="rounded-md w-full h-full object-cover"
                      src={mainImage}
                      alt="mainImage"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1">
                    <svg
                      viewBox="0 0 640 512"
                      className="h-12 fill-gray-700 mb-5"
                    >
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p className="text-colorText2">Drag and Drop</p>
                    <p className="text-colorText2">or</p>
                    <span className="bg-gray-700 text-white px-4 py-1 rounded-lg transition-all duration-300 hover:bg-black">
                      Upload main Image
                    </span>
                  </div>
                )}
                <input
                  id="mainFile"
                  type="file"
                  className="hidden"
                  {...register("mainImg", {
                    required: false,
                    onChange: handleImageUpload,
                  })}
                />
              </label>
            </div>
            
            <div className="flex-1 flex flex-col gap-4 w-full">
              <label className="text-colorText1">Images:</label>
              <ImageUploading
                multiple
                value={images}
                onChange={onChangeImage}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload, onImageRemove }) => (
                  <div className="upload__image-wrapper">
                    <button
                      type="button"
                      className="cursor-pointer bg-sectionColor p-8 flex rounded-md border-2 w-full h-[250px] border-colorBorder shadow justify-center items-center"
                      onClick={onImageUpload}
                    >
                      <div className="flex flex-col items-center justify-center gap-1">
                        <svg
                          viewBox="0 0 640 512"
                          className="h-12 fill-gray-700 mb-5"
                        >
                          <path d="..."></path>
                        </svg>
                        <p className="text-colorText2">
                          Drag and Drop or Click to Upload
                        </p>
                      </div>
                    </button>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imageList.map((image, index) => (
                        <div key={index} className="image relative w-24 h-24">
                          <img
                            src={image.data_url}
                            alt={`mainImage ${index}`}
                            className="w-24 h-24 object-cover"
                          />
                          <div
                            className="cursor-pointer absolute z-[2] top-1 left-1 rounded-full p-0.5 bg-[#ffffff67]"
                            onClick={() => onImageRemove(index)}
                          >
                            <span className="text-[#616161] hover:text-red-700 transition-all flex items-center justify-center">
                              <CloseIcon fontSize="small" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
              {errors.images && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 items-center">
          <button className="bg-gray-600 text-white p-2 rounded-md" onClick={()=> {navigate('/products');}}>
            Cancel
          </button>
          <button
            type="submit"
            className="bg-mainColor text-white p-2 rounded-md"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
    <Loading loading={loading} error={null} className={""} classStyle={"fixed top-0 z-20 left-0 w-full h-full bg-[#00000060] flex justify-center items-center"}  >
      <span/>
    </Loading>
    </>
  );
};

export default withGuard(CreateProducts);
