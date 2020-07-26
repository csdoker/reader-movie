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

function convertToCastString(casts) {
  let castsJoin = ''
  casts.forEach(cast => {
    castsJoin = castsJoin + cast.name + ' / '
  })
  return castsJoin.substring(0, castsJoin.length - 2)
}

function convertToCastInfos(casts) {
  const castsArr = []
  for (const key in casts) {
    if (casts.hasOwnProperty(key)) {
      const cast = {
        img: casts[key].avatars.large,
        name: casts[key].name
      }
      castsArr.push(cast)
    }
  }
  return castsArr
}

function request(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'GET',
      // header: {
      //   'Content-Type': 'application/xml'
      // },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

function formatMovies(subjects, key, category) {
  const movies = []
  subjects.forEach(subject => {
    let title = subject.title
    title = title.length >= 6 ? `${title.substring(0, 6)}...` : title
    const stars = convertToStars(subject.rating.stars)
    movies.push({
      stars,
      title,
      average: subject.rating.average,
      coverageUrl: subject.images.large,
      movieId: subject.id
    })
  })
  return movies
}

module.exports = {
  convertToStars,
  convertToCastString,
  convertToCastInfos,
  request,
  formatMovies
}