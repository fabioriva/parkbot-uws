require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const util = require('util')

const DATABASE = 'wallstreet'

const ALARMS = [
  { id: 1, i18nKey: 'al-sil-01', query: {} },
  { id: 2, i18nKey: 'al-sil-02', query: {} },
  { id: 3, i18nKey: 'al-sil-03', query: {} },
  { id: 4, i18nKey: 'al-sil-04', query: {} },
  { id: 5, i18nKey: 'al-sil-05', query: {} },
  { id: 6, i18nKey: 'al-sil-06', query: {} },
  { id: 7, i18nKey: 'al-sil-07', query: {} },
  { id: 8, i18nKey: 'al-sil-08', query: {} },
  { id: 9, i18nKey: 'al-sil-09', query: {} },
  { id: 10, i18nKey: 'al-sil-10', query: {} },
  { id: 11, i18nKey: 'al-sil-11', query: {} },
  { id: 12, i18nKey: 'al-sil-12', query: {} },
  { id: 13, i18nKey: 'al-sil-13', query: {} },
  { id: 14, i18nKey: 'al-sil-14', query: {} },
  { id: 15, i18nKey: 'al-sil-15', query: {} },
  { id: 16, i18nKey: 'al-sil-16', query: {} },
  { id: 17, i18nKey: 'al-v-to', query: {} },
  { id: 18, i18nKey: 'al-v-fdbk', query: {} },
  { id: 19, i18nKey: 'al-lv', query: {} },
  { id: 20, i18nKey: 'al-v-lck-to', query: {} },
  { id: 21, i18nKey: 'al-v-lck-fc', query: {} },
  { id: 22, i18nKey: 'al-r-to', query: {} },
  { id: 23, i18nKey: 'al-enr', query: {} },
  { id: 24, i18nKey: 'al-flap-to', query: {} },
  { id: 25, i18nKey: 'al-flap-fc', query: {} },
  { id: 26, i18nKey: 'al-spe-to', query: {} },
  { id: 27, i18nKey: 'al-spe-fc', query: {} },
  { id: 28, i18nKey: 'al-spa-to', query: {} },
  { id: 29, i18nKey: 'al-spa-fc', query: {} },
  { id: 30, i18nKey: '', query: {} },
  { id: 31, i18nKey: '', query: {} },
  { id: 32, i18nKey: '', query: {} },
  { id: 33, i18nKey: 'al-pn', query: {} },
  { id: 34, i18nKey: 'al-pn', query: {} },
  { id: 35, i18nKey: 'al-pn', query: {} },
  { id: 36, i18nKey: 'al-pn', query: {} },
  { id: 37, i18nKey: 'al-pn', query: {} },
  { id: 38, i18nKey: 'al-pn', query: {} },
  { id: 39, i18nKey: '', query: {} },
  { id: 40, i18nKey: '', query: {} },
  { id: 41, i18nKey: 'al-fs', query: {} },
  { id: 42, i18nKey: 'al-fs', query: {} },
  { id: 43, i18nKey: 'al-fs', query: {} },
  { id: 44, i18nKey: 'al-fs', query: {} },
  { id: 45, i18nKey: 'al-fs', query: {} },
  { id: 46, i18nKey: 'al-fs', query: {} },
  { id: 47, i18nKey: 'al-fs', query: {} },
  { id: 48, i18nKey: '', query: {} },
  { id: 49, i18nKey: 'al-th', query: {} },
  { id: 50, i18nKey: 'al-th', query: {} },
  { id: 51, i18nKey: 'al-th', query: {} },
  { id: 52, i18nKey: 'al-th', query: {} },
  { id: 53, i18nKey: 'al-iv', query: {} },
  { id: 54, i18nKey: 'al-th', query: {} },
  { id: 55, i18nKey: 'al-iv', query: {} },
  { id: 56, i18nKey: 'al-th', query: {} },
  { id: 57, i18nKey: 'al-th', query: {} },
  { id: 58, i18nKey: 'al-th', query: {} },
  { id: 59, i18nKey: 'al-th', query: {} },
  { id: 60, i18nKey: 'al-th', query: {} },
  { id: 61, i18nKey: 'al-th', query: {} },
  { id: 62, i18nKey: 'al-th', query: {} },
  { id: 63, i18nKey: '', query: {} },
  { id: 64, i18nKey: '', query: {} },
  { id: 65, i18nKey: 'al-sil-01', query: {} },
  { id: 66, i18nKey: 'al-sil-02', query: {} },
  { id: 67, i18nKey: 'al-sil-03', query: {} },
  { id: 68, i18nKey: 'al-sil-04', query: {} },
  { id: 69, i18nKey: 'al-sil-05', query: {} },
  { id: 70, i18nKey: 'al-sil-06', query: {} },
  { id: 71, i18nKey: 'al-sil-07', query: {} },
  { id: 72, i18nKey: 'al-sil-08', query: {} },
  { id: 73, i18nKey: 'al-sil-09', query: {} },
  { id: 74, i18nKey: 'al-sil-10', query: {} },
  { id: 75, i18nKey: 'al-sil-11', query: {} },
  { id: 76, i18nKey: 'al-sil-12', query: {} },
  { id: 77, i18nKey: 'al-sil-13', query: {} },
  { id: 78, i18nKey: 'al-sil-14', query: {} },
  { id: 79, i18nKey: 'al-sil-15', query: {} },
  { id: 80, i18nKey: 'al-sil-16', query: {} },
  { id: 81, i18nKey: 'al-v-to', query: {} },
  { id: 82, i18nKey: 'al-v-fdbk', query: {} },
  { id: 83, i18nKey: 'al-lv', query: {} },
  { id: 84, i18nKey: 'al-lv-diff', query: {} },
  { id: 85, i18nKey: 'al-v-lck-to', query: {} },
  { id: 86, i18nKey: 'al-v-lck-fc', query: {} },
  { id: 87, i18nKey: 'al-h-to', query: {} },
  { id: 88, i18nKey: 'al-lh', query: {} },
  { id: 89, i18nKey: 'al-lh-diff', query: {} },
  { id: 90, i18nKey: '', query: {} },
  { id: 91, i18nKey: '', query: {} },
  { id: 92, i18nKey: '', query: {} },
  { id: 93, i18nKey: '', query: {} },
  { id: 94, i18nKey: '', query: {} },
  { id: 95, i18nKey: '', query: {} },
  { id: 96, i18nKey: '', query: {} },
  { id: 97, i18nKey: 'al-pn', query: {} },
  { id: 98, i18nKey: 'al-pn', query: {} },
  { id: 99, i18nKey: 'al-pn', query: {} },
  { id: 100, i18nKey: 'al-pn', query: {} },
  { id: 101, i18nKey: 'al-pn', query: {} },
  { id: 102, i18nKey: 'al-pn', query: {} },
  { id: 103, i18nKey: 'al-pn', query: {} },
  { id: 104, i18nKey: '', query: {} },
  { id: 105, i18nKey: 'al-fs', query: {} },
  { id: 106, i18nKey: 'al-fs', query: {} },
  { id: 107, i18nKey: 'al-fs', query: {} },
  { id: 108, i18nKey: 'al-fs', query: {} },
  { id: 109, i18nKey: 'al-fs', query: {} },
  { id: 110, i18nKey: 'al-fs', query: {} },
  { id: 111, i18nKey: 'al-fs', query: {} },
  { id: 112, i18nKey: 'al-fs', query: {} },
  { id: 113, i18nKey: 'al-th', query: {} },
  { id: 114, i18nKey: 'al-iv', query: {} },
  { id: 115, i18nKey: 'al-th', query: {} },
  { id: 116, i18nKey: 'al-th', query: {} },
  { id: 117, i18nKey: 'al-th', query: {} },
  { id: 118, i18nKey: 'al-th', query: {} },
  { id: 119, i18nKey: 'al-th', query: {} },
  { id: 120, i18nKey: 'al-th', query: {} },
  { id: 121, i18nKey: 'al-iv', query: {} },
  { id: 122, i18nKey: 'al-th', query: {} },
  { id: 123, i18nKey: 'al-th', query: {} },
  { id: 124, i18nKey: 'al-th', query: {} },
  { id: 125, i18nKey: '', query: {} },
  { id: 126, i18nKey: '', query: {} },
  { id: 127, i18nKey: '', query: {} },
  { id: 128, i18nKey: '', query: {} }
]

const DEVICES = [
  { id: 1, i18nKey: 'EVT1' },
  { id: 2, i18nKey: 'EVT2' },
  { id: 3, i18nKey: 'EVT3' },
  { id: 4, i18nKey: 'IVT4' },
  { id: 5, i18nKey: 'IVT5' },
  { id: 6, i18nKey: 'IVT6' }
]

const MODES = [
  { id: 0, i18nKey: 'mode-no' },
  { id: 1, i18nKey: 'mode-data-edit' },
  { id: 2, i18nKey: 'mode-data-read' },
  { id: 3, i18nKey: 'mode-eme-1' },
  { id: 4, i18nKey: 'mode-eme-2' },
  { id: 5, i18nKey: 'mode-no' },
  { id: 6, i18nKey: 'mode-step' },
  { id: 7, i18nKey: 'mode-preset' },
  { id: 8, i18nKey: 'mode-auto' }
]

const OPERATIONS = [
  { id: 0, i18nKey: 'op-no' },
  { id: 1, i18nKey: 'op-alarm-on' },
  { id: 2, i18nKey: 'op-alarm-off' },
  { id: 3, i18nKey: 'op-switch-mode' },
  { id: 4, i18nKey: 'op-change-pin' },
  { id: 5, i18nKey: 'op-stall-in' },
  { id: 6, i18nKey: 'op-stall-out' },
  { id: 7, i18nKey: 'op-shuffle-in' },
  { id: 8, i18nKey: 'op-shuffle-out' },
  { id: 9, i18nKey: 'op-stall-rsv' },
  { id: 10, i18nKey: 'op-req-exit' },
  { id: 11, i18nKey: 'op-req-entry' },
  { id: 12, i18nKey: 'op-no' },
  { id: 13, i18nKey: 'op-no' },
  { id: 14, i18nKey: 'op-no' },
  { id: 15, i18nKey: 'op-no' }
]

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const insertMany = util.promisify((db, collection, data, callback) => {
  db.collection(collection).insertMany(data, function (err, result) {
    if (err) callback(err)
    callback(null, result)
  })
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db(DATABASE)
    await insertMany(db, 'alarms', ALARMS)
    await insertMany(db, 'devices', DEVICES)
    await insertMany(db, 'modes', MODES)
    await insertMany(db, 'operations', OPERATIONS)
    await client.close()
    process.exit(1)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()
