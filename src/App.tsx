import { Admin, CustomRoutes, Resource, Sidebar } from "react-admin";
import "./App.css";
import { theme } from "./core/theme/theme";
import { Layout } from "./core/layout/Layout";
import LoginPage from "./core/pages/Login";
import { firebaseConfig as config } from "./FIREBASE_CONFIG";
import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
} from "react-admin-firebase";
import { i18nProvider } from "./core/providers/i18nProvider";
import EventList from "./modules/ceremonies/CeremoniesList";
import { EventShow } from "./modules/ceremonies/CerimoniesShow";
import LabelIcon from "@mui/icons-material/Label";
import { Route } from "react-router-dom";

import { AuthoritiesShow } from "./modules/authorities/Show/AuthoritiesShow";
import AuthoritiesList from "./modules/authorities/List/AuthoritiesList";
import { AuthoritiesForm } from "./modules/authorities/Form/AuthoritiesForm";
import { AuthoritiesCreate } from "./modules/authorities/Create/AuthoritiesCreate";

import { EventsShow } from "./modules/events/Show/EventsShow";
import EventsList from "./modules/events/List/EventsList";
import { EventsForm } from "./modules/events/Form/EventsForm";
import { EventsCreate } from "./modules/events/Create/EventsCreate";


import selfDataProvider from "./core/providers/selfDataProvider";

const options = { logging: true, rootRef: "/" };
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);
const myDataProvider = selfDataProvider(dataProvider);

const App = () => {
  return (
    <Admin
      title={"Cerimonial - Governo do Estado do Paraná"}
      theme={theme}
      layout={Layout}
      loginPage={LoginPage}
      dataProvider={myDataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
    >
      <Resource
        name="eventos"
        options={{ label: "Cerimônias" }}
        list={EventList}
        show={EventShow}
        hasCreate={false}
        hasEdit={false}
        icon={LabelIcon}
      />
      <CustomRoutes>
        <Route path="/authorities" element={<AuthoritiesList />} />
        <Route path="/authorities/create" element={<AuthoritiesCreate />} />
        <Route path="/authorities/show/:id" element={<AuthoritiesShow />} />
        <Route path="/authorities/edit/:id" element={<AuthoritiesForm />} />
        
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/create" element={<EventsCreate />} />
        <Route path="/events/show/:id" element={<EventsShow />} />
        <Route path="/events/edit/:id" element={<EventsForm />} />
      </CustomRoutes>
    </Admin>
  );
};

export default App;
