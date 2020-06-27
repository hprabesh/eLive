import React from 'react';
import { Line } from 'react-chartjs-2';
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

const chart1 = (date,yHigh,yMedium,yLow) => {
	return {
        labels: date,
        // {console.log(dates)}
		datasets: [
			{
				label:["high"],
                backgroundColor:"rgba(255,0,0,0.25)",
                // data:yHigh
                data:yHigh
            },
            {
				label:["medium"],
                backgroundColor:"rgba(0,255,0,0.25",
                data:yMedium
            },
            {
				label:["low"],
                backgroundColor:"rgba(0,0,255,0.25)",
                data:yLow
            }
		]
	};
};


export default class Progress extends React.Component {
    constructor(props){
        super(props);
        this.state={
        date:[],
        yHigh:[],
        yMedium:[],
        yLow:[]
        }
    }
    componentDidMount() {
        fetch('http://10.199.140.162:9001/ahoy')
        .then(res => res.json())
        .then((data) => { 
            data.map(list=>(
                // this.setState({
                //     date:[list.currentDate],
                //     yHigh:[list.high],
                //     yMedium:[list.medium],
                //     yLow:[list.low],
                // }),

                //eslint-disable-next-line
                this.state.date.push(list.currentDate),
                this.state.yHigh.push((list.high)),
                this.state.yMedium.push((list.medium)),
                this.state.yLow.push((list.low))
                ))
                console.log(this.state.date)
                console.log(this.state.yHigh)
                console.log(this.state.yMedium)
                console.log(typeof(this.state))
        })
        .catch(console.log)
    }
  // Toggle between chart1 and chart2 based on value of updated
 

  render() {
    return(
        <TableContainer  component={Paper}>
            <Table>
                <div>
                    <Line 
                        maintainAspectRatio= {true}
                        responsive={true}
                        options={{
                            scales: {
                                yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Number of Task Completed'
                                }
                                }],
                                xAxes:[{
                                    scaleLabel:{
                                        display:true,
                                        labelString:"Date"
                                    }
                                }]
                            } }}
                        data={chart1(this.state.date,this.state.yHigh,this.state.yMedium,this.state.yLow)}
                        
                    />
                </div>
            </Table>
        </TableContainer>
    );
  }
}
