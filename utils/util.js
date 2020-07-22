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
  request,
  formatMovies
}