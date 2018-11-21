# Class Based Components & State

컴포넌트란 무엇인가?

* 컴포넌트는
  * *함수나* : 간단한 content 처리에 좋다!
  * **클래스로**
* HMTL 을 생성하여 사용자에게 보여주며(JSX)
* 사용자의 피드백을 처리한다(Event Handler)

| Class Components 장점                          | Means..                                         |
| ---------------------------------------------- | ----------------------------------------------- |
| (일반적으로) 코드 정리가 쉽다.                 | .                                               |
| `state` 시스템 사용이 가능하다.                | user 입력 데이터 처리가 쉽다                    |
| Event 의 생명주기(Lifecycle)를 이해할 수 있다. | App 이 처음 실행되었을 때 무언가를 하기 편하다. |



## App Overview

### 남반구 - 북반구 날씨 Checker

* 사용자의 위치가
  * 북반구일 때,
    * 10월 부터 3월까지는 춥고,
    * 4월부터 9월까지는 따뜻하다.
  * 남반구일 때,
    * 4월부터 9월까지는 춥고,
    * 10월부터 3월까지는 따뜻하다.

### Goal

1. 사용자의 물리적인 위치(location)를 찾는다.
2. 현재 날짜의 월(month)을 확인한다.
3. Location 과 month 를 바탕으로 텍스트와 스타일을 바꿔야한다.



## Scaffolding the App

```sh
$ pwd
/.../.../react
$ npx create-react-app season-checker
$ cd season-checker
$ rm -rf src
$ mkdir src
$ touch src/index.js
$ touch src/SeasonDisplay.js # Component
```

`public/index.html`

```html
...
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <!-- 추가 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
    ...
```

### 사용할 컴포넌트

* `<App />` : Location 과 month 를 판단하는 코드를 작성 => Props
  * `<SeasonDisplay />` : 다른 text/icons 를 props 기준으로 보여준다.

### 기본 코드 구성하기

`src/SeasonDisplay.js`

```jsx
import React from 'react';

const SeasonDisplay = props => {
  return (
    <div>
      Winter is Coming..
    </div>
  );
};

export default SeasonDisplay;
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

const App = () => {
  return (
    <div>
      <SeasonDisplay/>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

## 사용자 위치 가져오기

[Geolocation - 위치 가져오기](https://developer.mozilla.org/ko/docs/WebAPI/Using_geolocation#%ED%98%84%EC%9E%AC_%EC%9C%84%EC%B9%98_%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

const App = () => {
	window.navigator.geolocation.getCurrentPosition(
    position => console.log(position),
    error => console.error(error)
  );

  return (
    <div>
      <SeasonDisplay/>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

만약 문제가 있다면?

개발자도구 => `esc` => 아래의 3dots => sensor => Geolocation => [Any Location]

이제 `Latitude` 를 사용하여 사용자의 위도를 잡고 남/북반구를 결정하자.

### 사용자 위치정보 제공 거절 테스트하기

현재 한번 허용하면 계속 허용하게 된다. URL 왼쪽의 `!` 를 눌러 매번 묻게 바꾸고 거절해보자.

콘솔에 에러가 나오는걸 확인하면 된다!



## Async Operations & Class Based Components

현재 Geolocation 을 사용하여 위치정보를 받아오는 일은 비동기로 처리된다. 어떻게 비동기로 받아오는 정보를 사용해야할까? 현재 App 의 Flow 는 다음과 같다.

1. 브라우저에서 JS 파일 불러오기 시작
2. `<App />` 컴포넌트 생성
3. **Geolocation API 를 통해 위치정보 받기 시작...**
4. React App 이 JSX 를 return 하며, HTML 을 화면에 렌더
5. ...
6. **사용자 위치정보 GET!** 

기다리는 동안 이미 HTML 은 렌더되어버린다.. 이게 Functional Components 의 한계다

### Functiononal Components => Class Based Components

* **Class Based Components**
  * JS Class로 구성되면 마지막에 export 되는것도 Class (기존 OOP 의 Class 와는 다르지만..)
  * `React.Component` 를 상속(`extends`)받아야한다.
  * `render()` 메서드를 정의하며  JSX 를 함께 보내야 한다. (`render () {}` 는 function 정의 in Class )

`src/index.js`

```jsx
...
class App extends React.Component {
  render () {
    window.navigator.geolocation.getCurrentPosition(
      position => console.log(position),
      error => console.log(error)
    );

    return (
      <div>Winter is Coming..</div>
    )
  }
}
...
```

아직 비동기작업을 처리하지는 않지만, 준비는 끝났다. 이어서 State 에 대하여 본격적으로 알아보자.



## State (in Component)

State 에 대하여 알아보기전에 Good News 와 Bad News 가 있다.

* Good News : State 를 이해하고 나면, 정말 React 의 새로운 세상이 열린다. 엄청나게 재미있고 다양한 기능을 하는 App 을 만들수 있게 된다. 지금까지는 애피타이져였다.
* Bad News: 즈언통적으로 state 를 배우는게 어렵다..

#### Rules of state

* Class Based Components 에서만 사용 가능하다.
* `props` 와 `state` 가 헷갈릴 것이다 ( •́ ̯•̀  ) 
* `state` 는 그냥 JS object 일 뿐이다. component 와 관련된 data 를 담고있다.
* `state` 를 업데이트하면, 해당 `state` 와 관련있는 component *는 바로 다시 렌더링(`render()`)된다*.
* `state` 는 component 가 생성된 이후에 초기화(initialize)된다.
* `state` 는 **오직** `setState()` 함수를 사용해서만 업데이트 할 수있다.

### Initialize `state` through constructor

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  // JS 왈, constructor() 하라.
  constructor(props) {
    // React.Component 의 constructor() 를 사용하고, 이어서 우리가 override.
    super(props);
    
    this.state = {
      lat: null, // 아모른직다, but 들어온다.
    };
  }
  
  // React 왈, render() 하라. (CBC)
  render () {
    window.navigator.geolocation.getCurrentPosition(
      position => console.log(position),
      error => console.log(error)
    );

    return (
      <div>Winter is Coming..</div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
```

### State property 업데이트하기

이제 `this.state = { lat: null }` 를 통해 `state` 를 초기화 해 놓았다. 이후 `render()` 뿐만 아니라 다른 함수 어디서든지 이 값을 사용할 수 있다.

`src/index.js`

```jsx
...
	render () {
    window.navigator.geolocation.getCurrentPosition(
      position => console.log(position),
      error => console.log(error)
    );

    return (
      <div>
        <p>Winter is Coming..</p>
        <p>latitude: {this.state.lat}</p>
      </div>
    )
  }
...
```

이제 남은 일은, geolocation API 를 통해 사용자 정보가 최종적으로 확보되면, `state` 의 `lat` 을 업데이트 해주는 일이다. 위에 작성했던바에 따르면, `state` 가 업데이트 되면, 무조건 `render()` 가 다시 실행되며, 화면이 다시 렌더링 된다고 했다.

때문에, `render()` 안에서 어떤 정보를 받아오거나, 초기화를 하는 작업을 하는것은 매우 성능적으로 좋지 않다. `state` 의 아주 작은 업데이트만 있어도, `render()` 가 실행되는데, 그때마다 계속해서 비즈니스로직이 담긴 코드가 실행되기 때문이다. 지금같은 경우에는, `<App />` 이 처음 생성되고 초기화 될 때 한번만 geolocation을 받아오면 충분하다. 그리고 받고 나서 `state` 를 업데이트 하는 것이다!!

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      lat: null,
    };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude});
      },
      error => console.log(error)
    );
  }

  render () {
    return (
      <div>
        <p>Winter is Coming..</p>
        <p>latitude: {this.state.lat}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
```

다시 말하지만 **절대절대절대**로 `this.state.lat = [VALUE]` 와 같은 코드는 사용해서는 안된다. 이것은 애초에 동작하지도 않을 뿐더러, React 의 VirtualDOM 의 동작과 내부 로직을 통째로 어기는 것이다. `this.state = {}` 로 직접 할당이 허용되는 단 한번은 `constructor()` 안에서 뿐이다.

## App Lifecycle 전체보기

1. 브라우저에서 JS 파일 불러오기 시작
2. `<App />` 컴포넌트 생성
3. **Geolocation API 를 통해 위치정보 받기 시작...**
4. React App 이 JSX 를 return 하며, HTML 을 화면에 `render()`
5. ...
6. **사용자 위치정보 GET!** 
7. `state` 객체를 `this.setState()` 를 통해 업데이트
8. React 가 Component 의 state 를 업데이트한 사실을 알아챔
9. React가 `render()` 함수를 한번 더 호출
10. `render()` 함수가 업데이트 된 JSX 를 리턴함
11. React 가 JSX 를 업데이트하고 내용을 화면에 보여줌

## Error handling

 일반적으로 우리는 App 에 에러가 없을거라고 생각하는 경우가 많지만..

사용자가 위치 조회를 거부하는 일 역시, 처음 렌더링 이후에 일어날 수 있는 일이다. 때문에 일단 렌더를 한 이후에, 사용자가 위치조회를 거부하면, 에러메세지를 보여줘야 한다. 어떻게 하는게 좋을까?

이것도 대표적으로 `state` 를 통해 해결할 수 있지 않을까?

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      lat: null,
      errorMessage: '' // state
    };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude});
      },
      error => {
        console.error(error);
        this.setState({ errorMessage: error.message }) // lat 이 없어지는게 아님!
      }
    );
  }

  render () {
    return (
      <div>
        <p>Winter is Coming..</p>
        <p>latitude: {this.state.lat}</p>
        <p>Error: {this.state.errorMessage}</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
```

### Conditional rendering

지금은 error 가 없어도 error 글씨가 화면에 나타난다. 이런 상황을 좀더 구체화하여 분기해보자.

| Latitude | ErrorMessage | ??                            | Result           |
| -------- | ------------ | ----------------------------- | ---------------- |
| O        | X            | 위도값은 있고 에러는 없으므로 | Show latitude    |
| X        | O            | 에러는 있고 위도값은 없으므로 | Show Error       |
| X        | X            | 둘다 없으므로                 | Show 'Loading..' |

`src/index.js`

```jsx
...
	render () {
    if (this.state.errorMessage && !this.state.lat) {
      return (<div>Error: {this.state.errorMessage}</div>);
    } else if(!this.state.errorMessage && this.state.lat) {
      return(<div>Latitude: {this.state.lat}</div>);
    } else {
      return(<div>Loading....</div>);
    }
	}
...
```

## Lifecycle Methods

현재 우리가 `state` 를 초기화 하는 방법은 다음과 같다.

```jsx
...
  constructor(props) {
    super(props);
    this.state = {}; // This
    ...
	}
... 
```

현재 `state` 를 초기화 하고 data 를 받아서 넣는 작업을 모두 `constructor` 에서 진행중이다. 하지만 이는 좋은 방법이 아니다. 다른 메서드에서 `setState` 를 통해 `lat`/`errorMesage` 를 세팅하자.

 이 방법을 알아보기 위해 Component 의 Life Cycle 이라고 하는 개념을 알아야만 한다. Lifecycle 이라고 부르는 이유는, 처음에 생성되고 => DOM 에 나타나고 => 어느 순간에 re-render되고 => DOM 에서 사라지는 하나의 생명주기로 이루어져 있기 때문이다.

React 컴포넌트는 Life cycle 안에서, 특정 시간(순간)에 호출할 수 있는 method 를 내장하고 있다. 이 method 들을 필요한 순간에 잘 사용하기 위해서는, 이 method 들이 실행될 수 있는 순간과 순서를 잘 알아야 한다. 

### Component Lifecycle - 우리가 정의하는 method 들

1. `constructor` (필수)
2. `render` (필수)
   * 화면에 내용 나타남
3. `componentDidMount` (define, 화면에 나타나자 마자 바로 호출됨 - 1time)
   * update 를 기다리는 중..
4. update 가 일어나면, **`render()`** 가 되고!
5. `componentDidUpdate` (define, 업데이트가 일어나면 호출됨 - n time available)
   * 화면에서 사라질때까지 기다리는중..
6. `componentWillUnmount` (define, 나중에 더 자세히)

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state ={
      lat: null,
      errorMessage: ''
    };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude});
      },
      error => {
        console.error(error);
        this.setState({ errorMessage: error.message }) // lat 이 없어지는게 아님!
      }
    );
  }
  
  // 추가
  componentDidMount () {
    console.log('컴포넌트 납시오!!!');
  }
	// 추가
  componentDidUpdate () {
    console.log('컴포넌트 UPDATED & RE-RENDERED');
  }

  render () {
      if (this.state.errorMessage && !this.state.lat) {
        return (<div>Error: {this.state.errorMessage}</div>);
      } else if(!this.state.errorMessage && this.state.lat) {
        return(<div>Latitude: {this.state.lat}</div>);
      } else {
        return(<div>Loading....</div>);
      }
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
```

추가되어 있는 부분은 확인했으면 지우자.

### Why Lifecycle methods

| method                 | ..ing        | 설명                                                         |
| ---------------------- | ------------ | ------------------------------------------------------------ |
| `constructor`          |              | Init setting(*No data load..Convention*)                     |
| `render`               |              | JSX return 만 할것!(계속 호출됨)                             |
|                        | DOM 최초등장 |                                                              |
| `componentDidMount`    |              | Data load 하기 좋음!                                         |
|                        | Wait Update  |                                                              |
| `componentDidUpdate`   |              | `state`/`props` 가 바뀔때 추가 Data load <br />(사용자가 버튼을 누르면 req 를 보낸다거나..) |
|                        | Wait death   |                                                              |
| `componentWillUnmount` |              | Cleanup 하기 좋음! 특히 non-react stuff(GoogleMap..?)        |

위의 메서드 말고 3가지가 더 있다. 

* `shouldComponentUpdate`
* `getDerivedStateFromProps`
* `getSnapshotBeforeUpdate`

하지만 위의 3가지는 매우 쓰이는 경우가 적고, 지금처럼 react 로 떠나는 여행이 초창기일때는 괜히 부담만 주기에 소개하지 않겠다. 확실하지 않으면 위의 3개는 사용하지 않는게 낫기 때문에 모르는게 더 낫다.

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state ={
      lat: null,
      errorMessage: ''
    };
  }

  componentDidMount () {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude}),
      error => {
        console.error(error);
        this.setState({ errorMessage: error.message });
      }
    );
  }

  render () {
      if (this.state.errorMessage && !this.state.lat) {
        return (<div>Error: {this.state.errorMessage}</div>);
      } else if(!this.state.errorMessage && this.state.lat) {
        return(<div>Latitude: {this.state.lat}</div>);
      } else {
        return(<div>Loading....</div>);
      }
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
```

이제 `constructor` 는 정말 초기화에 필요한 작업만 하고, 추가 데이터 로딩은 `componentDidMount()` 에서 진행된다.

### 다른 방법으로 state 정의하기

`src/index.js`

```jsx
...
// constructor(props) {
  // super(props);
// }

state = { lat: null, errorMessage: ''};
```

오잉? lifecycle method 는 거짓말인가요? 그게 아니라 babel 이 실제로는 `constructor`안에 `this.state` 라는 코드로 바꿔준다. 

`constructor` 에 `state` 만 정의하는 경우가 많기 때문에, 다른 코드를 쓰지않고 `state` 만 사용하도록 배려한 것!



## State 를 Props 로 넘기기...

`src/index.js`

```jsx
...
render() {
  ...
  else if(!this.state.errorMessage && this.state.lat) {
    return <SeasonDisplay lat="{this.state.lat}" />
  }
  ...
}
```

현재 컴포넌트의 `state` 를 `<SeasonDisplay />` 의 `props` 로 넘기는 중이다. 만약 update 가 일어나면 `render()` 가 다시 일어나기에, 당연히 자식 컴포넌트의 내용도 바뀐 상태로 렌더된다.

`src/SeasonDisplay.js`

```jsx
import React from 'react';

const SeasonDisplay = props => {
  return (
    <div>
      <p>
        Winter is Coming in {props.lat};
      </p>

    </div>
  );
};

export default SeasonDisplay;
```

## 계절 결정하고 보여주기

```js
new Date().getMonth(); // 0 ~ 11
```

`src/SeasonDisplay.js`

```jsx
import React from 'react';

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
  console.log(season);
  return (
    <div>
      <p>
        Winter is Coming in {props.lat};
      </p>

    </div>
  );
};

export default SeasonDisplay;
```

잘 출력되며, offset 으로 위치를 설정해도 보자

### react 삼항연산자 (Ternary Expression)

`src/SeasonDisplay.js`

```jsx
import React from 'react';

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());

  return (
    <div>
			어떻게 하지..? season 이 winter 면 / summer 면
    </div>
  );
};

export default SeasonDisplay;
```

JSX 에서 if - else 문을 사용하려면, 이전에 `return` 전체를 if-else 에 넣을수 있지만, JSX 안에서 부분별로 사용하려면 삼항연산자를 사용해야한다.

```jsx
...
const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());

  return (
    <div>
			<h1>
          {season === 'winter' ? '후덜덜' : '뻘뻘뻘'}
      </h1>
    </div>
  );
};
...
```

이렇게 사용해도 되고, 

```jsx
...
const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
	const text = seasons === 'winter' ? '후덜덜' : '뻘뻘뻘';

  return (
    <div>
			<h1>{text}</h1>
    </div>
  );
};
...
```

이렇게 작성해도 된다. 로직은 `return()` 에 넣지 말라는 것이다. 이 부분에서는 다양한 토롱니 오가고 있으므로 자유롭게 선택하자.

### Icon 보여주기

Semantic UI Icons / `snowflake` 와 `sun` 을 사용하자.

`src/SeasonDisplay.js`

```jsx
...
const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
  const text = season === 'winter' ? '후덜덜' : '뻘뻘뻘';
  const icon = season === 'winter' ? 'snowflake' : 'sun';
  return (
    <div>
      <i className={`${icon} icon`} />
      <h1>{text}</h1>
      <i className={`${icon} icon`} />
    </div>
  );
};
...
```

### 옵션들을 `config` 객체로 추출하기

`text` 와 `icon` 결정에 있어서 반복되는 삼항연산자가 있다. string template 안에서도 뭔가 헷갈린다.

`seasonConfig` 객체를 만들고, 삼항연산자를 더이상 사용하지 않으며, 동시에 아이콘 `className` 도 한번에 처리해 보자.

```jsx
import React from 'react';

const seasonConfig = {
  summer: {
    text: '뻘뻘뻘',
    iconName: 'sun'
  },
  winter: {
    text: '덜덜덜',
    iconName: 'snowflake'
  }
};

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
  const { text, iconName } = seasonConfig[season];
  return (
    <div>
      <i className={`${iconName} icon massive`} />
      <h1>{text}</h1>
      <i className={`${iconName} icon massive`} />
    </div>
  );
};

export default SeasonDisplay;
```

기능은 그대로지만, 훨씬 코드가 깔끔해졌다.

## Style 추가하기

https://semantic-ui.com/elements/icon.html#/definition

```jsx
...
		<i className={`${iconName} icon icon-left massive`}></i>
    <h1>{text}</h1>
		<i className={`${iconName} icon icon-right massive`}></i>
...
```

```sh
$ touch src/SeasonDisplay.css
```

`src/SeasonDisplay.css`

```css
.icon-left {
  position: absolute;
  top: 30px;
  left: 30px;
}

.icon-right {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
```

우리가 생성한 css 는 자동으로 연동되어 적용되지 않는다. 직접 수동으로 연동해줘야 한다.

`src/SeasonDisplay.js`

```jsx
import './SeasonDisplay.css'; // CSS가 들어오는게 아니라 WebPack 번들해줄것!
import React from 'react';
...
  return (
    <div className={`season-display ${season}`}>
      <i className={`${iconName} icon massive icon-right`} />
      <h1>{text}</h1>
      <i className={`${iconName} icon massive icon-left `} />
    </div>
  );
...
```

최상위 `div` 에 `season-display` 라는 이름의 클래스를 줬다. 컴포넌트 이름과 완전히 동일한 것이 특징이다. 이렇게 하면, 컴포넌트마다 가장 root 에 있는 태그에 필요한 스타일링을 할 수 있고, 실제로 이런 패턴으로 css 를 작성하면 매우 편리하다. 일단 수많은 컴포넌트가 중첩되어 있을때, `SeasonDisplay` 컴포넌트는 최상단에 무조건 `season-display` 라는 클래스를 가지고 있을 것이라는걸 알고 있다는 것 만으로도 많은것이 수월해진다.

`src/SeasonDisplay.css`

```css
.season-display {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.season-display.winter i {
    color: deepskyblue;
}

.season-display.summer i {
    color: red;
}

.winter {
    background-color: aliceblue;
    color: darkblue;
}

.summer {
    background-color: orange;
    color: lightyellow;
}

.icon-left {
    position: absolute;
    top: 30px;
    left: 30px;
}

.icon-right {
    position: absolute;
    bottom: 30px;
    right: 30px;
}
```

`src/SeasonDisplay.js`

```jsx
import './SeasonDisplay.css'; 
import React from 'react';

const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
  const { text, iconName } = seasonConfig[season];
  return (
    <div className={`season-display ${season}`}>
      <i className={`${iconName} icon massive icon-right`} />
      <h1>{text}</h1>
      <i className={`${iconName} icon massive icon-left `} />
    </div>
  );
};

const seasonConfig = {
  summer: {
    text: '뻘뻘뻘',
    iconName: 'sun'
  },
  winter: {
    text: '덜덜덜',
    iconName: 'snowflake'
  }
};

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

export default SeasonDisplay;
```



## Loading Spinner

로딩중에 너무 심심하게 (못)생겼다.

https://semantic-ui.com/elements/loader.html

이 loader를 어디에 두는게 좋을지 고민해보면, 또 다른 곳에서 사용할 수있도록, 또다른 컴포넌트로 분리하는게 좋지 않을까?

```sh
$ touch src/Loader.js
```

`src/Loader.js`  

```jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">
        Where are you? ٩(ᐛ)و
      </div>
    </div>
  );
};

export default Loader;
```

`src/index.js`

```jsx
...
import Loader from "./Loader"; // 추가
 
 ...

  render () {
      if (this.state.errorMessage && !this.state.lat) {
        return (<div>Error: {this.state.errorMessage}</div>);
      } else if(!this.state.errorMessage && this.state.lat) {
        return <SeasonDisplay lat={this.state.lat}/> 
      } else {
        return <Loader />;
      }
  }

...
```

Perfect..! 다만 이 Loader 를 재사용할거라면, 지금처럼 메세지를 하드코딩해서는 안될 것 같다.

`src/Loader.js`

```jsx
import React from 'react';

const Loader = (props) => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">
				{props.message}      
      </div>
    </div>
  );
};

export default Loader;
```

`src/index.js`

```jsx
...
	render () {
      if (this.state.errorMessage && !this.state.lat) {
        return (<div>Error: {this.state.errorMessage}</div>);
      } else if(!this.state.errorMessage && this.state.lat) {
        return <SeasonDisplay lat={this.state.lat}/> 
      } else {
        return <Loader message='Where are you? ٩(ᐛ)و'/>;
      }
  }
...
```

좋다! 그런데 만약 `<Loader />` 에 `message` 를 주는걸 깜빡한다면? 아무 메세지도 나오지 않는다. 이럴 경우 default 메세지를(props) 주려면 어떻게 하느냐?

`src/Loader.js`

```jsx
const Spinner = (props) => { ... }

...

Spinner.defaultProps = {
  message: 'Loading...'
};

...
```

이제 `message` 를 주지 않아보자

## Render 에서 조건쓰지 않기

약간 이상한 가정이기는 하지만, 만약 우리 App 이 무조건 검정색(`element.style { border: 10px solid red; }`) 에 들어가 있어야 한다고 하면, 현재의 코드에서는..?

`src/index.js`

```jsx
...
	render () {
      if (this.state.errorMessage && !this.state.lat) {
        return (
          <div className="border red">
            Error: {this.state.errorMessage}
          </div>
        );
      } else if(!this.state.errorMessage && this.state.lat) {
        return (
          <div className="border red">
	          <SeasonDisplay lat={this.state.lat}/>
          </div>
        );
      } else {
        return (
          <div className="border red">
	          <Loader message='Where are you? ٩(ᐛ)و'/>
          </div>
          );
      }
  }
...
```

Helper function 을 만들어서 사용하자.

```jsx
...
renderContent() {
  if (this.state.errorMessage && !this.state.lat) {
      return (<div>Error: {this.state.errorMessage}</div>);
    } else if(!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat}/>
    } else {
      return <Loader />;
    }
}

render () {
    return (
    	<div className="border red">
      	{this.renderContent()}
      </div>
    )
  }
```

실제로 동작하지는 않지만, 결론은 `return()` 안에서 조건분기를 해서는 안된다는 점이다.

