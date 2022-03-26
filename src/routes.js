import Dashboard from "views/Dashboard/Dashboard.js";
import Company from "views/Company/List.js";
import Payment from "views/Payment/List.js";
import Receipt from "views/Receipt/List.js";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/empresas",
    name: "Empresas",
    icon: "business",
    component: Company,
    layout: "/admin",
  },
  {
    path: "/pagamentos",
    name: "Pagamentos",
    icon: "credit_score",
    component: Payment,
    layout: "/admin",
  },
  {
    path: "/recebimentos",
    name: "Recebimentos",
    icon: "receipt_long",
    component: Receipt,
    layout: "/admin",
  },
];
export default dashRoutes;
