const hexToRGB = (hex) => {
  hex = parseInt(hex.slice(1), 16)
  const r = hex >> 16
  const g = hex >> 8 & 0xFF
  const b = hex & 0xFF
  return `rgb(${r},${g},${b})`
}

export default hexToRGB
