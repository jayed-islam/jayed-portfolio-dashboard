import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Category,
  Payment,
  Reviews,
  ReviewsOutlined,
} from "@mui/icons-material";
import { paths } from "../paths";

export const routes = {
  admin: [
    { path: "/admin", name: "Dashboard", icon: <DashboardIcon /> },
    { path: "/admin/users", name: "Manage Users", icon: <PeopleIcon /> },
    { path: paths.admin.products, name: "Products", icon: <InventoryIcon /> },
    { path: paths.admin.categories, name: "Categories", icon: <Category /> },
    { path: paths.admin.reviews, name: "Reviews", icon: <ReviewsOutlined /> },
    { path: paths.admin.transactions, name: "Transactions", icon: <Payment /> },
  ],
  vendor: [
    { path: "/vendor", name: "Dashboard", icon: <DashboardIcon /> },
    {
      path: "/vendor/products",
      name: "Manage Products",
      icon: <InventoryIcon />,
    },
    { path: "/vendor/orders", name: "Orders", icon: <ShoppingCartIcon /> },
    {
      path: "/vendor/reviews",
      name: "Customer Reviews",
      icon: <Reviews />,
    },
  ],
};
