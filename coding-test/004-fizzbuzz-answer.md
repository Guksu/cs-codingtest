# 코딩 테스트 #4: FizzBuzz - 정답 및 해설

**날짜**: 2025-11-03

## 당신의 풀이

```typescript
function solution(n: number): string[] {
  const answer: string[] = [];

  function checkFizzBuzz(n: number): string {
    if (n % 3 === 0 && n % 5 === 0) {
      return "FizzBuzz";
    }

    if (n % 5 === 0) {
      return "Buzz";
    }

    if (n % 3 === 0) {
      return "Fizz";
    }

    return n.toString();
  }

  for (let i = 1; i <= n; i++) {
    answer.push(checkFizzBuzz(i));
  }

  return answer;
}
```

**결과**: ✅ 모든 테스트 통과!

## 코드 분석

### 접근 방법: 조건문 체크

당신의 풀이는 **깔끔한 헬퍼 함수 분리**와 **명확한 조건 순서**를 사용한 모범 답안입니다! 👍

**핵심 아이디어:**
1. 1부터 n까지 순회
2. 각 숫자마다 조건 체크
3. 15의 배수 (3과 5의 배수)를 먼저 체크 - 중요!
4. 그 다음 5의 배수, 3의 배수 순으로 체크

**시간 복잡도:** O(n)
- 1부터 n까지 한 번씩 순회
- 각 숫자마다 O(1) 연산

**공간 복잡도:** O(n)
- 결과 배열에 n개의 요소 저장

### 동작 원리

```
n = 15일 때:

i=1:  1 % 3 ≠ 0, 1 % 5 ≠ 0         → "1"
i=2:  2 % 3 ≠ 0, 2 % 5 ≠ 0         → "2"
i=3:  3 % 3 = 0                     → "Fizz"
i=4:  4 % 3 ≠ 0, 4 % 5 ≠ 0         → "4"
i=5:  5 % 5 = 0                     → "Buzz"
i=6:  6 % 3 = 0                     → "Fizz"
i=7:  7 % 3 ≠ 0, 7 % 5 ≠ 0         → "7"
i=8:  8 % 3 ≠ 0, 8 % 5 ≠ 0         → "8"
i=9:  9 % 3 = 0                     → "Fizz"
i=10: 10 % 5 = 0                    → "Buzz"
i=11: 11 % 3 ≠ 0, 11 % 5 ≠ 0       → "11"
i=12: 12 % 3 = 0                    → "Fizz"
i=13: 13 % 3 ≠ 0, 13 % 5 ≠ 0       → "13"
i=14: 14 % 3 ≠ 0, 14 % 5 ≠ 0       → "14"
i=15: 15 % 3 = 0 && 15 % 5 = 0     → "FizzBuzz" ✨
```

### 조건 순서가 중요한 이유

```typescript
// 잘못된 순서 ❌
if (n % 3 === 0) {
  return "Fizz";  // 15는 여기서 걸려서 "Fizz" 반환!
}
if (n % 5 === 0) {
  return "Buzz";
}
if (n % 3 === 0 && n % 5 === 0) {
  return "FizzBuzz";  // 여기 도달 못함!
}

// 올바른 순서 ✅ (당신의 방법)
if (n % 3 === 0 && n % 5 === 0) {
  return "FizzBuzz";  // 15의 배수를 먼저!
}
if (n % 5 === 0) {
  return "Buzz";
}
if (n % 3 === 0) {
  return "Fizz";
}
```

## 다른 풀이 방법들

### 방법 1: 인라인 조건문 (함수 분리 없이)

```typescript
function solutionInline(n: number): string[] {
  const result: string[] = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      result.push("FizzBuzz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else {
      result.push(i.toString());
    }
  }

  return result;
}
```

**특징:**
- 더 간결함
- 15 = 3 * 5를 직접 체크
- 당신의 방법과 본질적으로 동일

### 방법 2: 문자열 연결 (확장 가능한 방식)

```typescript
function solutionStringConcat(n: number): string[] {
  const result: string[] = [];

  for (let i = 1; i <= n; i++) {
    let output = "";

    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";

    result.push(output || i.toString());
  }

  return result;
}
```

**장점:**
- 규칙 추가가 쉬움 (예: 7의 배수 → "Bang")
- FizzBuzz 체크 불필요 (자동으로 "Fizz" + "Buzz" = "FizzBuzz")

**동작:**
```
i=15:
  output = ""
  i % 3 === 0 → output = "Fizz"
  i % 5 === 0 → output = "FizzBuzz"
  최종: "FizzBuzz"
```

### 방법 3: map 사용 (함수형)

```typescript
function solutionMap(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const num = i + 1;
    if (num % 15 === 0) return "FizzBuzz";
    if (num % 5 === 0) return "Buzz";
    if (num % 3 === 0) return "Fizz";
    return num.toString();
  });
}
```

**특징:**
- 함수형 프로그래밍 스타일
- 배열을 선언하지 않고 바로 생성

### 방법 4: 재귀 (비효율적이지만 재미있음)

```typescript
function solutionRecursive(n: number): string[] {
  if (n === 0) return [];

  const result = solutionRecursive(n - 1);

  if (n % 15 === 0) result.push("FizzBuzz");
  else if (n % 5 === 0) result.push("Buzz");
  else if (n % 3 === 0) result.push("Fizz");
  else result.push(n.toString());

  return result;
}
```

**단점:**
- 스택 공간 O(n) 사용
- 실무에서 사용 X

## 풀이 비교

| 방법 | 시간 | 공간 | 가독성 | 확장성 | 면접 적합도 |
|------|------|------|--------|--------|------------|
| 헬퍼 함수 분리 (당신) | O(n) | O(n) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 인라인 조건문 | O(n) | O(n) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 문자열 연결 | O(n) | O(n) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| map 사용 | O(n) | O(n) | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 재귀 | O(n) | O(n) | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

## 학습 포인트

### 1. 나머지 연산자 (%)

```typescript
// 나머지 연산자 기본
10 % 3  // 1 (10 ÷ 3 = 3 ... 나머지 1)
15 % 5  // 0 (15 ÷ 5 = 3 ... 나머지 0)
7 % 2   // 1 (홀수)
8 % 2   // 0 (짝수)

// 배수 판별
if (n % 3 === 0) {
  // n은 3의 배수
}

// 주의: 음수의 경우
-5 % 3   // -2 (JavaScript)
```

### 2. 숫자를 문자열로 변환

```typescript
// 방법 1: toString()
const num = 123;
num.toString()  // "123"

// 방법 2: String()
String(123)  // "123"

// 방법 3: 템플릿 리터럴
`${123}`  // "123"

// 방법 4: 빈 문자열 연결
123 + ""  // "123" (비추천)
```

### 3. 배열 생성 방법

```typescript
// 방법 1: 빈 배열 + push (당신의 방법)
const arr: string[] = [];
for (let i = 1; i <= n; i++) {
  arr.push(i.toString());
}

// 방법 2: Array.from
const arr = Array.from({ length: n }, (_, i) => i + 1);

// 방법 3: Array + fill + map
const arr = Array(n).fill(0).map((_, i) => i + 1);

// 방법 4: 스프레드 + keys
const arr = [...Array(n).keys()].map(i => i + 1);
```

## FizzBuzz 변형 문제들

### 변형 1: FizzBuzzBang (3가지 조건)

```typescript
// 3의 배수: Fizz
// 5의 배수: Buzz
// 7의 배수: Bang
function fizzBuzzBang(n: number): string[] {
  const result: string[] = [];

  for (let i = 1; i <= n; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    if (i % 7 === 0) output += "Bang";
    result.push(output || i.toString());
  }

  return result;
}

// i=105 (3, 5, 7의 최소공배수)
// → "FizzBuzzBang"
```

### 변형 2: 거꾸로 FizzBuzz

```typescript
// n부터 1까지 거꾸로
function reverseFizzBuzz(n: number): string[] {
  const result: string[] = [];

  for (let i = n; i >= 1; i--) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 5 === 0) result.push("Buzz");
    else if (i % 3 === 0) result.push("Fizz");
    else result.push(i.toString());
  }

  return result;
}
```

### 변형 3: 특정 범위의 FizzBuzz

```typescript
// start부터 end까지
function rangeFizzBuzz(start: number, end: number): string[] {
  const result: string[] = [];

  for (let i = start; i <= end; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 5 === 0) result.push("Buzz");
    else if (i % 3 === 0) result.push("Fizz");
    else result.push(i.toString());
  }

  return result;
}
```

### 변형 4: 커스텀 규칙 FizzBuzz

```typescript
// 규칙을 동적으로 받기
interface Rule {
  divisor: number;
  word: string;
}

function customFizzBuzz(n: number, rules: Rule[]): string[] {
  const result: string[] = [];

  for (let i = 1; i <= n; i++) {
    let output = "";

    for (const rule of rules) {
      if (i % rule.divisor === 0) {
        output += rule.word;
      }
    }

    result.push(output || i.toString());
  }

  return result;
}

// 사용 예시
customFizzBuzz(15, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" }
]);
```

## 실전 팁

### 1. 면접에서 이렇게 말하세요

**문제 이해:**
- "3과 5의 공배수는 FizzBuzz로 표시하는 게 맞죠?"
- "반환 타입은 문자열 배열이 맞나요?"

**접근 방법 설명:**
- "15의 배수를 먼저 체크해야 합니다. 그렇지 않으면 Fizz만 나올 수 있습니다"
- "시간 복잡도는 O(n)이고, 각 숫자마다 상수 시간 체크입니다"

**확장 가능성 언급:**
- "문자열 연결 방식을 사용하면 규칙을 쉽게 추가할 수 있습니다"
- "예를 들어 7의 배수에 대한 규칙도 쉽게 추가 가능합니다"

### 2. 흔한 실수들

```typescript
// 실수 1: 조건 순서 잘못 ❌
if (i % 3 === 0) return "Fizz";  // 15도 여기 걸림!
if (i % 5 === 0) return "Buzz";
if (i % 15 === 0) return "FizzBuzz";  // 도달 불가

// 실수 2: 문자열 변환 잊음 ❌
result.push(i);  // 타입 에러! string[] 배열인데 number 삽입

// 실수 3: 0부터 시작 ❌
for (let i = 0; i <= n; i++) {  // 1부터 시작해야 함!

// 실수 4: 배열 길이 확인 안 함 ❌
// n=5면 배열 길이는 5여야 함
```

### 3. 최적화 고려사항

```typescript
// 최적화 1: 15를 직접 체크 (약간 빠름)
if (i % 15 === 0) {  // i % 3 === 0 && i % 5 === 0 보다 빠름
  return "FizzBuzz";
}

// 최적화 2: 배열 크기 미리 할당 (메모리 효율)
const result: string[] = new Array(n);
for (let i = 0; i < n; i++) {
  result[i] = checkFizzBuzz(i + 1);
}

// 최적화 3: 문자열 리터럴 대신 상수 사용
const FIZZ = "Fizz";
const BUZZ = "Buzz";
const FIZZBUZZ = "FizzBuzz";
```

## 실무 활용

### 1. 페이지네이션 스타일링

```typescript
// 리스트 아이템에 교차 스타일 적용
function getItemClass(index: number): string {
  if (index % 3 === 0) return "highlight";
  if (index % 2 === 0) return "even";
  return "odd";
}
```

### 2. 주기적 작업 스케줄링

```typescript
// 특정 주기마다 다른 작업 수행
function scheduleTask(day: number): string {
  if (day % 7 === 0) return "주간 보고서";
  if (day % 3 === 0) return "중간 점검";
  return "일일 업무";
}
```

### 3. 데이터 시각화

```typescript
// 차트에서 특정 포인트 강조
function getChartLabel(value: number): string {
  if (value % 10 === 0) return `${value} (Major)`;
  if (value % 5 === 0) return `${value} (Minor)`;
  return "";
}
```

## 코드 개선 제안

당신의 코드는 이미 훌륭하지만, 작은 개선 제안:

```typescript
// 개선안 1: 15를 직접 체크
function solution(n: number): string[] {
  const answer: string[] = [];

  function checkFizzBuzz(num: number): string {
    if (num % 15 === 0) return "FizzBuzz";  // 더 명확
    if (num % 5 === 0) return "Buzz";
    if (num % 3 === 0) return "Fizz";
    return num.toString();
  }

  for (let i = 1; i <= n; i++) {
    answer.push(checkFizzBuzz(i));
  }

  return answer;
}

// 개선안 2: 더 간결하게 (헬퍼 함수 인라인)
function solution(n: number): string[] {
  const result: string[] = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 5 === 0) result.push("Buzz");
    else if (i % 3 === 0) result.push("Fizz");
    else result.push(i.toString());
  }

  return result;
}
```

## FizzBuzz의 역사

**알고 계셨나요?**
- FizzBuzz는 원래 어린이들의 수학 게임
- 2007년 Jeff Atwood가 코딩 테스트로 제안
- "FizzBuzz 문제를 못 푸는 프로그래머가 많다"는 논란
- 현재는 가장 유명한 입문 코딩 테스트 문제

**왜 자주 나올까?**
1. 조건문 이해도 테스트
2. 나머지 연산 이해도
3. 배열/반복문 활용
4. 코드 구조화 능력
5. 엣지 케이스 처리

## 정리

**FizzBuzz 핵심:**
```
1. 15의 배수를 먼저 체크 (중요!)
2. 5의 배수 체크
3. 3의 배수 체크
4. 나머지는 숫자 그대로
```

**당신의 풀이 장점:**
- ✅ 헬퍼 함수로 깔끔한 분리
- ✅ 올바른 조건 순서
- ✅ 명확한 변수명
- ✅ 읽기 쉬운 코드 구조

---

**총평**: 완벽한 FizzBuzz 구현입니다! 🎉

특히 `checkFizzBuzz` 헬퍼 함수로 로직을 분리한 점이 훌륭합니다.
코드가 읽기 쉽고, 테스트하기 쉽고, 유지보수하기 좋습니다.
실제 면접에서 이 코드를 제출하면 만점입니다!

FizzBuzz는 간단해 보이지만, 조건문 순서와 코드 구조화 능력을 평가하는
좋은 문제입니다. 완벽하게 해결하셨습니다! 👏
