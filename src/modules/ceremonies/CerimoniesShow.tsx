import { Button } from "@mui/material";
import { Show, SimpleShowLayout, TopToolbar, TextField } from "react-admin";
import { titleCase } from '../../core/utils/title-case';
import { exporterSinglePDFFull } from './ceremonies-list-exportes';

const TituloField = (props) => {
  return <span>{titleCase(props.titulo)}</span>;
};

TituloField.defaultProps = { label: "Name" };

const EventShowActions = (props) => (
  <TopToolbar>
    <Button
      variant="contained"
      style={{ marginRight: 10 }}
      color="primary"
      onClick={() => exporterSinglePDFFull(props)}
    >
      PDF Completo
    </Button>
    {/* <BackButton /> */}
  </TopToolbar>
);

export const EventShow = (props) => (
  <Show
    {...props}
    actions={<EventShowActions />}
    title="Evento"
    className="EventShow"
  >
    <SimpleShowLayout>
      <TextField source="areaAtuacao" label="Área de atuação" />
      <TituloField source="titulo" label="Título do evento" />
      <TextField source="dataPtBr" label="Data" />
      <TextField source="horario" label="Horário" />
      <TextField source="pais" label="País" />
      <TextField source="estado" label="Estado" />
      <TextField source="municipio" label="Município" />
      <TextField source="tipoEvento" label="Tipo do evento" />
      <TextField source="caraterEvento" label="Caráter do evento" />
      <TextField source="quantitativoPublico" label="Quantitativo de público" />
      <TextField source="autoridades" label="Autoridades presentes" />
      <TextField source="resumo" label="Resumo do evento" />
      <TextField source="cerimonialistas" label="Cerimonialistas" />
      <TextField source="equipeEstrutura" label="Equipe de Estrutura" />
      <TextField source="mestreCerimonia" label="Mestre de cerimônia" />
      <TextField source="motorista" label="Motorista" />
      <TextField source="observacao" label="Observação" />
    </SimpleShowLayout>
  </Show>
);
