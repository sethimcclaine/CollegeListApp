import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearNotifications } from 'src/actions/app-action-creators';
import DefaultLayout from './DefaultLayout';

const mapStateToProps = ({ appReducer }) =>
    ({
        appReducer,
    });

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        clearNotifications,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
