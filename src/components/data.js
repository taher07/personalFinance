import React from 'react'
import '../App.css'
import axios from 'axios'

export default class Table extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        await axios.get('https://personal-finance-master.herokuapp.com/entry/').then(data => {
            this.setState({data: data.data})
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <table id="ac-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Nature</th>
                        <th>Amount</th>
                        <th>Narration</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.date.slice(0,item.date.indexOf('GMT') - 1)}</td>
                                    <td>{item.nature}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.narration}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}