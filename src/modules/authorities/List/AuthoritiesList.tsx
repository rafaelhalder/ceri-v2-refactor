import * as React from "react";
import { useAuthenticated, Title } from "react-admin";
import { getList } from "../AuthoritiesService";
import { Authority } from "../authority.interface";
import { DataGrid } from "@mui/x-data-grid";
import ImageEye from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import ContentCreate from "@mui/icons-material/Create";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";

interface CustomActionColumn {
  authority: Authority;
}

const CustomActionsColumn = ({ authority }: CustomActionColumn) => {
  return (
    <>
      <Link
        to={`/authorities/show/${authority.id}`}
        style={{ paddingRight: 10 }}
      >
        <ImageEye />
      </Link>

      <Link to={`/authorities/edit/${authority.id}`}>
        <ContentCreate />
      </Link>
    </>
  );
};

const columns = [
  { field: "name", headerName: "Nome da Autoridade", width: 200 },
  { field: "displayName", headerName: "Nome de exibição", width: 200 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "phoneNumber", headerName: "Telefone da Autoridade", width: 150 },
  { field: "role", headerName: "Cargo da autoridade", width: 150 },
  {
    field: "chainPersonCellNumber",
    headerName: "N° celular do presidente",
    width: 90,
  },
  { field: "city", headerName: "Cidade", width: 100 },
  { field: "country", headerName: "País", width: 100 },
  { field: "party", headerName: "Partido", width: 60 },
  { field: "state", headerName: "Estado", width: 100 },
  { field: "disabled", headerName: "Status da Autoridade", width: 150 },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    width: 90,
    renderCell: (authority) => <CustomActionsColumn authority={authority} />,
  },
];

const AuthoritiesList = () => {
  useAuthenticated();
  const [loading, setLoading] = React.useState(true);
  const [authorities, setAuthorities] = React.useState<Authority[] | []>([]);

  function convertToPersonList(
    data: Record<string, Omit<Authority, "id">>
  ): Authority[] {
    return Object.entries(data).map(([id, personData]) => ({
      id,
      ...personData,
    }));
  }

  const fetchData = async () => {
    setLoading(true);
    const response = convertToPersonList(
      await getList<Authority>("authorities", 999999)
    );
    setAuthorities(
      response.map((value) => ({
        ...value,
        disabled: value.disabled ? "Inativa" : "Ativa",
      }))
    );
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Title title="Lista de Autoridades" />
      <div style={{ height: 631, width: "100%", marginTop: 20 }}>
        <DataGrid
          loading={loading}
          columns={columns}
          rows={authorities}
          autoPageSize={true}
          paginationMode="client"
          sortingMode="client"
          pagination
          pageSizeOptions={[10, 25, 50]}
          rowCount={authorities.length}
          rowSelection={false}
        />
      </div>
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Link to={"/authorities/create"}>
          <Fab color="primary" aria-label="criar">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>
  );
};

export default AuthoritiesList;
