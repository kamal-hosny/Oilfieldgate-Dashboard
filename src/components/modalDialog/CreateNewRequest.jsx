import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { closeModal } from "../../store/modal/modalSlice";
import { createOrder } from "../../store/order/act/actCreateOrder";
import { getOneOrder } from "../../store/order/act/actGetOneOrder";
import { useParams } from "react-router-dom";
import { getUserOrders } from "../../store/usersOrder/act/actGetUserOrders";

const CreateNewRequest = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Customer ID passed via URL

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData) => {
        // if (!formData.Customer_PO || !formData.OG_Invoice) {
        //     toast.error("Required fields are missing.");
        //     return;
        // }

        dispatch(
            createOrder({
                "RFQ Date": new Date(), // Set current date
                Customer: id,
                status: formData.status || "pending",
                OG_Invoice: formData.OG_Invoice || "N/A",
                Customer_PO: formData.Customer_PO || "N/A",
                Payment_Date: formData.Payment_Date || "",
                Payment_AED: formData.Payment_AED || 0,
                Payment_Reference: formData.Payment_Reference || "",
                Shipping_status: formData.Shipping_status || "",
                DN: formData.DN || "N/A",
                Comments: formData.Comments || "No comments",
                cart: []
            })
        )
            .then(() => {
                toast.success("Created a new request successfully!");
                dispatch(getUserOrders(id));
            })
            .catch((error) => {
                console.error("Error updating:", error);
                toast.error("Error creating the order. Please try again.");
            });

        dispatch(closeModal());
    };

    const cancel = (e) => {
        e.preventDefault();
        dispatch(closeModal());
    };

    return (
        <div className="fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-[450px] bg-sectionColor border-2">
            <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
                Create a new request
            </div>
            <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full text-colorText1 text-sm gap-2 grid grid-cols-6"
                >
                    {/* Status (Select) */}
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">Status:</label>
                        <select
                            {...register("status")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        >
                            <option value="">Select Status</option>
                            <option value="quoted">Quoted</option>
                            <option value="sent">Sent</option>
                            <option value="in-progress">In Progress</option>
                            <option value="approved">Approved</option>
                            <option value="on-hold">On Hold</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        {errors.status && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* OG Invoice */}
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">OG Invoice:</label>
                        <input
                            type="text"
                            {...register("OG_Invoice")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        />
                        {errors.OG_Invoice && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* Customer PO */}
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">Customer PO:</label>
                        <input
                            type="text"
                            {...register("Customer_PO")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        />
                        {errors.Customer_PO && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* Payment Date */}
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">Payment Date:</label>
                        <input
                            type="date"
                            {...register("Payment_Date")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        />
                        {errors.Payment_Date && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* Payment AED */}
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">Payment AED:</label>
                        <input
                            type="number"
                            {...register("Payment_AED")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        />
                        {errors.Payment_AED && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* Payment Reference */}
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">Payment Reference:</label>
                        <input
                            type="text"
                            {...register("Payment_Reference")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        />
                        {errors.Payment_Reference && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* Shipping Status */}
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">Shipping Status:</label>
                        <select
                            {...register("Shipping_status")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        >
                            <option value="">Select Status</option>
                            <option value="pending-material">Pending Material</option>
                            <option value="pending-in-progress">Pending in progress</option>
                            <option value="pending-shipping-quote">Pending Shipping quote</option>
                            <option value="pending-collection">Pending Collection</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        {errors.Shipping_status && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* DN */}
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">DN:</label>
                        <input
                            type="text"
                            {...register("DN")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        />
                        {errors.DN && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* Comments */}
                    <div className="flex flex-col gap-1 col-span-6">
                        <label className="text-colorText1">Comments:</label>
                        <textarea
                            {...register("Comments")}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        ></textarea>
                        {errors.Comments && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between gap-2 mt-2 col-span-6 items-center">
                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="bg-green-700 hover:bg-green-900 transition-all text-white px-4 py-2 rounded"
                            >
                                Create
                            </button>
                            <button
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
};

export default CreateNewRequest;
