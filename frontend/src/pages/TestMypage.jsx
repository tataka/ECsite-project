import React from "react";
function Mypage({ user }) {
  if (!user) return <div>ログインしてください</div>;

  return (
    <div>
      <h2>マイページ</h2>
      <p>名前: {user.name}</p>
      <p>フリガナ: {user.furigana}</p>
      <p>メール: {user.email}</p>
      <p>郵便番号: {user.postal_code}</p>
      <p>住所: {user.address}</p>
      <p>電話番号: {user.phone_number}</p>
      <p>生年月日: {user.birthdate}</p>
      <p>性別: {user.gender}</p>
    </div>
  );
}

export default Mypage;
