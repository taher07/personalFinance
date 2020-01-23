import React from 'react'
import '../App.css'
import {Line} from 'react-chartjs-2'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const maxRange = [31,new Date().getFullYear()%4===0?29:28,31,30,31,30,31,31,30,31,30,31]
class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataset: [],
            curMonth: new Date().getMonth(),
            curDataset: []
        }
    }
    componentDidMount() {
        months.forEach((item,index) => {
            for (let i = 1; i <= maxRange[index]; i++) {
                this.setState(prevState => ({
                    dataset: [...prevState.dataset, item + i]
                }))
            }
        })
        for(let i = 1; i <= maxRange[this.state.curMonth];i++) {
            this.setState(prevState => ({
                curDataset: [...prevState.curDataset, months[this.state.curMonth] + i]
            }))
        }
    }
    render() {
        return (
            <div>
                <Line 
                data={{
                    labels: this.state.curDataset,
                    datasets: [
                        {
                            label: 'Expenses',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#fff',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.props.currExp
                        },
                        {
                            label: 'Income',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#fff',
                            borderColor: '#dc143c',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.props.currCap
                        }
                    ]
                }}
                />
                Month-wise graphical representation
                <Line 
                data={{
                    labels: this.state.dataset,
                    datasets: [
                        {
                            label: 'Expenses',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#fff',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.props.expData
                        },
                        {
                            label: 'Income',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#fff',
                            borderColor: '#dc143c',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.props.capData
                        }
                    ]
                }}
                />
                cumulative year-wise graphical representation
            </div>
        );
    }
}

export default Stats