# CS 질문 #7: 스택(Stack)과 큐(Queue) - 답변

## 스택(Stack)이란?

**스택(Stack)**은 **LIFO(Last In First Out, 후입선출)** 방식의 자료구조입니다.

마지막에 들어온 데이터가 가장 먼저 나가는 구조로, **접시 쌓기**를 생각하면 됩니다:
- 접시를 쌓을 때: 위에서부터 쌓음
- 접시를 꺼낼 때: 위에서부터 꺼냄
- 가장 나중에 쌓은 접시가 가장 먼저 나감

---

## 스택의 주요 연산

### 1. Push (삽입)
- 스택의 맨 위에 데이터 추가

### 2. Pop (삭제)
- 스택의 맨 위 데이터 제거 및 반환

### 3. Peek (조회)
- 스택의 맨 위 데이터 확인 (제거하지 않음)

### 4. isEmpty (공백 확인)
- 스택이 비어있는지 확인

---

## 스택의 시각화

```
Push(1)    Push(2)    Push(3)    Pop()
  ↓          ↓          ↓          ↓
┌───┐      ┌───┐      ┌───┐      ┌───┐
│   │      │   │      │ 3 │ ←-┐  │   │
├───┤      ├───┤      ├───┤   │  ├───┤
│   │      │ 2 │      │ 2 │   └→ │ 2 │
├───┤      ├───┤      ├───┤      ├───┤
│ 1 │      │ 1 │      │ 1 │      │ 1 │
└───┘      └───┘      └───┘      └───┘
```

---

## 큐(Queue)란?

**큐(Queue)**는 **FIFO(First In First Out, 선입선출)** 방식의 자료구조입니다.

먼저 들어온 데이터가 가장 먼저 나가는 구조로, **은행 대기줄**을 생각하면 됩니다:
- 사람들이 줄을 설 때: 뒤쪽으로 추가
- 사람들이 처리될 때: 앞쪽부터 처리
- 먼저 온 사람이 먼저 처리됨

---

## 큐의 주요 연산

### 1. Enqueue (삽입)
- 큐의 뒤쪽(rear)에 데이터 추가

### 2. Dequeue (삭제)
- 큐의 앞쪽(front)에서 데이터 제거 및 반환

### 3. Peek/Front (조회)
- 큐의 맨 앞 데이터 확인 (제거하지 않음)

### 4. isEmpty (공백 확인)
- 큐가 비어있는지 확인

---

## 큐의 시각화

```
Enqueue(1)   Enqueue(2)   Enqueue(3)   Dequeue()
    ↓            ↓            ↓            ↓

Front → [1] Rear

Front → [1][2] Rear

Front → [1][2][3] Rear

        [2][3] Rear (1이 제거됨)
        ↑
      Front
```

---

## JavaScript에서의 구현

### 스택 구현 (배열 사용)

```typescript
class Stack<T> {
  private items: T[] = [];

  // Push: 맨 위에 추가
  push(item: T): void {
    this.items.push(item);
  }

  // Pop: 맨 위 제거 및 반환
  pop(): T | undefined {
    return this.items.pop();
  }

  // Peek: 맨 위 확인
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // 공백 확인
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 크기
  size(): number {
    return this.items.length;
  }
}

// 사용 예시
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3 (LIFO)
console.log(stack.peek()); // 2
```

### 큐 구현 (배열 사용)

```typescript
class Queue<T> {
  private items: T[] = [];

  // Enqueue: 뒤쪽에 추가
  enqueue(item: T): void {
    this.items.push(item);
  }

  // Dequeue: 앞쪽 제거 및 반환
  dequeue(): T | undefined {
    return this.items.shift(); // O(n) - 배열의 shift는 느림
  }

  // Front: 맨 앞 확인
  front(): T | undefined {
    return this.items[0];
  }

  // 공백 확인
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 크기
  size(): number {
    return this.items.length;
  }
}

// 사용 예시
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // 1 (FIFO)
console.log(queue.front()); // 2
```

**참고**: 배열의 `shift()`는 O(n) 시간이 걸려서 비효율적이에요. 실무에서는 연결 리스트나 두 개의 포인터를 사용한 원형 큐를 사용합니다.

---

## 스택과 큐의 사용 사례

### 스택(Stack) 사용 사례

#### 1. **함수 호출 스택 (Call Stack)**
```javascript
function first() {
  console.log('First');
  second();
}

function second() {
  console.log('Second');
  third();
}

function third() {
  console.log('Third');
}

first();

// 호출 스택:
// 1. first() 실행
// 2. second() 호출 → 스택에 push
// 3. third() 호출 → 스택에 push
// 4. third() 종료 → 스택에서 pop
// 5. second() 종료 → 스택에서 pop
// 6. first() 종료 → 스택에서 pop
```

#### 2. **브라우저 뒤로가기/앞으로가기**
```typescript
class BrowserHistory {
  private backStack: string[] = [];
  private forwardStack: string[] = [];
  private current: string;

  constructor(homepage: string) {
    this.current = homepage;
  }

  visit(url: string): void {
    this.backStack.push(this.current);
    this.current = url;
    this.forwardStack = []; // 새 페이지 방문 시 앞으로가기 기록 삭제
  }

  back(): string {
    if (this.backStack.length === 0) return this.current;
    this.forwardStack.push(this.current);
    this.current = this.backStack.pop()!;
    return this.current;
  }

  forward(): string {
    if (this.forwardStack.length === 0) return this.current;
    this.backStack.push(this.current);
    this.current = this.forwardStack.pop()!;
    return this.current;
  }
}
```

#### 3. **괄호 유효성 검사**
```typescript
function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(isValidParentheses("()[]{}"));  // true
console.log(isValidParentheses("([)]"));    // false
```

#### 4. **DFS (깊이 우선 탐색)**
```typescript
function dfs(graph: Record<string, string[]>, start: string): void {
  const stack = [start];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (visited.has(node)) continue;
    visited.add(node);
    console.log(node);

    // 인접 노드들을 스택에 추가
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}
```

#### 5. **실행 취소(Undo) 기능**
```typescript
class TextEditor {
  private text: string = '';
  private history: string[] = [];

  type(newText: string): void {
    this.history.push(this.text); // 현재 상태 저장
    this.text += newText;
  }

  undo(): void {
    if (this.history.length > 0) {
      this.text = this.history.pop()!;
    }
  }
}
```

---

### 큐(Queue) 사용 사례

#### 1. **비동기 작업 큐 (Task Queue / Callback Queue)**
```javascript
// JavaScript 이벤트 루프
console.log('1'); // 동기 → Call Stack

setTimeout(() => {
  console.log('2'); // 비동기 → Task Queue
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 비동기 → Microtask Queue
});

console.log('4'); // 동기 → Call Stack

// 출력 순서: 1, 4, 3, 2
// Call Stack → Microtask Queue → Task Queue 순서
```

#### 2. **BFS (너비 우선 탐색)**
```typescript
function bfs(graph: Record<string, string[]>, start: string): void {
  const queue = [start];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const node = queue.shift()!; // 큐에서 앞에서부터 제거 (FIFO)

    if (visited.has(node)) continue;
    visited.add(node);
    console.log(node);

    // 인접 노드들을 큐에 추가
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }
}
```

#### 3. **프린터 대기열**
```typescript
interface PrintJob {
  id: number;
  document: string;
}

class PrintQueue {
  private queue: PrintJob[] = [];

  addJob(job: PrintJob): void {
    this.queue.push(job);
    console.log(`Job ${job.id} added to queue`);
  }

  processNext(): void {
    if (this.queue.length === 0) {
      console.log('No jobs in queue');
      return;
    }

    const job = this.queue.shift()!;
    console.log(`Processing job ${job.id}: ${job.document}`);
  }
}
```

#### 4. **레벨 순서 트리 순회**
```typescript
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
```

---

## JavaScript 이벤트 루프와 스택/큐

당신이 언급한 이벤트 루프에 대해 더 자세히 설명하겠습니다!

### 이벤트 루프 구조

```
┌─────────────────────────────────────────────┐
│          JavaScript Runtime                  │
│                                              │
│  ┌──────────────┐      ┌──────────────┐    │
│  │  Call Stack  │      │  Web APIs    │    │
│  │   (스택)      │      │  (브라우저)   │    │
│  │              │      │              │    │
│  │   main()     │      │ setTimeout() │    │
│  │   foo()      │      │ fetch()      │    │
│  │   bar()      │      │ DOM Events   │    │
│  └──────────────┘      └──────────────┘    │
│         ↑                     │             │
│         │                     ↓             │
│         │              ┌──────────────┐    │
│         │              │ Task Queue   │    │
│         │              │   (큐)        │    │
│         └──────────────│ callback1()  │    │
│                        │ callback2()  │    │
│                        └──────────────┘    │
│                                              │
│                        ┌──────────────┐    │
│                        │Microtask Queue│   │
│                        │  Promise()    │    │
│                        └──────────────┘    │
└─────────────────────────────────────────────┘
```

### 동작 순서

1. **Call Stack (콜 스택)**: 현재 실행 중인 함수들이 쌓임 (LIFO)
2. **Web APIs**: 비동기 작업 (setTimeout, fetch 등)을 브라우저가 처리
3. **Task Queue (콜백 큐)**: 비동기 작업 완료 후 콜백들이 대기 (FIFO)
4. **Event Loop**: Call Stack이 비면 Task Queue에서 콜백을 하나씩 Call Stack으로 이동

```javascript
console.log('1');  // Call Stack에서 즉시 실행

setTimeout(() => {
  console.log('2');  // Task Queue로 이동
}, 0);

Promise.resolve().then(() => {
  console.log('3');  // Microtask Queue로 이동 (우선순위 높음)
});

console.log('4');  // Call Stack에서 즉시 실행

// 출력: 1 → 4 → 3 → 2
```

---

## 당신의 답변 피드백

당신의 답변:
> "1. 스택은 LIFO(후입선출) 방식의 자료구조야! 배열을 예를 들면 가장 나중에 들어온 값이 먼저 나가지. JS에서 콜스택이라 불려지는 코드실행 구간이 이 스택구조를 사용하고 있어
>
> 2. 큐는 FIFO(선입선출) 방식의 자료구조야! 스택과 반대로 가장 먼저 들어온 값이 가장 먼저 나가. JS에서 비동기 작업들이 이동하는 콜백큐가 이 큐 자료구조를 사용해
>
> 3. 이벤트루프에서 코드들은 콜스택에 쌓이고, 비동기 작업들은 브라우저 백그라운드의 콜스택에 쌓여!"

**잘한 점:**
- ✅ LIFO와 FIFO 개념을 정확히 이해
- ✅ 콜 스택과 콜백 큐를 실무 예시로 연결
- ✅ 이벤트 루프의 동작 방식을 언급

**약간 수정할 점:**
- 3번에서 "브라우저 백그라운드의 콜스택"이 아니라 "브라우저 Web APIs → Task Queue"가 더 정확해요
- 비동기 작업은 Web APIs에서 처리되고, 완료되면 Task Queue로 이동합니다

전반적으로 핵심을 아주 잘 이해하고 있고, 특히 프론트엔드 개발자로서 이벤트 루프와 연결한 설명이 훌륭합니다! 👍

---

## 핵심 요약

| 항목 | 스택 (Stack) | 큐 (Queue) |
|------|-------------|-----------|
| **방식** | LIFO (후입선출) | FIFO (선입선출) |
| **삽입 위치** | Top (맨 위) | Rear (뒤쪽) |
| **삭제 위치** | Top (맨 위) | Front (앞쪽) |
| **주요 연산** | push, pop, peek | enqueue, dequeue, front |
| **시간 복잡도** | O(1) | O(1) (연결리스트 사용 시) |
| **비유** | 접시 쌓기 | 은행 대기줄 |
| **사용 예시** | 함수 호출, 뒤로가기, DFS, Undo | 비동기 작업, BFS, 프린터 대기열 |
| **JS 활용** | Call Stack, 브라우저 히스토리 | Task Queue, Callback Queue |

스택과 큐는 프론트엔드 개발에서 매우 중요한 자료구조입니다. 특히 이벤트 루프를 이해하는 데 필수적이에요!
