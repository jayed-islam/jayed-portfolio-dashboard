import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

import { paths } from "../paths";
import { PropaneOutlined } from "@mui/icons-material";

export const routes = {
  admin: [
    { path: paths.root, name: "Dashboard", icon: <DashboardIcon /> },
    { path: paths.project.root, name: "Project", icon: <PeopleIcon /> },
    { path: paths.blog.root, name: "Blog", icon: <PeopleIcon /> },
    { path: paths.skill.root, name: "Skill", icon: <PropaneOutlined /> },
  ],
  vendor: [{ path: "/vendor", name: "Dashboard", icon: <DashboardIcon /> }],
};
