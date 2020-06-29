const RegisterScreen = {
  after_render: () => {},
  render: () => {
    return `
      <div class="form-container">
        <form id="signin-form">
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
              <input type="password" id="password" name="password" />
            </li>
            <li>
              <label for="password">Confirm Password</label>
              <input type="password" id="password" name="password" />
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
