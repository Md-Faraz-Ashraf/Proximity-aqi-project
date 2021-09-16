/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Plotly from "plotly.js"

export default class GaugeChart extends Component {

    constructor (props:any) {
        super(props);
    }

  componentDidMount () {
    var traceA = {
      type: "pie",
      showlegend: true,
      hole: 0.4,
      rotation: 0,
      values: [1, 1, 1, 1, 1,1, 1],
      text: ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"],
      direction: "clockwise",
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: ["#095828", "#20A41E", "yellow", "orange", "red", "#9E0404","black"]
      },
      labels: ["0-50", "51-100", "101-200", "201-300", "301-400", "401-500"],
      hoverinfo: "label"
    };

    var layout:any = {
      title: 'City AQI',
      autosize: true,
      margin: {
        l: 100,
        r: 50,
        b: 50,
        t: 50,
        pad: 50
      },
      paper_bgcolor: '#7f7f7f',
      plot_bgcolor: '#c7c7c7'
    };

      var data:any = [traceA];
      Plotly.newPlot('gauge-chart', data, layout, {staticPlot: true, displaylogo: false});
  }

    render () {
        return (
            <div id='gauge-chart'>
            </div>
        )
    }
}
