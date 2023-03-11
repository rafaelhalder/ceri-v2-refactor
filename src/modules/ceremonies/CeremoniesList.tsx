// in src/events.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import { Datagrid, List, Show, SimpleShowLayout, TextField, ShowButton, TopToolbar, ExportButton, useRecordContext } from "react-admin";
import FilterSidebar from './CerimoniesFilterSidebar';
import { titleCase } from '../../core/utils/title-case';
import { exporterXLSX, exporterXLSXFull, exporterPDF, exporterPDFFull } from './ceremonies-list-exportes';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import CsvIcon from '@mui/icons-material/GridOn';

const ListActions = (props) => {
  return (
      <TopToolbar>
          <ExportButton label="Excel Resumido" icon={<CsvIcon />} maxResults={999999999} exporter={() => exporterXLSX(props)} />
          <ExportButton label="Excel Completo" icon={<CsvIcon />} maxResults={999999999} exporter={() => exporterXLSXFull(props)} />
          <ExportButton label="PDF Resumido" icon={<PdfIcon />} maxResults={999999999} exporter={() => exporterPDF(props)} />
          <ExportButton label="PDF Completo" icon={<PdfIcon />} maxResults={999999999} exporter={() => exporterPDFFull(props)} />
      </TopToolbar>
  );
};

const TituloField = (props) => {
  return <span>{titleCase(props.titulo)}</span>;
}

TituloField.defaultProps = { label: 'Name' };

const EventList = (props) => {
  return (
    <>
      <List {...props} aside={<FilterSidebar />} perPage={9999999} className="EventList" filterDefaultValues={{ ano: new Date().getFullYear() }} 
        actions={<ListActions />}>
        <Datagrid bulkActionButtons={false}>
          <TituloField source="titulo" label="Título" />
          <TextField source="areaAtuacao" label="Área de atuação" />
          <TextField source="tipoEvento" label="Tipo" />
          <TextField source="dataPtBr" label="Data" sortBy="data" />
          <TextField source="resumo" label="Resumo" />
          <ShowButton label="" />
        </Datagrid>
      </List>
    </>
  )
};

export default EventList;
