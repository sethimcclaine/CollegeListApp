import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Textbox } from 'src/components/Textbox';
import { CardForm } from 'src/components/CardForm';
import { StaticText } from 'src/components/StaticText';
import { Validate, OnSubmit } from 'src/utils/validate';
import { INPUT_CONFIG, EMPTY_VALIDATION } from 'src/utils/constants';

class Edit extends Component {
    constructor(props) {
        super(props);

        const {
            match: {
                params: {
                    id,
                },
            },
            fetchModelDetails,
        } = this.props;

        fetchModelDetails(id);

        this.state = {
            model: props.modelReducer.currentModel,
            validation: EMPTY_VALIDATION,
        };

        this.handleFormChanges = R.bind(this.handleFormChanges, this);
        this.handleUpsert = R.bind(this.handleUpsert, this);
        this.quickProps = R.bind(this.quickProps, this);
        this.validate = R.bind(Validate, this);
        this.onSubmit = R.bind(OnSubmit, this);
    }

    componentDidUpdate({ modelReducer }) {
        const { currentModel } = this.props.modelReducer;

        if (JSON.stringify(modelReducer.currentModel) !== JSON.stringify(currentModel)) {
            this.setState({
                model: currentModel,
            });
        }
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
        let value = this.state.model[field];

        value = field === 'id' ? String(value) : value; //keep react from complaing id isn't a string

        return {
            ...INPUT_CONFIG[field],
            value,
            onChange: this.handleFormChanges,
            onBlur: this.validate,
            ...this.state.validation[field],
        };
    }

    render() {
        return (
            <CardForm
                onSubmit={ this.handleUpsert }
                title="Edit"
            >
                <StaticText { ...this.quickProps('id') } />
                <Textbox { ...this.quickProps('name') } />
                <Textbox { ...this.quickProps('city') } />
                <Textbox { ...this.quickProps('state') } />
                <Textbox { ...this.quickProps('zip_code') } />
                <StaticText { ...this.quickProps('created_at') } />
                <StaticText { ...this.quickProps('updated_at') } />
            </CardForm>
        );
    }
}

Edit.propTypes = {
    match: PropTypes.object,
    fetchModelDetails: PropTypes.func,
    fetchLimitByOptions: PropTypes.func,
    modelReducer: PropTypes.object,
    fetchProducts: PropTypes.func,
    upsertModel: PropTypes.func,
    notificationMessage: PropTypes.func,
};

export default Edit;
