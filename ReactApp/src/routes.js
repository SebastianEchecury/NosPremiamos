export const Routes = {
  Dashboard: { path: "/" },
  Signin: { path: "/sign-in" },
  LostPassword: {
    path: "/lost-password",
    VerifyEmail: { path: "/lost-password/verifyEmail" }
  },
  AccountChangePassword: {
    path: "/account/changepassword",
    SuccessPassword: { path: "/account/changepassword/successPassword" }
  },
  NotFound: { path: "/404" },
  error: { path: "*" },
  Examples: { path: "/examples/" },
  Users: {
    path: "/users",
    Create: { path: "/users/create" },
    Delete: { path: "/users/:Id/delete" },
    Update: { path: "/users/:Id/update" }
  },
  Categorias: {
    path: "/categorias",
    Create: { path: "/categorias/create" },
    Delete: { path: "/categorias/:Id/delete" },
    Update: { path: "/categorias/:Id/update" }
  },

  Controlarvotos: {
    path: "/controlarvotos",
    Delete: { path: "/controlarvotos/:Id/delete" },
    Update: { path: "/controlarvotos/:Id/update" }
  },

  Rankingvotos:{
    path: "/rankingvotos",
  },

  Misvotos:{
    path: "/misvotos",
  },

  VotosEmitidos:{
    path: "/votosemitidos",
  },

  EmpleadosCategoriasAprobador: {
    Delete: { path: "/empleadoscategorias/:Id/delete" },
  },
  Parametros: {
    path: "/parametros",
    Update: { path: "/parametros/:Id/update" }
  },
  Roles: {
    path: "/roles",
    Create: { path: "/roles/create" },
    Delete: { path: "/roles/:id/delete" },
    Update: { path: "/roles/:id/update" },
    View: { path: "/roles/:id/view" }
  },
  GestionarPatentes: {
    path: "/gestionarPatentes",
    Create: { path: "/gestionarPatentes/create" },
    Delete: { path: "/gestionarPatentes/:id/delete" }
  },
  Votar: {
    path: "/votar"
  },
};