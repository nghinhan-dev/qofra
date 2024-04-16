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
import DragFilter from "../../features/dragFilter";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";

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

export default function Report() {
  const { data, isSuccess, isLoading } = useGetChartDataQuery();

  const initialMonthArr = [
    { title: "Jan", isSelected: true, col: 1 },
    { title: "Feb", isSelected: true, col: 2 },
    { title: "Mar", isSelected: true, col: 3 },
    { title: "Apr", isSelected: true, col: 4 },
    { title: "May", isSelected: true, col: 5 },
    { title: "Jun", isSelected: true, col: 6 },
    { title: "Jul", isSelected: true, col: 7 },
    { title: "Aug", isSelected: true, col: 8 },
    { title: "Sep", isSelected: true, col: 9 },
    { title: "Oct", isSelected: true, col: 10 },
    { title: "Nov", isSelected: true, col: 11 },
    { title: "Dec", isSelected: true, col: 12 },
  ];
  const [chosenMonth, setChosenMonth] = useState(initialMonthArr);
  const [selectedProcess, setSelectProcess] = useState([
    { title: "extruder", isSelected: true },
    { title: "mixing", isSelected: true },
    { title: "crushing", isSelected: true },
    { title: "moldSetter", isSelected: true },
  ]);

  let orverallChartDataSet;
  let doughnutChartData;

  if (isSuccess) {
    const { overallChart, doughnutChart } = data;

    orverallChartDataSet = {
      labels: filterData(chosenMonth, chosenMonth).map((month) => month.title),
      datasets: [
        {
          type: "line",
          label: "Audit Time",
          borderColor: "rgb(234, 234, 29)",
          borderWidth: 2,
          fill: false,
          data: filterData(overallChart, chosenMonth).map(({ stats }) => {
            let total = stats.reduce((acc, stat) => {
              if (stat._id.status === "Done")
                return (acc +=
                  (selectedProcess.includes("extruder") && stat.extruder) +
                  (selectedProcess.includes("crushing") && stat.crushing) +
                  (selectedProcess.includes("mixing") && stat.mixing) +
                  (selectedProcess.includes("moldSetter") && stat.moldSetter));
            }, 0);

            return total * 1.3;
          }),
        },
        {
          label: "Done",
          data: filterData(overallChart, chosenMonth).map(({ stats }) => {
            let total = stats.reduce((acc, stat) => {
              if (stat._id.status === "Done") {
                return (acc +=
                  (selectedProcess.includes("extruder") && stat.extruder) +
                  (selectedProcess.includes("crushing") && stat.crushing) +
                  (selectedProcess.includes("mixing") && stat.mixing) +
                  (selectedProcess.includes("moldSetter") && stat.moldSetter));
              }
            }, 0);

            return total;
          }),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "On Going",
          data: filterData(overallChart, chosenMonth).map(({ stats }) => {
            let total = stats.reduce((acc, stat) => {
              if (stat._id.status === "On Going")
                return (acc +=
                  (selectedProcess.includes("extruder") && stat.extruder) +
                  (selectedProcess.includes("crushing") && stat.crushing) +
                  (selectedProcess.includes("mixing") && stat.mixing) +
                  (selectedProcess.includes("moldSetter") && stat.moldSetter));
            }, 0);

            return total;
          }),
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "Overdue",
          data: filterData(overallChart, chosenMonth).map(({ stats }) => {
            let total = stats.reduce((acc, stat) => {
              if (stat._id.status === "Overdue")
                return (acc +=
                  (selectedProcess.includes("extruder") && stat.extruder) +
                  (selectedProcess.includes("crushing") && stat.crushing) +
                  (selectedProcess.includes("mixing") && stat.mixing) +
                  (selectedProcess.includes("moldSetter") && stat.moldSetter));
            }, 0);

            return total;
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
      {isLoading && <Loading />}
      {isSuccess && (
        <>
          <div className="chart__filter">
            <DragFilter filterArr={chosenMonth} setState={setChosenMonth} />
          </div>
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

function filterData(data, filterCrit) {
  const arrResult = [];

  for (const { isSelected, col } of filterCrit) {
    if (isSelected) {
      arrResult.push(data[col - 1]);
    }
  }

  return arrResult;
}
