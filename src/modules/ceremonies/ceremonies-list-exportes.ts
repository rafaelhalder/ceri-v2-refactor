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

export const exporterPDF = (events, filterValues) => {
  const eventsData: any[] = [];
  for(let event of events){
    eventsData.push({
      data: event.dataPtBr,
      municipio: event.municipio,
      evento: titleCase(event.titulo),
    })
  }

  const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });

  doc.setFont("Arial");
  doc.setFontSize(12);

  doc.addImage(logo, 'PNG', 55, 3, 100, 75);

  if(filterValues.ano){
    doc.text(`RESUMO DAS AÇÕES DESENVOLVIDAS NA ÁREA DE EVENTOS NO EXERCÍCIO DE ${filterValues.ano}.`, 105, 68, { align: 'center'});
  }

  if(filterValues.data_gte || filterValues.data_lte){
    let text = 'INTERVALO: ';
    if(filterValues.data_gte){
      const dataPieces = filterValues.data_gte.split('-');
      text += 'A PARTIR DE ' + dataPieces[2] + '/' + dataPieces[1] + '/' + dataPieces[0];
    }
    if(filterValues.data_gte && filterValues.data_lte) text += ' ';
    if(filterValues.data_lte){
      const dataPieces = filterValues.data_lte.split('-');
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

export const exporterPDFFull = (events, filterValues) => {
  const eventsData: any[] = [];
  for(let event of events){
    eventsData.push({
      data: event.dataPtBr + ' ' + event.horario,
      evento: titleCase(event.titulo),
      areaAtuacao: event.areaAtuacao,
      autoridades: event.autoridades,
      caraterEvento: event.caraterEvento,
      cerimonialistas: event.cerimonialistas,
      equipeEstrutura: event.equipeEstrutura,
      mestreCerimonia: event.mestreCerimonia,
      motorista: event.motorista,
      observacao: event.observacao,
      local: event.pais + ' / ' + event.estado + ' / ' + event.municipio,
      quantitativoPublico: event.quantitativoPublico,
      resumo: event.resumo,
      tipoEvento: event.tipoEvento
    })
  }

  const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });

  doc.setFont("Arial");
  doc.setFontSize(12);

  doc.addImage(logo, 'PNG', 98, 3, 100, 75);

  if(filterValues.ano){
    doc.text(`RESUMO DAS AÇÕES DESENVOLVIDAS NA ÁREA DE EVENTOS NO EXERCÍCIO DE ${filterValues.ano}.`, 148, 68, { align: 'center'});
  }

  if(filterValues.data_gte || filterValues.data_lte){
    let text = 'INTERVALO: ';
    if(filterValues.data_gte){
      const dataPieces = filterValues.data_gte.split('-');
      text += 'A PARTIR DE ' + dataPieces[2] + '/' + dataPieces[1] + '/' + dataPieces[0];
    }
    if(filterValues.data_gte && filterValues.data_lte) text += ' ';
    if(filterValues.data_lte){
      const dataPieces = filterValues.data_lte.split('-');
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

  for(let event of events){
    eventsData.push([
      event.dataPtBr,
      event.municipio,
      titleCase(event.titulo),
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

  for(let event of events){
    eventsData.push([
      event.dataPtBr + ' ' + event.horario,
      titleCase(event.titulo),
      event.areaAtuacao,
      event.autoridades,
      event.caraterEvento,
      event.cerimonialistas,
      event.equipeEstrutura,
      event.mestreCerimonia,
      event.motorista,
      event.observacao,
      event.pais + ' / ' + event.estado + ' / ' + event.municipio,
      event.quantitativoPublico,
      event.resumo,
      event.tipoEvento
    ])
  }

  const ws = XLSX.utils.aoa_to_sheet(eventsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Eventos");
  XLSX.writeFile(wb, "eventos.xlsx");
};

export const exporterSinglePDFFull = event => {
  const eventData = [
    { key: 'Área de atuação', value: event.areaAtuacao },
    { key: 'Título', value: event.titulo },
    { key: 'Data e Horário', value: event.dataPtBr + ' ' + event.horario },
    { key: 'País, estado e município', value: event.pais + ' / ' + event.estado + ' / ' + event.municipio },
    { key: 'Tipo', value: event.tipoEvento },
    { key: 'Caráter', value: event.caraterEvento },
    { key: 'Quantitativo de público', value: event.quantitativoPublico },
    { key: 'Autoridades presentes', value: event.autoridades },
    { key: 'Resumo', value: event.resumo },
    { key: 'Cerimonialistas', value: event.cerimonialistas },
    { key: 'Equipe', value: event.equipeEstrutura },
    { key: 'Mestre de cerimônia', value: event.mestreCerimonia },
    { key: 'Motorista', value: event.motorista },
    { key: 'Observação', value: event.observacao },
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