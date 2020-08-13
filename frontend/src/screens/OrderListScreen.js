import { getOrders } from '../api';

const OrderListScreen = {
  after_render: () => {},
  render: async () => {
    const orders = await getOrders();
    return `
    <h1>Orders</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>USER</th>
          <th>PAID</th>
          <th>DELIVERD</th>
          <th>ACTIONS</th>
      </thead>
      <tbody>
      ${orders
        .map(
          (order) =>
            `<tr>
          <td>${order._id}</td>
          <td>${order.createdAt}</td>
          <td>${order.totalPrice}</td>
          <td>${order.user}</td>
          <td>${order.isPaid}</td>
          <td>${order.isDelivered}</td>
        </tr>
        `
        )
        .join('\n')}
        
      </tbody>
    </table>
    `;
  },
};

export default OrderListScreen;
