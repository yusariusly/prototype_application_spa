// Serenity & Soul - Spa Application Prototype JS

// Dynamic Tenant initialization
export const urlParams = new URLSearchParams(window.location.search);
export const tenantId = urlParams.get('tenant') || 'serenity';
window.currentTenantId = tenantId;

export const DEFAULT_TENANTS = {
  serenity: {
    id: 'serenity',
    name: 'Serenity & Soul',
    logo: 'Serenity',
    colors: {
      primary: '#50613f',
      secondary: '#fed65b',
      background: '#f4fbfa',
      surfaceContainer: '#e8efef'
    }
  },
  zenith: {
    id: 'zenith',
    name: 'Zenith Wellness',
    logo: 'Zenith',
    colors: {
      primary: '#1e40af',
      secondary: '#f59e0b',
      background: '#f8fafc',
      surfaceContainer: '#f1f5f9'
    }
  }
};

export const tenants = JSON.parse(localStorage.getItem('spa_tenants')) || DEFAULT_TENANTS;
export const currentTenant = tenants[tenantId] || tenants['serenity'];
