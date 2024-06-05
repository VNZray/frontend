import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    // ----------------------------------------------------------------------------

    //Guest View
    {
      path: '/',
      name: 'Homepage',
      component: () => import('@/pages/guest/Homepage.vue')
    }, {
      path: '/account/:account_id',
      name: 'HomepageLoggedIn',
      component: () => import('@/pages/guest/Homepage.vue')
    },
    {
      path: '/booking/establishment',
      name: 'Establsihments',
      component: () => import('@/pages/guest/Establsihments.vue')
    },
    {
      path: '/booking/establishment/account/:account_id',
      name: 'EstablsihmentsLoggedIn',
      component: () => import('@/pages/guest/Establsihments.vue')
    },
    {
      path: '/booking/establishment/profile/:establishment_id',
      name: 'EstablishmentBookingProfile',
      component: () => import('@/pages/guest/Profile.vue')
    },
    {
      path: '/booking/establishment/profile/:establishment_id/account/:account_id',
      name: 'EstablishmentBookingProfileLoggedIn',
      component: () => import('@/pages/guest/Profile.vue')
    },
    {
      path: '/booking/apply-membership',
      name: 'BookingPageApply',
      component: () => import('@/pages/guest/Apply.vue')
    },

    // Logged-in View
    {
      path: '/booking/apply-membership/account/:account_id',
      name: 'BookingPageApplyLoggedIn',
      component: () => import('@/pages/guest/Apply.vue')
    },
    {
      path: '/booking/profile/:account_id',
      name: 'GuestProfile',
      component: () => import('@/pages/guest/GuestProfile.vue')
    },


    /*=======================================================================
    ADMIN ROUTES                                                          
    ========================================================================*/
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/admin/Dashboard.vue')
    },
    {
      path: '/admin/establishment/list',
      name: 'Accommodations',
      component: () => import('@/pages/admin/Establsihments.vue')
    },
    {
      path: '/admin/applicants',
      name: 'Applicants',
      component: () => import('@/pages/admin/Applicants.vue')
    },
    {
      path: '/admin/apply-membership',
      name: 'Apply',
      component: () => import('@/pages/admin/Apply.vue')
    },
    {
      path: '/admin/membership-payment',
      name: 'Payment',
      component: () => import('@/pages/admin/Payment.vue')
    },
    {
      path: '/admin/member/list',
      name: 'Members',
      component: () => import('@/pages/admin/Members.vue')
    },
    {
      path: '/admin/create-account',
      name: 'AdminCreateAccount',
      component: () => import('@/pages/admin/CreateAccount.vue')
    },

    // ----------------------------------------------------------------------

    {
      path: '/admin/dashboard/:account_id',
      name: 'AdminDashboard',
      component: () => import('@/pages/admin/Dashboard.vue')
    },
    {
      path: '/admin/establishment/:account_id',
      name: 'AdminEstablishment',
      component: () => import('@/pages/admin/Establsihments.vue')
    },
    {
      path: '/admin/applicants/:account_id',
      name: 'AdminApplicants',
      component: () => import('@/pages/admin/Applicants.vue')
    },
    {
      path: '/admin/apply-membership/:account_id',
      name: 'AddminApply',
      component: () => import('@/pages/admin/Apply.vue')
    },
    {
      path: '/admin/membership-payment/:account_id',
      name: 'AdminPayment',
      component: () => import('@/pages/admin/Payment.vue')
    },
    {
      path: '/admin/member/list/:account_id',
      name: 'AdminMembers',
      component: () => import('@/pages/admin/Members.vue')
    },
    {
      path: '/admin/create-account',
      name: 'AdminCreateAccount',
      component: () => import('@/pages/admin/CreateAccount.vue')
    },

    /*=======================================================================
    OWNER ROUTES                                                          
    ========================================================================*/
    {
      path: '/owner/dashboard/:owner_id',
      name: 'OwnerDashboard',
      component: () => import('@/pages/owner/Dashboard.vue')
    },

    {
      path: '/owner/establishment/:owner_id',
      name: 'OwnerEstablishment',
      component: () => import('@/pages/owner/Establishment.vue')
    },
    {
      path: '/owner/establishment/profile/:owner_id',
      name: 'OwnerEstablishmentProfile',
      component: () => import('@/pages/owner/EstablishmentProfile.vue')
    },
    {
      path: '/owner/reservation/:owner_id',
      name: 'OwnerReservation',
      component: () => import('@/pages/owner/Reservation.vue') //
    },

    {
      path: '/owner/booking_records/:owner_id',
      name: 'BookingRecords',
      component: () => import('@/pages/owner/BookingRecords.vue')
    },

    {
      path: '/owner/profile/:owner_id',
      name: 'OwnerProfile',
      component: () => import('@/pages/owner/OwnerProfile.vue')
    },
    {
      path: '/owner/order/:owner_id',
      name: 'OwnerOrder',
      component: () => import('@/pages/owner/Order.vue')
    },
    {
      path: '/owner/menu/:owner_id',
      name: 'OwnerMenu',
      component: () => import('@/pages/owner/Menu.vue')
    },

    //Login and Register Router
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Register.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/pages/test.vue')
    },

  ]
});

export default router;
