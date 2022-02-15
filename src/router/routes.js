const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "me", name :"me",
        component: () => import("pages/Me.vue"),
      },
      
      {
        path: "dashboard", name :"dashboard",
        component: () => import("pages/Dashboard.vue"),
      },
    ],
      meta : {
        requiresAuth: true
      }
      
    
  },

  {
    path: "/",
    component: () => import("layouts/MainLayoutlogin.vue"),
    children: [
      {
        path: "email-confirmation", name :"email-confirmation",
        component: () => import("pages/EmailConfirmation.vue"),
      },
      {
        path: "forgot-password", name :"forgot-password",
        component: () => import("pages/ForgotPassword.vue"),
      },
      {
        path: "reset-password", name :"reset-password",
        component: () => import("pages/ResetPassword.vue"),
      },

      
      
      {
        path: "login", name:"login",
        component: () => import("pages/Login.vue"),
      },
      {
        path: "registration", name:"registration",
        component: () => import("pages/Registration.vue"),
      },
    ],
  },



  
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*", name:"error404",
    component: () => import("pages/Error404.vue"),
  },
  
];

export default routes
