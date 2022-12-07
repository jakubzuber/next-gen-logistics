import { useSelector } from "react-redux";
import { selectOrders } from "./ordersSlice";
import { Order, OrderDetails } from "./styled";
const Orders = () => {

    const { orders, toOrders } = useSelector(selectOrders);

    return (
        <>
            {orders.map(order => (
                <Order>
                    <OrderDetails>
                        {order.id}
                    </OrderDetails>
                    <OrderDetails>
                        {order.client}
                    </OrderDetails>
                    <OrderDetails>
                        {order.quantities}
                    </OrderDetails>
                    <OrderDetails>
                        {order.length}
                    </OrderDetails>
                    <OrderDetails>
                        {order.width}
                    </OrderDetails>
                    <OrderDetails>
                        {order.height}
                    </OrderDetails>
                    <OrderDetails>
                        {order.colDate}
                    </OrderDetails>
                    <OrderDetails>
                        {order.delDate}
                    </OrderDetails>
                </Order>
            ))}
        </>
    )
}

export default Orders;