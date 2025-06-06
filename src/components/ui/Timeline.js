import React from "react";

function Timeline() {
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
              <canvas
                className="main-chart"
                id="line-chart"
                height="200"
                width="600"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
