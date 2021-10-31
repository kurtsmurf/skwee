// @ts-check

const audioContext = new AudioContext()
const analyser = audioContext.createAnalyser()
const target = document.querySelector("[data-mode]")

const main = async () => {
  await navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(stream => audioContext.createMediaStreamSource(stream))
    .then(streamSource => streamSource.connect(analyser))
    
    audioContext.resume()

  const numSamples = 128
  analyser.fftSize = numSamples

  let samplesHolder = new Float32Array(numSamples)

  const callback = () => {
    analyser.getFloatTimeDomainData(samplesHolder)
    const target = document.querySelector("[data-target]")
    target.setAttribute("d", toPath(samplesHolder))
    requestAnimationFrame(callback)
  }

  requestAnimationFrame(callback)
}

const move = (acc, { time, amplitude }) =>
  acc + `M ${time}, ${(amplitude + 0.5) * 100} `

const lineTo = (acc, { time, amplitude }) =>
  acc + `L ${time}, ${(amplitude + 0.5) * 100} `

const toPath = (floats) => {
  const [first, ...rest] = floats

  let path = move("", { time: 0, amplitude: first })

  rest.forEach((float, index) => {
    path = lineTo(path, { time: index, amplitude: float})
  })

  return path
}

main()

