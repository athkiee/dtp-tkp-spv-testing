import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

class ChartThp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: ["A", "B", "C", "D"],
        datasets: [
          {
            label: "Data Set 1",
            data: [32, 43, 54, 37],
          },
        ],
      },
    };
  }

  componentDidMount() {
    var daftar_job_role = [];
    var jumlah_thp_job_role = [];
    axios
      .get("http://localhost:4004/tkp/chart-thp-job-role")
      .then((response) => {
        response.data.map((nama_job_role) =>
          daftar_job_role.push(nama_job_role.nama_job_role)
        );

        response.data.map((jumlah_thp) =>
          jumlah_thp_job_role.push(jumlah_thp.jumlah_thp)
        );
        this.setState({
          chartData: {
            labels: daftar_job_role,
            datasets: [
              {
                data: jumlah_thp_job_role,
                backgroundColor: ["#D51100"],
                borderWidth: 0.1,
                borderRadius: Number.MAX_VALUE,
              },
            ],
          },
        });
        console.log(this.state.chartData.labels);
        // this.setState({
        //     dataTKP: tkp
        // })
      });
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            scaleShowValues: true,
            scales: {
              xAxes: [
                {
                  ticks: {
                    autoSkip: false,
                  },
                },
              ],
            },
            indexAxis: "x",
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
              legend: {
                display: false,
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
              title: {
                display: true,
                text: "Headcount by Job Role",
              },
            },
          }}
        />
      </div>
    );
  }
}

export default ChartThp;