// export action creators
import * as countersActions from './countersActions';
import * as uiActions from './uiActions';

const ActionCreators = Object.assign({}, countersActions, uiActions);

export default ActionCreators;
