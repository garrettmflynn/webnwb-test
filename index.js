import './polyfill.js' // This is required since the bundle assumes there is a global Blob object
import nwb from 'webnwb'

const dir = 'dir'
const filename = 'nwbFile.nwb'

const io = new nwb.NWBHDF5IO()
if (dir) await io.initFS(dir) // set the filesystem to work with (if any)

const newFile = new nwb.NWBFile({
    session_description: 'Just a test.',
    identifier: 'WebNWB_Test_' + Math.random().toString(36).substring(7),
    session_start_time: Date.now(),
    experimenter: 'Garrett Flynn',
    institution: 'Brains@Play'
})

await io.save(newFile, filename)

const file = await io.load(filename)

console.log('file', file.nwb_version, file.identifier,file.session_description, '\n\n')

const remoteFile = 'https://raw.githubusercontent.com/OpenSourceBrain/NWBShowcase/master/FergusonEtAl2015/FergusonEtAl2015.nwb'
const remote = await io.load(remoteFile)
console.log('remote', remote.nwb_version, remote.identifier, remote.session_description, '\n\n')


const localFile = 'localFerguson.nwb'
const local = await io.load(localFile) // BUG: This is loading an empty file for some reason...
if (local.identifier === remote.identifier) console.log('local', local.nwb_version, local.identifier, local.session_description)
else console.error('\nWEBNWB ERROR: Failed to load local file properly...', local.identifier)


// // NOTE: This currently errors with the latest version of WebNWB because of a worker issue
// const streamed = await io.load(remoteFile, {useStreaming: true})
// console.log('stremed', await streamed.nwb_version)