import React, { useContext } from "react";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import PeopleIcon from "@material-ui/icons/People";
import SecurityIcon from "@material-ui/icons/Security";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CategoryIcon from "@material-ui/icons/Category";
import ReceiptIcon from "@material-ui/icons/Receipt";

import { Link } from "react-router-dom";

import { NavContext } from "./NavContext";

export default function DrawerMenu() {
  const {
    drawerMenu: { openDrawerMenu },
    toggleDrawer,
  } = useContext(NavContext);

  return (
    <React.Fragment key="left">
      <Drawer
        anchor="left"
        open={openDrawerMenu["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <List>
          <ListItem
            button
            key="users"
            component={Link}
            to="/users"
            onClick={toggleDrawer("left", false)}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>

          <ListItem
            button
            key="roles"
            component={Link}
            to="/roles"
            onClick={toggleDrawer("left", false)}
          >
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItem>

          <ListItem
            button
            key="suppliers"
            component={Link}
            to="/suppliers"
            onClick={toggleDrawer("left", false)}
          >
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedores" />
          </ListItem>

          <ListItem
            button
            key="categories"
            component={Link}
            to="/categories"
            onClick={toggleDrawer("left", false)}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>

          <ListItem
            button
            key="products"
            component={Link}
            to="/products"
            onClick={toggleDrawer("left", false)}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>

          <ListItem
            button
            key="sales"
            component={Link}
            to="/sales"
            onClick={toggleDrawer("left", false)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Ventas" />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
