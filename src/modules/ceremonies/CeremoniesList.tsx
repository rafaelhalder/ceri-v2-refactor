// in src/events.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  TextField,
  ShowButton,
  TopToolbar,
  ExportButton,
  useListFilterContext,
  FunctionField,
} from "react-admin";
import FilterSidebar from "./CerimoniesFilterSidebar";
import { titleCase } from "../../core/utils/title-case";
import {
  exporterXLSX,
  exporterXLSXFull,
  exporterPDF,
  exporterPDFFull,
} from "./ceremonies-list-exportes";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import CsvIcon from "@mui/icons-material/GridOn";

const ListActions = (props) => {
  const { filterValues } = useListFilterContext();

  return (
    <TopToolbar>
      <ExportButton
        label="Excel Resumido"
        icon={<CsvIcon />}
        maxResults={999999999}
        exporter={(data) => exporterXLSX(data)}
      />
      <ExportButton
        label="Excel Completo"
        icon={<CsvIcon />}
        maxResults={999999999}
        exporter={(data) => exporterXLSXFull(data)}
      />
      <ExportButton
        label="PDF Resumido"
        icon={<PdfIcon />}
        maxResults={999999999}
        exporter={(data) => exporterPDF(data, filterValues)}
      />
      <ExportButton
        label="PDF Completo"
        icon={<PdfIcon />}
        maxResults={999999999}
        exporter={(data) => exporterPDFFull(data, filterValues)}
      />
    </TopToolbar>
  );
};

const EventList = () => {
  return (
    <>
      <List
        aside={<FilterSidebar />}
        actions={<ListActions />}
        perPage={9999999}
        className="EventList"
        filterDefaultValues={{ ano: new Date().getFullYear() }}
      >
        <Datagrid bulkActionButtons={false}>
          <FunctionField
            label="Título"
            render={(record) => titleCase(record && record.titulo)}
          />
          <TextField source="areaAtuacao" label="Área de atuação" />
          <TextField source="tipoEvento" label="Tipo" />
          <TextField source="dataPtBr" label="Data" sortBy="data" />
          <TextField source="resumo" label="Resumo" />
          <ShowButton label="" />
        </Datagrid>
      </List>
    </>
  );
};

export default EventList;
