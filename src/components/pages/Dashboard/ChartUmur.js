import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

class ChartUmur extends Component {
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
        var daftar_umur = []
        var jumlah_tkp_umur = []
        axios.get('http://localhost:4004/tkp/chart-range-umur')
            .then((response) => {
                response.data.map(range => (
                    daftar_umur.push(range.umur_range)
                ))

                response.data.map(jumlah_range_umur => (
                    jumlah_tkp_umur.push(jumlah_range_umur.jumlah_tkp)
                ))
                this.setState({
                    chartData: {
                        labels: daftar_umur,
                        datasets: [
                            {
                                data: jumlah_tkp_umur,
                                backgroundColor: [
                                    '#D51100',
                                    '#D55F55',
                                    '#D58780',
                                    '#D5AEAA',
                                    '#D5C1C0'
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
                                    text: 'Usia TKP'
                                }
                            }
                        }
                    }
                />
            </div>
        )
    }
}

export default ChartUmur;