import React from "react";
import { Progress, Row, Col, InputNumber } from 'antd';
import setting from "../global/setting.json";
import moment from 'moment';
export class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calcuatedBNB: 0,
      amount: 0
    }
  }
  render() {
    const startTime = new Date(Date.parse(setting.startTime));
    const endTime = new Date(Date.parse(setting.endTime));
    const nowTime = new Date();
    const timeLine = ((nowTime - startTime) / (endTime - startTime)) * 100;
    return (
      <div>
        <h4><label>Amount of tokens = {this.state.calcuatedBNB} BNB</label></h4>
        <Row>
          <Col span={20}>
            <InputNumber 
              onChange={e => this.setState({ calcuatedBNB: 1 * e * setting.rate, amount: e * 1 })} />
          </Col>
          <Col offset={2}>
              <button className="btn btn-primary" onClick={(event) => {
                // This function just calls the transferTokens callback with the
                // form's data.
                event.preventDefault();
                const amount = this.state.amount;
                if (amount) {
                  this.props.transferTokens(amount);
                }
              }} >deposit</button>
          </Col>
        </Row>
        <div>
          <h3>Timeline({moment(startTime).format('MM-DD:hh')} - {moment(endTime).format('MM-DD:hh')})</h3>
          <Progress percent={timeLine} showInfo={false} />
        </div>
      </div>
    );
  }

}
