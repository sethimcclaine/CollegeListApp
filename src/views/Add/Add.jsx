import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Textbox } from 'src/components/Textbox';
import { CardForm } from 'src/components/CardForm';
import { INPUT_CONFIG, EMPTY_MODEL, EMPTY_VALIDATION } from 'src/utils/constants';
import { Validate, OnSubmit } from 'src/utils/validate';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: EMPTY_MODEL,
            required: ['code', 'start', 'end', 'type', 'discount', 'what', 'comment'],
            validation: EMPTY_VALIDATION,
        };
        this.handleFormChanges = R.bind(this.handleFormChanges, this);
        this.handleUpsert = R.bind(this.handleUpsert, this);
        this.quickProps = R.bind(this.quickProps, this);
        this.validate = R.bind(Validate, this);
        this.onSubmit = R.bind(OnSubmit, this);
    }

    handleFormChanges({ target }) {
        this.setState({
            model: R.assoc(target.id, target.value, this.state.model),
        });
    }

    handleUpsert() {
        this.onSubmit(['name', 'city', 'state', 'zip_code']);
    }

    quickProps(field) {
        return {
            ...INPUT_CONFIG[field],
            value: this.state.model[field],
            onChange: this.handleFormChanges,
            onBlur: this.validate,
            ...this.state.validation[field],
        };
    }

    render() {
        return (
            <CardForm
                onSubmit={ this.handleUpsert }
                title="Add"
            >
                <Textbox { ...this.quickProps('name') } />
                <Textbox { ...this.quickProps('city') } />
                <Textbox { ...this.quickProps('state') } />
                <Textbox { ...this.quickProps('zip_code') } />
            </CardForm>
        );
    }
}

Add.propTypes = {
    match: PropTypes.object,
    modelReducer: PropTypes.object,
    upsertModel: PropTypes.func,
    notificationMessage: PropTypes.func,
};

export default Add;
