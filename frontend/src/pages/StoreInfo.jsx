import React from 'react'

const StoreInfo = (addr,tel,time,bus,train,park) => {
    addr = "東京都";
    tel = "0210-828-828";
    time = "10:00-20:00";
    bus = "そこら辺のバス停";
    train = "隣町の駅";
    park = "タイムズ";

    return (
        <main className='storeInfoMain'>
            {/* mainコンテンツ内容 */}
            {/* この中にログイン入力画面と新規登録の画面を作成していく */}
            <div className='storeMapDiv'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3280.708880843681!2d135.52174062695315!3d34.68729619999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x6000e0d2ba19f027%3A0x430e3c2bcd818ac1!2z44CSNTQwLTAwMDIg5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65aSn6Ziq5Z-O77yR4oiS77yRIOWkp-mYquWfjuWkqeWuiOmWow!3m2!1d34.6872962!2d135.5258605!5e0!3m2!1sja!2sjp!4v1744201935934!5m2!1sja!2sjp" width="400" height="300" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='storeInfoDiv'>
                <ul>
                    <li>住所:{addr}</li>
                    <li>電話:{tel}</li>
                    <li>営業時間:{time}</li>
                    <li>バス:{bus}</li>
                    <li>電車:{train}</li>
                    <li>駐車情報:{park}</li>
                </ul>
            </div>
        </main>
    )
}

export default StoreInfo