import {rows, start_ascending_index, start_descending_index, start_ground_index, timestamps, movingAvg, chartOptions} from './base'

const lum1 = rows.map((row) => row[16]).map(val => Number(val?.replace(',', '.'))).slice(start_descending_index, start_ground_index - 60);
  const lum2 = rows.map((row) => row[17]).map(val => Number(val?.replace(',', '.'))).slice(start_descending_index, start_ground_index - 60);
  const lum3 = rows.map((row) => row[18]).map(val => Number(val?.replace(',', '.'))).slice(start_descending_index, start_ground_index - 60);


  const luminanceData = {
      labels: timestamps.slice(start_descending_index, start_ground_index - 60),
      datasets: [
        {
          label: 'Sensor 1',
          borderColor: 'red',
          tension: 0.4,
          borderWidth: 1,
          radius: 0,
          data: lum1,
          datalabels: {
            display: false
          },
        },
        {
          label: 'Sensor 2',
          borderColor: 'green',
          tension: 0.4,
          borderWidth: 1,
          radius: 0,
          data: lum2,
          datalabels: {
            display: false
          },
        },
        {
          label: 'Sensor 3',
          borderColor: 'blue',
          tension: 0.4,
          borderWidth: 1,
          radius: 0,
          data: lum3,
          datalabels: {
            display: false
          },
        },
      ],
  }

  const luminanceOptions = {
    ...chartOptions,
    
    scales: {
      y: {
        title: {
          display: true,
          text: 'Helligkeit in lux'
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

export {luminanceData, luminanceOptions}
