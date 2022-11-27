import { useSelector } from "react-redux";
import { Order, List, Title, OrderDetails } from "./styled"
import ordersSlice, { selectOrders } from "./ordersSlice";

const OrdersList = () => {

    const { orders, toOrders } = useSelector(selectOrders);

    return (
        <List>
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
        </List>
    );
}
export default OrdersList;

/*
id: 2,
client: "NesLogistics",
quantities: 1,
length: 1.2,
width: 0.8,
height: 2,
colDate: 23-10-2022,
delDate: 25-10-2022,
*/