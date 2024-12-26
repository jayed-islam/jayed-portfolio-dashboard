import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

import { paths } from "../paths";
import { Explore, PropaneOutlined } from "@mui/icons-material";

export const routes = {
  admin: [
    { path: paths.root, name: "Dashboard", icon: <DashboardIcon /> },
    { path: paths.project.root, name: "Project", icon: <PeopleIcon /> },
    { path: paths.blog.root, name: "Blog", icon: <PeopleIcon /> },
    { path: paths.skill.root, name: "Skill", icon: <PropaneOutlined /> },
    { path: paths.experience.root, name: "Experience", icon: <Explore /> },
  ],
  vendor: [{ path: "/vendor", name: "Dashboard", icon: <DashboardIcon /> }],
};
