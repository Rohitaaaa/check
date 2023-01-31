import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const capitalize = (word) => {
        return word.substring(0, 1).toUpperCase() + word.substring(1)
    }



    const updateNews = async () => {
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `News Monkey - ${capitalize(props.category)}`
        updateNews()
        // eslint-disable-next-line
    }, [])

    const toDate = (date) => {
        const day1 = new Date().getTime();
        const day2 = new Date(date).getTime();
        var diff = day2 - day1
        var daydiff = diff / (1000 * 60 * 60 * 24);
        var absdatediff = Math.abs(Math.ceil(daydiff))
        if (absdatediff === 0) {
            return "Today"
        } else if (absdatediff === 1) {
            return "Yesterday"
        } else {
            return absdatediff + " days ago"
        }
    }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <div className='container py-5'>
            <h2 className='text-center pt-5' style={{ marginBottom: "40px" }}>News Monkey - Top {capitalize(props.category)} Headlines </h2>
            {articles.length > 0 ? (
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length <= totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {articles.map((element, index) => {
                                return <div className="col-md-4 mb-5" key={index}><NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} newsURL={element.url} imageURL={element.urlToImage}
                                    source={element.source.name} date={toDate(element.publishedAt)} /></div>
                            })
                            }
                        </div>
                    </div>
                </InfiniteScroll>
            ) : (
                <Spinner />
            )}

        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News