import React, { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  useEffect(() => {
    const fistDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0
    ).getTime();

    setData(diaryList.filter((it) => fistDay <= it.date && it.date <= lastDay));
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth}></MyButton>}
        rightChild={<MyButton text={">"} onClick={increaseMonth}></MyButton>}
      />
    </div>
  );
};

export default Home;
