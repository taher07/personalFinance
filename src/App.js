import React from 'react';
import './App.css';
import Table from './components/data'
import axios from 'axios'
import Stats from './components/statistics';
import {renderEmail} from 'react-html-email'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      nature: 'Capital',
      amt: 0,
      narr: '',
      capAmt: 0,
      expAmt: 0,
      capAmtArray: [],
      expAmtArray: [],
      curMonth: months[new Date().getMonth()],
      thisMonthCapAmtArray: [],
      thisMonthExpAmtArray: []
    }
  }
  handleNature = e => {
    this.setState({nature: e.target.value})
  }
  handleNAmt = e => {
    this.setState({amt: e.target.value})
  }
  handleNarr = e => {
    this.setState({narr: e.target.value})
  }

  async componentDidMount() {
    await axios.get('http://localhost:3000/entry/info').then(data => {
        this.setState({capAmt: data.data.totalCap})
        this.setState({expAmt: data.data.totalExp})
    }).catch(err => console.log(err))
    await axios.get('http://localhost:3000/entry').then(data => {
      data.data.forEach(item => {
        if(item.nature === 'Capital')
          this.setState(prevState => ({capAmtArray: [...prevState.capAmtArray,item.amount]}))
        else
          this.setState(prevState => ({expAmtArray: [...prevState.expAmtArray,item.amount]}))
      });
    }).catch(err => console.log(err))
    await axios.get('http://localhost:3000/entry/info/month/' + this.state.curMonth).then(data => {
       data.data.forEach(item => {
        if(item.nature === 'Capital')
          this.setState(prevState => ({thisMonthCapAmtArray: [...prevState.thisMonthCapAmtArray,item.amount]}))
        else
          this.setState(prevState => ({thisMonthExpAmtArray: [...prevState.thisMonthExpAmtArray,item.amount]}))
       })
    }).catch(err => console.log(err))
    if(new Date().getDate() === 31) {
      await axios.post('http://localhost:3000/entry/send',{
        subject: `Summary for the month of ${this.state.curMonth} ${new Date().getFullYear()}`,
        template: renderEmail(
          <Stats capData={this.state.capAmtArray} expData={this.state.expAmtArray} currCap={this.state.thisMonthCapAmtArray} currExp={this.state.thisMonthExpAmtArray}/>
        )
      }).then(() => console.log('mail dispatched')).catch(err => console.log(err))
    }
}
  render() {
    return (
      <div className="container">
        <form action="#" className="form">
        <table className="tableAdd">
        <tbody>
          <tr>
            <td><label>Nature of Account</label></td>
            <td><select id="nature" name="nature" onInput={this.handleNature.bind(this)}>
                <option value="Capital" defaultChecked>Capital</option>
                <option value="Expenses">Expenses</option>
            </select></td>
          </tr>
          <tr>
            <td><label>Amount(in INR)</label></td>
            <td><input type="number" name="amt" id="amt" onInput={this.handleNAmt.bind(this)}/></td>
          </tr>
          <tr>
            <td><label>Narration</label></td>
            <td><textarea name="narr" id="narr" cols="30" rows="2" onInput={this.handleNarr.bind(this)}></textarea></td>
          </tr>
          </tbody>
          </table>
          <button className="btnSubmit" onClick={() => {
            axios({
              method: 'POST',
              url: 'http://localhost:3000/entry/add',
              data: {
                nature: this.state.nature,
                amount: this.state.amt,
                narration: this.state.narr,
                date: Date(Date.now()).toString()
              }
            }).then(res => console.log(res)).catch(err => console.log(err))
          }}>Done</button>
        </form>
        <Table />
        <div className="stats">
          <div id="cap">Total Capital Amount is INR {this.state.capAmt}</div>
          <div id="exp">Total Expenses Amount is INR {this.state.expAmt}</div>
          <div id="eff">Net Effective Amount is INR {this.state.capAmt - this.state.expAmt}</div>
        </div>
        <Stats capData={this.state.capAmtArray} expData={this.state.expAmtArray} currCap={this.state.thisMonthCapAmtArray} currExp={this.state.thisMonthExpAmtArray}/>
      </div>
    );
  }
}

export default App;