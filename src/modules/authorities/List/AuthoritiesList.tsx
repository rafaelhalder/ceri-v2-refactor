import * as React from "react";
import { useAuthenticated, Title } from "react-admin";
import { getList } from "../AuthoritiesService";
import { Authority } from "../authority.interface";
import { DataGrid } from "@mui/x-data-grid";
import ImageEye from "@mui/icons-material/RemoveRedEye";
import ContentCreate from "@mui/icons-material/Create";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

interface CustomActionColumn {
  authority: Authority;
}

const CustomActionsColumn = ({ authority }: CustomActionColumn) => {
  return (
    <>
      <Link to={`/authorities/show/${authority.id}`}>
        <ImageEye />
      </Link>

      {/* <Link to={`/authorities/edit/${authority.id}`}>
        <ContentCreate />
      </Link> */}

      <Link to={`/authorities/create`}>
        <ContentCreate />
      </Link>
    </>
  );
};

const columns = [
  { field: "name", headerName: "Nome da Autoridade", width: 90 },
  { field: "displayName", headerName: "Nome de exibição", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phoneNumber", headerName: "Telefone da Autoridade", width: 150 },
  { field: "role", headerName: "Cargo da autoridade", width: 150 },
  {
    field: "chainPersonCellNumber",
    headerName: "N° celular do presidente",
    width: 150,
  },
  { field: "city", headerName: "Cidade", width: 150 },
  { field: "country", headerName: "País", width: 150 },
  { field: "party", headerName: "Partido", width: 150 },
  { field: "state", headerName: "Estado", width: 150 },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    width: 150,
    renderCell: (authority) => <CustomActionsColumn authority={authority}/>,
  },
];

const AuthoritiesList = ({ title = "Autoridades" }) => {
  useAuthenticated();
  const [totalRows, setTotalRows] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [authorities, setAuthorities] = React.useState<Authority[] | []>([]);

  function convertToPersonList(data: Record<string, Omit<Authority, 'id'>>): Authority[] {
    return Object.entries(data).map(([id, personData]) => ({
      id,
      ...personData,
    }));
  }

  React.useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      const response = convertToPersonList(await getList("authorities", 50));
      setAuthorities(response);
      setTotalRows(response.length);
      setLoading(false);
    };
    fetchRows();
  }, [currentPage]);

  const handlePageChange = (params) => {
    setCurrentPage(params.page);
  };

  return (
    <div>
      <Title title="Lista de Autoridades" />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={authorities}
          paginationMode={"server"}
          pageSizeOptions={[10, 25, 50]}
          rowCount={totalRows}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AuthoritiesList;
