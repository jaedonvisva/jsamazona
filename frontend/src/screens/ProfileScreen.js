import { getUserInfo, setUserInfo } from '../localStorage';
import { showLoading, hideLoading, showMessage } from '../utils';
import { updateProfile } from '../api';

const ProfileScreen = {
  after_render: () => {
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

      </div>
    </div>`;
  },
};
export default ProfileScreen;
