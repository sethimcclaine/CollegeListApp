import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import {
    FormFeedback,
    Input,
} from 'reactstrap';
import { FormRow } from '../FormRow';

export const Select = (props) => {
    let options = props.options;

    if (!props.value) {
        options = R.prepend({
            name: '',
            optField: null,
        }, props.options);
    } else if (R.filter(({ optVal }) => optVal === props.value, props.options).length === 0) {
        //if a options change to exclude the value, set the value back to null
        /* //This is what I want to do but react doesn't like it inside the render...

        onChange({
            target: {
                props.id,
                value: null,
            },
        });
        /*/
        //Temp fix until we get the above figured out
        options = R.prepend({
            name: '',
            optField: null,
        }, props.options);
        //*/
    }
    const valid = {
        valid: props.valid,
        invalid: props.valid === false,
    };

    return (
        <FormRow { ...props } >
            <Input
                type="select"
                value={ props.value || '' }
                name={ props.id }
                id={ props.id }
                onChange={ props.onChange }
                onBlur={ props.onBlur }
                disabled={ props.disabled }
                { ...valid }
            >
                { R.map(({ name, optVal }) => (
                    <option key={ name } value={ optVal } >{ name }</option>
                ), options) }
            </Input>
            <FormFeedback
                valid={ valid.valid }
                invalid={ valid.invalid.toString() }
            >
                { props.msg }
            </FormFeedback>

        </FormRow>
    );
};

Select.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    valid: PropTypes.bool,
    msg: PropTypes.string,
};
