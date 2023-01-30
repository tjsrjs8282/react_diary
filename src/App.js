import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";
import { useReducer } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    default:
      return state;
  }
  return newState;
};

function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const [data, dispatch] = useReducer(reducer, []);
  return (
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
  );
}

export default App;
