import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  console.log(id);

  return (
    <div>
      <h1>Edit</h1>
      <p>수정 페이지 입니다</p>
    </div>
  );
};

export default Edit;
