# Building Content with JSX

## JSX 란 무엇인가?!

JSX 는 우리가 작성한대로 보여지는것이 아니라  React 의 함수 `createElement()` 를 사용하여 HTML 을 만들어준다. Babel 에서 확인해보면, 왜 쓰는지 알 수 있다.

* JS 에서 사용하는 사투리 (HTML아님!)
* 브라우저는 JSX 몰라요ㅠ 함수호출임! (Babel)
* 약간의 차이가 있지만, 형태나 기능이 HTML 과 매우 유사

## HTML => JSX

```html
<div>
  <label for="name" class='name_label'>Enter Name:</label>
  <input id="name" type="text" />
  <button style="background-color: blue; color:white;">
    Submit!
  </button>
</div>
```

```jsx
...
const App = () => {
  return(
		<div>
    	<label for="name" class='name_label'>Enter Name:</label>
 			<input id="name" type="text" />
		  <button style="background-color: blue; color:white;">
    		Submit!
		  </button>
    </div>  
  )
}
...
```

외않되?

### JSX Inline Styling

약-간은 다르다

* inline 스타일링은 문법이 다르다
* 클래스 이름을 줄때 다르다
* JSX 는 JS 변수를 사용할 수 있다.

```html
<div style="background-color: blue; border: solid 1px black"></div>
```

```jsx
<div style={{backgroundColor: 'red', border: 'solid 1px black'}}></div>
```

스타일링에서는 `-` 를 지우고 그 다음 글자를 대문자로 하자!

### Styling => JSX Fromat

```jsx
...
const App = () => {
  return(
		<div>
    	<label for="name" class='name_label'>Enter Name:</label>
 			<input id="name" type="text" />
		  <button style={{ backgroundColor: 'blue', color: 'white'}}>
    		Submit!
		  </button>
    </div>  
  )
}
...
```

> Convention: JSX 안에서 string 을 사용할 때는 `""` 를 사용하지만, 그 안의 js 에서는 `''` 를 사용한다.

### `class` vs `className`

JSX 에서는 class 를 사용하면 알아듣지 못한다. 때문에 `className` 을 사용해야 한다. `class` 를 사용하면 JS 클래스 키워드와 충돌을 하기에 `class` 를 사용한다. 하지만 최근에는 `className` 을 사용하지 않고 `class` 를 사용하도록 하자는 논의도 진행중이다.

```jsx
...
const App = () => {
  return(
		<div>
    	<label for="name" className='name_label'>Enter Name:</label>
 			<input id="name" type="text" />
		  <button style={{ backgroundColor: 'blue', color: 'white'}}>
    		Submit!
		  </button>
    </div>  
  )
}
...
```

### JS 변수 JSX 에서 사용하기

```jsx
...
const App = () => {
  const buttonText = 'Click!'
  return(
		<div>
    	<label for="name" className='name_label'>Enter Name:</label>
 			<input id="name" type="text" />
		  <button style={{ backgroundColor: 'blue', color: 'white'}}>
    		{buttonText}
		  </button>
    </div>  
  )
}
...
```

```jsx
...
function geButtonText() {
  return 'Click!'
}

const App = () => {
  return(
		<div>
    	<label for="name" className='name_label'>Enter Name:</label>
 			<input id="name" type="text" />
		  <button style={{ backgroundColor: 'blue', color: 'white'}}>
    		{getButtonText()}
		  </button>
    </div>  
  )
}
...
```

```jsx
...
const App = () => {
  const buttonText = ['Happy', 'Hacking']
  return(
		<div>
    	<label for="name" className='name_label'>Enter Name:</label>
 			<input id="name" type="text" />
		  <button style={{ backgroundColor: 'blue', color: 'white'}}>
    		{buttonText}
		  </button>
    </div>  
  )
}
...
```

### JSX 가 보여줄수 없는 값

거의 모든걸 다 jSX 안에서 사용할 수 있는것 같지만, 아마 반드시 이 버그에 직면하게 될 것이다.  바로 Object 다.

```jsx
...
const App = () => {
  const buttonText = {happy: 'hacking'}
  const labelText = "Enter Name: "
  const style = { backgroundColor: 'blue', color: 'white'}
  return(
		<div>
    	<label for="name" className='name_label'>{labelText}</label>
 			<input id="name" type="text" />
		  <button style={style}>
    		{buttonText.happy}
		  </button>
    </div>  
  )
}
...
```

### 금지된 Property 찾기

console 에서 확인하면, 안되는게 생각보다 많다는 걸 확인할 수있다. 이 경우에는 `htmlFor`

```jsx
...
const App = () => {
  const buttonText = {happy: 'hacking'}
  const labelText = "Enter Name: "
  const style = { backgroundColor: 'blue', color: 'white'}
  return(
		<div>
    	<label htmlFor="name" className='name_label'>{labelText}</label>
 			<input id="name" type="text" />
		  <button style={style}>
    		{buttonText.happy}
		  </button>
    </div>  
  )
}
...
```

## Exercise

```jsx
 function getTime() {
        return (new Date()).toLocaleTimeString()
    }

    // Creates a functional component
    const App = () => {
        return (
            <div>
                <div>Current Time:</div>
                <h3>12:05 PM</h3>
            </div>
        );
    }

    // Renders the App component into a div with id 'root'
    ReactDOM.render(<App />, document.querySelector('#root'));
</script>
```

```jsx
 function getTime() {
        return (new Date()).toLocaleTimeString()
    }

    // Creates a functional component
    const App = () => {
        return (
            <div>
                <div>Current Time:</div>
                <h3>{getTime()}</h3>
            </div>
        );
    }

    // Renders the App component into a div with id 'root'
    ReactDOM.render(<App />, document.querySelector('#root'));
</script>
```