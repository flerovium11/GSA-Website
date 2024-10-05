import {rows, start_ascending_index, start_descending_index, start_ground_index, timestamps, movingAvg, chartOptions} from './base'

const accX = rows.map((row) => row[7]).map(val => Number(val?.replace(',', '.'))).slice(start_ascending_index - 10, start_ground_index - 60);
const accY = rows.map((row) => row[8]).map(val => Number(val?.replace(',', '.'))).slice(start_ascending_index - 10, start_ground_index - 60);
const accZ = rows.map((row) => row[9]).map(val => Number(val?.replace(',', '.'))).slice(start_ascending_index - 10, start_ground_index - 60);
const accG = accX.map((val, i) => Math.sqrt(val**2 + accY[i]**2 + accZ[i]**2))

const accelerationData = {
    labels: timestamps.slice(start_ascending_index - 10, start_ground_index - 60),
    datasets: [
    {
        label: 'Beschleunigung X',
        borderColor: 'rgba(100, 0, 100, 0.25)',
        tension: 0.4,
        borderWidth: 7,
        radius: 0,
        data: accX,
        datalabels: {
        display: false
        },
    },
    {
        label: 'Beschleunigung Y',
        borderColor: 'rgba(0, 200, 0, 0.3)',
        tension: 0.4,
        borderWidth: 7,
        radius: 0,
        data: accY,
        datalabels: {
        display: false
        },
    },
    {
        label: 'Beschleunigung Z',
        borderColor: 'rgba(255, 150, 0, 0.3)',
        tension: 0.4,
        borderWidth: 7,
        radius: 0,
        data: accZ,
        datalabels: {
        display: false
        },
    },
    {
        label: 'Gesamtbeschleunigung Betrag',
        borderColor: 'red',
        tension: 0.4,
        borderWidth: 3,
        radius: 0,
        data: accG,
        datalabels: {
        display: false
        },
    },
    ],
}

const accelerationOptions = {
...chartOptions,

scales: {
    y: {
    title: {
        display: true,
        text: 'Beschleunigung in m/s²'
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

export {accelerationData, accelerationOptions}
