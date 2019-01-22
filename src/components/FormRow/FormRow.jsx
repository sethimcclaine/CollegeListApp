import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    FormGroup,
    Label,
} from 'reactstrap';

export const FormRow = ({ id, label, children, required }) => {
    return (
        <FormGroup row>
            <Col md="3">
                <Label htmlFor={ id }>{ label }{ required ? (<span className="">*</span>) : null }</Label>
            </Col>
            <Col xs="12" md="9">
                { children }
            </Col>
        </FormGroup>
    );
};

FormRow.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};
