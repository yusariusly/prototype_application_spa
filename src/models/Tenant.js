import { SERVICES, THERAPISTS, getSharedData, syncServices, syncTherapists } from '../models/Database.js';
import { TRANSLATIONS, t, getServiceTranslation, translateStaticHtml, toggleLanguage } from '../models/Translations.js';
import { DEFAULT_STATE, state, loadState, saveState } from '../models/State.js';
import { isLoggedIn, updateNavbarAuth } from '../controllers/AuthController.js';
import { navigateTo, updateTenantLinks, updateNavbarActiveState, updateStepperUI, navigateToAllServicesWithFilter } from '../controllers/Router.js';
import { renderActiveViewContents, updateHeaderWalletDisplay, renderHomeView, renderServicesCatalogView, renderSelectServiceView, renderSelectTherapistView, renderSelectTimeView, renderConfirmBookingView, renderActivePackagesWidget, renderPaymentMethodSelection, startBookingWithService } from '../views/Renderers.js';
import { renderSidebarSummary, renderSuccessView } from '../views/SidebarSummary.js';
import { resetBookingFlow, nextStep, prevStep } from '../controllers/BookingController.js';
import { showNotification } from '../views/Toast.js';
import { renderProfileView, renderWalletView, renderTopupView, renderPersonalDetailsView, renderBookingHistoryView, renderNotificationsView, renderPrivacySecurityView, renderRescheduleView } from '../views/ProfileViews.js';
import { renderAllServicesView } from '../views/CatalogViews.js';
import { openPaymentMethodsModal, closePaymentMethodsModal } from '../views/PaymentModal.js';
import { renderBookPackageView, renderActivePackagesView } from '../views/PackageViews.js';

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
