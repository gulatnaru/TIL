# Props 사용하기

## Component 3계명

| 3계명                   | 설명                                              |
| ----------------------- | ------------------------------------------------- |
| Component Nesting       | 컴포넌트는 다른 컴포넌트 안에서 보여질 수 있다.   |
| Component Reusabilty    | 컴포넌트는 App 전체에서 쉽게 재사용 가능해야한다. |
| Component Configuration | 컴포넌트는 생성될 때  설정 가능해야 한다.         |

## App 미리보기

![3_app_preview](/Users/ueh0/TIL/JS/React/React_UDM/images/3_app_preview.png)

각각이 매우 비슷하게 생겼다. 시간과 이름과 내용만 다르고 나머지 구성은 다르다. 3개의 컴포넌트를 만들어서 사용해보고, 1개의 컴포넌트로 같은 작업을 해보자.

## Styling - Semantic UI

```sh
$ pwd
/.../.../react
$ npx create-react-app components
$ cd components
$ rm -rf src
$ mkdir src
$ touch index.js
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
  	<div>Hi there!</div>
  )
}

ReactDOM.render(<App />, document.qureySelector('#root'));
```

[Semantic UI (CDN)](https://cdnjs.com/libraries/semantic-ui)

`https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css`

`public/index.html`

```html
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

## 일단 컴포넌트 만들기!

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="#" className="avatar">
          <img src="#" alt="avatar"/>
        </a>

        <div className="content">
          <a href="#" className="author">
            Neo
          </a>
          <div className="metadata">
            <span className="date">Today at 6:00PM</span>
          </div>
          <div className="text">HappyHacking!</div>
        </div>
      </div>
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

## 더미 데이터 사용하기

[faker.js](https://github.com/marak/Faker.js/) : Fake dummy data

```sh
$ npm i faker
$ npm start
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// Add
import faker from 'faker';

const App = () => {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          {/* 수정 */}
          <img src={faker.image.avatar()} alt="avatar"/>
        </a>

        <div className="content">
          <a href="/" className="author">
            Neo
          </a>
          <div className="metadata">
            <span className="date">Today at 6:00PM</span>
          </div>
          <div className="text">HappyHacking!</div>
        </div>
      </div>
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

## 새로운 컴포넌트에 JSX 추출하기

기존의 Comment 컴포넌트를 * 3?? 망함

재사용 가능하고 설정 가능한 컴포넌트 만들기!

* JSX 중에 복사해야하는 걸 찾는다.
* 해당 JSX블록의 목적이 무엇인지 생각하고 이름을 정한다.
* 컴포넌트를 위한 새로운 파일을 생성하고, 이름도 컴포넌티 이름과 동일하게 통일한다.
* 새 파일 안에 JSX 를 넣는다.
* 새 컴포넌트가 React 의 'props' 시스템을 사용하도록 만든다.

```sh
$ touch src/CommentDetail.js
```

`src/CommentDetail.js`

```jsx
import React from 'react';
import faker from 'faker';

const CommentDetail = () => {
  return(
    <div className="comment">
      <a href="/" className="avatar">
        <img src={faker.image.avatar()} alt="avatar"/>
      </a>

      <div className="content">
        <a href="/" className="author">
          Neo
        </a>
        <div className="metadata">
          <span className="date">Today at 6:00PM</span>
        </div>
        <div className="text">HappyHacking!</div>
      </div>
    </div>
  )
}
```

4단계까지는 성공! 하지만 마지막은 뭘 의미하는 것이지? 현재 우리 Comment 는 사용자 이름과 시간과 내용을 하드코딩 해놨다. 모든 Comment 가 같은 내용을 가지게 될 것이다.

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="ui container comments">

    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

## 컴포넌트 중첩

일단 기존처럼 보이게 만들어 보자.

`src/CommentDetail.js`

```jsx
import React from 'react';
import faker from 'faker';

const CommentDetail = () => {
  return(
    <div className="comment">
      <a href="/" className="avatar">
        <img src={faker.image.avatar()} alt="avatar"/>
      </a>

      <div className="content">
        <a href="/" className="author">
          Neo
        </a>
        <div className="metadata">
          <span className="date">Today at 6:00PM</span>
        </div>
        <div className="text">HappyHacking!</div>
      </div>
    </div>
  )
};

export default CommentDetail; // Export!
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// import faker from 'faker';
import CommentDetails from './CommentDetail';

const App = () => {
  return (
    <div className="ui container comments">
      <CommentDetails />
      <CommentDetails />
      <CommentDetails />
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

혹시 `{CommentDetail}` 같이 사용해야 하는게 아닐까? JS 변수나 코드는 전부 `{}` 에 넣는다고 했는데 말이다!

완전히 맞는 말이지만 **컴포넌트만은 예외다!**



## React props(properties) 시스템

현재의 App 안에서 컴포넌트간의 계층구조(Hierarchy) 는 다음과 같다.

* `<App />` (부모 컴포넌트 - Parent Component)
  * `<CommentDetail />` (자식 컴포넌트 -Child Component)
  * `<CommentDetail />`(자식 컴포넌트 -Child Component)
  * `<CommentDetail />`(자식 컴포넌트 -Child Component)

Props 시스템은 다음을 의미한다.

**부모 컴포넌트**가 **자식 컴포넌트**에게 데이터를 넘겨주는 시스템 : 자식 컴포넌트를 커스터마이즈 / 설정 하기 위해서!

|               -                |      `<App />`      |          -          |
| :----------------------------: | :-----------------: | :-----------------: |
| `name: 'neo'`,<br />`time: ''` |   `name: 'john'`    |    `name: 'tak'`    |
|      `<CommentDetail />`       | `<CommentDetail />` | `<CommentDetail />` |

### Props 주고 받기

Parent => Child 로 정보 보내기!

|   Component name | prop name | prop value | -    |
| ---------------: | :-------: | :--------: | ---- |
| `<CommentDetail` | `author=` |  `"neo"`   | `/>` |

`src/index.js`

```jsx
...
  return (
      <div className="ui container comments">
        <CommentDetails author={"neo"} />
        <CommentDetails author={"john"} />
        <CommentDetails author={"tak"} />
      </div>
    )
...
```

`src/CommentDetail.js`

```jsx
...
const CommentDetail = (props) => {
  console.log(props);
  ...
}
...
```

`props` 가 어떻게 보이는지 확인했으니 실제로 사용해보자.

`src/CommentDetail.js`

```jsx
import React from 'react';
import faker from 'faker';

const CommentDetail = (props) => {
  return(
    <div className="comment">
      <a href="/" className="avatar">
        <img src={faker.image.avatar()} alt="avatar"/>
      </a>

      <div className="content">
        <a href="/" className="author">
          {props.author}
        </a>
        <div className="metadata">
          <span className="date">Today at 6:00PM</span>
        </div>
        <div className="text">HappyHacking!</div>
      </div>
    </div>
  )
};

export default CommentDetail;
```

### 여러개의 Props 넘기기

이제 다른 props 도 넘겨보자.

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetails from './CommentDetail';

const App = () => {
  return (
    <div className="ui container comments">
      <CommentDetails
        author={faker.name.firstName()}
        time={faker.date.recent().toLocaleString()}
        body={faker.lorem.sentence()}
        avatar={faker.image.avatar()}
      />
      <CommentDetails
        author={faker.name.firstName()}
        time={faker.date.recent().toLocaleString()}
        body={faker.lorem.sentence()}
        avatar={faker.image.avatar()}
      />
      <CommentDetails
        author={faker.name.firstName()}
        time={faker.date.recent().toLocaleString()}
        body={faker.lorem.sentence()}
        avatar={faker.image.avatar()}
      />
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

`src/CommentDetail.js`

```jsx
import React from 'react';

const CommentDetail = props => {
  // console.log(props); => 삭제
  return(
    <div className="comment">
      <a href="/" className="avatar">
        <img src={props.avatar} alt="avatar"/>
      </a>

      <div className="content">
        <a href="/" className="author">
          {props.author}
        </a>
        <div className="metadata">
          <span className="date">{props.time}</span>
          <div className="text">{props.body}</div>
        </div>
      </div>
    </div>
  )
};

export default CommentDetail;
```



## 컴포넌트 재사용

```sh
$ touch src/ApprovalCard.js
```

`src/ApprovalCard.js`

```jsx
import React from 'react';

const ApprovalCard = () => {
  return (
    <div className="ui card">
      <div className="content">Are you sure?</div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button">Approve</div>
          <div className="ui basic red button">Reject</div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCard;
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetails from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard/>
      <CommentDetails
        author={faker.name.firstName()}
        time={faker.date.recent().toLocaleString()}
        body={faker.lorem.sentence()}
        avatar={faker.image.avatar()}
      />
      <CommentDetails
        author={faker.name.firstName()}
        time={faker.date.recent().toLocaleString()}
        body={faker.lorem.sentence()}
        avatar={faker.image.avatar()}
      />
      <CommentDetails
        author={faker.name.firstName()}
        time={faker.date.recent().toLocaleString()}
        body={faker.lorem.sentence()}
        avatar={faker.image.avatar()}
      />
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

### Custom Children 보여주기

이제 `<ApprovalCard>` 안에 `<CommentDetails>` 를 넣어야 한다.

`src/index.js`

```jsx
<ApprovalCard>
  <CommentDetails
    author={faker.name.firstName()}
    time={faker.date.recent().toLocaleString()}
    body={faker.lorem.sentence()}
    avatar={faker.image.avatar()}
  />
</ApprovalCard>
```

이것 역시 prop 이다. 왜냐하면 부모 컴포넌트에서 자식 컴포넌트로 설정을 넘겨주고 있기 때문이다.

`src/ApprovalCard.js`

```jsx
...
const ApprovalCard = props => {
  console.log(props.children);
  return (...)
}
...
```

`props` 안의 `childeren` 에 우리가 넘긴 값이 들어가 있는 걸 확인할 수 있다!

`src/ApprovalCard.js`

```jsx
import React from 'react';

const ApprovalCard = props => {
  return (
    <div className="ui card">
      <div className="content">{props.children}</div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button">Approve</div>
          <div className="ui basic red button">Reject</div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCard;
```

Perfect!

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetails from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <h4>What's your Choice?</h4>
        <p>Becareful!</p>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetails
          author={faker.name.firstName()}
          time={faker.date.recent().toLocaleString()}
          body={faker.lorem.sentence()}
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetails
          author={faker.name.firstName()}
          time={faker.date.recent().toLocaleString()}
          body={faker.lorem.sentence()}
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetails
          author={faker.name.firstName()}
          time={faker.date.recent().toLocaleString()}
          body={faker.lorem.sentence()}
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>

    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));
```



## Exercise

```jsx
...
const App = () => {
  return (
    <div>
      <Message />
    </div>
  );
}

const Message = (props) => {
  return (
    <div className="ui message">
      <div className="header">Changes in Service</div>
      <p>We just updated our privacy policy here to better service our customers.</p>
    </div>
  );
}
...
```

```jsx
...
const App = () => {
  return (
    <div>
      <Message header="Changes in Service" text="We just updated our privacy policy here to better service our customers."/>
    </div>
  );
}

const Message = (props) => {
  return (
    <div className="ui message">
      <div className="header">{props.header}</div>
      <p>{props.text}</p>
    </div>
  );
}
...
```

---

```jsx
  const App = () => {
    return (
      <div>
				<div className="ui placeholder segment">
          <div className="ui icon header">
            <i className="pdf file outline icon"></i>
            No documents are listed for this customer.
          </div>
          <div className="ui primary button">Add Document</div>
        </div>

        <div className="ui placeholder segment">>
          <h4 class="ui header">For Your Information</h4>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
          </p>
        </div>
      </div>
    );
  }
```

```jsx
  const App = () => {
    return (
      <div>
        <Segment>
          <div className="ui icon header">
            <i className="pdf file outline icon"></i>
            No documents are listed for this customer.
          </div>
          <div className="ui primary button">Add Document</div>
        </Segment>

        <Segment>
          <h4 class="ui header">For Your Information</h4>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
          </p>
        </Segment>
      </div>
    );
  }
    
  const Segment = props => {
    return(
      <div className="ui placeholder segment">
        {props.children}
      </div>
    )
  }
...
```