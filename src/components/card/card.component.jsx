import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardModal from '../card-modal/card-modal.component';
import '../card/card.styles.css';
import {storage} from '../firebase/firebase.utils';
import { useState, useEffect } from 'react';

const Card = ({name, limits, price_per_metre_squared, images, ...otherProps }) => {
    {/* calculate minimum price and store in const*/} 
    const minimumPrice = (limits.width.min * limits.drop.min * price_per_metre_squared/10000).toFixed(2);

    let [imageUrl, setImageUrl] = useState(0);
    useEffect(() => {
    let storageRefMain = storage.ref(`images/main/${images.texture_name}.jpg`)
      storageRefMain.getDownloadURL().then(function(url){
        imageUrl = url;
        setImageUrl(imageUrl);
      }, function(error){
        console.log(error)
      })
    }, [imageUrl])


    return(
            <div className='card'>
                <img alt={name} src={imageUrl} />
                <p className="title font-weight-bold">{name}</p>
                <p className="minimum-price">From £{minimumPrice}</p>              
                <CardModal  name={name} limits={limits}images={images}price_per_metre_squared={price_per_metre_squared}{...otherProps}/>
                
            </div>
    )
}

export default Card;