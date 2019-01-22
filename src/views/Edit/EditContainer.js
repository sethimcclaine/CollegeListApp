import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Edit from './Edit';
import {
    upsertModel,
    fetchModelDetails,
} from 'src/actions/model-action-creators';
import { notificationMessage } from 'src/actions/app-action-creators';

const mapStateToProps = ({ modelReducer }) =>
    ({
        modelReducer,
    });

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        upsertModel,
        fetchModelDetails,
        notificationMessage,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
