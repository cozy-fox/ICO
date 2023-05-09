import React from "react";
import { Progress, Row, Col,InputNumber  } from 'antd';
import setting from "../global/setting.json";
import moment from 'moment';
export class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      calcuatedBNB:0
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
        <form
          onSubmit={(event) => {
            // This function just calls the transferTokens callback with the
            // form's data.
            event.preventDefault();

            const formData = new FormData(event.target);
            const to = formData.get("to");
            const amount = formData.get("amount");

            if (to && amount) {
              this.props.transferTokens(to, amount);
            }
          }}
        >
          <Row>
            <Col span={20}>
              <InputNumber min={setting.min/setting.rate} max={setting.max/setting.rate}
              onChange={e=>this.setState({calcuatedBNB:1*e*setting.rate})}/>
            </Col>
            <Col offset={2}>
              <div className="form-group">
                <input className="btn btn-primary" type="submit" value="Transfer" />
              </div>
            </Col>
          </Row>
          {/* <div className="form-group">
            <label>Recipient address</label>
            <input className="form-control" type="text" name="to" required />
          </div> */}
        </form>
        <div>
          <h3>Timeline({moment(startTime).format('MM-DD:hh')} - {moment(endTime).format('MM-DD:hh')})</h3>
          <Progress percent={timeLine} showInfo={false} />

        </div>
      </div>
    );
  }

}
