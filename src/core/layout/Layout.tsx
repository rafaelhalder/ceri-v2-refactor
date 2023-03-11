import * as React from "react";
import { memo } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppBar, Layout as ReactAdminLayout, Logout } from "react-admin";
import { Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';

const MyAppBar = memo((props) => {
  return (
    <AppBar {...props} userMenu={<Logout style={{color: 'white'}} {...props}  icon={<LogoutIcon style={{color: 'white'}}/>} />}>
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
    <ReactAdminLayout {...props} appBar={MyAppBar} />
  </>
);
