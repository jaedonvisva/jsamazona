import { setUserInfo } from '../localStorage';
import { register } from '../api';

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = await register({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        if (data.error) {
          alert(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = '/';
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
              <input type="password" id="password" name="password"  pattern="(?=.*[a-z])(?=.*[0-9]).{5,}"/>
            </li>
            <li>
              <label for="password">Confirm Password</label>
              <input type="password" id="password_confirm" name="password_confirm" />
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
