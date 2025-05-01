import React from "react";
import Category from '../components/common/Category';
import storeImage1 from '../assets/img/image6.jpg'
import storeImage2 from '../assets/img/image3.jpg'
import storeImage3 from '../assets/img/image1.jpeg'

function Home() {
    return (
        <main>
            {/* mainコンテンツ内容 */}
            <Category />
            <div className="divHomeImg"><img src={storeImage2} alt="" /></div>
            <div className="divHomeImg"><img src={storeImage3} alt="" /></div>
            <div className="divHomeImg"><img src={storeImage1} alt="" /></div>
        </main>
    );
};

export default Home;