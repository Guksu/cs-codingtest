# CS 기초 질문 #3: 프로세스와 스레드 - 정답

**날짜**: 2025-11-03

## 당신의 답변

> 프로세스는 프로그램 하나가 실행된다고 이해하면 돼 각각의 프로세스들은 쓰레드를 갖고 있는데,
> 이 쓰레드들은 프로세스의 자원을 나눠서 사용하지 예를들어 A프로그램이 실행되고, 내부적으로 덧셈 뺄샘 곱하기등 연산이 각각 실행된다고하면, A프로그램에 할당된 메모리를 쓰레드가 나눠서 사용하는거야

## 피드백

핵심 개념을 정확하게 이해하고 계십니다! 훌륭합니다! 👍

### 맞은 부분 ✅
- 프로세스 = 실행 중인 프로그램
- 프로세스는 스레드를 가짐
- 스레드는 프로세스의 자원(메모리)을 공유
- 여러 작업이 스레드로 나뉘어 실행

### 보완 포인트 💡

완벽한 답변이지만, 실무에서 더 알아두면 좋은 내용들을 추가로 설명드리겠습니다!

## 정확한 정답

### 프로세스 (Process)

**정의:**
- **실행 중인 프로그램**
- 운영체제로부터 자원(메모리, CPU 시간 등)을 할당받은 작업의 단위

**특징:**
1. **독립적인 메모리 공간** 보유
   - Code (프로그램 코드)
   - Data (전역 변수)
   - Heap (동적 할당)
   - Stack (함수 호출, 지역 변수)

2. **다른 프로세스와 격리됨**
   - 프로세스 A의 메모리는 프로세스 B가 접근 불가
   - 안전하지만 무거움

3. **최소 1개 이상의 스레드** 포함

**비유:**
- **식당 하나**
- 각 식당은 독립적인 주방, 재료, 직원이 있음
- 다른 식당의 주방에는 접근 불가

### 스레드 (Thread)

**정의:**
- **프로세스 내에서 실행되는 작업의 단위**
- 프로세스의 자원을 공유하면서 독립적으로 실행

**특징:**
1. **프로세스의 메모리 공유**
   - Code, Data, Heap 영역 공유
   - Stack만 각자 보유

2. **가볍고 빠름**
   - 생성/전환 비용이 적음
   - 프로세스보다 훨씬 가벼움

3. **동시 작업 가능**
   - 여러 스레드가 동시에 실행
   - 병렬 처리 가능

**비유:**
- **식당 안의 요리사들**
- 같은 주방(메모리)과 재료를 공유
- 각자 다른 요리(작업)를 동시에 수행

## 프로세스 vs 스레드 비교

### 메모리 구조

```
프로세스 A          프로세스 B
┌─────────────┐    ┌─────────────┐
│   Code      │    │   Code      │
│   Data      │    │   Data      │
│   Heap      │    │   Heap      │
├─────────────┤    ├─────────────┤
│ Thread 1    │    │ Thread 1    │
│  - Stack 1  │    │  - Stack 1  │
├─────────────┤    └─────────────┘
│ Thread 2    │
│  - Stack 2  │    ← 프로세스 B는
├─────────────┤      접근 불가!
│ Thread 3    │
│  - Stack 3  │
└─────────────┘

프로세스 내부의 Thread 1, 2, 3은
Code, Data, Heap을 공유 ✅

프로세스 A와 B는
서로의 메모리에 접근 불가 ❌
```

### 상세 비교표

| 항목 | 프로세스 | 스레드 |
|------|----------|--------|
| **정의** | 실행 중인 프로그램 | 프로세스 내 실행 단위 |
| **메모리** | 독립적 | 프로세스 메모리 공유 |
| **생성 비용** | 큼 (무거움) | 작음 (가벼움) |
| **전환 속도** | 느림 | 빠름 |
| **통신** | IPC 필요 (복잡) | 메모리 공유 (간단) |
| **안전성** | 높음 (격리됨) | 낮음 (공유로 인한 충돌 위험) |
| **예시** | Chrome 탭 각각 | UI 스레드 + 네트워크 스레드 |

## 실제 예시

### 1. 웹 브라우저 (Chrome)

```
Chrome 브라우저
├─ 프로세스 1: 메인 프로세스
│  └─ 스레드 1: UI 관리
│  └─ 스레드 2: 네트워크 요청
│
├─ 프로세스 2: 유튜브 탭
│  └─ 스레드 1: 페이지 렌더링
│  └─ 스레드 2: 영상 재생
│  └─ 스레드 3: 사용자 입력 처리
│
└─ 프로세스 3: Gmail 탭
   └─ 스레드 1: 이메일 목록 표시
   └─ 스레드 2: 새 메일 확인

특징:
- 탭마다 별도 프로세스
- 한 탭이 죽어도 다른 탭은 안전
- 각 프로세스 내에서 여러 스레드가 작업
```

### 2. React 애플리케이션

```javascript
// 브라우저 환경 (단일 프로세스)
// 하지만 여러 "작업"이 동시에 진행

// 메인 스레드
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 네트워크 요청 (비동기 - 백그라운드에서 처리)
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{data}</div>;
}

// 실제로는 단일 스레드지만
// 브라우저가 Web Workers를 사용하면
// 진짜 멀티스레드 가능
```

### 3. Node.js 서버

```javascript
// Node.js는 기본적으로 단일 스레드
const express = require('express');
const app = express();

app.get('/heavy', async (req, res) => {
  // 무거운 작업은 Worker Threads 사용 가능
  const { Worker } = require('worker_threads');

  const worker = new Worker('./heavy-task.js');

  worker.on('message', (result) => {
    res.json({ result });
  });
});

// Worker Thread (heavy-task.js)
// 별도 스레드에서 무거운 계산 수행
const { parentPort } = require('worker_threads');

let result = 0;
for (let i = 0; i < 1000000000; i++) {
  result += i;
}

parentPort.postMessage(result);
```

## 프로세스와 스레드를 언제 사용할까?

### 프로세스를 사용하는 경우

1. **독립성이 중요할 때**
   ```
   Chrome 탭: 한 탭 크래시가 다른 탭에 영향 X
   ```

2. **보안이 중요할 때**
   ```
   샌드박스: 각 프로세스를 격리해서 보안 강화
   ```

3. **완전히 다른 프로그램**
   ```
   VSCode + Chrome + Spotify 동시 실행
   ```

### 스레드를 사용하는 경우

1. **동시 작업이 필요할 때**
   ```javascript
   // UI 업데이트 + 데이터 로딩 동시 진행
   Thread 1: 화면 그리기
   Thread 2: 서버에서 데이터 받기
   ```

2. **빠른 응답이 필요할 때**
   ```
   채팅 앱:
   - Thread 1: 메시지 표시
   - Thread 2: 새 메시지 수신
   - Thread 3: 타이핑 표시 업데이트
   ```

3. **자원을 공유해야 할 때**
   ```
   게임:
   - Thread 1: 그래픽 렌더링
   - Thread 2: 물리 엔진
   - Thread 3: AI 계산
   → 모두 같은 게임 데이터 접근 필요
   ```

## 멀티프로세스 vs 멀티스레드

### 멀티프로세스

```
장점:
✅ 안정성: 하나가 죽어도 다른 것에 영향 X
✅ 보안: 프로세스 간 격리
✅ 간단함: 공유 메모리 신경 쓸 필요 없음

단점:
❌ 무거움: 메모리 많이 사용
❌ 느림: 프로세스 생성/전환 비용 큼
❌ 통신 어려움: IPC 필요
```

### 멀티스레드

```
장점:
✅ 가벼움: 메모리 효율적
✅ 빠름: 생성/전환 빠름
✅ 통신 쉬움: 메모리 공유

단점:
❌ 복잡함: 동기화 문제 (Race Condition)
❌ 불안정: 한 스레드 오류가 전체에 영향
❌ 디버깅 어려움
```

## 동기화 문제 (멀티스레드의 함정)

### Race Condition 예시

```javascript
// 문제 상황: 여러 스레드가 같은 변수 수정
let count = 0;

// Thread 1
function increment() {
  for (let i = 0; i < 1000; i++) {
    count++;  // 읽기 → 증가 → 쓰기
  }
}

// Thread 2
function increment() {
  for (let i = 0; i < 1000; i++) {
    count++;  // 읽기 → 증가 → 쓰기
  }
}

// 예상 결과: 2000
// 실제 결과: 1500 (타이밍에 따라 다름!)

// 원인:
// Thread 1이 count를 읽고 (0)
// Thread 2도 count를 읽음 (0)
// Thread 1이 1 저장
// Thread 2도 1 저장 (2가 아니라!)
```

### 해결 방법: Lock (잠금)

```javascript
// Mutex (Mutual Exclusion) 사용
let count = 0;
const lock = new Lock();

function increment() {
  lock.acquire();  // 잠금 획득
  try {
    count++;
  } finally {
    lock.release();  // 잠금 해제
  }
}

// 이제 한 번에 하나의 스레드만 count 수정 가능
```

## JavaScript/TypeScript와 스레드

### JavaScript는 싱글 스레드?

맞기도 하고, 틀리기도 합니다!

```javascript
// 메인 스레드는 하나
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');

// 출력: 1, 3, 2
// 비동기지만 실제로는 싱글 스레드!
```

**이벤트 루프 (Event Loop):**
- JavaScript는 싱글 스레드
- 하지만 비동기 작업은 브라우저/Node.js가 처리
- 완료되면 이벤트 루프가 콜백 실행

### 진짜 멀티스레드: Web Workers

```javascript
// 메인 스레드 (main.js)
const worker = new Worker('worker.js');

// 무거운 작업을 워커에게 전달
worker.postMessage({ numbers: [1, 2, 3, ...] });

// 워커로부터 결과 받기
worker.onmessage = (event) => {
  console.log('결과:', event.data);
};

// 워커 스레드 (worker.js)
onmessage = (event) => {
  const numbers = event.data.numbers;

  // 무거운 계산 (메인 스레드 블로킹 X)
  const sum = numbers.reduce((a, b) => a + b, 0);

  // 결과 전송
  postMessage(sum);
};
```

## 프론트엔드 개발자가 알아야 할 이유

### 1. 성능 최적화

```javascript
// 나쁜 예: 메인 스레드 블로킹
function heavyComputation() {
  for (let i = 0; i < 1000000000; i++) {
    // 계산...
  }
  // UI가 멈춤! 😱
}

// 좋은 예: Web Worker 사용
const worker = new Worker('heavy.js');
worker.postMessage('start');
// UI는 계속 반응함! 😊
```

### 2. 브라우저 이해

```
Chrome 프로세스 구조:
- 브라우저 프로세스: UI, 북마크 등
- 렌더러 프로세스: 각 탭
- GPU 프로세스: 그래픽 가속
- 네트워크 프로세스: 네트워크 요청
- 플러그인 프로세스: 확장 프로그램
```

### 3. React/Vue의 동작 이해

```javascript
// React는 싱글 스레드에서 실행
function App() {
  // 무거운 계산은 useMemo로 최적화
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(a, b);
  }, [a, b]);

  // 또는 Web Worker로 분리
  useEffect(() => {
    const worker = new Worker('calc.js');
    worker.postMessage({ a, b });
    worker.onmessage = (e) => {
      setResult(e.data);
    };
  }, [a, b]);
}
```

## 정리

```
프로그램 (하드디스크에 저장된 파일)
         ↓ 실행
프로세스 (메모리에 로드됨)
         ↓ 포함
스레드 (실제 작업 수행)
```

**핵심 비유:**
```
회사(프로세스)
  └─ 직원들(스레드)
      - 같은 사무실(메모리) 공유
      - 각자 다른 업무 수행
      - 동시에 일함
```

---

**총평**: 완벽한 답변입니다! 🎉

핵심 개념을 정확하게 이해하고 계시고, 특히 "스레드가 프로세스의 자원을 공유한다"는 가장 중요한 포인트를 잘 설명하셨습니다!

프론트엔드 개발자로서 이 개념은:
- Web Workers 사용 시
- 브라우저 성능 최적화 시
- 멀티태스킹 애플리케이션 개발 시

매우 중요합니다!
