import * as React from "react";
import { memo } from "react";
import { AppBar, Layout as ReactAdminLayout, Logout, Sidebar } from "react-admin";
import { Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';


import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import AuthoritiesList from "../../modules/authorities/List/AuthoritiesList";

export const MyMenu = () => (
    <Menu>
        <Menu.ResourceItem name="eventos" />
        <Menu.Item to="/authorities" primaryText="Autoridades" leftIcon={<LabelIcon />}>
          <AuthoritiesList title="Manutenção de autoridades" />
        </Menu.Item>
        <Menu.Item to="/events" primaryText="Eventos" leftIcon={<LabelIcon />}/>
    </Menu>
);

const MyAppBar = memo((props) => {
  return (
    <AppBar {...props} userMenu={<Logout style={{color: 'white'}} icon={<LogoutIcon style={{color: 'white'}}/>} />}>
      <Typography
          variant="h6"
          color="inherit"
          id="react-admin-title"
          flex={1}
      />
    </AppBar>
  );
});

export const Layout = (props: any) => (
  <>
    <ReactAdminLayout {...props} appBar={MyAppBar} menu={MyMenu} />
  </>
);
