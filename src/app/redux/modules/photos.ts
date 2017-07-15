import { createReducer } from 'redux-act';

import { CHATS } from 'actions';
import { updateStoreMap, modelDefaults } from 'helpers/reselector';
import { Slice } from 'helpers/reselector.h';

const { LOAD_SLICE, GET_DIALOGS } = CHATS;

const updater = updateStoreMap<Slice, 'photos'>('photos');

const reducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default reducer;
