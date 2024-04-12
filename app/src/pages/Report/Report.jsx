import { useGetChartDataQuery } from "../../service/FindingAPI";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const options = {
  backgroundColor: "white",
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Report() {
  const { data, isSuccess } = useGetChartDataQuery();

  let chartData;
  if (isSuccess) {
    const result = drawTest(data);
    console.log("result:", result);

    chartData = {
      labels,
      datasets: [
        {
          type: "line",
          label: "Audit Time",
          borderColor: "rgb(234, 234, 29)",
          borderWidth: 2,
          fill: false,
          data: result.auditTime,
        },
        {
          label: "Done",
          data: result.done,
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "On Going",
          data: result.onGoing,
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "Overdue",
          data: result.overdue,
          backgroundColor: "rgb(53, 162, 235)",
        },
      ],
    };
  }

  return (
    <section className="d__flex">
      {isSuccess && <Chart type="bar" options={options} data={chartData} />}
    </section>
  );
}

function drawTest(data) {
  let chartData = {
    auditTime: [],
    onGoing: [],
    done: [],
    overdue: [],
  };

  for (const month of data) {
    const { findings } = month;

    let total = findings.reduce(
      (acc, finding) => {
        return {
          done: acc.done + finding.done,
          overdue: acc.overdue + Math.floor(finding.done * 0.2),
          onGoing: acc.onGoing + Math.floor(finding.done * 0.3),
        };
      },
      {
        onGoing: 0,
        done: 0,
        overdue: 0,
      }
    );

    chartData.done.push(total.done);
    chartData.onGoing.push(total.onGoing);
    chartData.overdue.push(total.overdue);
    chartData.auditTime.push(
      (total.done + total.onGoing + total.overdue) *
        (Math.floor(Math.random() * 2) + 2)
    );
  }

  return chartData;
}
