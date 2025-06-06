import React from "react";


import { Line as ChartLine } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically register all components

function Traffic() {


   const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Traffic',
      data: [1000, 2000, 1500, 3000, 2500, 3500],
      borderColor: 'rgba(48, 165, 255, 1)',
      backgroundColor: 'rgba(48, 165, 255, 0.2)',
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0,0,0,.05)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,.2)'
        }
      }
    }
  };

  
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            Site Traffic Overview
            <ul className="pull-right panel-settings panel-button-tab-right">
              <li className="dropdown">
                <a
                  className="pull-right dropdown-toggle"
                  data-toggle="dropdown"
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <em className="fa fa-cogs"></em>
                </a>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li>
                    <ul className="dropdown-settings">
                      <li>
                        <a href="/">
                          <em className="fa fa-cog"></em> Settings 1
                        </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <a href="/">
                          <em className="fa fa-cog"></em> Settings 2
                        </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <a href="/">
                          <em className="fa fa-cog"></em> Settings 3
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <span className="pull-right clickable panel-toggle panel-button-tab-left">
              <em className="fa fa-toggle-up"></em>
            </span>
          </div>
          <div className="panel-body">
            <div className="canvas-wrapper">

                    <ChartLine data={data} options={options} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Traffic;