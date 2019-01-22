import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upsertModel } from 'src/actions/model-action-creators';
import { notificationMessage } from 'src/actions/app-action-creators';
import Add from './Add';

const mapStateToProps = ({ modelReducer }) =>
    ({
        modelReducer,
    });

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        upsertModel,
        notificationMessage,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Add);
