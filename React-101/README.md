<img src="https://heavy-freeze-7fd.notion.site/image/attachment%3A098631e4-5663-41e4-9b3e-af185edd2548%3Aimage.png?table=block&id=3848290e-e877-80af-bb6f-fb0b9e843c7a&spaceId=8b704442-f479-4009-abae-9361d6797b62&width=840&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl" alt="React 101" />

## Types of react Hooks

1.`state Hook`: It allows you to add state to functional components. You can use it to manage and update the state of your component.

example:
```jsx
import React, { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};
```
2. `effect Hook`: It allows you to perform side effects in functional components. You can use it to fetch data, subscribe to events, or manipulate the DOM.
example:
```jsx
import React, { useState, useEffect } from 'react';
useEffect(() => {
  // This code will run after the component mounts
  console.log('Component mounted');

  // You can also return a cleanup function to run when the component unmounts
  return () => {
    console.log('Component unmounted');
  };
}, []); // The empty array means this effect runs only once, after the initial render
```

3. `context Hook`: It allows you to access the context value in functional components. You can use it to share data between components without passing props down manually at every level.

example:
```jsx
import React, { createContext, useContext } from 'react';
const MyContext = createContext();
const MyComponent = () => {
  const value = useContext(MyContext);
  return <div>{value}</div>;
};

const App = () => {
  return (
    <MyContext.Provider value="Hello, World!">
      <MyComponent />
    </MyContext.Provider>
  );
};
```
4. `ref Hook`: It allows you to create a reference to a DOM element or a React component. You can use it to access the underlying DOM node or to store mutable values that persist across renders.
example:
```jsx
import React, { useRef } from 'react';
const MyComponent = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
};
```

5. `memo Hook`: It allows you to optimize the performance of your functional components by memoizing the result of a function. You can use it to prevent unnecessary re-renders when the props or state of a component haven't changed.
example:
```jsx
import React, { memo } from 'react';
const MyComponent = memo(({ name }) => {
  console.log('Rendering MyComponent');
  return <div>Hello, {name}!</div>;
});

const App = () => {
  return (
    <div>
      <MyComponent name="Alice" />
      <MyComponent name="Bob" />
    </div>
  );
};
```
6. `callback Hook`: It allows you to memoize a function so that it only changes if one of its dependencies has changed. You can use it to optimize the performance of your functional components by preventing unnecessary re-creations of functions.
example:
```jsx
import React, { useState, useCallback } from 'react';
const MyComponent = () => {
    const [count, setCount] = useState(0);
    
    const increment = useCallback(() => {
        setCount(count + 1);
    }, [count]);
    
    return (
        <div>
        <p>You clicked {count} times</p>
        <button onClick={increment}>
            Click me
        </button>
        </div>
    );
    };
```
