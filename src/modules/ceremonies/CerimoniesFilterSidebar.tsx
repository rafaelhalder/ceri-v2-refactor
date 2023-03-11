import * as React from "react";
import { FilterLiveSearch } from "react-admin";
import {
  YearFilter,
  DataFilter,
  EventTypeFilter,
  EventCharacterFilter,
  ActuationAreaFilter,
} from "./CerimoniesEventFilter";
import { Button, Card as MuiCard, CardContent } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    order: -1,
    width: "15em",
    marginRight: "1em",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const FilterSidebar = (props) => {
  return (
    <Card>
      <CardContent>
        <Button
          color="primary"
          fullWidth
          onClick={() =>
            props.setFilters({
              ano: "",
              titulo: "",
              data_gte: "",
              data_lte: "",
              tipoEvento: "",
              caraterEvento: "",
              areaAtuacao: "",
              pais: "",
              estado: "",
              municipio: "",
              quantitativoPublico: "",
              autoridades: "",
              resumo: "",
            })
          }
        >
          Limpar filtros
        </Button>
        <YearFilter />
        <div className="space"></div>
        <DataFilter />
        <div className="space"></div>
        <div className="space"></div>
        <EventTypeFilter data={props} />
        <EventCharacterFilter data={props} />
        <ActuationAreaFilter data={props} />
        <FilterLiveSearch fullWidth source="titulo" label="Título" />
        <br />
        <FilterLiveSearch fullWidth source="pais" label="País" />
        <br />
        <FilterLiveSearch fullWidth source="estado" label="Estado" />
        <br />
        <FilterLiveSearch fullWidth source="municipio" label="Município" />
        <br />
        <FilterLiveSearch
          fullWidth
          source="quantitativoPublico"
          label="Quant. de público"
        />
        <br />
        <FilterLiveSearch fullWidth source="autoridades" label="Autoridades" />
        <br />
        <FilterLiveSearch fullWidth source="resumo" label="Resumo" />
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
