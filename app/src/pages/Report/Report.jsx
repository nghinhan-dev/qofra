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
import { Chart, Doughnut, Bar } from "react-chartjs-2";
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
    { title: "Jan", isSelected: true, index: 0 },
    { title: "Feb", isSelected: true, index: 1 },
    { title: "Mar", isSelected: true, index: 2 },
    { title: "Apr", isSelected: true, index: 3 },
    { title: "May", isSelected: true, index: 4 },
    { title: "Jun", isSelected: true, index: 5 },
    { title: "Jul", isSelected: true, index: 6 },
    { title: "Aug", isSelected: true, index: 7 },
    { title: "Sep", isSelected: true, index: 8 },
    { title: "Oct", isSelected: true, index: 9 },
    { title: "Nov", isSelected: true, index: 10 },
    { title: "Dec", isSelected: true, index: 11 },
  ];
  const [chosenMonth, setChosenMonth] = useState(initialMonthArr);
  const [selectedProcess, setSelectProcess] = useState([
    { title: "extruder", isSelected: true, index: 0 },
    { title: "mixing", isSelected: true, index: 1 },
    { title: "crushing", isSelected: true, index: 2 },
    { title: "moldSetter", isSelected: true, index: 3 },
  ]);

  let orverallChartDataSet;
  let doughnutChartData;
  let processesData;

  let doughnutLabels = [
    "Machine",
    "Man",
    "Material",
    "Method/ Measure",
    "Safety",
  ];
  let processLables = ["Crushing", "Extruder", "Mixing", "Mold Setter"];

  function accByStatus(acc, stat, status) {
    if (stat._id.status === status)
      return (acc +=
        (selectedProcess.some(
          (element) => element.title === "extruder" && element.isSelected
        ) && stat.extruder) +
        (selectedProcess.some(
          (element) => element.title === "crushing" && element.isSelected
        ) && stat.crushing) +
        (selectedProcess.some(
          (element) => element.title === "mixing" && element.isSelected
        ) && stat.mixing) +
        (selectedProcess.some(
          (element) => element.title === "moldSetter" && element.isSelected
        ) && stat.moldSetter));
    else return 0;
  }

  if (isSuccess) {
    const { overallChart, doughnutChart, processChart } = data;

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
            let total = stats.reduce(
              (acc, stat) => accByStatus(acc, stat, "Done"),
              0
            );

            return total * 1.3;
          }),
        },
        {
          label: "Done",
          data: filterData(overallChart, chosenMonth).map(({ stats }) => {
            let total = stats.reduce(
              (acc, stat) => accByStatus(acc, stat, "Done"),
              0
            );

            return total;
          }),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "On Going",
          data: filterData(overallChart, chosenMonth).map(({ stats }) => {
            let total = stats.reduce(
              (acc, stat) => accByStatus(acc, stat, "On Going"),
              0
            );

            return total;
          }),
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "Overdue",
          data: filterData(overallChart, chosenMonth).map(({ stats }) => {
            let total = stats.reduce(
              (acc, stat) => accByStatus(acc, stat, "Overdue"),
              0
            );

            return total;
          }),
          backgroundColor: "rgb(53, 162, 235)",
        },
      ],
    };

    doughnutChartData = {
      labels: doughnutLabels,
      datasets: [
        {
          label: "# of Finding",
          data: filterData(doughnutChart, chosenMonth).reduce(
            (acc, { results }) => {
              const cur = results.reduce(
                (acc, { _id, extruder, mixing, moldSetter, crushing }) => {
                  acc[
                    `${
                      _id.scope === "Method/ Measure"
                        ? "methodMeasure"
                        : _id.scope.toLowerCase()
                    }`
                  ] =
                    ((selectedProcess.some(
                      (element) =>
                        element.title === "extruder" && element.isSelected
                    ) &&
                      extruder) ||
                      0) +
                    ((selectedProcess.some(
                      (element) =>
                        element.title === "crushing" && element.isSelected
                    ) &&
                      crushing) ||
                      0) +
                    ((selectedProcess.some(
                      (element) =>
                        element.title === "mixing" && element.isSelected
                    ) &&
                      mixing) ||
                      0) +
                    ((selectedProcess.some(
                      (element) =>
                        element.title === "moldSetter" && element.isSelected
                    ) &&
                      moldSetter) ||
                      0);

                  return acc; // Return the updated accumulator object
                },
                {
                  machine: 0,
                  man: 0,
                  material: 0,
                  methodMeasure: 0,
                  safety: 0,
                }
              );

              acc = acc.map(
                (value, index) =>
                  value +
                  cur[
                    doughnutLabels[index] === "Method/ Measure"
                      ? "methodMeasure"
                      : doughnutLabels[index].toLowerCase()
                  ]
              );

              return acc;
            },
            [0, 0, 0, 0, 0]
          ),

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

    processesData = {
      labels: processLables,
      datasets: [
        {
          label: "Done",
          data: filterData(processChart, chosenMonth).reduce(
            (acc, { processes }) => {
              const cur = processes.reduce(
                (acc, { _id, done }) => {
                  acc[
                    `${
                      _id.process === "Mold Setter"
                        ? "moldSetter"
                        : _id.process.toLowerCase()
                    }`
                  ] += done;

                  return acc; // Return the updated accumulator object
                },
                {
                  crushing: 0,
                  moldSetter: 0,
                  extruder: 0,
                  mixing: 0,
                }
              );

              acc = acc.map(
                (value, index) =>
                  value +
                  cur[
                    processLables[index] === "Mold Setter"
                      ? "moldSetter"
                      : processLables[index].toLowerCase()
                  ]
              );

              return acc;
            },
            [0, 0, 0, 0]
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Overdue",
          data: filterData(processChart, chosenMonth).reduce(
            (acc, { processes }) => {
              const cur = processes.reduce(
                (acc, { _id, overdue }) => {
                  acc[
                    `${
                      _id.process === "Mold Setter"
                        ? "moldSetter"
                        : _id.process.toLowerCase()
                    }`
                  ] += overdue;

                  return acc; // Return the updated accumulator object
                },
                {
                  crushing: 0,
                  moldSetter: 0,
                  extruder: 0,
                  mixing: 0,
                }
              );

              acc = acc.map(
                (value, index) =>
                  value +
                  cur[
                    processLables[index] === "Mold Setter"
                      ? "moldSetter"
                      : processLables[index].toLowerCase()
                  ]
              );

              return acc;
            },
            [0, 0, 0, 0]
          ),
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "On Going",
          data: filterData(processChart, chosenMonth).reduce(
            (acc, { processes }) => {
              const cur = processes.reduce(
                (acc, { _id, onGoing }) => {
                  acc[
                    `${
                      _id.process === "Mold Setter"
                        ? "moldSetter"
                        : _id.process.toLowerCase()
                    }`
                  ] += onGoing;

                  return acc; // Return the updated accumulator object
                },
                {
                  crushing: 0,
                  moldSetter: 0,
                  extruder: 0,
                  mixing: 0,
                }
              );

              acc = acc.map(
                (value, index) =>
                  value +
                  cur[
                    processLables[index] === "Mold Setter"
                      ? "moldSetter"
                      : processLables[index].toLowerCase()
                  ]
              );

              return acc;
            },
            [0, 0, 0, 0]
          ),
          backgroundColor: "rgb(53, 162, 235)",
        },
      ],
    };
  }

  return (
    <section id="report" className="d__flex">
      <h1>Report</h1>
      {isLoading && <Loading />}
      {isSuccess && (
        <>
          <div className="chart__filter">
            <DragFilter
              colNum={6}
              filterArr={chosenMonth}
              setState={setChosenMonth}
            />
            <DragFilter
              colNum={2}
              filterArr={selectedProcess}
              setState={setSelectProcess}
            />
          </div>
          <div className="chart__container">
            <div className="overallChart chart">
              <Chart type="bar" options={options} data={orverallChartDataSet} />
            </div>
            <div className="chart">
              <Bar
                options={{
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                    },
                  },
                }}
                data={processesData}
              />
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
          </div>
        </>
      )}
    </section>
  );
}

function filterData(data, filterCrit) {
  const arrResult = [];

  for (const { isSelected, index } of filterCrit) {
    if (isSelected) {
      arrResult.push(data[index]);
    }
  }

  return arrResult;
}
