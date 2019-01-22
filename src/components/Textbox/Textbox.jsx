import React from 'react';
import PropTypes from 'prop-types';
import {
    FormFeedback,
    Input,
} from 'reactstrap';
import { FormRow } from '../FormRow';

export const Textbox = (props) => {
    const valid = {
        valid: props.valid,
        invalid: props.valid === false,
    };

    return (<FormRow { ...props }>
        <Input
            { ...props }
            type={ props.type || 'text' }
            name={ props.id }
            { ...valid }
        />
        <FormFeedback
            valid={ valid.valid }
            invalid={ valid.invalid.toString() }
        >
            { props.msg }
        </FormFeedback>
    </FormRow>);
};

Textbox.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    valid: PropTypes.bool,
    msg: PropTypes.string,
};
