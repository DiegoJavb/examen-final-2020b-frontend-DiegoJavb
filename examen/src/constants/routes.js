/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
  //ARTICLES: "/articles",
  // USERS: "/usuarios",
  // USERS_ID: `/usuario/:id`,
  ABOUT: "/about",
};

const privateRoutes = {
  HOME: "/",
  // ARTICLE_ID: "/articulo/:id",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
