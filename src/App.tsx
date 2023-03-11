import { Admin, Resource } from "react-admin";
import "./App.css";
import { theme } from "./core/theme/theme";
import { Layout } from "./core/layout/Layout";
import LoginPage from "./core/pages/Login";
import { firebaseConfig as config } from "./FIREBASE_CONFIG";
import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
} from 'react-admin-firebase';
import {i18nProvider} from './core/providers/i18nProvider';
import EventList  from "./modules/ceremonies/CeremoniesList";
import { EventShow } from "./modules/ceremonies/CerimoniesShow";

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
      i18nProvider={i18nProvider}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >

      <Resource
        name="eventos"
        options={{ label: "Cerimônias" }}
        list={EventList}
        show={EventShow}
        hasCreate={false}
        hasEdit={false}
      />
      
    </Admin>
  );
}

export default App;
