# First react

## First App

### zzu.li/m43b_react

### 이론보다 우선 시작

```jsx
function transform(offset) {
  const cos = Math.cos(offset);
  const sin = Math.sin(offset);
  return { transform: `matrix3d(${sin}, ${-cos}, ${sin}, 0, ${-cos}, ${sin}, 0, 0, 0, ${cos}, ${cos}, ${sin}, 0, 0, 0, 1)` };
}

class App extends React.Component {
  state = { style1: {}, style2: {} };

	onMouseMove = (event) => {
    this.setState({
      style1: transform(-event.clientX / event.clientY),
      style2: transform(event.clientX / event.clientY),
    })
	}
	
  render () {
    return (
    	<div onMouseMove={this.onMouseMove}>
      	<div className="panel" style={this.state.style1} />
        <div className="panel" style={this.state.style2} />
      </div>
    );
	}
}

ReactDOM.render(
	<App />,
  document.querySelector('#root')
)
```

```html
<div id="root"></div>
```

```css
div {
  height: 100vh;
  width: 100vw;
}

.panel {
  position: absolute;
  box-shadow: 0 0 50ox grey;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="28" height="49" viewBox="0 0 28 49"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="hexagons" fill="%239C92AC" fill-opacity="0.4" fill-rule="nonzero"%3E%3Cpath d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
}
```



## 중요한 질문

* React 가 뭐죠?
  * **JS Library**
  * React 의 궁극적인 목적은 콘텐츠(HTML) 을 사용자에게 보여주고, 사용자와의 상호작용을 처리하기 위함. (버튼, 인풋, 드래그)
* Redux 는 왜 쓰지 않았나요?
  * React 는 혼자서도 잘해! 3.x 리액트 혼자서도 잘하지!
  * ..만, 다른 여러 라이브러리/패키지/서버/DB 들과도 같이 잘한다. (좀더 쉽고 빠르게)
* Class 뭐야
  * ES6 Class, 컴포넌트를 만듬
  *  리액트 컴포넌트는 리액트의 가장 기초가 되는 조각. 엄청 많이 만들게 될 것이다ㅂ!
  * 그리고 컴포넌트는 결국 HTML 을 보여주기 위해 존재한다.
  * Function / Class 두가지를 사용하여 만들어 볼 예정
* HTML 닮은 저건 뭐지?
  * JSX
  * html 처럼 사용하면서 js 코드에 작성가능. 
* 마우스가 움직이는데 왜 화면이..?
  * 이벤트 핸들러!
  * 이벤트 핸들러는 사용자의 모든 상호작용을 추적한다.
* React & ReactDOM..?
  * React : 컴포넌트를 알고, 합친다. 리액트 앱은 결국 컴포넌트를 만들고, 합치는 작업을 한다.
  * ReactDOM : 컴포넌트를 DOM 에 보여주는 법을 안다. (React Native 는..?)

## NodeJS 설치



## React 프로젝트 생성

```sh
$ mkdir react
$ npm i -g create-react-app # npx create-react-app jsx (5.2 이상)
$ create-react-app jsx
$ cd jsx
```



## Why create-react-app?

1700 실화? 

webpack, babel, dev server..?

babel you know?

## Create React App structure

| Files/Dir                          | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| `src/`                             | 우리가 작성하는 모든 소스코드가 들어갈 곳          |
| `public/`                          | 이미지, `404.html`같은 static 파일들을 정리하는 곳 |
| `README.md`                        | 설명서                                             |
| `package.json`/`package-lock.json` |                                                    |
| `.gitignore`                       |                                                    |

## Start & Stop

```sh
$ cd jsx
$ npm start
```

## JS Module

```sh
$ rm -rf src/
$ mkdir src
$ touch index.js
```

`src/index.js`

```jsx
// React 와 ReactDOM 라이브러리 import
import React from 'react';
import ReactDOM from 'react-deom';

// React 컴포넌트 생성
 

// React 컴포넌트 화면에 띄우기
```

| ES6 Modules                      | CommonJS Modules                        |
| -------------------------------- | --------------------------------------- |
| `imort <name> from <ModuleName>` | `const <name> = require('<ModuleName')` |
| ES6 Imort 방법                   | 일반 JS Import 방법                     |
| dynamic Loading 가능             | Destructuring 으로 tree shaking 가능    |
| 순서대로(Synchronous) import     | 비동기 (asynchronous) import            |

## Functional Components 

컴포넌트를 생성할 예정이다. 컴포넌트란 무엇인가?

* 컴포넌트는
  * 함수나
  * 클래스로
* HMTL 을 생성하여 사용자에게 보여주며(JSX)
* 사용자의 피드백을 처리한다(Event Handler)

```jsx
// React 와 ReactDOM 라이브러리 import
import React from 'react';
import ReactDOM from 'react-deom';

// React 컴포넌트 생성
const App = () => {
  return <div>HappyHacking!</div>;
} 

// React 컴포넌트 화면에 띄우기
ReactDOM.render(
	<App />,
  document.querySelector('#root') // public/index.html
)
```