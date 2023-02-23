import buffer from 'node:buffer'
(globalThis).Blob = buffer.Blob // Ensure blob is resolved (tinybuild mistake)