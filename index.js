// @ts-check

const audioContext = new AudioContext()
const analyser = audioContext.createAnalyser()

const draw = samples => {
  // samples.array.forEach(element => {
    
  // });
}

const main = async () => {
  const streamSource = await navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(stream => audioContext.createMediaStreamSource(stream))

  streamSource.connect(analyser)
  audioContext.resume()

  const numSamples = 32
  analyser.fftSize = numSamples

  let samplesHolder = new Float32Array(numSamples)

  const callback = () => {
    analyser.getFloatTimeDomainData(samplesHolder)
    console.log(samplesHolder)



    // draw(samplesHolder)

    // requestAnimationFrame(callback)
  }

  requestAnimationFrame(callback)
}

main()

