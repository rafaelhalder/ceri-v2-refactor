import * as React from "react";
import { FilterLiveSearch, useListContext } from "react-admin";
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
  const { setFilters, data } = useListContext();

  const handleClearFilters = () => {
    setFilters({}, {});
  };

  return (
    <Card>
      <CardContent>
        <Button
          color="primary"
          fullWidth
          onClick={handleClearFilters}
        >
          Limpar filtros
        </Button>
        <YearFilter />
        <DataFilter />
        <EventTypeFilter data={data} />
        <EventCharacterFilter data={data} />
        <ActuationAreaFilter data={data} />
        <FilterLiveSearch fullWidth source="titulo" label="Título" />
        
        <FilterLiveSearch fullWidth source="pais" label="País" />
        
        <FilterLiveSearch fullWidth source="estado" label="Estado" />
        
        <FilterLiveSearch fullWidth source="municipio" label="Município" />
        
        <FilterLiveSearch
          fullWidth
          source="quantitativoPublico"
          label="Quant. de público"
        />
        
        <FilterLiveSearch fullWidth source="autoridades" label="Autoridades" />
        
        <FilterLiveSearch fullWidth source="resumo" label="Resumo" />
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
