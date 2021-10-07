import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

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
                backgroundColor: 'red'
            }
        }
    }
    render() {
        return (
            <div className="chart">
                <Doughnut
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default ChartLoker;