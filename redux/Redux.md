# Redux

## Introduction

Redux is..

* `state` 관리 라이브러리
  * 애초에 react 의 목적은 데이터를 관리하고 CRUD 하는게 아니라 HTML / Event Handling
* 복잡한 app 을 더 쉽게 만들 수 있게 해줌
  * react 로만 만들 수 있지만, 더 복잡한걸 더 쉽게 만들 수 있다!
* Not for React only..

일반적으로 러닝커브가 처음에 매우 높다가, 배우다 보면, 디자인패턴을 이해하고 Redux 없으면 살 수 없게 된다.

## Redux 이야기 

#### **Action Creator => Action => Dispatch => Reducer => State**

이게 뭐지.. 너무 어렵다ㅠㅠ 잠깐 다른 이야기를 듣고 가자!

### 보험사를 차려보자!

* 보험사를 만들어 보자
  * policy(보험 증권): 고객이 보험을 든다. 안좋은 일이 생기면 우리는 돈을 지불한다.
  * claim(청구): 고객에게 나쁜일이 생기면, 우리가 돈을 지불한다.
* HQ 부서
  1. Claims history (모든 청구 기록 관리) `[...claims]`
  2. Policies (우리 보험사에 보험을 든 고객목록 관리) `[...names]`
  3. Accounting (우리 돈주머니 - 회계) `$1000`
* 새로운 고객이 오게되면?
  * 사용자가 `Form` 을 작성하여 온다. 내용은 가입
  * `Form` 을 창구 직원(form reciever)에게 준다
  * 창구 직원이 `Form` 의 복사본을 HQ 의 모든 부서로 전달한다.
  * 1, 3 은 관심이 없지만, 일단 받게된다.

### more..

* 보험 증권 가입 `Form` 이 도착하면,
  * 2번 부서로 전달된다.
  * 2번 부서에서 고객 목록(`[...names]`)에 `Form` 에 적힌 사람을 추가한다.
    * John
    * Tak
    * **neo** 
* 그런데 다른 부서랑은 상관없이, 매니저가 존재한다고 해보자.
  * 경영팀은 시도때도 없이 2번 부서에 와서 보험사 고객 목록을 달라고 한다.
  * 이런 불편함을 해결하고자, 모든 부서의 데이터(청구기록, 고객목록, 계좌정보)를 회사 **중앙 데이터 저장소**에 저장한다. 
  * 각 부서는 데이터를 가지고 있지 않다. 
  * 이제 매니저는 부서를 방문할 필요 없이, 중앙 데이터 저장소만을 확인하면 된다.
* 그러면 이제 새로운 가입`Form` 이 오면 어떻게 이걸 처리하여 업데이트 하지?
  * 창구 직원이 `Form` 복사본을 2번 부서에 넘길때, 
  * 중앙저장소에 있는 모든 가입자 목록을 함께 넘긴다. ("여기 새로운 고객이 있어요. 그리고 여기 기존 고객 목록도 있어요!")
  * 이제 2번 부서에서 신규 고객 정보`name`와 기존 고객 정보들`[...names]`을 확인하고, 기존 고객 목록에 신규 고객을 추가한다.
  * 그리고 마지막에 중앙 데이터 저장소로 업데이트된 고객목록을 보낸다.
* 결론적으로 어떤 종류의 `Form` 이던지, 
  * 창구직원은 모든 부서에게 `Form` 을 전달하고,
  * 해당 `Form` 을 전달할 때, 중앙 저장소에서 각 부서에 맞는 모든 기존 데이터를 함께 넘긴다.

### last

* 이제 `Form` 의 양식을 살펴보자. 모든 `Form` 은 아래와 같이 구성되어 있다.
  * **Type**: *CLAIM(청구)* 
  * **Payload**: *Name: neo, Claim Amound: $100*
  * 위의 경우, neo 라는 고객이 $100 을 청구하는 `Form` 이다.
* 우리 보험사에서 처리할 서류는 
  * Create Policy - 보험 가입 서류
    * 이름: neo
    * 보험료: $20
  * Create Claim - 청구 서류
    * 이름: neo
    * 청구액: $100
  * Delete Policy - 보험 해지 서류
    * 이름: neo

---

이제 창구직원 => 부서 => 중앙 데이터 저장소 로 흐르는 흐름을 정리해보자.

* 창구: "여기 새로운 `Form` 이 왔어요! 그리고 기존의 모든 여러분과 관련된 데이터도 있어요!"
* 1번 부서(Claim)
  * `Form` & `[...claims]` 을 받았다!
  * 이거 우리가 처리할 `Form` 맞아? (Type: CLAIM)
    * Yes: `Form` 에서 payload 꺼내고, `[...claims, payload]` 에 추가해서(changed) 중앙저장소로 보내!
    * No: 뭐야이거? 그냥 `[...claims]` (unchanged) 다 중앙저장소로 보내!
* 3번 부서(Accounting)
  * `Form` 과 회사 계좌 잔고`$1000`를 받았다!
  * 이거 청구야?
    * Yes(청구) : payload 에 든 내용을 봐봐! 얼마달래? `$100`?  주고 남은거 올려보내!
      * `$900`
    * No: 그럼 가입이야?
      * Yes: GOOD! 계좌에 가입비(`$20`) 추가해서 보내!
        *  `$1020`
      * No: 뭐야 그럼? 돈가방 그대로 다시 올려보내
        * `$ 1000`
* 2번 부서(Policiy)
  * `Form` & `[...names]` 을 받았다!
  * 이거 가입이나 해지관련 `Form` 이야?
    * No: 뭐야이거..?
      * `[...names]` 그대로 중앙저장소로 보내!
    * Yes: 그럼 해지야, 가입이야?
      * 해지: `[...names]` 에서 `Form` 에 적힌 payload 빼고 보내! `[...names - neo]`
      * 가입: `[...names]` 에 `Form` 에적힌 payload 더하고 보내! `[...names, neo]`

## Mappging Redux

#### **Action Creator => Action => Dispatch => Reducer => State**

| 1                  | 2      | 3         | 4       | 5                 | *      |
| ------------------ | ------ | --------- | ------- | ----------------- | ------ |
| Action Creator     | Action | Dispatch  | Reducer | State             | React  |
| 고객(`Form`가져옴) | `Form` | 창구 직원 | 부서    | 부서별 데이터집합 | 매니저 |

* Action Creator
  * 순수한 js object 를 생성/리턴하는 함수
* Action
  * 위에서 생성된 js object
  * `type` 과 `payload` 항목을 갖는다.
* Dispatch
  * js object 를 받아서 복사하고
  * 모든 reducer 에게 보낸다
* Reducer
  * state 를 받아서 살펴보고
  * 목적에 맞게 가공하거나 그냥 리턴하는 함수
  * 각각 맞게 필요한 데이터들이 있다.
* State
  * 각 Reducer 가 생성한 모든 데이터를 가지고 있는 object

## Modeling with Redux

codepen.io

Setting => redux => JS only

### Action Creator & Action

```js
console.clear(); // Remove all logs

// 사람들이 Form 을 던지고 간다. (Action Creator)
// 보험 가입
const createPolicy = (name, amount) => {
  return { // Action (Form)
    type: 'CREATE_POLICY', // convention: All caplital & _
    payload: {
      name: name, // name, amount
      amount: amount
    }
  }
}

// 보험 해지
const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  }
}

// 청구 작성
const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  }
}

```

Action Creator 함수의 모습이 거-의 비슷하다. 앞으로 redux app 에 작성하게 될 모든 코드가 이렇게 비슷할 것이다.  Redux 는 코드 구조가 어려운게 아니라, 흐름에 대한 이해가 어려운 것이다.

## Reducer 생성하기

dispatch 는 Redux 가 이미 만들어두었다. 우리는 reducer 를 생성하겠다!

아래 흐름이 Reducer(부서) 가 해야할 일들이다.

* 창구: "여기 새로운 action 이 왔어요! 그리고 기존의 모든 여러분과 관련된 데이터도 있어요!"
* 1번 부서(Claim History)
  * `action` & `[...claims]` 을 받았다!
  * 이거 우리가 처리할 `Form` 맞아? (Type: CLAIM)
    * Yes: `Form` 에서 payload 꺼내고, `[...claims, payload]` 에 추가해서(changed) 중앙저장소로 보내!
    * No: 뭐야이거? 그냥 `[...claims]` (unchanged) 다 중앙저장소로 보내!
* 3번 부서(Accounting)
  * `Form` 과 회사 계좌 잔고`$1000`를 받았다!
  * 이거 청구야?
    * Yes(청구) : payload 에 든 내용을 봐봐! 얼마달래? `$100`?  주고 남은거 올려보내!
      * `$900`
    * No: 그럼 가입이야?
      * Yes: GOOD! 계좌에 가입비(`$20`) 추가해서 보내!
        *  `$1020`
      * No: 뭐야 그럼? 돈가방 그대로 다시 올려보내
        * `$ 1000`
* 2번 부서(Policiy)
  * `Form` & `[...names]` 을 받았다!
  * 이거 가입이나 해지관련 `Form` 이야?
    * No: 뭐야이거..?
      * `[...names]` 그대로 중앙저장소로 보내!
    * Yes: 그럼 해지야, 가입이야?
      * 해지: `[...names]` 에서 `Form` 에 적힌 payload 빼고 보내! `[...names - neo]`
      * 가입: `[...names]` 에 `Form` 에적힌 payload 더하고 보내! `[...names, neo]`

```js
// Action Creator
...
// Reducers (부서)
const claimsHistory = (oldListOfClaims=[], action) => { // [...claims] & Form
  if(action.type === 'CREATE_CLAIM') {
    // claim 관련 내용이야? (이 경우에는 createClaim)
    return [...oldListOfClaims, action.payload]
    
  } else {
    // claim 관련 내용이 아니구만
    return oldListOfClaims;
  }
}
```

`oldListOfClaims.push(action.payload)` 는 안되나요? `push()` 는 원본을 바꾸고 위는 복사본을 내놓는다! Reducer 에서는 절-대 기존 데이터를 바꿔서는 안된다. 대신 언제나 새로운 데이터를 `return`해야한다. 고로 reducer 안에서는 절-대 `push`, `pop`,  `splice` 같은 메서드를 봐서는 안된다.

한가지 생각해볼 만한 일은, 만약 `claimsHistory()` 가 처음 호출될 경우에는, 즉 기존의 `claims` 가 없을 경우에는! `oldListOfClaims` 가 존재할 수 가 없다. 때문에 처음 호출될 때의 `oldListOfClaims` 는 `undefined` 일 것이기에, default argument 를 사용해 주자.

```js
// Action Creator
...
// Reducers (부서)
const claimsHistory = (oldListOfClaims=[], action) => { // [...claims] & Form
  if(action.type === 'CREATE_CLAIM') {
    // claim 관련 내용이야? (이 경우에는 createClaim)
    return [...oldListOfClaims, action.payload]
    
  } else {
    // claim 관련 내용이 아니구만
    return oldListOfClaims;
  }
}

const accounting = (bagOfMoney=1000, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.ammountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  } else {
    return bagOfMoney
  }
}
```

## Reducer 법칙

마지막 남은 reducer 를 생성해보자! 바로 Policy

```js
console.clear(); // Remove all logs

// 사람들이 Form 을 던지고 간다. (Action Creator)
// 보험 가입
const createPolicy = (name, amount) => {
  return {
    // Action (Form)
    type: "CREATE_POLICY", // convention: All caplital & _
    payload: {
      name: name, // name, amount
      amount: amount
    }
  };
};

// 보험 해지
const deletePolicy = name => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

// 청구 작성
const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

// Reducers (부서)
const claimsHistory = (oldListOfClaims = [], action) => {
  // [...claims] & Form
  if (action.type === "CREATE_CLAIM") {
    // claim 관련 내용이야? (이 경우에는 createClaim)
    return [...oldListOfClaims, action.payload];
  } else {
    // claim 관련 내용이 아니구만
    return oldListOfClaims;
  }
};

const accounting = (bagOfMoney = 1000, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.ammountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  } else {
    return bagOfMoney;
  }
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name);
  } else {
    return listOfPolicies;
  }
};

```



## 테스트해보기

이제 3개의 action creator 와 발행된 action 을 처리하는 reducer 를 완성했다.

이제 남은건 이 모든걸 `store` 라는 곳에 담아야 한다.

```js
console.clear(); // Remove all logs

// 사람들이 Form 을 던지고 간다. (Action Creator)
// 보험 가입
const createPolicy = (name, amount) => {
  return {
    // Action (Form)
    type: "CREATE_POLICY", // convention: All capital & underbar
    payload: {
      name: name, // name, amount
      amount: amount
    }
  };
};

// 보험 해지
const deletePolicy = name => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

// 청구 작성
const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

// Reducers (부서)
const claimsHistory = (oldListOfClaims = [], action) => {
  // [...claims] & Form
  if (action.type === "CREATE_CLAIM") {
    // claim 관련 내용이야? (이 경우에는 createClaim)
    return [...oldListOfClaims, action.payload];
  } else {
    // claim 관련 내용이 아니구만
    return oldListOfClaims;
  }
};

const accounting = (bagOfMoney = 1000, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.ammountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  } else {
    return bagOfMoney;
  }
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name);
  } else {
    return listOfPolicies;
  }
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

const action = createPolicy('neo', 20);

store.dispatch(action);

console.log(store.getState()); // 중앙 데이터 가져오기
```

`store.dispatch()` 는 정확하게 창구 직원과 같다! 직원에게 `Form` 을 넘겨줬듯이, action 을 dispatch 에게 넘겨주면 나머지는 모두 알아서 해결된다!

#### Refactor

```js
console.clear(); // Remove all logs

// 사람들이 Form 을 던지고 간다. (Action Creator)
// 보험 가입
const createPolicy = (name, amount) => {
  return {
    // Action (Form)
    type: "CREATE_POLICY", // convention: All capital & underbar
    payload: {
      name: name, // name, amount
      amount: amount
    }
  };
};

// 보험 해지
const deletePolicy = name => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

// 청구 작성
const createClaim = (name, amountToGet) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountToGet
    }
  };
};

// Reducers (부서)
const claimsHistory = (oldListOfClaims = [], action) => {
  // [...claims] & Form
  if (action.type === "CREATE_CLAIM") {
    // claim 관련 내용이야? (이 경우에는 createClaim)
    return [...oldListOfClaims, action.payload];
  } else {
    // claim 관련 내용이 아니구만
    return oldListOfClaims;
  }
};

const accounting = (bagOfMoney = 1000, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  } else {
    return bagOfMoney;
  }
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name);
  } else {
    return listOfPolicies;
  }
};

const { createStore, combineReducers } = Redux;

const departments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(departments);

store.dispatch(createPolicy('neo', 20));
store.dispatch(createPolicy('tak', 40));
store.dispatch(createPolicy('john', 100));

store.dispatch(createClaim('neo', 1000));
store.dispatch(createClaim('tak', 30));

store.dispatch(deletePolicy('neo'));

console.log(store.getState()); // 중앙 데이터 가져오기
```



## 중요!

ActionCreator => Action => dispatch => Reducers => State

`combineReducers()`

* 모든 함수들이 하나로 합쳐져야 한다.
* `state` 에서 `key` 로 쓰인 값들이, `ourDepartments` 의 `key` 값들이다. `accounting` 를 `myMoney` 로 바꿔도 되고, 바꾸는 경우도 있으나, 보통 같이 둔다.

`store.getState()` 는 모든 `dispatch` 사이에 넣어도 상관없다.

Redux 에서 `state` 를 수정할 수 있는 유일한 방법은 `.dispatch(action)` 뿐이다. 직접 접근이 불가능하다. `dispatch` - `action` 의 조작만으로 `state` 에 접근해야 한다.

### 그래서 왜씀..

App 이 커지면 커질수록 복잡도는 exponential 로 증가한다.

하지만 redux 는 복잡도의 증가가 매우 linear 하게 증가한다(이론적으로).

왜냐하면 데이터의 접근/수정에 대한 모든 정보가 redux 에 담겨있기 때문에, actionCreator 만을 보면 되고, 실제로 action 으로만 데이터에 접근할 수 있기에 데이터(state) 의 조작을 매우 제한하여 복잡도를 줄인다.

