//Home.jsx
import { Link } from 'react-router-dom';
import React from "react";

import Category from '../components/common/Category';

import storeImage1 from '../assets/img/image6.jpg'
import storeImage2 from '../assets/img/image3.jpg'
import storeImage3 from '../assets/img/image1.jpeg'

function Home() {
    return (
        <>
            <Category />
            <main id='home'>
                {/* mainコンテンツ内容 */}
                <div className="divHomeImg"><Link to="/products?gender=WOMEN&category=tops"><h4>WOMEN tops</h4><img src={storeImage2} alt="" /></Link></div>
                <div className="divHomeImg"><Link to="/products?gender=MEN&category=tops"><h4>MEN tops</h4><img src={storeImage3} alt="" /></Link></div>
                <div className="divHomeImg"><Link to="/products?gender=KIDS&category=tops"><h4>KIDS tops</h4><img src={storeImage1} alt="" /></Link></div>
            </main>
        </>
    );
};

export default Home;