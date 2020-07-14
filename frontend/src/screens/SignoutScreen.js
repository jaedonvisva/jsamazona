import { clearUserInfo } from '../localStorage';

const SignoutScreen = {
  after_render: () => {},
  render: () => {
    clearUserInfo();
    document.location.hash = '/signin';
    return '';
  },
};
export default SignoutScreen;
