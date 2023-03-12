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
import LabelIcon from '@mui/icons-material/Label';
import { Route } from "react-router-dom";
import AuthoritiesRouteLayout from "./modules/authorities/Authorities";
import { AuthoritiesShow } from "./modules/authorities/Show/AuthoritiesShow";
import AuthoritiesList from "./modules/authorities/AuthoritiesList";

const options = { logging: true, rootRef: "/" };
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

const App = () => {
  return (
    <Admin
      title={"Cerimonial - Governo do Estado do Paraná"}
      theme={theme}
      layout={Layout}
      loginPage={LoginPage}
      dataProvider={dataProvider}
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
            <Route
                path="/authorities"
                element={<AuthoritiesList />}
            />
            <Route
                path="/authorities/show/:id"
                element={<AuthoritiesShow />}
            />
        </CustomRoutes>
    </Admin>
  );
};

export default App;
