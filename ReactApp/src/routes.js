export const Routes = {
  Dashboard: { path: "/" },
  Signin: { path: "/sign-in" },
  Signup: {
    path: "/sign-up",
    VerifyEmail: { path: "/sign-up/:id/verifyEmail" },
  },
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
  Terminales: {
    path: "/terminales",
    Create: { path: "/terminales/create" },
    Delete: { path: "/terminales/:id/delete" },
    Update: { path: "/terminales/:id/update" },
    View: { path: "/terminales/:id/view" },
    Cupos: {
      path: "/terminales/cupos",
      Otorgar: { path: "/terminales/cupos/otorgar" },
      Ctg: { path: "/terminales/cupos/ctg" }
    },
    Saldo: { path: "/terminales/saldo" },
    Talonarios: {
      path: "/terminales/talonarios",
      Generar: { path: "/terminales/talonarios/generar" },
      View: { path: "/terminales/talonarios/:id/view" }
    }
  },
  CobrarTasa: {
    path: "/cobrartasa"
  }
};