# Integrating React & Redux

## React cooperating with Redux

두 개의 라이브러리 (react - redux) 가 어떻게 함께 동작하는지 알아보자.

매우 심플한 react app 을 만들며 react 와 redux 를 함께 합쳐보자.

```sh
$ pwd 
/.../.../react
$ npx create-react-app songs
$ cd songs
$ rm -rf src/
$ mkdir src/
$ mkdir src/components
$ touch src/index.js
$ touch src/components/App.js
```

## React-Redux

| React          | React-Redux                                   | Redux          |
| -------------- | --------------------------------------------- | -------------- |
| 계속 보던 그것 | React 와 Redux 가 함께 동작하도록 만들어 보자 | 아까 보던 그것 |

Redux 와 React-Redux 를 함께 설치한다. 기억하자 Redux 는 React 용이 아니다.

결국 우리가 배울것은 react-redux 가 아닐까?

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

`src/components/App.js`

```jsx
import React from 'react';

const App = () => {
  return (
    <div>
      REDUX
    </div>
  );
};

export default App;
```

Semantic UI 추가하기

https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css

## Redux App 의 디자인

함수형 컴포넌트로 만든이유는 state 를 class 에서 관리하지 않고 redux 로 넘기겠다는 의지!

### Redux 가 없었다면..

* App 이 songs 리스트와 선택된 song 을 모두 들고 있다(state)
* App  => SongList 로 props 로 `onSongSelcet` 라는 함수와 songs 리스트를 넘길것이다.
* App => SongDetail props 로 선택된 song 을 넘겨줄 것이다. 

### Redux 와 함께라면..

Redux

* Reducer(부서)
  * Song list 
  * Selected song
  * 위 두개가 우리에게 필요한 state 이다.
* Action Creator(고객)
  * Select Song
  * 이게 dispatch 되어야 selected song 이 업데이트 될 것이다.

궁금한것은..? redux 의 일을 react 에서 실행하려면?

## React-Redux App 는 어떻게 동작하나요

![8_react-redux-flow](/Users/ueh0/TIL/JS/React/React_UDM/Markdowns/images/8_react-redux-flow.png)

코드 작성하기 전에 이걸 이해할 수 없겠지만 보기만 하자!

코드로 보면 엄청 직관적일것이니 쫄지말자!

우선 두가지 새로운 컴포넌트를 생성한다. React 와 Redux 가 생성해 줄 것이다. 우리는 인스턴스를 쓴다.

* `<Provider />`
* `<Connect />`

아까 살펴봤듯이 마지막에 store 라는게 필요했다. 이 store 가 모든 reducers 와 state 를 들고 있었다. 이 store 을 provider 의 prop 으로 넘길것이다. provider 는 App 보다 먼저 렌더될 것이다. 이 provider 는 store 로부터 완전한 데이터 접근이 가능해 질 것이다. provider(제공자)라는 이름 자체가 우리 App 전체에 정보를 제공한다는 의미다.

provider 와 wiring 이 된 이후로, SongList 컴포넌트를 Connect 라는 컴포넌트 안에 네스팅 할 것이다. 이 Connect 컴포넌트는 매우 특별하며, Provider 와 직통으로 통신가능하다. props 와 callback 은 잊자. Context 시스템이라는 새로운 시스템을 통해서 중간과정을 무시하고 직접 연결된다는 것만 알아두자.

아무튼 새로운 시스템을 사용하여 Connect 는 SongList 에서 사용하기 위해 list of songs 가 필요하다고 보낸다. Provider 가 Connect 에게 songs리스트롤 보내고, Connect 는 이 데이터를 받아서 SongList 에게 props 로 넘겨 사용한다.

React-Redux 관계에서 바뀌는걸 정리하면 다음과 같다.

* Provider 생성, store 에게 ref 전달
* Provider 와 통신해야 하는 컴포넌트가 있다면 Connect 컴포넌트(함수, 태그) 안에서 네스트

내용이 길었는데, 다시 말하지만 코드로 보면 엄청 직관적일것이니 쫄지말자!

## Redux 프로젝트 구조

* `songs/`
  * `src/`
    * `actions/` : action creator 관련 코드들
    * `components/` 컴포넌트!
    * `reducers/` reudcer 관련 코드들
    * `index.js` react 와 redux 모두 셋업!

슬슬 `index.js` 내용이 많아지기 시작한다. 이래서 `App` 도 컴포넌트로 쪼갠것!

```sh
$ pwd 
/.../.../songs
$ mkdir src/actions
$ touch src/actions/index.js 
$ mkdir src/reducers
$ touch src/reducers/index.js
```

왜..? import 할 때 디렉토리까지만 적으면, index 가 자동으로!

## Named vs Default Exports

`src/actions/index.js`

```js
// Action Creator
export const selectSong = (song) => {
  // Returns an action
  return {
    type: 'SONG_SELECTED',
    payload: song
  }
};
```

항상 사용하던 `export default` 대신에 함수 이름 앞에 `export` 를 사용했다. named exports 라고 하는 것이다. 여러개의 함수를 export 해야할 때 사용한다.

`src/components/App.js`

```jsx
import React from 'react';
// import { selectSong } from "../actions";  <= for ex

const App = () => {
  return (
    <div>
      REDUX
    </div>
  );
};

export default App;
```

import/export 관련해서 헷갈릴텐데, 비구조화 관련해서는 하나만 기억하자.

default export 는 `{}` 가 필요없고, named export 는 사용하면 된다.



## Reducer 만들기

우선 노래들을 담아놓는 `songsReducer` 를 만들겠다. 이 reducer 는 절대로 내용이 바뀌지 않을 것이기 때문에, 인자를 받지 않겠다. 실제 app 개발과는 거리가 있지만, reduxify 를 위해 이 방법을 사용하겠다. 

`src/reducers/index.js`

```js
const songsReducer = () => {
  return [
    { title: 'somebody to love', artist: 'quuen', duration: '5:10' },
    { title: 'niggas in paris', artist: 'jay-z', duration: '4:03' },
    { title: 'power', artist: 'kanye west', duration: '4:53' },
    { title: 'black parade', artist: 'MCR', duration: '5:11' },
  ]
};

const selectedSongReducer = (selectedSong=null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  } else {
    return selectedSong;
  }
};
```

우리 app이 처음 실행되면 `selectedSong` 은 없을 것이므로 ,`null` 이다. `if`-`else` 문은 다른 `type` 이 있을지도 모를 상황을 가정한 것이다. 

## Provider 와이어 업

`src/reducers/index.js`

```js
import { combineReducers } from 'redux';

const songsReducer = () => {
  return [
    { title: 'somebody to love', artist: 'quuen', duration: '5:10' },
    { title: 'niggas in paris', artist: 'jay-z', duration: '4:03' },
    { title: 'power', artist: 'kanye west', duration: '4:53' },
    { title: 'black parade', artist: 'MCR', duration: '5:11' },
  ]
};

const selectedSongReducer = (selectedSong=null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  } else {
    return selectedSong;
  }
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
});
```

다른 모듈/패키지에서 import 를 쓸때는 document 를 읽자! `{}`

이제 이 파일을 import 하는 다른 파일들은 우리의 combine Reducers에 접근 가능해졌다.

지금까지는 완전히 redux 의 일이었고 끝났다. `src/index.js` 에서 와이어 업을 시작하자.

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// 패키지 및 모듈
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// 내가 작성한 코드
import App from './components/App';
import ruducers from './reducers';

ReactDOM.render(<App />, document.getElementById('root'));
```

말한대로 react 와 redux 를 이어주기 위한 `Provider` 는 `react-redux` 에서 왔으며, 컴포넌트기 때문에 convention 에 의해 대문자!

`createStore` 는 이전 코드펜에서 본 바로 그놈이다. 마지막으로 `combineReducers` 의 결과물을 `reducers` 에 넣었다.

계층구조 꼭대기에 `Provider` 를 둬야 한다고 언급했다. 그리고 `<Provider>` 에게 prop 으로 `store={createStore(reducer)}`

```js
const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(<action>);
```

이 코드를 생각해보자.

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

react-redux 에서는 사실 store 에 직접 접근하여 데이터를 조작하지 않는다. 대신 provider 를 사용하여 데이터에 접근/조작한다.

## Connect 컴포넌트/함수/태그

```sh
$ pwd
/.../.../songs
$ touch components/SongList.js
$ touch components/
```

`src/components/SongList.js`

```js
import React, {Component} from 'react';

class SongList extends Component {
  render() {
    return (
      <div>
        SongList
      </div>
    );
  }
}

export default SongList;
```

`src/components/App.js`

```js
import React from 'react';
import SongList from "./SongList";

const App = () => {
  return (
    <div>
      <SongList />
    </div>
  );
};

export default App;
```

자 이제 모든 songs 를 SongList 에서 접근하려면..? `Connect` 컴포넌트안에 넣고 아까말한 직접 통신을 사용해야 한다.

`src/components/SongList.js`

```jsx
import React, {Component} from 'react';
import { connect } from 'react-redux';

class SongList extends Component {
  render() {
    return (
      <div>
        SongList
      </div>
    );
  }
}

export default connect()(SongList);
```

? 막줄 무엇? 일단 error 는 안난다. 나눠서 생각해보면 쉽다. `connect()` 의 return 값이 함수인 것이다.

## MapStateToProps 랑 Connect 설정하기

우선 connect 가 react 컴포넌트라고 했지만, 전혀 그렇게 보이지 않는다..

connect 에 정확하게 어떤일을 하고 싶은지 명시해야 한다. 우리는 provider 에게 list of songs 를 받고싶다고 이야기 할 것이다. connect 를 설정하자.

`src/components/SongList.js`

```jsx
import React, {Component} from 'react';
import { connect } from 'react-redux';

class SongList extends Component {
  render() {
    return (
      <div>
        SongList
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  
  return state;
};

export default connect(mapStateToProps)(SongList);
```

우선 함수이름 `mapStateToProps` 는 convention 이다. 그리고 이름을 잘 해석해보면, Redux 의 state 를 이 함수에서 적절히 처리하고 난 이후, 현재의 `SongList` 컴포넌트의 `props` 로 사용하겠다는 뜻이 아닐까?!

인자 `state` 는 현재 redux 의 중앙 데이터 저장고를 의미하며, 모든 데이터를 다 가져온다.

그리고 `connect` 의 첫번째 인자로 함수 ref 를 다 넘겼다. `mapStateToProps` 는 사실 정의만 하게되면, 실제로 어느곳에서도 실행되지 않을테니..

이제 `connect()` 함수가 알아서 모든 작업을 끝내고, return 되는 함수의 인자로 우리 **컴포넌트를** 넘겨서 **컴포넌트**에서 `this.props` 로 redux state 를 관리할 수 있게  해 줄 것이다.

```jsx
import React, {Component} from 'react';
import { connect } from 'react-redux';

class SongList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        SongList
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wadizit: state
  }
};

export default connect(mapStateToProps)(SongList);
```

`wadizit: { selectedSongs: ..., songs: []}` 와 같이 출려된다. 우리가 이 `SongList` 컴포넌트에서 사용하고 싶은 데이터는 list of songs 뿐이니까, 이 데이터만 추출하며, 이름도 `songs` 로 바꾸자.

`src/components/SongList.js`

```jsx
import React, {Component} from 'react';
import { connect } from 'react-redux';

class SongList extends Component {
  render() {
    console.log(this.props); // songs 뿐만 아니라 dispatch 함수도 같이 들어있다. songs 를 변경하려면 이 함수를 사용한다.
    return (
      <div>
        SongList
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { songs: state.songs }
};

export default connect(mapStateToProps)(SongList);
```

` Connect ` 컴포넌트 혹은 함수를 사용하게 되면 패턴이 매우 일정하게 된다.

1. `connect` 를 import 하고
2. 우리가 props 로 뽑아 내고 싶은 데이터를 정제하는 함수 `mapStateToProps` 정의
3. `connect(mapStateToProps)(<ComponentName>)`

이것만 기억해도 된다! 모든 리엑트 프로젝트에서 엄청나게 이 패턴의 반복을 경험하게 된다.



## Redux 데이터로 List 만들기

이제 redux 안의 데이터를 꺼낼 수 있게 되었다.

`src/components/SongList.js`

```jsx
import React, {Component} from 'react';
import { connect } from 'react-redux';

class SongList extends Component {

  renderList() {
    return this.props.songs.map(song => {
      return (
        <div className="item" key={song.title}>
          <div className="right float content">
            <button className="ui button primary">
              Select
            </button>
          </div>

          <div className="content">
            {song.title}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui divided list">
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { songs: state.songs }
};

export default connect(mapStateToProps)(SongList);
```

`src/components/App.js`

```jsx
import React from 'react';
import SongList from "./SongList";

const App = () => {
  return (
    // CSS grid 와 Semantic UI Grid 는 다르다! 이건 Semantic UI Grid system
    <div className="ui container grid"> 
      <div className="ui row">
        <div className="column eight wide">
          <SongList />
        </div>
      </div>
    </div>
  );
};

export default App;
```

보기 좋구만

## Component 에서 Action Creator 호출하기

이제 select 버튼과 실제 선택되는 액션을 연결해야 한다.

`src/actions/index.js` 에 노래를 고르는 액션을 이미 정의해 뒀다. 그리고 이 액션은 `selectedSongReducer` 에서 소비될 것이다. 결국 이제 액션을 생성할 Action creator 인 `selectSong` 을 호출하는 법만 알면 끝난다!

`connect` 함수는 데이터를 요청해서 받아오는 것 말고도 action creator 를 받아오는 일도 잘 한다!

`src/components/SongList.js`

```jsx
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectSong } from "../actions"; // default 아니라 named? {비구조화}

class SongList extends Component {
	
  renderList() {
    return this.props.songs.map(song => {
      return (
        <div className="item" key={song.title}>
          <div className="right float content">
            <button className="ui button primary">
              Select
            </button>
          </div>

          <div className="content">
            {song.title}
          </div>
        </div>
      )
    })
  }

  render() {
    console.log(this.props);
    return (
      <div className="ui divided list">
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { songs: state.songs }
};

export default connect(mapStateToProps, { selectSong })(SongList);
// selectSong 비구조화. 이제 this.props 에 dispatch 함수에?
```

이제 콘솔에 dispatch자리에 우리가 이름지은 `selectSong` 키에 action creator 에서 import한 함수가 들어있다. 우리가 import 한 함수를 직접 사용하는게 아니라 `connect` 에 넘겨주면 알아서 처리한다!

자세한 처리과정은 우선 코드가 돌고나서 생각해보자.

`src/components/SongList.js`

```jsx
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectSong } from "../actions";

class SongList extends Component {

  renderList() {
    return this.props.songs.map(song => {
      return (
        <div className="item" key={song.title}>
          <div className="right float content">
            <button
              className="ui button primary"
              onClick={() => this.props.selectSong(song)}
            >
              Select
            </button>
          </div>

          <div className="content">
            {song.title}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="ui divided list">
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state); // state 에 변화가 있으면, 이 함수는 무조건 다시 실행
  return { songs: state.songs }
};

export default connect(mapStateToProps, { selectSong })(SongList);
```

버튼을 누르면 action creator 가 실행되어 action 을 발행하고 `selectedSongReducer` 가 action 을 처리하는 과정속에서 state(정보저장소) 에 변화가 일어난다.이 경우에는 `createStore(reducers)` 의 `reducer` 가 `combinedReucers` 라는 object 였고, 이 object에서 `selectedSong` 항목에 변화가 일어난 것이다.

## Redux 는 마법이 아니다.

* Redux는
  * action creator 의 호출을
  * action 이라고 할 수 있는 object 를 return 하는 함수를(`src/actions/index.js` )
* 자동으로 탐지하지 못한다.

`src/actions/index.js` 가 대표적으로 action 을 리턴하고, 우리가 `actions` 디렉토리 안에 만들었지만, 실제로는 전혀 특별할 것 없는 일반 함수일 뿐이다. 그렇다면 action creator 인 `selectSong()` 은 어디서 실행된거지?

`src/components/SongList.js` 에서 `connect()` 의 인자로 넘기긴 했다. 하지만 꼭 그래야 하는 건 아니다. 컴포넌트 안에서 언제든지 `selectSong()` 이라고 호출할 수 있고, 실제로 그자리에서 object 를 return 할 것이다. 문제는 이 object 가 자동으로 redux 의 어딘가로 가지 않는다는 것이다.

이 action creator 가 redux 의 state 에 영향을 미치려면, 반드시 `dispatch(<actionCreator>)` 과정을 거쳐야 한다. `dispatch` 되지 못한 object 는 action 이 아니다.

그럼 action 으로 처리되는 순간은? `connect()` 가 `dispatch` 를 한다. 우리가 신경 쓸 것은 아니다.

하나만 기억하자. action creator 의 호출이 단순 object 가 아닌 action 으로 사용되려면? `connect()` 마법을 믿던지 내부를 까던지 이건 본인 취향이다.

## Functional Component 와 Connect

```sh
$ pwd
/.../.../songs
$ touch src/components/SongDetail.js
```

`connect` 는 rcc 에서만 사용할 수 있는 것이 아니다.

`src/components/SongDetail.js`

```jsx
import React from 'react';
import { connect } from 'react-redux';

const SongDetail = (props) => {
  console.log(props);
  return (
    <div>
      Song!
    </div>
  );
};

const mapStateToProps = (state) => {
  return { song: state.selectedSong }
};

export default connect(mapStateToProps)(SongDetail);
```

`src/components/App.js`

```jsx
import React from 'react';
import SongList from "./SongList";
import SongDetail from "./SongDetail";

const App = () => {
  return (
    <div className="ui container grid">
      <div className="ui row">
        <div className="column eight wide">
          <SongList />
        </div>
        <div className="column eight wide">
          <SongDetail />
        </div>
      </div>
    </div>
  );
};

export default App;
```

이제 props 와 state 에 대한 이야기가 App 컴포넌트에서 사라지는것이 보인다. 데이터는? redux 가!

이제 `selectedSong` 을 화면에 출력하기만 하면 끝난다.

## 조건부 렌더링

`src/components/SongDetail.js`

```jsx
import React from 'react';
import { connect } from 'react-redux';

const SongDetail = (props) => {
  console.log(props);
  return (
    <div>
      Song!
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userSelectThisSong: state.selectedSong } // 바꾸면?
};

export default connect(mapStateToProps)(SongDetail);
```

```jsx
import React from 'react';
import { connect } from 'react-redux';

const SongDetail = ({ song }) => { // 비구조화
  return (
    <div>
      {song.title}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { song: state.selectedSong } // 바꾸면?
};

export default connect(mapStateToProps)(SongDetail);
```

error 가 난드아아.. 처음에는 `song` 이 없기 때문이다.

```jsx
import React from 'react';
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
  return renderSongDetail(song);
};

const renderSongDetail = (song) => {
  if (!song) {
    return <div>Select a song!</div>
  } else {
    return (
      <div>
        <h3>Detail:</h3>
        <p>Title: {song.title}</p>
        <p>Duration: {song.duration}</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { song: state.selectedSong }
};

export default connect(mapStateToProps)(SongDetail);
```

정말 기본적이 react - redux 앱이 완성되었다.