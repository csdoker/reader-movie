const util = require('../../../utils/util.js')

class Movie {
  constructor(url) {
    this.url = url
  }

  getMovieDetail (getData) {
    util.request(this.url).then((res) => {
      const director = {
        avatar: res.data.directors[0].avatars.large,
        name: res.data.directors[0].name,
        id: res.data.directors[0].id
      }
      const movie = {
        movieImg: res.data.images.large,
        country: res.data.countries[0],
        title: res.data.title,
        originalTitle: res.data.original_title,
        wishCount: res.data.wish_count,
        commentCount: res.data.comments_count,
        year: res.data.year,
        generes: res.data.genres.join('、'),
        stars: util.convertToStars(res.data.rating.stars),
        score: res.data.rating.average,
        director,
        casts: util.convertToCastString(res.data.casts),
        castsInfo: util.convertToCastInfos(res.data.casts),
        summary: res.data.summary
      }
      getData(movie)
    })
  }
}

export { Movie }