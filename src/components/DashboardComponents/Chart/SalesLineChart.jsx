import { Chart } from 'react-google-charts'

 const data = [
  ['Day', 'Amount'],
  ['1', 1000],
  ['2', 1170],
  ['3', 660],
  ['4', 1030],
]

 const options = {
  title: 'Booking amount',
  curveType: 'function',
  legend: { position: 'bottom' },
  series: [{ color: '#F43F5E' }],
}
const SalesLineChart = () => {
  return (
    <Chart chartType='LineChart' width='100%' data={data} options={options} />
  )
}

export default SalesLineChart