import { createReducer } from 'redux-act'

import { CACHE, CHATS } from 'actions'
import { SlicePayload, TLAvatar } from 'helpers/reselector.h'


import { __, contains, has, into, isEmpty, map, merge,
  mergeWith, pipe, pluck, reject, repeat, values, zipObj } from 'ramda'

const { LOAD_SLICE, GET_DIALOGS } = CHATS
const { LOAD, DONE } = CACHE

export type Status = 'idle' | 'queue' | 'download' | 'cached'
export type Store = { [key: number]: Status }
type Avatars = { [key: number]: TLAvatar }

const getPhotoIds = pipe<Avatars, TLAvatar[], number[]>(values, pluck('photo_small'))

const updater = (store: Store, payload: SlicePayload): Store => {
  const data = getPhotoIds(payload.entities.avatars)
  const isPhoto = (id: number) => contains(id, data)
  const filesIds = payload.result.fileLocations

  // TODO: don't use placeholder (or wait for better types)
  // tslint:disable-next-line
  const inStore: (s: number) => boolean = has(__, store) as any;

  const onlyNew = reject(inStore, filesIds)

  // TODO: what to do with this check?
  const remap = (id: number): [number, Status] => true
    ? [ id, 'queue' ]
    : [ id, 'idle' ]

  if (isEmpty(onlyNew))
    return store
  const setStatus = pipe(
      into<number, Array<[number, Status]>, Store>(store, map(remap)),
      merge(store),
    )
  return setStatus(onlyNew)
}

const fillDownload = repeat<Status>('download')
const fillCached = repeat<Status>('cached')

const loadMerge = (a: Status, b: Status) => a === 'cached'
  ? a
  : b

const onLoad = (store: Store, payload: number[]): Store =>
  mergeWith(loadMerge,
    store,
    zipObj(payload, fillDownload(payload.length)))

const onDone = (store: Store, payload: number[]): Store =>
  mergeWith(loadMerge,
    store,
    zipObj(payload, fillCached(payload.length)))

const reducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
  [LOAD]: onLoad,
  [DONE]: onDone,
}, {})

export default reducer
