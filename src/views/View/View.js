import React, { Component } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Row, Table } from 'reactstrap';
import { map } from 'ramda';
import { CheckBox } from 'src/components/CheckBox';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modelResults: props.modelReducer.modelResults || [], //JSON.parse(window.localStorage.getItem('models')),
            selected: [],
        };
        props.fetchModelItems();
        this.selectAll = R.bind(this.selectAll, this);
        this.selectOne = R.bind(this.selectOne, this);
    }

    componentDidUpdate({ modelReducer }) {
        const { modelResults } = this.props.modelReducer;

        if (JSON.stringify(modelReducer.modelResults) !== JSON.stringify(modelResults)) {
            this.setState({ modelResults });
        }
    }

    clearLocalStorage() {
        window.localStorage.removeItem('models');
        window.localStorage.removeItem('records');
        window.location.reload();
    }

    selectOne({ currentTarget }) {
        const id = parseInt(currentTarget.id, 10);
        const { selected } = this.state;
        this.setState({
            selected: R.contains(id, selected) ? R.filter((s) => s !== id, selected) : R.append(id, selected),
        });
    }

    selectAll() {
        const { selected, modelResults } = this.state;

        this.setState({
            selected: selected.length >= modelResults.length ? [] : R.map((m) => m.id, modelResults),
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div>
                    <h1>School data</h1>
                    <p>Manage and export data collected for schools below</p>
                    <Link to="/mod/add/">
                        <Button type="submit" size="sm" color="success">
                            Add New School
                        </Button>
                    </Link>
                </div>
                <div>
                    <Button type="submit" size="sm" color="secondary">
                        <i className="fa fa-plus"></i>
                    </Button>
                    <p>{this.state.selected.length} Selected</p>
                    <Button type="submit" size="sm" color="secondary">
                        <i className="fa fa-trash"></i>
                    </Button>
                    <Button type="submit" size="sm" color="secondary">
                        <i className="fa fa-share"></i>
                    </Button>
                </div>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                <CheckBox inline
                                                    onChange={ this.selectAll }
                                                    value={ (this.state.selected.length >= this.state.modelResults.length) ? 1 : 0 }
                                                />
                                            </th>
                                            <th>Name</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Zip</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { map((model) => (
                                            <tr key={ model.id }>
                                                <th>
                                                    <CheckBox inline
                                                        id={ model.id.toString() }
                                                        onChange={ this.selectOne }
                                                        value={ R.contains(model.id, this.state.selected) ? 1 : 0 }
                                                    />
                                                </th>
                                                <td>{ model.name }</td>
                                                <td>{ model.city }</td>
                                                <td>{ model.state }</td>
                                                <td>{ model.zip }</td>
                                                <td><Link to={ '/mod/edit/' + model.id }>Edit</Link></td>
                                            </tr>
                                        ), this.state.modelResults)}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        );
    }
}

View.propTypes = {
    fetchModelItems: PropTypes.func,
    modelReducer: PropTypes.object,
};

export default View;
