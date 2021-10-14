import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class ChartJobTitle extends Component {
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
        var daftar_job_title = []
        var jumlah_tkp = []
        axios.get('http://localhost:4004/tkp/chart-tkp-job-title')
            .then((response) => {
                response.data.map(nama_job_title => (
                    daftar_job_title.push(nama_job_title.nama_job_title)
                ))

                response.data.map(jumlah_tkp_a => (
                    jumlah_tkp.push(jumlah_tkp_a.jumlah_tkp)
                ))
                this.setState({
                    chartData: {
                        labels: daftar_job_title,
                        datasets: [
                            {
                                data: jumlah_tkp,
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
                            scaleShowValues: true,
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    }
                                }]
                            },
                            indexAxis: 'x',
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
                                    position: 'bottom',
                                    labels: {
                                        usePointStyle: true,
                                        pointStyle: 'circle'
                                    }
                                },
                                title: {
                                    display: true,
                                    text: 'Job Title'
                                }
                            }
                        }
                    }
                />
            </div>
        )
    }
}

export default ChartJobTitle;