import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

class ChartLoker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {
                labels: ['A', 'B', 'C', 'D'],
                datasets:
                    [
                        {
                            label: 'Data Set 1',
                            data: [32, 43, 54, 37]
                        }
                    ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        }
    }

    componentDidMount() {
        var daftar_loker = []
        var jumlah_tkp_loker = []
        axios.get('http://localhost:4004/tkp/data-lokasi-kerja')
            .then((response) => {
                response.data.map(nama_lokasi => (
                    daftar_loker.push(nama_lokasi.nama_lokasi_kerja)
                ))

                response.data.map(jumlah_lokasi => (
                    jumlah_tkp_loker.push(jumlah_lokasi.jumlah_tkp)
                ))
                this.setState({
                    chartData: {
                        labels: daftar_loker,
                        datasets: [
                            {
                                data: jumlah_tkp_loker
                            }
                        ]
                    }
                })
                console.log(this.state.chartData.labels)
                // this.setState({
                //     dataTKP: tkp
                // })
            })
    }



    render() {
        return (
            <div className="chart">
                <Doughnut
                    data={this.state.chartData}
                    options={
                        {
                            width: 1000,
                            height: 500,
                            maintainAspectRatio: false,
                            responsive: false,
                            plugins: {
                                legend: {
                                    position: 'right',
                                },
                                title: {
                                    display: true,
                                    text: 'Lokasi Kerja TKP'
                                }
                            }
                        }
                    }
                />
            </div>
        )
    }
}

export default ChartLoker;