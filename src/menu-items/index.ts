import { MenuItem } from "./types";
import dashboard from "./dashboard";
import hospital from "./hospital";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, hospital],
};

export default menuItems;
