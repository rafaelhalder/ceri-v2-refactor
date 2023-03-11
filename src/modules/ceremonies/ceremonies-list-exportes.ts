import { downloadCSV } from "react-admin";
import { unparse as convertToCSV } from 'papaparse/papaparse.min';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import logo from './../../assets/base64Logo';
import {titleCase} from './../../core/utils/title-case';

export const exporterCSV = events => {
  const eventsForExport = events.map(event => {
    event.data = event.dataPtBr;
    event.titulo = titleCase(event.titulo);
    return event;
  });
  const csv = convertToCSV({
      data: eventsForExport,
      fields: ['data', 'titulo', 'municipio']
  });
  downloadCSV(csv, 'eventos');
};

export const exporterCSVFull = events => {
  const eventsForExport = events.map(event => {
    event.data = event.dataPtBr;
    event.titulo = titleCase(event.titulo);
    return event;
  });
  const csv = convertToCSV({
      data: eventsForExport,
      fields: [
        'areaAtuacao', 'titulo', 'data', 'horario', 'pais', 'estado', 'municipio', 'tipoEvento', 'caraterEvento', 'quantitativoPublico',
        'autoridades', 'resumo', 'cerimonialistas', 'equipeEstrutura', 'mestreCerimonia', 'motorista', 'observacao'
      ]
  });
  downloadCSV(csv, 'eventos');
};

export const exporterPDF = (events) => {
  const eventsData: any[] = [];
  for(let key of events.ids){
    eventsData.push({
      data: events.data[key].dataPtBr,
      municipio: events.data[key].municipio,
      evento: titleCase(events.data[key].titulo),
    })
  }

  const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });

  doc.setFont("Arial");
  doc.setFontSize(12);

  doc.addImage(logo, 'PNG', 55, 3, 100, 75);

  if(events.filterValues.ano){
    doc.text(`RESUMO DAS AÇÕES DESENVOLVIDAS NA ÁREA DE EVENTOS NO EXERCÍCIO DE ${events.filterValues.ano}.`, 105, 68, { align: 'center'});
  }

  if(events.filterValues.data_gte || events.filterValues.data_lte){
    let text = 'INTERVALO: ';
    if(events.filterValues.data_gte){
      const dataPieces = events.filterValues.data_gte.split('-');
      text += 'A PARTIR DE ' + dataPieces[2] + '/' + dataPieces[1] + '/' + dataPieces[0];
    }
    if(events.filterValues.data_gte && events.filterValues.data_lte) text += ' ';
    if(events.filterValues.data_lte){
      const dataPieces = events.filterValues.data_lte.split('-');
      text += 'ATÉ ' + dataPieces[2] + '/' + dataPieces[1] + '/' + dataPieces[0];
    }
    doc.text(text, 105, 75, { align: "center"});
  }

  doc.text(`TOTAL DE EVENTOS: ${eventsData.length}.`, 105, 82, { align: "center"});

  const headers: any = [
    { id: 'data', name: 'data', prompt: 'Data', width: 40, align: "center", padding: 0 },
    { id: 'municipio', name: 'municipio', prompt: 'Município', width: 40, align: "center", padding: 0 },
    { id: 'evento', name: 'evento', prompt: 'Evento', width: 175, align: "center", padding: 0 }
  ];

  doc.table(10, 90, eventsData, headers, { margins: 10});
  doc.save('eventos.pdf');
};

export const exporterPDFFull = events => {
  const eventsData: any[] = [];
  for(let key of events.ids){
    eventsData.push({
      data: events.data[key].dataPtBr + ' ' + events.data[key].horario,
      evento: titleCase(events.data[key].titulo),
      areaAtuacao: events.data[key].areaAtuacao,
      autoridades: events.data[key].autoridades,
      caraterEvento: events.data[key].caraterEvento,
      cerimonialistas: events.data[key].cerimonialistas,
      equipeEstrutura: events.data[key].equipeEstrutura,
      mestreCerimonia: events.data[key].mestreCerimonia,
      motorista: events.data[key].motorista,
      observacao: events.data[key].observacao,
      local: events.data[key].pais + ' / ' + events.data[key].estado + ' / ' + events.data[key].municipio,
      quantitativoPublico: events.data[key].quantitativoPublico,
      resumo: events.data[key].resumo,
      tipoEvento: events.data[key].tipoEvento
    })
  }

  const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });

  doc.setFont("Arial");
  doc.setFontSize(12);

  doc.addImage(logo, 'PNG', 98, 3, 100, 75);

  if(events.filterValues.ano){
    doc.text(`RESUMO DAS AÇÕES DESENVOLVIDAS NA ÁREA DE EVENTOS NO EXERCÍCIO DE ${events.filterValues.ano}.`, 148, 68, { align: 'center'});
  }

  if(events.filterValues.data_gte || events.filterValues.data_lte){
    let text = 'INTERVALO: ';
    if(events.filterValues.data_gte){
      const dataPieces = events.filterValues.data_gte.split('-');
      text += 'A PARTIR DE ' + dataPieces[2] + '/' + dataPieces[1] + '/' + dataPieces[0];
    }
    if(events.filterValues.data_gte && events.filterValues.data_lte) text += ' ';
    if(events.filterValues.data_lte){
      const dataPieces = events.filterValues.data_lte.split('-');
      text += 'ATÉ ' + dataPieces[2] + '/' + dataPieces[1] + '/' + dataPieces[0];
    }
    doc.text(text, 148, 75, { align: "center"});
  }

  doc.text(`TOTAL DE EVENTOS: ${eventsData.length}.`, 148, 82, { align: "center"});

  const headers: any = [
    { id: 'areaAtuacao', name: 'areaAtuacao', prompt: 'Área de atuação', width: 25, align: "center", padding: 0 },
    { id: 'evento', name: 'evento', prompt: 'Título', width: 25, align: "center", padding: 0 },
    { id: 'data', name: 'data', prompt: 'Data e Horário', width: 25, align: "center", padding: 0 },
    { id: 'local', name: 'local', prompt: 'País, estado e município', width: 27, align: "center", padding: 0 },
    { id: 'tipoEvento', name: 'tipoEvento', prompt: 'Tipo', width: 23, align: "center", padding: 0 },
    { id: 'caraterEvento', name: 'caraterEvento', prompt: 'Caráter', width: 25, align: "center", padding: 0 },
    { id: 'quantitativoPublico', name: 'quantitativoPublico', 'prompt': 'Quant. de público', width: 25, align: "center", padding: 0 },
    { id: 'autoridades', name: 'autoridades', prompt: 'Autoridades presentes', width: 32, align: "center", padding: 0 },
    { id: 'resumo', name: 'resumo', prompt: 'Resumo', width: 25, align: "center", padding: 0 },
    { id: 'cerimonialistas', name: 'cerimonialistas', prompt: 'Cerimonia- listas', width: 30, align: "center", padding: 0 },
    { id: 'equipeEstrutura', name: 'equipeEstrutura', prompt: 'Equipe', width: 25, align: "center", padding: 0 },
    { id: 'mestreCerimonia', name: 'mestreCerimonia', prompt: 'Mestre de cerim.', width: 25, align: "center", padding: 0 },
    { id: 'motorista', name: 'motorista', prompt: 'Motorista', width: 27, align: "center", padding: 0 },
    { id: 'observacao', name: 'observacao', prompt: 'Observação', width: 30, align: "center", padding: 0 },
  ];

  doc.table(10, 90, eventsData, headers, { margins: 10, fontSize: 9 });
  doc.save('eventos.pdf');
};

export const exporterXLSX = (events) => {
  const eventsData: any[] = [];
  eventsData.push(['data', 'municipio', 'evento']);

  for(let key of events.ids){
    eventsData.push([
      events.data[key].dataPtBr,
      events.data[key].municipio,
      titleCase(events.data[key].titulo),
    ])
  }

  const ws = XLSX.utils.aoa_to_sheet(eventsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Eventos");
  XLSX.writeFile(wb, "eventos.xlsx");
};

export const exporterXLSXFull = events => {
  const eventsData: any[] = [];
  eventsData.push([
    'data', 'evento', 'areaAtuacao', 'autoridades', 'caraterEvento', 'cerimonialistas', 'equipeEstrutura', 
    'mestreCerimonia', 'motorista', 'observacao', 'local', 'quantitativoPublico', 'resumo', 'tipoEvento'
  ]);

  for(let key of events.ids){
    eventsData.push([
      events.data[key].dataPtBr + ' ' + events.data[key].horario,
      titleCase(events.data[key].titulo),
      events.data[key].areaAtuacao,
      events.data[key].autoridades,
      events.data[key].caraterEvento,
      events.data[key].cerimonialistas,
      events.data[key].equipeEstrutura,
      events.data[key].mestreCerimonia,
      events.data[key].motorista,
      events.data[key].observacao,
      events.data[key].pais + ' / ' + events.data[key].estado + ' / ' + events.data[key].municipio,
      events.data[key].quantitativoPublico,
      events.data[key].resumo,
      events.data[key].tipoEvento
    ])
  }

  const ws = XLSX.utils.aoa_to_sheet(eventsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Eventos");
  XLSX.writeFile(wb, "eventos.xlsx");
};

export const exporterSinglePDFFull = event => {
  const eventData = [
    { key: 'Área de atuação', value: event.data.areaAtuacao },
    { key: 'Título', value: event.data.titulo },
    { key: 'Data e Horário', value: event.data.dataPtBr + ' ' + event.data.horario },
    { key: 'País, estado e município', value: event.data.pais + ' / ' + event.data.estado + ' / ' + event.data.municipio },
    { key: 'Tipo', value: event.data.tipoEvento },
    { key: 'Caráter', value: event.data.caraterEvento },
    { key: 'Quantitativo de público', value: event.data.quantitativoPublico },
    { key: 'Autoridades presentes', value: event.data.autoridades },
    { key: 'Resumo', value: event.data.resumo },
    { key: 'Cerimonialistas', value: event.data.cerimonialistas },
    { key: 'Equipe', value: event.data.equipeEstrutura },
    { key: 'Mestre de cerimônia', value: event.data.mestreCerimonia },
    { key: 'Motorista', value: event.data.motorista },
    { key: 'Observação', value: event.data.observacao },
  ];

  const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });

  doc.setFont("Arial");
  doc.setFontSize(12);

  const headers: any = [
    { id: 'key', name: 'key', prompt: 'Chave', width: 60, align: "center", padding: 0 },
    { id: 'value', name: 'value', prompt: 'Valor', width: 194, align: "center", padding: 0 },
  ];

  doc.addImage(logo, 'PNG', 55, 3, 100, 75);
  doc.table(10, 70, eventData, headers, { margins: 10, printHeaders: false, });
  doc.save('evento.pdf');
};