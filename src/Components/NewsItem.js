import React from 'react'
import defaultImg from './default.jpg';
const NewsItem = (props) => {
    let { title, description, imageURL, newsURL, source, date} = props
    return (
        <div>
            <div className="card">
                <div className='d-flex justify-content-flex-end position-absolute' style={{ right: '0' }}>
                    <span className="badge badge-danger"><strong>{source}</strong></span>
                </div>
                <a href={newsURL} target='_blank' rel="noopener noreferrer"><img className="card-img-top" 
                src={imageURL ? imageURL : defaultImg}
                onError={(e)=>{
                    e.target.src = defaultImg
                }}
                alt="" /></a>
                <div className="card-body">
                    <h5 className="card-title"><a href={newsURL} target='_blank' rel="noopener noreferrer" className='text-dark'>{title}</a></h5>
                    <p className="card-text">{description}</p>
                    <div className="d-flex justify-content-between">
                        <small className='font-italic font-weight-bold' >{date}</small>
                        {/* <a href={newsURL} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewsItem
