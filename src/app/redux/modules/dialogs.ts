import { createReducer } from 'redux-act';

import { CHATS } from 'actions';
import { IStoreList } from 'helpers/state';
import { IMtpDialog } from 'redux/mtproto';

import { modelDefaults, updateStoreMap } from 'helpers/reselector';
import { Slice } from 'helpers/reselector.h';

const { GET_DIALOGS } = CHATS;

export type IStoreDialogs = IStoreList<IMtpDialog>;


const updater = updateStoreMap<Slice, 'dialogs'>('dialogs');

const newReducer = createReducer({
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default newReducer;
