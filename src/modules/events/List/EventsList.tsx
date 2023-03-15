import * as React from "react";
import { useAuthenticated, Title } from "react-admin";
import { getList } from "../EventsService";
import { Event } from "../event.interface";
import { DataGrid } from "@mui/x-data-grid";
import ImageEye from "@mui/icons-material/RemoveRedEye";
import ContentCreate from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";

interface CustomActionColumn {
  event: Event;
}

const CustomActionsColumn = ({ event }: CustomActionColumn) => {
  return (
    <>
      <Link to={`/events/show/${event.id}`} style={{ paddingRight: 10 }}>
        <ImageEye />
      </Link>

      <Link to={`/events/edit/${event.id}`}>
        <ContentCreate />
      </Link>
    </>
  );
};

const columns = [
  { field: "title", headerName: "Título do evento", width: 500 },
  { field: "dateTime", headerName: "Data do Evento", width: 150 },
  { field: "disabled", headerName: "Status do Evento", width: 150 },
  { field: "local", headerName: "Local do evento", width: 300 },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    width: 150,
    renderCell: (event) => <CustomActionsColumn event={event}/>,
  },
];

const EventsList = () => {
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
      const response = convertToPersonList(await getList<Event>("events", 50));
      setEvents(response.map((value) => ({
        ...value,
        disabled: value.disabled ? 'Encerrado' : 'Habilitado',
      })));
      setTotalRows(response.length);
      setLoading(false);
    };
    fetchRows();
  }, [currentPage]);

  return (
    <div>
      <Title title="Lista de Eventos" />
      <div style={{ height: 631, width: "100%", marginTop: 20 }}>
        <DataGrid
          columns={columns}
          rows={events}
          autoPageSize={true}
          pageSizeOptions={[10, 25, 50]}
          paginationMode="client"
          sortingMode="client"
          pagination
          rowCount={totalRows}
          loading={loading}
          rowSelection={false}
        />
      </div>
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Link to={'/events/create'}>
          <Fab color="primary" aria-label="criar">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>
  );
};

export default EventsList;
