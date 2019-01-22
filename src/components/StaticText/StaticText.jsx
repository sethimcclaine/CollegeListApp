import React from 'react';
import PropTypes from 'prop-types';
import { FormText } from 'reactstrap';
import { FormRow } from '../FormRow';

export const StaticText = ({ id, label, value }) => (
    <FormRow id={ id } label={ label }>
        <FormText color="muted">{ value }</FormText>
    </FormRow>
);

StaticText.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};
