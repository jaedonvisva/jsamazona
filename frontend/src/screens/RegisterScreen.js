import { setUserInfo } from '../localStorage';
import { register } from '../api';
import { showMessage } from '../utils';

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const passwordConfirm = document.getElementById('password-confirm');
        // Frontend Validations
        if (!name.value) {
          showMessage('Enter Your Name', () => {
            name.focus();
          });
          return;
        }
        if (!email.value) {
          showMessage('Enter Your Email', () => {
            email.focus();
          });
          return;
        }
        if (!password.value) {
          showMessage('Enter Password', () => {
            password.focus();
          });
          return;
        }
        if (!passwordConfirm.value) {
          showMessage('Enter Confirm Password', () => {
            passwordConfirm.focus();
          });
          return;
        }
        if (password.value !== passwordConfirm.value) {
          showMessage('Password Should Be Equal To Confirm Password', () => {
            password.value = '';
            passwordConfirm.value = '';
            password.focus();
          });
          return;
        }
        // Call Register API
        const data = await register({
          name: name.value,
          email: email.value,
          password: password.value,
        });

        // Backend Validations
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          showMessage('You registered successfully.', () => {
            document.location.hash = '/';
          });
        }
      });
  },
  render: () => {
    return `
      <div class="form-container">
        <form id="register-form">
          <ul class="form">
            <li>
              <h1>Register</h1>
            </li>
            <li>
              <label for="name">Name</label>
              <input type="text" name="name" id="name" />
            </li>
            <li>
              <label for="email"> Email</label>
              <input type="email" name="email" id="email" />
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" id="password" name="password"  />
            </li>
            <li>
              <label for="password">Confirm Password</label>
              <input type="password" id="password-confirm" name="password-confirm" />
            </li>
            <li>
              <button type="submit" class="primary">Register</button>
            </li>
            <li>
              <div>
                Already have an account? <a href="/#/signin">Sign In</a>
              </div>
            </li>
          </ul>
        </form>
      </div>
  
      `;
  },
};
export default RegisterScreen;
