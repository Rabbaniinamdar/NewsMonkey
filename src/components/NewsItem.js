import React from 'react'

const NewsItem=(props)=> {
       const mystyle={position:'absolute', left:'85%',zIndex:'1' ,width:'35%'}
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className="my-3">
                <div className="card" >
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={mystyle}>
                    {source}</span> 
                <img src={imageUrl ? imageUrl : "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/01/30/Pictures/_edc218c4-2477-11e9-a405-f80f48f5557a.png"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-primary">{title}  </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-success">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div >
        )
}

export default NewsItem
