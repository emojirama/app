const routes = [
  {
    path: "/game",
    component: () => import("layouts/BaseLayout.vue")
  },
  {
    path: "/emojirama/:id",
    component: () => import("layouts/BaseLayout.vue"),
    meta: {
      db: true
    }
  },
  {
    path: "/emojirama/live/:id",
    component: () => import("layouts/BaseLayout.vue"),
    meta: {
      live: true
    }
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "auth/:provider/callback",
        component: () => import("pages/Auth/Callback.vue")
      },
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      { path: "login", component: () => import("pages/Auth/Login.vue") },
      { path: "signup", component: () => import("pages/Auth/SignUp.vue") },
      {
        path: "about",
        component: () => import("pages/About.vue")
      },
      {
        path: "protected",
        // beforeEnter: ifAuthenticated,
        component: () => import("pages/Protected.vue")
      },
      {
        path: "to-do",
        component: () => import("pages/ToDo.vue")
      },
      {
        path: "services",
        component: () => import("pages/Services/index.vue")
      },
      {
        path: "debug/environment-variables",
        component: () => import("pages/Environment.vue")
      },
      {
        path: "examples/",
        // beforeEnter: ifAuthenticated,
        component: () => import("pages/Examples/index.vue"),
        children: [
          {
            path: "websockets",
            // beforeEnter: ifAuthenticated,
            component: () => import("pages/Examples/Websockets.vue")
          },
          {
            path: "redis",
            // beforeEnter: ifAuthenticated,
            component: () => import("pages/Examples/Redis.vue")
          }
        ]
      },
      {
        path: "/emojirama",
        component: () => import("pages/EmojiramaList.vue"),
        meta: {
          preview: true
        }
      },
      {
        path: "/new",
        component: () => import("pages/NewEmojirama.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
