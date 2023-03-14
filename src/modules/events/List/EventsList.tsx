import * as React from "react";
import { useAuthenticated, Title } from "react-admin";
import { getList } from "../EventsService";
import { Event } from "../event.interface";
import { DataGrid } from "@mui/x-data-grid";
import ImageEye from "@mui/icons-material/RemoveRedEye";
import ContentCreate from "@mui/icons-material/Create";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

interface CustomActionColumn {
  event: Event;
}

const CustomActionsColumn = ({ event }: CustomActionColumn) => {
  return (
    <>
      <Link to={`/events/show/${event.id}`}>
        <ImageEye />
      </Link>

      <Link to={`/events/edit/${event.id}`}>
        <ContentCreate />
      </Link>

      <Link to={`/events/create`}>
        <ContentCreate />
      </Link>
    </>
  );
};

const columns = [
  { field: "dateTime", headerName: "Nome da Autoridade", width: 90 },
  { field: "disabled", headerName: "Nome de exibição", width: 150 },
  { field: "local", headerName: "Email", width: 250 },
  { field: "title", headerName: "Telefone da Autoridade", width: 150 },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    width: 150,
    renderCell: (event) => <CustomActionsColumn event={event}/>,
  },
];

const EventsList = ({ title = "Eventos" }) => {
  useAuthenticated();
  const [totalRows, setTotalRows] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [events, setEvents] = React.useState<Event[] | []>([]);

  function convertToPersonList(data: Record<string, Omit<Event, 'id'>>): Event[] {
    return Object.entries(data).map(([id, personData]) => ({
      id,
      ...personData,
    }));
  }

  React.useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      const response = convertToPersonList(await getList("events", 50));
      setEvents(response);
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
      <Title title="Lista de Eventos" />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={events}
          paginationMode={"server"}
          pageSizeOptions={[10, 25, 50]}
          rowCount={totalRows}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EventsList;
