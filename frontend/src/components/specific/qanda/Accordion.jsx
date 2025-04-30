import React from 'react'

const Accordion = () => {
    return (
        <div id='div_qanda'>
            <details className="accordion">
                <summary className="accordion-header">Q: 注文内容の変更やキャンセルはできますか？</summary>
                <div className="accordion-content">
                    A: 注文後30分以内であれば、マイページから変更やキャンセルが可能です。それ以降の場合は、お手数ですがお問い合わせフォームまたはお電話にてご連絡ください。
                </div>
            </details>

            <details className="accordion">
                <summary className="accordion-header">セクション 2</summary>
                <div className="accordion-content">
                    ここにセクション2のコンテンツが入ります。
                </div>
            </details>

            <details className="accordion">
                <summary className="accordion-header">セクション 3</summary>
                <div className="accordion-content">
                    ここにセクション3のコンテンツが入ります。
                </div>
            </details>
        </div>


    );
};

export default Accordion;
