import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartCard from 'components/ui_self/Chart/ChartCard'
import ChartLegend from 'components/ui_self/Chart/ChartLegend'
import PageTitle from 'components/ui_self/Typography/PageTitle'
import Layout from 'components/containers/Layout'
import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from 'utils/demo/chartsData'
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

function Charts() {
  Chart.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  return (
    <Layout>
      <PageTitle>Charts</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Doughnut">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </Layout>
  )
}

export default Charts
