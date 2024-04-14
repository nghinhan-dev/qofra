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
  Title,
  ArcElement,
} from "chart.js";
import { Chart, Doughnut } from "react-chartjs-2";
import "./Report.css";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
  ArcElement
);

const options = {
  plugins: {
    title: {
      display: true,
      text: "NO. finding & audit time",
    },
  },
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
  const chosenMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let orverallChartDataSet;
  let doughnutChartData;

  if (isSuccess) {
    const { overallChart, doughnutChart } = data;

    orverallChartDataSet = {
      labels,
      datasets: [
        {
          type: "line",
          label: "Audit Time",
          borderColor: "rgb(234, 234, 29)",
          borderWidth: 2,
          fill: false,
          data: chosenMonth.map((month) => {
            let done = overallChart[month - 1].stats.reduce((acc, stat) => {
              if (stat._id.status === "Done")
                return (acc +=
                  stat.extruder +
                  stat.crushing +
                  stat.mixing +
                  stat.moldSetter);
            }, 0);

            return Math.floor(
              done * (Math.random() * (1.7 - 1.4) + 1.4).toFixed(2)
            );
          }),
        },
        {
          label: "Done",
          data: chosenMonth.map((month) => {
            let done = overallChart[month - 1].stats.reduce((acc, stat) => {
              if (stat._id.status === "Done")
                return (acc +=
                  stat.extruder +
                  stat.crushing +
                  stat.mixing +
                  stat.moldSetter);
            }, 0);

            return done;
          }),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "On Going",
          data: chosenMonth.map((month) => {
            let done = overallChart[month - 1].stats.reduce((acc, stat) => {
              if (stat._id.status === "On Going")
                return (acc +=
                  stat.extruder +
                  stat.crushing +
                  stat.mixing +
                  stat.moldSetter);
            }, 0);

            return done;
          }),
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "Overdue",
          data: chosenMonth.map((month) => {
            let done = overallChart[month - 1].stats.reduce((acc, stat) => {
              if (stat._id.status === "Overdue")
                return (acc +=
                  stat.extruder +
                  stat.crushing +
                  stat.mixing +
                  stat.moldSetter);
            }, 0);

            return done;
          }),
          backgroundColor: "rgb(53, 162, 235)",
        },
      ],
    };

    doughnutChartData = {
      labels: ["Machine", "Man", "Material", "Method/ Measure", "Safety"],
      datasets: [
        {
          label: "# of Finding",
          data: doughnutChart.map((item) => item.count),
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <section id="report" className="d__flex">
      {isSuccess && (
        <>
          <div className="overallChart chart">
            <Chart type="bar" options={options} data={orverallChartDataSet} />
          </div>
          <div className="doughnutChart chart">
            <Doughnut
              data={doughnutChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "No. Findings by Scope",
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </section>
  );
}
