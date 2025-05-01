import React from "react";
function Mypage({ user }) {
  if (!user) return <div>ログインしてください</div>;

  return (
    <>
      <main>
        <h2>マイページ</h2>
        <p>名前: {user.name}</p>
        <p>フリガナ: {user.furigana}</p>
        <p>メール: {user.email}</p>
        <p>郵便番号: {user.postal_code}</p>
        <p>住所: {user.address}</p>
        <p>電話番号: {user.phone_number}</p>
        <p>生年月日: {user.birthdate}</p>
        <p>性別: {user.gender}</p>
        <button id='change' onClick={() => window.location.href = '/editUser'}>
          会員情報の変更はこちら <i className="bi bi-box-arrow-up-right"></i>
        </button>
      </main>
    </>
  );
}

export default Mypage;
