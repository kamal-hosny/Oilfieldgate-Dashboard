import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../store/modal/modalSlice";
import { createUsersOrder } from "../../store/usersOrder/act/actCreateUsersOrder";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAllUsersOrders } from "../../store/usersOrder/act/actGetAllUsersOrder";

const CreateUserOrderModal = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const onSubmit = useCallback((formData) => {
    console.log(formData);

    dispatch(createUsersOrder({
        "contactName": formData?.firstName,
        "lastName": formData?.lastName,
        "companyName": formData?.companyName,
        "Email": formData?.email,
        "phoneNumber": formData?.phoneNumber,
        "country": formData?.asdads
    }))
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        dispatch(getAllUsersOrders());
        toast.success("User created successfully");

      })
      .catch((error) => {
        console.error("Error creating User:", error);
        toast.error(error.message || "Failed to create order.");
      });

    confirmLog();
  }, [dispatch]);

  return (
    <div
      className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2`}
    >
      <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
        Create Customer
      </div>
      <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full text-colorText1 text-sm gap-2 grid grid-cols-6"
        >
          {/* firstName */}
          <div className="flex flex-col gap-1 col-span-3">
            <label className="text-colorText1">First Name:</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
            />
            {errors.firstName && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* lastName */}
          <div className="flex flex-col gap-1 col-span-3">
            <label className="text-colorText1">Last Name:</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
            />
            {errors.lastName && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* companyName */}
          <div className="flex flex-col gap-1 col-span-3">
            <label className="text-colorText1">Company Name:</label>
            <input
              type="text"
              {...register("companyName", { required: true })}
              className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
            />
            {errors.companyName && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* email */}
          <div className="flex flex-col gap-1 col-span-3">
            <label className="text-colorText1">Email:</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* phoneNumber */}
          <div className="flex flex-col gap-1 col-span-3">
            <label className="text-colorText1">Phone Number:</label>
            <input
              type="text"
              {...register("phoneNumber", { required: true })}
              className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* country */}
          <div className="flex flex-col gap-1 col-span-3">
            <label className="text-colorText1">Country:</label>
            <input
              type="text"
              {...register("country", { required: true })}
              className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
            />
            {errors.country && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Submit & Cancel buttons */}
          <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-900 text-white px-3 py-2 rounded-sm"
              >
                Create
              </button>
              <button
                type="button"
                onClick={cancel}
                className="bg-gray-500 text-white px-3 py-2 rounded-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default CreateUserOrderModal;
