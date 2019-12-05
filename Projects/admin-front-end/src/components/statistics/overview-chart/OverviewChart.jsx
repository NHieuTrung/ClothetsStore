import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';

class OverviewChart extends Component {
    state = {
        completedPercentage: []
    }

    getCompletedPercentage = () => {
        const options = {
            headers: {
                Authorization:
                "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
            }
        };
    
        fetch(`https://localhost:44376/api/admin/statistics/getCompletedPercentage`, options)
        .then(res => res.json())
        .then(res => {
            this.setState({
                completedPercentage: res
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    componentWillMount = () => {
        this.getCompletedPercentage();
    };

    render() {
        let data = {
            Red: 3,
            Blue: 2,
            Green: 1
        }

        return (
            <div className="col-xl-12 col-lg-7">
                <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                        <div className="dropdown no-arrow">
                            <a className="dropdown-toggle" href="/#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                <div className="dropdown-header">Dropdown Header:</div>
                                <a className="dropdown-item" href="/#">Action</a>
                                <a className="dropdown-item" href="/#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/#">Something else here</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card Body --> */}
                    {/* <div className="card-body">
                        <div className="chart-area">
                            <canvas id="myAreaChart"></canvas>
                        </div>
                    </div> */}
                    {/* <Bar
                        data={data}
                        width={100}
                        height={50}
                        options={{ maintainAspectRatio: false }}
                        /> */}
                </div>
            </div>
        );
    }
}

export default OverviewChart;