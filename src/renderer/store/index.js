// import persistState from 'redux-localstorage';
import { duck } from './util';
import * as ui from './ui';
import * as session from './session';
import * as rule from './rule';

export default duck({ui, session, rule});
