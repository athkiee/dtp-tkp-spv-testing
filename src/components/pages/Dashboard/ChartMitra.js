import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

class ChartMitra extends Component {
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
    var daftar_mitra = [];
    var jumlah_tkp_mitra = [];
    axios.get("http://localhost:4004/tkp/chart-mitra").then((response) => {
      response.data.map((nama_mitra) =>
        daftar_mitra.push(nama_mitra.nama_mitra)
      );

      response.data.map((jumlah_mitra) =>
        jumlah_tkp_mitra.push(jumlah_mitra.jumlah_tkp)
      );
      this.setState({
        chartData: {
          labels: daftar_mitra,
          datasets: [
            {
              data: jumlah_tkp_mitra,
              backgroundColor: ["#D51100", "#D58780"],
              borderWidth: 0.1,
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
        <Doughnut
          data={this.state.chartData}
          options={{
            width: 1000,
            height: 500,
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
              title: {
                display: true,
                text: "Mitra",
              },
            },
          }}
        />
      </div>
    );
  }
}

export default ChartMitra;
