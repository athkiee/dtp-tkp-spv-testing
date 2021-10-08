import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class ChartJenjang extends Component {
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
                    ]
            }
        }
    }

    componentDidMount() {
        var daftar_jenjang = []
        var jumlah_tkp_jenjang = []
        axios.get('http://localhost:4004/tkp/data-jenjang-pendidikan')
            .then((response) => {
                response.data.map(nama_jenjang => (
                    daftar_jenjang.push(nama_jenjang.nama_jenjang_pendidikan)
                ))

                response.data.map(jumlah_jenjang => (
                    jumlah_tkp_jenjang.push(jumlah_jenjang.jumlah_tkp)
                ))
                this.setState({
                    chartData: {
                        labels: daftar_jenjang,
                        datasets: [
                            {
                                data: jumlah_tkp_jenjang,
                                backgroundColor: [
                                    '#D51100'
                                ],
                                borderWidth: 0.1,
                                borderRadius: Number.MAX_VALUE,
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
                <Bar
                    data={this.state.chartData}
                    options={
                        {
                            indexAxis: 'y',
                            // Elements options apply to all of the options unless overridden in a dataset
                            // In this case, we are setting the border of each horizontal bar to be 2px wide
                            elements: {
                                bar: {
                                    borderWidth: 2,
                                }
                            },
                            responsive: false,
                            plugins: {
                                legend: {
                                    display: false,
                                    position: 'right',
                                },
                                title: {
                                    display: true,
                                    text: 'Jenjang Pendidikan TKP'
                                }
                            }
                        }
                    }
                />
            </div>
        )
    }
}

export default ChartJenjang;