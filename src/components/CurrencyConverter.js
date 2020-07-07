import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Container, Col, Row } from "reactstrap";
class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      defaultInput: "",
      currencyValue: 0,
      result: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(event) {
    // console.log(event.target.value);
    this.setState({
      defaultInput: event.target.value,
    });
    console.log(document.querySelectorAll("option")[0]);
  }

  handleRate(event) {
    this.setState(
      {
        currencyValue: event.target.value,
      },
      () => {
        console.log(this.state.currencyValue);
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { defaultInput, currencyValue } = this.state;
    const total = defaultInput * currencyValue;
    this.setState({
      result: total,
    });
  }

  handleReset() {
    this.setState({
      result: 0,
      defaultInput: 0,
    });
  }
  componentDidMount() {
    fetch(
      "http://data.fixer.io/api/latest?access_key=8fcbff43bb5a7c19c9befc780fba07f6&format=1"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.rates,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const {
      error,
      isLoaded,
      items,
      defaultInput,
      result,
      currencyValue,
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container>
          <h1>Currency Exchange App</h1>
          <Form onSubmit={this.handleSubmit} className="themed-container">
            <Col>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Number">Enter Amount</Label>
                <Input
                  type="number"
                  value={defaultInput}
                  min="0"
                  required
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Currency">Select Currency</Label>
                <Input
                  type="select"
                  value={currencyValue}
                  onChange={this.handleRate}
                  required
                >
                  {Object.keys(items).map((key) => (
                    <option key={key} value={items[key]}>
                      {key}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Result">Result</Label>
                <Input
                  readOnly
                  type="text"
                  value={result}
                  placeholder="Result"
                />
              </FormGroup>
            </Col>
            <Row form>
              <Col md={12}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <br></br>
                  <Input type="submit" value="Convert" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input type="submit" value="Convert" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input
                    type="button"
                    onClick={this.handleReset}
                    value="Reset"
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* <Form inline>
                <Input type="submit" value="Convert" />
                <Input type="button" onClick={this.handleReset} value="Reset" />
              </Form> */}
          </Form>
        </Container>
      );
    }
  }
}

export default CurrencyConverter;
