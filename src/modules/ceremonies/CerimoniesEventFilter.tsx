import * as React from "react";
import { Filter, SelectInput, DateInput } from "react-admin";

const getFilter = (data, field) => {
  const set = new Set();
  if (!data) {
    return [];
  }
  for (let value of data) {
    set.add(value[field]);
  }
  return [...set].map((field) => ({ id: field, name: field }));
};

export const YearFilter = (props) => {
  const currentYear = new Date().getFullYear();
  let years: any = [];
  for (let i = 0; i <= 10; i++) {
    const year = currentYear - i;
    years.push({ id: year, name: year });
  }

  return (
    <Filter {...props}>
      <SelectInput
        source="ano"
        label="Ano"
        emptyText="Todos os anos"
        translateChoice={false}
        choices={[...years]}
        alwaysOn
        fullWidth
      />
    </Filter>
  );
};

export const DataFilter = (props) => (
  <Filter {...props}>
    <DateInput label="Data a partir de" source="data_gte" alwaysOn fullWidth />
    <DateInput label="Data até" source="data_lte" alwaysOn fullWidth />
  </Filter>
);

export const EventTypeFilter = ({ data, ...props}) => (
  <Filter {...props}>
    <SelectInput
      source="tipoEvento"
      label="Tipo do evento"
      choices={getFilter(data, "tipoEvento")}
      alwaysOn
      fullWidth
    />
  </Filter>
);

export const EventCharacterFilter = ({ data, ...props}) => (
  <Filter {...props}>
    <SelectInput
      source="caraterEvento"
      label="Caráter do evento"
      choices={getFilter(data, "caraterEvento")}
      alwaysOn
      fullWidth
    />
  </Filter>
);

export const ActuationAreaFilter = ({ data, ...props}) => (
  <Filter {...props}>
    <SelectInput
      source="areaAtuacao"
      label="Área de atuação"
      choices={getFilter(data, "areaAtuacao")}
      alwaysOn
      fullWidth
    />
  </Filter>
);
