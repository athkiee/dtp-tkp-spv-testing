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
                            data: [32, 43, 54, 37],

                        }
                    ],

            }
        }
    }

    componentDidMount() {
        var daftar_loker = []
        var jumlah_tkp_loker = []
        axios.get('http://localhost:4004/tkp/chart-lokasi-kerja')
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
                                data: jumlah_tkp_loker,
                                backgroundColor: [
                                    '#D51100',
                                    '#D58780'
                                ],
                                borderWidth: 0.1
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
                                    position: 'bottom',
                                    labels: {
                                        usePointStyle: true,
                                        pointStyle: 'circle'
                                    }
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