import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import req from 'request';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class CurrencyChart extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                xAxis: { categories: ["20-09-2018", "21-09-2018", "22-09-2018"] },
                title: { text: 'Euro Currency' },
                series: [{
                    data: [4.8,  4.75, 4.83],
                    name: "Currency"
                }]
            },
            showing: false,
            startDate: moment(),
            endDate: moment()
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var day = this.state.startDate.toDate().getDate();
        var month = this.state.startDate.toDate().getMonth()+1;
        var year = this.state.startDate.toDate().getFullYear();
        var startFormatted = day + "-" + month + "-" + year;

        day = this.state.endDate.toDate().getDate();
        month = this.state.endDate.toDate().getMonth()+1;
        year = this.state.endDate.toDate().getFullYear();
        var endFormatted = day + "-" + month + "-" + year;
        req.post('http://localhost:3030/crawler/PeriodCurrency/', {form: {start: startFormatted, end: endFormatted}}, (err, res, body) => {
            if (err) console.log(err);
            else {
                body = JSON.parse(body);
                this.setState({
                    showing: true,
                    options: {
                        series: {data: body["currency"], name: "Currency"},
                        xAxis: {categories: body["day"]},
                        title: {text: 'Euro Currency'}
                    }
                });
            }
        });
    }

    handleStartChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleEndChange(date) {
        this.setState({
            endDate: date
        });
    }

    render() {
        return (
            <div className="container">
                <div className='date-container'>
                    <div className="comeco-container">
                        Começo <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartChange}
                            dateFormat="DD-MM-YYYY"
                        />
                    </div>
                    <div className="comeco-container">
                        Fim <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleEndChange}
                            dateFormat="DD-MM-YYYY"
                        />
                    </div>
                    <div className="request-container">
                        <button type="button" onClick={this.handleClick}> Procurar </button>
                    </div>
                </div>

                {this.state.showing ? 
                    <div className="chart-container">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.options}
                        />
                    </div> : null
                }
            </div>
        );
    }
}

export default CurrencyChart;