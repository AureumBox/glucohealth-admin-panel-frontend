import { MenuItem } from "./types";
import dashboard from "./dashboard";
import personal from "./business";
import clientele from "./clientele";
import services from "./services";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [dashboard, personal, clientele, services],
};

export default menuItems;
