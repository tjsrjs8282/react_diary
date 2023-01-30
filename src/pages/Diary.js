import React from "react";
import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Diary</h1>
      <p>일기 상세페이지 입니다</p>
    </div>
  );
};

export default Diary;
