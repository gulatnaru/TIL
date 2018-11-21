// 1. React 와 ReactDOM 라이브러리 import
import React from 'react';
import ReactDOM from 'react-dom';

// 2. React 컴포넌트를 생성 1) 함수 / 2) 클래스

const App = () => {
  const buttonText = { happy: 'hacking' };
  function getTime() {
    return (new Date()).toLocaleTimeString();
  }
  return (
    <div>
      <h3>{getTime()}</h3>
      <label htmlFor="name" className="name_label">Enter name: </label>
      <input type="text" id="name" />
      <button style={{ backgroundColor: 'blue', color: 'white', border: 'solid 1px black' }}>
        {buttonText.happy}
      </button>
    </div>
  )
}

// 3. 화면에 HTML 을 띄우기
ReactDOM.render(
  <App />,
  document.querySelector('#root')
)