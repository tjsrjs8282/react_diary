import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";
import { createContext, useReducer, useRef } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targitId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 식단",
    date: 1675151604636,
  },
  {
    id: 2,
    emotion: 3,
    content: "오늘의 식단",
    date: 1675151604638,
  },
  {
    id: 3,
    emotion: 5,
    content: "오늘의 식단",
    date: 1675151604640,
  },
];

function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const [data, dispatch] = useReducer(reducer, [dummyData]);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        data: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader
          headText="App"
          leftChild={
            <MyButton text="버튼" onClick={() => alert("왼쪽 클릭")} type="" />
          }
          rightChild={
            <MyButton
              text="버튼"
              onClick={() => alert("오른쪽 클릭")}
              type=""
            />
          }
        />
        <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
        <MyButton text="버튼" onClick={() => alert("클릭")} type="positive" />
        <MyButton text="버튼" onClick={() => alert("클릭")} type="negative" />
        <MyButton text="버튼" onClick={() => alert("클릭")} type="" /> */}
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/edit" element={<Edit />}></Route>
              <Route path="/diary:id" element={<Diary />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
