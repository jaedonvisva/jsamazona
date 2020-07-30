import DashboardMenu from '../components/DashboardMenu';

const DashboardScreen = {
  after_render: () => {},
  render: () => {
    return `
    <div class="dashboard">
      ${DashboardMenu.render({ selected: 'dashboard' })}
      <div class="dashboard-content">
        <h1>Dashboard</h1>
        <div>Dashboard summary and charts</div>
      </div>
    </div>
    `;
  },
};
export default DashboardScreen;
