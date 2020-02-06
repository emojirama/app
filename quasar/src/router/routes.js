const routes = [
  {
    path: "/game",
    component: () => import("layouts/BaseLayout.vue")
  },
  {
    path: "/zombies",
    component: () => import("layouts/BaseLayout.vue"),
    meta: {
      zombies: true
    }
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
      {
        path: "about",
        component: () => import("pages/About.vue")
      },
      {
        path: "/emojimart",
        component: () => import("pages/Emojimart.vue")
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
