import { Dispatch } from 'redux';
// NOTE This type coming from redux-thunk module, not from redux itself

import { IAuth } from './modules/auth';
import { IStoreHistories } from './modules/histories';
import { IStoreDialogs } from './modules/dialogs';
import { IStoreUsers } from './modules/users';
import { IStorePeers } from './modules/peers';
import { IStoreChats } from './modules/chats';
import { IStoreLoadings } from './modules/loadings';
import { IStoreSelected } from './modules/selected';
import { StatusStore } from './modules/files';

import { IStoreList } from 'helpers/state';
import { IMtpFileLocation } from 'redux/mtproto';
export interface IStore {
  authKey: any;
  auth: IAuth;
  currentUser: any;
  messages: any;
  histories: IStoreHistories;
  dialogs: IStoreDialogs;
  users: IStoreUsers;
  peers: IStorePeers;
  chats: IStoreChats;
  loadings: IStoreLoadings;
  selected: IStoreSelected;
  files: {
    status: StatusStore;
    locations: IStoreList<IMtpFileLocation>;
  };
};

export type IThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState?: () => S, extraArgument?: E) => R;

export type IAsyncAction<R> = IThunkAction<R, IStore, undefined>;

export type IDispatch = Dispatch<IStore>;

export type IIds = number[];

export type IReducer<S, P> = (state: S, payload: P) => S;

export type IReducerIds<P> = IReducer<IIds, P>;
