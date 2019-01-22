import React from 'react';
import PropTypes from 'prop-types';
import {
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

export const CheckBox = ({ id, label, inline, onChange, value, disabled = false }) => (
    <FormGroup key={ id } check inline={ inline }>
        <Input
            className="form-check-input"
            type="checkbox"
            id={ id }
            name={ id }
            value={ id }
            checked={ !!value }
            onChange={ onChange }
            disabled={ disabled }
        />
        { label && (
            <Label
                className="form-check-label"
                check
                htmlFor={ id }
            >
                { label }
            </Label>
        )}
    </FormGroup>
);

CheckBox.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    inline: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.number,
    disabled: PropTypes.bool,
};
