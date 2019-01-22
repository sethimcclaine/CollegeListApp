import React from 'react';
import { map } from 'ramda';
import PropTypes from 'prop-types';
import {
    FormGroup,
} from 'reactstrap';
import { FormRow } from '../FormRow';

let key = 0;

export const CheckGroup = (props) => (
    <FormRow { ...props }>
        { map((child) => (
            <FormGroup key={ key++ } check inline={ props.inline }>
                { child }
            </FormGroup>
        ), props.children)}
    </FormRow>
);

CheckGroup.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.array,
    inline: PropTypes.bool,
};
