# 📖 자바스크립트 질문 정리
> 면접에서 자주 나오는 자바스크립트 질문과 답 정리  

- [prototype](#📌-prototype)
    - [1. 프로토타입이란 무엇인가?](#1-프로토타입이란-무엇인가)
    - [2. 프로토타입을 이용한 메서드 추가와 Function.bind의 차이점은?](#2-프로토타입을-이용한-메서드-추가와-functionbind의-차이점은)
    - [3. Function.bind 되는 이유는?](#3-functionbind-되는-이유는)
    - [4. 상속을 구현해라](#4-상속을-구현해라)
- [this](#📌-this)
    - [1. this는 언제 결정되는가?](#1-this는-언제-결정되는가)
    - [2. this를 변경시키려면?](#2-this를-변경시키려면)
    - [3. bind, call, apply는 무엇인가? 어떤 차이가 있는가?](#3-bind-call-apply는-무엇인가-어떤-차이가-있는가)
    - [4. 화살표 함수에서 this는?](#4-화살표-함수에서-this는)
- [closure](#📌-closure)
    - [1. closure란 무엇인가요? closure의 정의?](#1-closure란-무엇인가요-closure의-정의)
    - [2. closure를 사용한 구현 경험?](#2-closure를-사용한-구현-경험)
    - [3. 커링이란?](#3-커링이란)
    - [4. 고차함수란?](#4-고차함수란)
- [FP](#📌-함수형-프로그래밍)
    - [1. 배열의 고차함수 중 어떤 것을 사용?](#1-배열의-고차함수-중-어떤-것을-사용하는지)
    - [2. reduce의 동작 원리와 구현 방법](#2-reduce가-어떻게-동작하는가-reduce를-직접-구현해봐라)
    - [3. 함수 합성에는 어떤 방법들이 있는가](#3-함수-합성에는-어떤-방법들이-있는가)
    - [4. 합성은 상속과 비교했을 때 어떤 장점이 있는가?](#4-합성은-상속과-비교했을-때-어떤-장점이-있는가)
    - [5. 불변성이란 무엇인가?](#5-불변성immutability란-무엇인가)
- [OOP](#📌-객체-지향-프로그래밍)
    - [1. ES Classes 상속 경험 있는가?](#1-es-classes-상속-경험-있는가)
    - [2. 객체를 나누는 단위는 무엇인가?](#2-객체를-나누는-단위는-무엇인가)
    - [3. 애플리케이션 의존성을 낮추는 방법](#3-애플리케이션-의존성을-낮추는-방법)
- [비동기](#📌-비동기)
    - [1. Promise와 async/await의 차이점은?](#1-promise-와-asyncawait-의-차이점은)
    - [2. Promise 패턴을 설명해 보세요](#2-promise-패턴을-설명해-보세요)
    - [3. SetTimeout에 Promise를 적용한다면?](#3-settimeout에-promise를-적용한다면)
    - [4. 동시에 여러 개의 관계 없는 요청을 한다면?](#4-동시에-여러-개의-관계-없는-요청을-한다면)
    - [5. MicroTask Queue란?](#5-micro-task-queue란)
- [객체](#📌-객체)
- [기타](#📌-기타)

## 📌 prototype
### 1. 프로토타입이란 무엇인가?
- 프로토타입이란 동일한 객체 생성자 함수를 사용할 때 인스턴스 간에 메서드나 프로퍼티를 공유하기 위해 사용된다. 
- 특정 함수나 값을 재사용 함으로써 메모리 효율이 강화된다.
- 예를 들어, 모든 인스턴스의 특정 키 값이 10으로 고정되어 있다고 하자. 프로토타입을 사용하지 않을 경우, 각 인스턴스마다 해당 키를 새롭게 만들어야 하지만 프로토타입을 사용할 경우, 모든 인스턴스가 하나의 키를 참조한다.

### 2. 프로토타입을 이용한 메서드 추가와 Function.bind의 차이점은?
- prototype
    - this를 명시하지 않아도 인스턴스 자기자신을 가리킴
    - 모든 인스턴스가 동일한 메서드를 참조하기 때문에 메모리 효율이 높아짐
- bind
    - this를 명시적으로 바인딩된 객체로 설정
    - 새로운 함수를 반환하므로 메모리 효율이 낮을 수 있음

**prototype 사용 예시**
```js
function Animal(sound) {
    this.sound = sound;
}

Animal.prototype.say = function() {
    console.log(this.sound);
}

const dog = new Animal('멍멍');
const cat = new Animal('야옹');
dog.say(); // 멍멍
cat.say(); // 야옹
```

**Function.bind 사용 예시**
```js
function say() {
    console.log(this.sound);
}

const dog = {
    sound: '멍멍';
};

const cat = {
    sound: '야옹';
};

const dogSay = say.bind(dog);
const catSay = say.bind(cat);
dogSay(); // 멍멍
catSay(); // 야옹
```


### 3. Function.bind 되는 이유는?
> 🤔 질문을 제대로 이해한 건지 모르겠지만
- 프로토타입에 메서드를 추가해서 사용하면 bind 없이도 this는 자동으로 해당 인스턴스에 바인딩된다. *(bind 란 함수의 this 값을 특정 객체로 고정시키는 것)*
- 메서드가 prototype 객체에 정의되면 프로토타입 체인을 통해 생성된 모든 인스턴스에서 해당 메서드를 참조할 수 있기 때문에 bind 처럼 동작하게 된다. 이 때 인스턴스는 프로토타입에 정의된 메서드에 대한 참조를 상속받게 되고, this는 인스턴스 자신을 가리키게 된다. 

### 4. 상속을 구현해라
- 객체 생성자 함수
    - 객체를 만든다. `function 객체이름(프로퍼티,...) {}`
    - 공통 함수나 변수가 있을 경우 prototype으로 만든다.
    - 자식 객체에서 `부모객체.call(...)`으로 상속받는다.
- 클래스
    - 객체를 만든다. `class 객체이름 {}`
    - 생성자를 지정한다. `constructor(프로퍼티,...) {}`
    - 클래스의 메서드는 자동으로 프로토타입이 된다.
    - 자식 객체에서 `class 객체이름 extends 부모객체이름 {}`으로 상속받는다.
    - 자식 객체 `constructor` 내부에서 `super(부모프로퍼티,...)` 로 상속받는다.

```js
// 객체 생성자 함수로 객체 만들기
function Animal(name, age, sound) {
    this.name = name;
    this.age = age;
    this.sound = sound;
}
// 프로토타입에 메서드 추가
Animal.prototype.say = function() {
    console.log(this.sound);
};

// 객체 생성자 함수로 상속 받기
function Dog(age) {
    Animal.call(this, "개", age, "멍멍");
}
// 프로토타입 상속
Dog.prototype = Animal.prototype;
```
```js
// 클래스로 객체 만들기
class Animal {
    constructor(name, age, sound) {
        this.name = name;
        this.age = age;
        this.sound = sound;
    }
    say() {
        console.log(this.sound);
    }
}

// 클래스로 상속 받기
class Dog extends Animal {
    constructor(age){
        super("개", age, "멍멍"); // 부모 클래스 가리킴 
    }
}
```

## 📌 this
### 1. this는 언제 결정되는가?
- 함수가 실행될 때 결정된다. 단, 화살표 함수의 경우에는 함수가 정의될 때 결정된다.
- 아래 `person1.greet()`를 실행했을 때 this는 person1 객체를 참조
- 아래 `person1.greet.bind(person2)`를 실행했을 때 this는 person2 객체를 참조 
```js
const person1 = {
    name: '은지',
    greeting: function() {
        console.log(`안녕하세요, ${this.name}!`);
    }
};

const person2 = {
    name: '영섭'
};

person1.greet(); // 안녕하세요, 은지!
const greet2 = person1.greet.bind(person2);
greet2(); // 안녕하세요, 영섭!
```

### 2. this를 변경시키려면?
- bind, call, apply 를 통해 this를 명시적으로 변경할 수 있다.
- bind, call apply는 Function.prototype 메서드로 모든 함수에서 사용 가능하다.

### 3. bind, call, apply는 무엇인가? 어떤 차이가 있는가?
- bind, call, apply는 함수의 this를 명시적으로 바인딩할 때 사용한다.

**`bind` vs `call, apply`**
> 함수를 호출하는 법  
> `함수()` `함수.call()` `함수.apply()`
- bind
    - 함수가 실행되지 않는다.
    - 새로운 함수를 만들어 return 하기 때문에  `const 새함수 = 함수.bind(...);` 로 선언 후 실행 `새함수();`
- call / apply
    - this를 바인딩 하고 함수를 실행한다.

**`call` vs `apply`**
- call
    - 첫번째 파라미터로 this에 해당하는 객체를 넘긴다.
    - 나머지 파라미터는 함수와 동일하게 컴마(,)를 사용하여 넘긴다.
- apply 
    - 첫번째 파라미터로 this에 해당하는 객체를 넘긴다.
    - 나머지 파라미터는 배열 형태로 넘긴다

**예시**
```js
function greeting(name) {
    console.log(`${this.message}, ${name}!`);
}

const obj = {
    message: "안녕하세요",
}

greeting.call(obj, "은지"); // 안녕하세요, 은지!
greeting.apply(obj, ["은지"]); // 안녕하세요, 은지!
```

### 4. 화살표 함수에서 this는?
**화살표 함수에서 this**
- 함수 자체의 this를 갖지 않는다.
- 상위 스코프의 this를 그대로 참조한다.
- 함수를 정의한 시점에서의 정적인 값으로 this가 결정된다. 따라서 call, apply, bind로 this를 지정할 수 없다.

**일반 함수에서 this**
- 호출 방식에 따라 다르게 정해짐
- 일반 함수 호출: this는 전역 객체 가리킴
- 메서드로 호출: this는 객체 가리킴
- 생성자 함수 호출: this는 생성된 새로운 인스턴스 가리킴
- call, apply, bind 메서드를 사용한 호출: this는 메서드의 첫 번째 인수를 가리킴 


```js
const person1 = {
    name: '은지',
    greetingRegular: function() {
        console.log(`안녕하세요, ${this.name}!`);
    },
    greetingArrow: () => {
        console.log(`안녕하세요, ${this.name}!`);
    }
};

person1.greetingRegular();  // 안녕하세요, 은지
person1.greetingArrow();    // TypeError: Cannot read properties of undefined (reading 'name')
```

## 📌 closure
### 1. closure란 무엇인가요? closure의 정의?
- 클로저는 함수에 private한 변수를 가질 수 있도록 해준다.
- 클로저는 함수를 반환했을 때, 그 함수가 선언된 환경을 기억하고, 그 환경 외부에서도 그 환경에 접근할 수 있는 함수를 말한다. 클로저는 자신이 생성될 때의 환경을 기억하는 함수다.

**클로저 활용 예시**
- 전역 변수의 사용 억제
    - 함수 하나에서 사용되지만 전역 변수여야 하는 경우 클로저를 사용해서 상태 유지가 가능하다.
    - 예시
    ```js
    // 전역 변수 사용
    let cnt = 0;

    function increaseCnt() {
        cnt++;
        console.log(cnt);
    }

    increaseCnt(); // 1
    increaseCnt(); // 2
    increaseCnt(); // 3
    ```
    ```js
    // 함수 내부에 지역 변수 사용
    function increaseCnt() {
        let cnt = 0;
        cnt++;
        console.log(cnt);
    }

    increaseCnt(); // 1
    increaseCnt(); // 1
    increaseCnt(); // 1
    ```
    ```js
    // 클로저 사용 
    function createCounter() {
        let cnt = 0;
        return function() {
            cnt++;
            console.log(cnt);
        }
    }

    const increaseCnt = createCounter();
    increaseCnt(); // 1
    increaseCnt(); // 2
    increaseCnt(); // 3
    ```
- 비슷한 형태의 코드 재사용률 강화 
    - 예시

- 정보의 은닉
    - 예시
    ```js
    function createBankAccount() {

        let balance = 0;

        const deposit = function(money) {
            balance += money;
            console.log(`${money}원 입금`);
        }

        const withdraw = function(money) {
            if (balance >= money) {
                balance -= money;
                console.log(`${money}원 출금`);
            } else {
                console.log('잔액부족');
            } 
        };

        const printBalance = function() {
            console.log(`현재 잔액: ${balance}원`);
        };

        return {
            deposit,
            withdraw,
            printBalance
        };
    }

    const myAccount = createBankAccount();

    myAccount.deposit(5000);    // 5000원 입금 
    myAccount.withdraw(2000);   // 2000원 출금
    myAccount.printBalance();   // 현재 잔액: 3000
    myAccount.deposit(4000);    // 4000원 입금
    myAccount.printBalance();   // 현재 잔액: 7000원
    ```

### 2. closure를 사용한 구현 경험?
- `useState`를 사용한 경험이 있다.
- 참고: [React Hook과 Closure의 관계](https://www.fronttigger.dev/2022/react/react-hook-closure)
```js
const [isAnon, setIsAnon] = useState(false);

const setAnon = () => {
    setIsAnon(true); // 클로저로 setAnon 내부에서 isAnon 참조 가능 
    console.log('익명 설정');
  };
```

### 3. 커링이란?
- 커링이란, input이 여러 개인 함수를 input이 하나인 함수들의 연쇄로 분리하는 기법을 말한다.
- 자세한 개념은 따로 공부를 해야할 것 같다.

### 4. 고차함수란?
- 고차함수란, 함수를 input 또는 output으로 사용하는 메서드를 말한다. 즉, 파라미터로 함수를 입력받거나 연산의 결과로 함수를 반환해줄 수 있는 함수형 프로그래밍의 핵심 기능이다. 

**고차함수 예시**
```js
const numbers = [1, 2, 3, 4, 5];

const isEvenNumbers = numbers.map((number) => {
    return (number % 2 === 0);
});
console.log(isEvenNumbers); // [false, true, false, true, false]
```

## 📌 함수형 프로그래밍
### 1. 배열의 고차함수 중 어떤 것을 사용하는지?
- map: JSON 데이터 받아올 때 자주 사용
    ```js
    const qnas = [
        {
            id: 1,
            question: '첫 번째 질문',
            answer: '첫 번째 답'
        }, 
        {
            id: 2,
            question: '두 번째 질문',
            answer: '두 번째 답'
        }
    ];
    
    const chatDetail = qnas(qna => ({
        id: qna.id,
        question: qna.question,
        answer: qna.answer,
    }));
    ```
- forEach: 배열 값을 순회해야 할 때 사용
- reduce: 반복되는 연산을 처리할 때 사용 
- [그 외의 다양한 배열 고차함수](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B0%B0%EC%97%B4-%EA%B3%A0%EC%B0%A8%ED%95%A8%EC%88%98-%EC%B4%9D%EC%A0%95%EB%A6%AC-%F0%9F%92%AF-mapfilterfindreducesortsomeevery)

### 2. reduce가 어떻게 동작하는가? reduce를 직접 구현해봐라
- reduce 는 현재 상태 (누적된 이전 상태와 현재 배열 요소 값)와 함수를 받아 새 상태를 리턴하도록 동작한다.
- reduce 문법
```js
array.reduce((누적값, 현재배열요소값, *현재배열인덱스값, *배열) => {
    // 연산
}, 누적값의 초기값);
```
- reduce 직접 구현해보기
```js
function reduce(array, callbackFunc, initialValue) {
    // 초기화
    let accumultor = initialValue !== undefined ? initialValue : array[0];
    const startIndex = initialValue !== undefined ? 0 : 1;


    for (let i = startIndex; i < array.length; i++) {
        accumulator = callbackFunc(accumulator, array[i], i, array);
    }
    return accumulator;
}
```

### 3. 함수 합성에는 어떤 방법들이 있는가?

- 함수 합성 (function composition) 이란, 기존 함수들을 조합하여 새로운 함수를 만드는 것이다. 
- 함수를 합성하는 방법은 (1) 메서드 체이닝 (2) 고차함수 가 있다.

**간단히 함수 합성**
```js
function addOne(num) {
    return num + 1;
}
function square(num) {
    return num * num;
}

console.log(square(addOne(2))); // 9
```

**고차함수를 이용한 함수 합성**
```js
function addOne(num) {
    return num + 1;
}
function square(num) {
    return num * num;
}
// addOne과 square를 합성하는 함수
function compose(square, addOne) {
    return function (num) {
        return square(addOne(num));
    }
}
const composedFunc = compose(square, addOne);
console.log(composedFunc(2)); // 9
```

**reduce 메서드를 사용한 함수 합성 (1)**
> compose(함수1, 함수2, 함수3)(x) 일 때 함수3부터 실행됨
```js
const compose = (func1, func2) => val => func2(func1(val));
const compute = compose(addOne, square); // square(addOne(val))
console.log(compute(2)); // 9
```
```js
// function 개수가 정해져 있지 않을 때 
function compose(...funcs) {
    return function (initialVal) {
        return funcs.reduceRight((val, func) => func(val), initialVal);
    }
}
// 위와 동일
const compose = (...funcs) => (initialVal) => funcs.reduceRight((val, func) => func(val), initialVal);

// compose 호출 예시
compose(square, square, addOne)(2); // 81
square(square(addOne(2))); // 81
```

**reduce 메서드를 이용한 함수 합성 (2)**
> pipe(함수1, 함수2, 함수3)(x) 일 때 함수1부터 실행됨 
```js
function pipe(...funcs) {
    return function (initialVal) {
        return funcs.reduce((val, func) => func(val), initialVal);
    }
}

compose(square, square, addOne)(2); // 17
addOne(addOne(square(2))); // 17
```

### 4. 합성은 상속과 비교했을 때 어떤 장점이 있는가?
> 참고자료: [상속을 자제하고 합성을 이용하자](https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5%EC%9D%98-%EC%83%81%EC%86%8D-%EB%AC%B8%EC%A0%9C%EC%A0%90%EA%B3%BC-%ED%95%A9%EC%84%B1Composition-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#%EC%83%81%EC%86%8D%EC%9D%98_%EB%8B%A4%EC%82%AC%EB%8B%A4%EB%82%9C%ED%95%9C_%EB%AC%B8%EC%A0%9C%EC%A0%90)

- 합성과 상속은 중복되는 코드를 재사용하는 기법으로 사용된다. 그러나 상속은 객체 간의 결합도가 높아지기 때문에 지양하는 것이 좋고, 합성을 통해 코드를 재사용 하는 것이 좋다. 자세한 내용은 다음과 같다.


**상속을 지양해야 하는 이유**
- 상속은 결합도가 높아진다. 부모 클래스의 변경이 자식 클래스에 영향을 미치고, 자식 클래스의 변경이 부모 클래스나 다른 자식 클래스에 영향을 줄 수 있기 때문에 코드 유지보수가 어려워질 수 있다.
- 부모 클래스의 기능을 확장하려면 자식 클래스에서 부모 클래스의 메서드를 오버라이드 해야 한다.


**합성을 지향해야 하는 이유**
- 합성은 결합도가 낮다. 각 객체는 독립적으로 존재하며, 변경이 발생해도 다른 객체에 영향을 주지 않는다.
- 합성은 각 객체를 작고 의미있는 기능 단위로 분리할 수 있기 때문에 각 객체의 재사용성이 높아진다. 따라서 유지보수성과 확장성이 향상된다.


**리액트에서 합성은 어떻게 쓰일까?**
- 함수형 컴포넌트 사용 
```js
// component composition
function Container({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}

function Block() {
    return (
        <Container>
            <h2>title</h2>
            <p>text</p>
        </Continer>
    )
}
```
```js
function AlertMessage({ type, message }) {
    return (
        <div className={`alert ${type}`}>
            {message}
        </div>
    );
}

function App() {
    return (
        <div>
            <AlertMessage type="info" message="정보 메시지" />
            <AlertMessage type="warning" message="경고 메시지" />
            <AlertMessage type="error" message="에러 메시지" />
        </div>
    )
}
```

### 5. 불변성(immutability)란 무엇인가?
- 불변성은 데이터의 변경이 불가함을 의미한다. 데이터가 한 번 생성되고 설정된 후에는 수정되지 않는다. 메모리영역 안에서 변경이 불가능하고 변수에 할당할 때 완전히 새로운 값이 만들어져 재할당된다.
- 불변성을 지켜줘야지만 리액트 컴포넌트에서 상태가 업데이트 됐음을 감지할 수 있고 이에 따라 필요한 리렌더링이 진행된다. 또한 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있다.

**리액트에서 불변성을 지켜야 하는 이유**
> 참고자료: [React의 불변성](https://velog.io/@badahertz52/%EC%B0%B8%EC%A1%B0%ED%83%80%EC%9E%85%EA%B3%BC-React%EC%9D%98-%EB%B6%88%EB%B3%80%EC%84%B1)
- 리액트의 state 변화 감지 기준은 콜 스택의 주소값이기 때문이다. (얕은 비교)
- 주소를 비교하기 때문에 리액트의 state를 빠르게 감지할 수 있는 것이다.
- 참고로 React는 불변성에 기반하여 상태 관리를 하고, Vue는 상태가 변하는 것을 허용한다. ([참고](https://itchallenger.tistory.com/732))

**타입에 따른 불변성**
- immutable type (원시 타입)
    - Boolean
    - String
    - Number
    - Null
    - undefined
    - Symbol
- mutable type (참조 타입)
    - Object
    - Array

```js
// immutable
let a = 1;
let b = a;
b = 2;

console.log(a); // 1
console.log(b); // 2
```
```js
// mutable
let c = {name: 'c'};
let d = c;
d.name = 'd';

console.log(c); // 'd'
console.log(d); // 'd'
```
**배열의 불변성을 지키려면?**
```js
// mutable example
let x = [1, 2];
let y = x;

x.push(3);

console.log(x); // [1, 2, 3]
console.log(y); // [1, 2, 3]
```
```js
// (1) spread 연산자 사용
let x = [1, 2];
let y = [...x]; // 새로운 배열 생성하여 x 값 복사

x.push(3);

console.log(x); // [1, 2, 3]
console.log(y); // [1, 2]
```
```js
// (2) concat 사용
let x = [1, 2];
let y = x.concat(); // 새로운 배열 생성하여 x 값 복사 

x.push(3);

console.log(x); // [1, 2, 3]
console.log(y); // [1, 2]
```

### 6. Immutable의 단점이 있는가?
- 메모리가 증가한다. 불변성을 유지하는 대신 새로운 데이터를 생성해야 하기 때문에 메모리 사용량이 증가한다.
- 특히 대규모 데이터를 다루는 경우에는 성능 문제를 고려해야 한다. 
- *🤔 redux 사용 이유? 이건 나중에 공부하자*

## 📌 객체 지향 프로그래밍
### 1. ES Classes 상속 경험 있는가?
- 없다. 함수형 컴포넌트만 사용해봤다.

### 2. 객체를 나누는 단위는 무엇인가?
- 기능 단위로 객체를 나눈다. 리액트에서는 컴포넌트가 객체가 된다.
- 각각의 컴포넌트는 자신의 state와 props를 가질 수 있다. state와 props를 이용하면 컴포넌트 간에 데이터를 전달하고 기능을 조합할 수 있다.

### 3. 애플리케이션 의존성을 낮추는 방법
- 컴포넌트를 독립적인 기능 단위로 나눈다. 그리고 컴포넌트 간의 의존성을 줄인다.
- 상태 관리 라이브러리 (Redux) 를 사용하여 상태를 중앙에서 관리한다. 이를 통해 컴포넌트 간의 데이터 전달을 줄이고 각 컴포넌트 간의 의존성을 줄일 수 있다.
- 공통 로직은 utils 또는 커스텀 훅으로 분리하여 의존성을 낮춘다.
- UI를 표시하는 컴포넌트와 데이터를 관리하고 로직을 처리하는 컴포넌트를 구분한다. 이로 UI와 로직 간의 의존성을 낮출 수 있다. 
- React.memo와 같은 메모이제이션 기술을 사용하여 렌더링 최적화를 한다. 상위 컴포넌트의 렌더링이 발생하더라도 하위 컴포넌트들이 불필요하게 재렌더링 되지 않도록 하면 컴포넌트 간의 결합도를 낮출 수 있고 성능도 향상된다.

## 📌 비동기
### 1. Promise 와 async/await 의 차이점은?

**개념**
- Promise와 async/await는 모두 자바스크립트에서 비동기 작업을 다루는 방식이다.
- Promise는 비동기 작업 처리를 위한 객체로 상태에 따라 다르게 처리할 수 있다.
- async/await는 Promise를 더 간단하고 동기적으로 다룰 수 있게 해주는 문법이다. async 함수 내에서 await 키워드를 사용하여 Promise가 처리될 때까지 기다리는 방식으로 동작한다.

**차이점**
- Promise
    - 에러 처리 시 .catch() 문을 통해 에러 핸들링이 가능하다.
    - Promise는 .then() 지옥, 콜백 지옥의 가능성이 있다.
    - 체이닝을 통해 비동기 작업을 연결한다.

- async/await
    - 에러 핸들링 기능이 없기 때문에 try/catch 구문을 활용해야 한다.
    - 비동기 코드가 동기 코드처럼 읽히게 해 코드 흐름의 가독성을 높인다. 
    - 선언적 코드를 사용하여 비동기 작업을 다룬다.

### 2. Promise 패턴을 설명해 보세요
- Promise는 네 가지 상태를 가진다. 
    - pending - 작업 시작 전
    - fulfilled - 작업 성공
    - rejected - 작업 실패
    - settled - 처리 완료 또는 거부됨
- Promise는 pending 상태로 작업이 시작하기를 대기한다. 작업이 시작되면 fulfill 또는 reject 로 상태가 변경된다. 작업이 성공하면, fulfill 상태가 되고 then() 의 콜백 함수가 호출된다. 이후 settled 상태가 된다. 작업이 실패하면, reject 상태가 되고 catch() 의 콜백 함수가 호출된다. 
- 만약 Promise가 여러 개 생성되어 있고 (func1, func2, func3) 순차적으로 비동기 작업을 진행해야 한다면 func1이 끝난 후 func2를 return 해주는 형식으로 구현할 수 있다.
```js
// message를 받아서 Promise를 반환 
const log = function(message) {
    return new Promise((resolve, reject) => {
        console.log('LOG:', message);
        resolve(message); // message를 then의 콜백함수로 넘김 
    })
};

log('부팅 시작').then(function(result) {
    // result = '부팅 시작'
    return log('네트워크 설정 중...');
}).then(function(result) {
    return log('유저 프로필 설정 중...');
}).then(function(result) {
    return log('반갑습니다');
}).catch(function(error) {
    console.log(error);
});
```

**Promise 객체를 다룰 때 사용되는 콜백 함수**
- `resolve()`: Promise가 성공적으로 완료되었을 때 호출되는 콜백 함수로 then() 메서드로 연결된 콜백함수에 전달된다. 위 코드에서 result가 message가 되는 이유다.
- `reject()`: Promise가 실패했을 때 호출되는 콜백 함수로 catch() 메서드로 연결된 콜백함수에 전달된다. 위 코드에서 error 값이 된다.

### 3. setTimeout에 Promise를 적용한다면?
- setTimeout은 Promise를 반환하지 않기 때문에 async/await를 적용해도 동기적으로 적용되지 않는다. 따라서 Promise를 반환하게 직접 작성 후 async/await를 적용해야 한다.
- 참고자료: [Await a setTimeout](https://dev.to/francisprovost/await-a-settimeout-1fje)
```js
const wait = (delayTime) => new Promise((resolve) => setTimeout(resolve, delayTime));

async function delayLog() {
    try {
        console.log('Hello');
        await wait(1000);
        console.log('Thank you');
        await wait(1000);
        console.log('Bye');
    } catch (error) {
        console.log(error);
    }
}

delayLog();
```

### 4. 동시에 여러 개의 관계 없는 요청을 한다면?
- 비동기 처리를 통해 작업 속도를 높일 수 있다.
- 순차적 비동기 작업이 필요 없는 경우 Promise.all() 을 사용할 수 있다. 

### 5. Micro task queue란?
- 참고 자료: [Task Queue말고 다른 큐가 더 있다고? (MicroTask Queue, Animation Frames)](https://velog.io/@titu/JavaScript-Task-Queue%EB%A7%90%EA%B3%A0-%EB%8B%A4%EB%A5%B8-%ED%81%90%EA%B0%80-%EB%8D%94-%EC%9E%88%EB%8B%A4%EA%B3%A0-MicroTask-Queue-Animation-Frames-Render-Queue)
## 📌 객체
### 1. 객체 표현 방식 중 자주 사용하는 것은?
- 리터럴 표기법을 가장 많이 사용한다.
```js
const cat = {
    name: '고양이',
    sound: '야옹'
}
```
**그 외에 객체 표현 방식**
- 함수 생성자
```js
function Cat(name, age) {
    this.name = name;
    this.sound = sound;
}

const cat = new Cat('고양이', '야옹');
```
- 객체 생성자: 빈 객체를 생성할 때 사용
```js
const cat = new Object();
cat.name = '고양이';
cat.sound = '야옹';
```
- Object.create(): 프로토타입을 상속받아 객체 생성
```js
const prototype = {
    say: function() {
        return this.sound;
    }
};
const cat = Object.create(prototype);
cat.name = '고양이';
cat.sound = '야옹';
```

### 2. class, prototype, literal 차이는?
- class
    - `class` 키워드를 사용하여 객체를 생성한다.
    - 클래스 내부에서 프로퍼티와 메서드를 정의한다.
    - prototype 기반 상속을 사용하지만 prototype을 사용하는 것보다 문법이 간단하다.
    - 상속이 가능하다 (`extends`)
- prototype
    - `new` 키워드를 사용하여 객체를 생성한다.
    - 다른 객체의 prototype을 기반으로 생성된다.
        - `Object.prototype.메서드이름`
    - 생성자 함수의 prototype에 프로퍼티와 메서드를 추가할 수 있다.
    - 모든 인스턴스가 공통된 prototype을 공유한다. 따라서 메모리 측면에서 효율적이다.
- literal
    - 중괄호 `{}`를 사용하여 객체를 생성한다.
    - 생성 시점에 프로퍼티와 메서드를 정의할 수 있다.
    - 상속 구조를 사용하지 않는다. 따라서 prototype chain이 더 짧다.
### 3. 자주 사용하는 메서드는?
- 객체를 많이 다루지 않아 자주 사용하는 메서드는 없지만, 알고리즘 문제를 풀 때 `keys()` 나 `values()` 를 사용해 본 경험이 있다.
### 4. JSON 파싱 시 가장 신경 쓰는 것은?
- JSON.parse() 메서드는 문자열 형식의 JSON 데이터를 자바스크립트 객체로 변환한다.
- JSON 형식을 잘 확인해야 한다. 모든 키가 큰 따옴표로 묶였는지 확인해야 하고, 배열과 객체는 올바른 괄호로 묶여 있어야 한다. 올바르지 않은 형식의 경우를 고려하여 try-catch 문으로 예외 처리를 해야 한다.
- 시간, 날짜 및 사용자 정의 형식은 자동으로 변환할 수 없다. 따라서 이러한 타입은 추가적으로 처리해야 한다.
- 참고 자료: [자바스크립트 문자열을 JSON으로 변환 (JSON.parse)](https://sisiblog.tistory.com/398)
## 📌 디버깅
### 1. 버그 문제를 어떻게 해결하는가?
### 2. 본인만의 디버깅 방식은?
### 3. calling stack이란?
### 4. 네트워크 오류 상황에 어떻게 확인하는가?
## 📌 기타
### 1. generator란?
### 2. ES Next 관심있는 문법이 있는가?
### 3. 정규표현식은 언제 써봤는가?

## 🔗 References
- [자바스크립트 면접 단골 질문](https://www.youtube.com/watch?v=zrzZXhDiiLs&t=321s)
- [프론트엔드 개발자 기술 면접 정리](https://sunnykim91.tistory.com/121)