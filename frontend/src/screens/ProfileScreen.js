import { getUserInfo, setUserInfo } from '../localStorage';
import { showLoading, hideLoading, showMessage, rerender } from '../utils';
import { updateProfile, getMyOrders, deleteOrder } from '../api';

const ProfileScreen = {
  after_render: () => {
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure?')) {
          showLoading();
          const result = await deleteOrder(deleteButton.id);
          hideLoading();
          if (result.error) {
            showMessage('Error in deletetion');
          } else {
            showMessage('Deleted Successfully');
          }
          rerender(ProfileScreen);
        }
      });
    });
    const detailsButtons = document.getElementsByClassName('details-button');
    Array.from(detailsButtons).forEach((detailsButton) => {
      detailsButton.addEventListener('click', async () => {
        document.location.hash = `/order/${detailsButton.id}`;
      });
    });
    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        // TODO: Validations
        const data = await updateProfile({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        console.log(data);
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);

          showMessage('Profile Updated', () => {
            document.location.reload();
          });
        }
      });
  },
  render: async () => {
    const { name, email } = getUserInfo();
    const orders = await getMyOrders();
    //
    if (!name) {
      document.location.hash = '/signin';
    }
    return `
    <div class="profile">
      <div class="profile-info">
        <div class="form-container">
          <form id="profile-form">
            <ul class="form">
              <li>
                <h1>Profile</h1>
              </li>
              <li>
                <label for="name">Name</label>
                <input type="text" name="name" id="name" value="${name}"/>
              </li>
              <li>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="${email}" />
              </li>
              <li>
                <label for="password">password</label>
                <input type="password" name="password" id="password" />
              </li>
              <li>
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" />
              </li>
              <li>
                <button type="submit" class="primary">Update</button>
            </ul>
          </form>
        </div>
      </div>
      <div class="profile-orders">
      <h2>Order History </h2>
        <table>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${
              orders.length === 0
                ? `<tr><td colspan="6">No order found!</td></tr>`
                : orders
                    .map(
                      (order) => `
              <tr>
                <td>${order._id}</td>
                <td>${order.createdAt}</td>
                <td>${order.totalPrice}</td>
                <td>${order.isPaid}</td>
                <td>${order.isDelivered}</td>
                <td>
                  <button class="details-button" id="${order._id}">DETAILS</button>
                  <button class="delete-button" id="${order._id}">DELETE</button>
                </td> 
              </tr>
              `
                    )
                    .join('\n')
            }
          </tbody>
        </table>
      </div>
    </div>`;
  },
};
export default ProfileScreen;
