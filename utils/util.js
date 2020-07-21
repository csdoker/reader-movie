function convertToStars(stars) {
  const num = stars.toString().substring(0, 1)
  const arr = []
  for (let index = 0; index <= 5; index++) {
    if (index <= num) {
      arr.push(1)
    } else {
      arr.push(0)
    }
  }
  return arr
}

module.exports = {
  convertToStars
}