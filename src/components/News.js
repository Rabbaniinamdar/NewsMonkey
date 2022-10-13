import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner'
import PropTypes from 'prop-types'

const News=(props)=> {
    const pageSize=9
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(false)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    let capitalize = (mesg)=>{
        return mesg.charAt(0).toUpperCase() + mesg.slice(1);
    }
    document.title = capitalize(props.category) + "-NewsMonkey"
 
    const updateNews=async()=> {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=dc08ecb976b1427bae9ec6e132910ed7&page=${page}&pageSize=${pageSize}`;
        console.log(url)
        props.setProgress(20);
        setloading(true)
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)

        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line                     
    },[])
    
    const handlePrivousClick =  () => {

        setpage(page-1)
        updateNews();
    }
    const handleNextClick =  () => {
        setpage(page+1)
        updateNews();
    }
    
    return (
        <div className="container my-5" style={{position:'absolute',top:'50px'}}>
            <h1 className='text-center mb-4'>NewsMonkey-Top Headlines</h1>
            {loading && <Spinner />}
            <div className="row" >
                {articles.map((elem) => {
                    return <div className="col-md-4 d-flex justify-content-center" key={elem.url}>
                        <NewsItem title={elem.title} description={elem.description} imageUrl={elem.urlToImage} newsUrl={elem.url}
                            date={elem.publishedAt} author={elem.author} source={elem.source.name} />
                    </div>

                })}
            </div>
            <div className='container d-flex justify-content-between'>
                <button disabled={page <= 1} type='button'
                    className='btn btn-dark' onClick={handlePrivousClick}>&larr;Previous</button>
                <button type='button' disabled={page + 1 > Math.ceil(totalResults / pageSize)}
                    className='btn btn-dark' onClick={handleNextClick}>Next&rarr;</button>
            </div>
        </div>
    )
            
}

 News.defaultProps = {
    category: "genral",
}
News.propTypes = {
    category: PropTypes.string,
}
export default News



