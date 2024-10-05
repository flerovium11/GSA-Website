import {rows, start_ascending_index, start_descending_index, start_ground_index, timestamps, movingAvg, chartOptions} from './base'

const altitudes = rows.map((row) => row[4]).map(val => Number(val?.replace(',', '.'))).slice(start_ascending_index - 10, start_ground_index - 40);
const smoothAltitudes = movingAvg(altitudes, 1, (val:any) => true)
const dist = ((smoothAltitudes[30] ?? 0) - (smoothAltitudes[18] ?? 0)) / 12

smoothAltitudes[19] = (smoothAltitudes[18] ?? 0) + dist
smoothAltitudes[20] = (smoothAltitudes[18] ?? 0) + dist * 2
smoothAltitudes[21] = (smoothAltitudes[18] ?? 0) + dist * 3
smoothAltitudes[22] = (smoothAltitudes[18] ?? 0) + dist * 4
smoothAltitudes[23] = (smoothAltitudes[18] ?? 0) + dist * 5
smoothAltitudes[24] = (smoothAltitudes[18] ?? 0) + dist * 6
smoothAltitudes[25] = (smoothAltitudes[18] ?? 0) + dist * 7
smoothAltitudes[26] = (smoothAltitudes[18] ?? 0) + dist * 8
smoothAltitudes[27] = (smoothAltitudes[18] ?? 0) + dist * 9
smoothAltitudes[28] = (smoothAltitudes[18] ?? 0) + dist * 10
smoothAltitudes[29] = (smoothAltitudes[18] ?? 0) + dist * 11

const heightData = {
    labels: timestamps.slice(start_ascending_index - 10, start_ground_index - 40),
    datasets: [
      {
        label: 'BME280 Höhendaten korrigiert',
        borderColor: '#495182',
        tension: 0.4,
        backgroundColor: (context:any) => {
          if(!context.chart.chartArea) return
          const {ctx} = context.chart
          const gradientBg = ctx.createLinearGradient(0, context.chart.chartArea.top, 0, context.chart.chartArea.bottom)
          gradientBg.addColorStop(0, 'rgba(98, 126, 174, 0.7)')
          gradientBg.addColorStop(1, 'rgba(98, 126, 174, 0)')
          return gradientBg
        },
        fill: true,
        borderWidth: 1,
        radius: 0,
        data: smoothAltitudes,
        datalabels: {
          display: false
        },
      },
      {
        label: 'BME280 Höhendaten',
        borderColor: 'red',
        tension: 0.4,
        backgroundColor: (context:any) => {
          if(!context.chart.chartArea) return
          const {ctx} = context.chart
          const gradientBg = ctx.createLinearGradient(0, context.chart.chartArea.top, 0, context.chart.chartArea.bottom)
          gradientBg.addColorStop(0, 'rgba(98, 126, 174, 0)')
          gradientBg.addColorStop(1, 'rgba(98, 126, 174, 0)')
          return gradientBg
        },
        fill: true,
        borderWidth: 1,
        radius: 0,
        data: altitudes,
        datalabels: {
          display: false
        },
      },
    ],
}

const heightOptions = {
  ...chartOptions,

  scales: {
    y: {
      title: {
        display: true,
        text: 'Höhe in m'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Zeit nach Programmstart in s'
      }
    }
  },
};

export {heightData, heightOptions}
