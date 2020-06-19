import * as countersActions from './countersActions';
import * as uiActions from './uiActions';
import * as statisticsActions from './statisticsActions';

const ActionCreators = Object.assign({}, countersActions, uiActions, statisticsActions);

export default ActionCreators;
