/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Plotly from "plotly.js"

interface Props {
    data: any
}

interface State {

}
export default class Barcharts extends Component<Props,State> {

    constructor (props:any) {
        super(props);
    }

    componentDidMount () {
        this.renderbars()
    }

    componentDidUpdate () {
        this.renderbars()

    }

    renderbars(){
        const x:any = []
        const y:any = []
        this.props.data.forEach((item:any)=>{
            x.push(item['city'])
            y.push(item['aqi'])
        })
        var data:any = [
            {
              x,
              y,
              type: 'bar',
              marker: {
                color: 'black',
              },
            },

          ];

          var layout:any = {
            title: 'All City Comparison',
            autosize: true,
            margin: {
              l: 50,
              r: 50,
              b: 100,
              t: 100,
              pad: 4
            },
            paper_bgcolor: '#7f7f7f',
            plot_bgcolor: '#c7c7c7'
          };

          Plotly.newPlot('bar-chart', data, layout,{displaylogo: false});
    }

    render () {
        return (
            <div id='bar-chart'>
            </div>
        )
    }
}


