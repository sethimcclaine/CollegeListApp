import * as R from 'ramda';

const getValidation = function (id, value, { validation, model }) {
    let msg;

    if (value === '') {
        if (validation[id].required) {
            msg = 'This field is required';
        } else {
            return R.dissocPath([id, 'valid'], validation);
        }
    } else {
        switch (id) {
            case 'code':
                if (value.search(/^[a-zA-Z0-9-_]+$/)) {
                    msg = 'Invalid characters, no special characters except `-` and `_`';
                } else if (value.length < 4) {
                    msg = 'Code not long enough';
                }
                break;
            case 'end': case 'start':
                if (new Date(value).toString === 'Invalid Date') {
                    //date valid
                    msg = 'Invalid date';
                } else if (id === 'end' && new Date().getTime() > new Date(value).getTime()) {
                    //End date before today
                    msg = 'End date must be after today';
                } else if (new Date(model.start).getTime() > new Date(model.end).getTime()) {
                    //End date before start
                    msg = id === 'start' ? 'Start must be before end' : 'End must be after start';
                }
                break;
            case 'type':
                //update required for discount
                validation = R.assocPath(['discount', 'required'], value !== 'None', validation);
                //Required limitBy if type is Flat
                validation = R.assocPath(['limitBy', 'required'], value === 'Flat', validation);
                break;
            case 'discount':
                if (value < 1) {
                    msg = 'Discount must be greater than 0';
                } else if (model.type === 'Percentage' && value > 99) {
                    msg = 'Discount must be less than 100';
                }
                break;
            case 'minLimit':
                if (value < 0) {
                    msg = 'Min use limit must not be negative';
                } else if (model.maxLimit !== '' && parseInt(model.maxLimit, 10) < parseInt(value, 10)) {
                    msg = 'Min use limit must be less than Max use limit';
                }
                break;
            case 'maxLimit':
                if (value === '') {
                    //validation = R.assocPath([id, 'valid'], true, validation);
                } else if (value < 1) {
                    msg = 'Max use limit must be a minimum of 1';
                } else if (parseInt(value, 10) < parseInt(model.minLimit, 10)) {
                    msg = 'Max use limit must be greater than Min use limit';
                }
                break;
            case 'requiredDomain':
            case 'forbidDomain':
                if (value.length < 6) {
                    msg = 'Domain should be longer than 6 characters including a .com(.org, .eu, etc)';
                }
                break;
            case 'comment':
                if (value.length < 4) {
                    msg = 'Please enter a longer comment';
                }
                break;
            case 'what':
                validation = R.assocPath(['limitBy', 'required'], value !== 'Course Only', validation);
                break;
            //case 'giveaway': break;
            //case 'limitBy': break;
            //case 'forceTier': break;
            //case 'compReason': break;
            default:
                break;
        }
    }
    return R.assocPath([id, 'valid'], R.isNil(msg), R.assocPath([id, 'msg'], msg, validation));
};

//This can not be an arrow function... https://stackoverflow.com/questions/33308121/can-you-bind-arrow-functions
export const Validate = function ({ currentTarget }) {
    const { id, value } = currentTarget;

    this.setState({ validation: getValidation(id, value, this.state) });
};

//This can not be an arrow function... https://stackoverflow.com/questions/33308121/can-you-bind-arrow-functions
export const OnSubmit = function (fields) {
    let { validation } = this.state;
    const { model } = this.state;

    R.forEach((id) => {
        validation = getValidation(id, this.state.model[id], { validation, model });
    }, fields);

    this.setState({ validation });

    const invalid = R.pickBy((value) => value.valid === false, validation);

    if (R.keys(invalid).length) {
        this.props.notificationMessage({
            type: 'danger',
            message: 'Please correct validation erros before continuing',
        });
        window.scrollTo(0, 0);
    } else {
        this.props.upsertModel(this.state.model);
    }
};
