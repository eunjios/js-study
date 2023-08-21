# 📖 자바스크립트 질문 정리
> 면접에서 자주 나오는 자바스크립트 질문과 답 정리

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
- 함수 안에서 선언한 변수를 함수 밖에서도 사용할 수 있는 것
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
- 클로저 사용 경험 없음
- 규모가 큰 프로젝트 경험이 없기 때문에 유지보수성을 크게 신경쓰지 않아서 클로저 사용 이유가 와닿지 않았던 것 같다.

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
- [그 외의 다양한 배열 고차함수](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B0%B0%EC%97%B4-%EA%B3%A0%EC%B0%A8%ED%95%A8%EC%88%98-%EC%B4%9D%EC%A0%95%EB%A6%AC-%F0%9F%92%AF-mapfilterfindreducesortsomeevery)

## 📌 함수형 프로그래밍
## 📌 객체 지향 프로그래밍
## 📌 비동기
## 📌 객체
## 📌 디버깅
## 📌 기타

## 🔗 References
- [자바스크립트 면접 단골 질문](https://www.youtube.com/watch?v=zrzZXhDiiLs&t=321s)
- [프론트엔드 개발자 기술 면접 정리](https://sunnykim91.tistory.com/121)