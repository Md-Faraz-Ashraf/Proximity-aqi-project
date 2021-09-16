/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import GaugeChart from "./gaugechart";
import HistogramComparison from './comparisonchart'
import './dashboard.css'


interface Props {
}

interface State {
    data:any;

}
export default class Dashboard extends Component<Props,State> {

    constructor (props:any) {
        super(props);

        this.state = {
            data:[]
        };
    }

    componentDidMount () {
        var ws = new WebSocket("ws://city-ws.herokuapp.com/");
        ws.onmessage =  (evt) => {
        const { data } = evt
        this.setState({
            data: JSON.parse(data)
        })

    };
}

    getHeaders(cols:any[]){
        var jsx: any = []
        cols.forEach((col : any)=>{
            jsx.push(
            <th>{col}</th>
            )
        })
        return jsx
        };

        getStatus(aqi:number){
            if (aqi > 0 && aqi <=50){
                return 'Good'
            }
            else if (aqi >50 && aqi<= 100 ){
                return 'Satisfactory'

            }
            else if (aqi >100 && aqi<= 200 ){
                return 'Moderate'

            }
            else if (aqi >200 && aqi<= 300 ){
                return 'Poor'

            }
            else if (aqi >300 && aqi<= 400 ){
                return 'Very Poor'

            }
            else if (aqi >400 && aqi<= 500 ){
                return 'Severe'

            }
        }

        getRows(statusColor:any){
            var rows : any = []
            this.state.data.forEach((row:any, index:number)=>{
                const color:any  = statusColor[ this.getStatus(row.aqi.toFixed(2))]
                rows.push(
                <tr onClick={(event)=>{console.log('event',index)}} style={{backgroundColor: color}}>
                    <td>{index+1}</td>
                    <td>{row.city}</td>
                    <td>{row.aqi.toFixed(2)}</td>
                    <td>{this.getStatus(row.aqi.toFixed(2))}</td>
                  </tr>
                )

            })
            return rows
        }

    render () {
        const colHeader = ['Sno','City','AQI','Status']
        const statusColor = {
            Good:'#095828',
            Satisfactory:'#20A41E',
            Moderate:'yellow',
            Poor:'orange',
           'Very Poor': 'red',
            Severe:'#9E0404'
        }
        return (
            <div id='d-board'>
                <h2 id='dashboard-header'>
                    Air Quality Index Moitoring
                </h2>
            <Table  striped bordered hover className ="d-table" >
                <thead id='t-head'>
                    <tr>
                        {this.getHeaders(colHeader)}
                    </tr>
                </thead>
                <tbody>
                    {this.getRows(statusColor)}
                </tbody>
            </Table>
            <div className='charts'>
                <div style={{flexBasis:'35%'}}>
                    <GaugeChart/>
                </div>
                <div style={{flexBasis:'65%'}}>
                    <HistogramComparison  data={this.state.data}/>
                </div>
            </div>
        </div>
        );
    }
}
