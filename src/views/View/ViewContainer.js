import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import { fetchModelItems } from 'src/actions/model-action-creators';

const mapStateToProps = ({ modelReducer }) => ({
    modelReducer,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        fetchModelItems,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(View);
