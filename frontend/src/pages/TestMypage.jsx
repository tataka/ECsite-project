import React from "react";
function Mypage({ user }) {
  if (!user) return <div>ログインしてください</div>;
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <main id="myPage">
      <h2>マイページ</h2>
      <p>名前:</p><p>{user.name}</p>
      <p>ローマ字:</p><p>{user.furigana}</p>
      <p>メール:</p><p>{user.email}</p>
      <p>郵便番号:</p><p>{user.postal_code}</p>
      <p>住所:</p><p>{user.address}</p>
      <p>電話番号:</p><p>{user.phone_number}</p>
      <p>生年月日:</p><p>{formatDate(user.birthdate)}</p>
      <p>性別:</p><p>{user.gender}</p>
      <button id='change' onClick={() => window.location.href = '/editUser'}>
        会員情報の変更はこちら <i className="bi bi-box-arrow-up-right"></i>
      </button>
    </main>
  );
}

export default Mypage;
