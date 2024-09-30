import React from "react";
import formatCurrency from "../../util/formatCurrency";

const PricingTable = React.memo(({ orderData }) => {
    const totalPrice = React.useMemo(() => {
        return Array.isArray(orderData)
            ? orderData.reduce(
                (acc, x) => acc + x.price * x.Quantity,
                0
            ) 
            : 0;
    }, [orderData]);

    return (
        <div className="flex flex-col gap-2 border-2 border-colorBorder">
            <p className="text-colorText1 p-3 bg-[#eceff1]">Pricing Table</p>
            <div className="cards p-2 flex flex-col gap-2">
                {Array.isArray(orderData) && orderData.length > 0 ? (
                    orderData.map((x, index) => (
                        <div key={index} className="card text-sm flex justify-between">
                            <div className="flex gap-2">
                                <div className="name">{x?.product_name}</div>
                                <div className="quantity">
                                    x <span>{x?.Quantity}</span>
                                </div>
                            </div>
                            <div className="price font-semibold">{formatCurrency(x?.price)}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No items in the order.</p>
                )}
            </div>
            <div className="total-price p-2 bg-[#eceff1] text-lg font-bold mt-4 flex justify-between">
                <span>Total:</span>
                <span>{formatCurrency(totalPrice)}</span>
            </div>
        </div>
    );
});

export default PricingTable;
