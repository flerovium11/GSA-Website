import {rows, start_ascending_index, start_descending_index, start_ground_index, timestamps, movingAvg, chartOptions} from './base'

const humidities = rows.map((row) => row[3]).map(val => Number(val?.replace(',', '.')) * 100).slice(0, start_ground_index);
const temperature = rows.map((row) => row[2]).map(val => Number(val?.replace(',', '.'))).slice(0, start_ground_index);

const temphumData = {
    labels: timestamps.slice(0, start_ground_index),
    datasets: [
      {
        label: 'Temperatur (°C)',
        borderColor: 'red',
        tension: 0.4,
        backgroundColor: 'rgba(255, 30, 30, 0.3)',
        // backgroundColor: (context) => {
        //   if(!context.chart.chartArea) return
        //   const {ctx} = context.chart
        //   const gradientBg = ctx.createLinearGradient(0, context.chart.chartArea.top, 0, context.chart.chartArea.bottom)
        //   gradientBg.addColorStop(0, 'rgba(255, 30, 30, 0.7)')
        //   gradientBg.addColorStop(1, 'rgba(255, 30, 30, 0)')
        //   return gradientBg
        // },
        fill: true,
        borderWidth: 1,
        radius: 0,
        data: temperature,
        datalabels: {
          display: false
        },
      },
      {
        label: 'Feuchtigkeit (%)',
        borderColor: 'blue',
        tension: 0.4,
        backgroundColor: 'rgba(20, 20, 255, 0.3)',
        // backgroundColor: (context) => {
        //   if(!context.chart.chartArea) return
        //   const {ctx} = context.chart
        //   const gradientBg = ctx.createLinearGradient(0, context.chart.chartArea.top, 0, context.chart.chartArea.bottom)
        //   gradientBg.addColorStop(0, 'rgba(20, 20, 255, 0.7)')
        //   gradientBg.addColorStop(1, 'rgba(20, 20, 255, 0)')
        //   return gradientBg
        // },
        
        fill: true,
        borderWidth: 1,
        radius: 0,
        data: humidities,
        datalabels: {
          display: false
        },
      },
    ],
}

const temphumOptions = {
  ...chartOptions,

  scales: {
    y: {
      title: {
        display: true,
        text: 'Temperatur in °C / Luftfeuchtigkeit in %'
      },
      min: 0,
    },
    x: {
      title: {
        display: true,
        text: 'Zeit nach Programmstart in s'
      }
    }
  },
};

export {temphumData, temphumOptions}
