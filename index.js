// @ts-check

const audioContext = new AudioContext()

const loadFile = fileName => fetch(fileName)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))

const main = async () => {
  const audioBuffer = await loadFile('gtr_ping_hi_1.wav');

  console.log(audioBuffer)

  
}

main()