import * as React from "react";
import {
  useAuthenticated,
  Datagrid,
  TextField,
  Title,
  ShowButton,
  EditButton,
  Link,
  List,
} from "react-admin";
import { getList } from "./AuthoritiesService";
import { Authority } from "./authority.interface";
import { AuthoritiesShow } from "./AuthoritiesShow";
import { Button } from "@mui/material";

import ImageEye from "@mui/icons-material/RemoveRedEye";
import ContentCreate from "@mui/icons-material/Create";

const sort = { field: "published_at", order: "DESC" };

const AuthoritiesRouteLayout = ({ title = "Autoridades", ...props }) => {
  useAuthenticated();

  function convertToPersonList(data: Record<string, Omit<Authority, 'id'>>): Authority[] {
    return Object.entries(data).map(([id, personData]) => ({
      id,
      ...personData,
    }));
  }

  const [authorities, setAuthorities] = React.useState<Authority[] | []>([]);
  React.useEffect(() => {
    getList("authorities", 9999999).then(
      (authorities) => {
        setAuthorities(convertToPersonList(authorities));
      }
    );
  }, []);

  return (
    <div>
      <Title title="Lista de Autoridades" />
      <h1>{title}</h1>
      <Datagrid sort={sort} data={authorities} total={9999999}>
        <TextField source="name" label="Nome da Autoridade" sortable={false} />
        <TextField
          source="displayName"
          label="Nome de exibição"
          sortable={false}
        />
        <TextField source="email" label="E-mail" sortable={false} />
        <TextField
          source="phoneNumber"
          label="Telefone da Autoridade"
          sortable={false}
        />
        <TextField source="role" label="Cargo da autoridade" sortable={false} />
        <TextField source="chairPerson" label="Presidente" sortable={false} />
        <TextField
          source="chainPersonCellNumber"
          label="N° celular do presidente"
          sortable={false}
        />
        <TextField source="city" label="Cidade" sortable={false} />
        <TextField source="country" label="País" sortable={false} />
        <TextField source="party" label="Partido" sortable={false} />
        <TextField source="state" label="Estado" sortable={false} />

        <Link to="/authorities/show">
          <ImageEye />
        </Link>

        <Link to="/authorities/edit">
          <ContentCreate />
        </Link>
      </Datagrid>
    </div>
  );
};

export default AuthoritiesRouteLayout;
