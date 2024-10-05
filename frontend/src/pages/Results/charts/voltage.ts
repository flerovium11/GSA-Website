import {rows, start_ascending_index, start_descending_index, start_ground_index, timestamps, movingAvg, chartOptions} from './base'

const voltage = rows.map((row) => row[20]).map(val => Number(val?.replace(',', '.'))).slice(start_descending_index + 1, start_ground_index - 40);

  const voltageData = {
      labels: timestamps.slice(start_descending_index + 1, start_ground_index - 40),
      datasets: [
        {
          label: 'Solarpanel Spannung',
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
          data: voltage,
          datalabels: {
            display: false
          },
        },
      ],
  }

  const voltageOptions = {
    ...chartOptions,

    scales: {
      y: {
        title: {
          display: true,
          text: 'Spannung in V'
        },
      },
      x: {
        title: {
          display: true,
          text: 'Zeit nach Programmstart in s'
        }
      }
    },
  };

export {voltageData, voltageOptions}
