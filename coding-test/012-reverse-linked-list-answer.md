# 코딩 테스트 #12: 연결 리스트 뒤집기 - 답변

## 문제 요약
단일 연결 리스트를 뒤집어서 반환하기

---

## 당신의 풀이 (반복문 - Iterative)

```typescript
function solution(head: ListNode | null): ListNode | null {
  let prev = null;
  let current = head;

  while (current) {
    let next = current.next;  // 1. 다음 노드 임시 저장
    current.next = prev;      // 2. 방향 뒤집기

    prev = current;           // 3. prev 이동
    current = next;           // 4. current 이동
  }

  return prev;  // 새로운 헤드 반환
}
```

### 시간 복잡도
- **O(n)**: 리스트를 한 번 순회

### 공간 복잡도
- **O(1)**: 추가 공간 사용 안 함 (포인터 3개만 사용)

### 동작 과정 (예시: [1,2,3,4,5])

```
초기 상태:
prev = null
current = 1 → 2 → 3 → 4 → 5 → null

===========================================

1단계: current = 1
  next = 2 (임시 저장)
  1.next = null (방향 뒤집기)
  prev = 1, current = 2

  null ← 1    2 → 3 → 4 → 5 → null
         ↑    ↑
       prev  current

===========================================

2단계: current = 2
  next = 3
  2.next = 1
  prev = 2, current = 3

  null ← 1 ← 2    3 → 4 → 5 → null
              ↑    ↑
            prev  current

===========================================

3단계: current = 3
  next = 4
  3.next = 2
  prev = 3, current = 4

  null ← 1 ← 2 ← 3    4 → 5 → null
                  ↑    ↑
                prev  current

===========================================

4단계: current = 4
  next = 5
  4.next = 3
  prev = 4, current = 5

  null ← 1 ← 2 ← 3 ← 4    5 → null
                      ↑    ↑
                    prev  current

===========================================

5단계: current = 5
  next = null
  5.next = 4
  prev = 5, current = null

  null ← 1 ← 2 ← 3 ← 4 ← 5
                          ↑
                        prev

===========================================

반복문 종료 (current = null)
return prev → 5 (새로운 헤드) ✅
```

### 장점
- 반복문 사용으로 명확하고 직관적
- O(1) 공간 복잡도 (in-place)
- 스택 오버플로우 걱정 없음
- 평균 실행 시간 **0.0026ms** - 매우 빠름!

---

## 다른 풀이 방법들

### 방법 1: 재귀 (Recursive)

```typescript
function solution(head: ListNode | null): ListNode | null {
  // 베이스 케이스: 빈 리스트 또는 마지막 노드
  if (head === null || head.next === null) {
    return head;
  }

  // 재귀적으로 나머지 리스트 뒤집기
  const newHead = solution(head.next);

  // 현재 노드의 다음 노드가 현재 노드를 가리키도록
  head.next.next = head;
  head.next = null;

  return newHead;
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(n) - 재귀 호출 스택

**동작 과정 (예시: [1,2,3]):**
```
solution(1 → 2 → 3)
  ├─ solution(2 → 3)
  │   ├─ solution(3)
  │   │   └─ return 3 (베이스 케이스)
  │   │
  │   ├─ 3.next = 2
  │   ├─ 2.next = null
  │   └─ return 3
  │
  ├─ 2.next = 1
  ├─ 1.next = null
  └─ return 3

최종: 3 → 2 → 1 → null
```

**장점**:
- 코드가 간결
- 재귀적 사고 연습

**단점**:
- O(n) 공간 복잡도 (호출 스택)
- 큰 리스트에서 스택 오버플로우 가능

---

### 방법 2: 스택 사용

```typescript
function solution(head: ListNode | null): ListNode | null {
  if (!head) return null;

  const stack: ListNode[] = [];
  let current = head;

  // 모든 노드를 스택에 push
  while (current) {
    stack.push(current);
    current = current.next;
  }

  // 스택에서 pop하면서 새 리스트 구성
  const newHead = stack.pop()!;
  current = newHead;

  while (stack.length > 0) {
    const node = stack.pop()!;
    current.next = node;
    current = node;
  }

  current.next = null;
  return newHead;
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(n) - 스택에 모든 노드 저장

**장점**:
- 스택의 LIFO 특성 활용
- 직관적인 접근

**단점**:
- O(n) 공간 사용
- 불필요한 추가 메모리 사용

---

### 방법 3: 배열 변환 (비효율적)

```typescript
function solution(head: ListNode | null): ListNode | null {
  if (!head) return null;

  // 리스트 → 배열
  const values: number[] = [];
  let current = head;
  while (current) {
    values.push(current.val);
    current = current.next;
  }

  // 배열 뒤집기
  values.reverse();

  // 배열 → 리스트
  const newHead = new ListNode(values[0]);
  current = newHead;
  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return newHead;
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(n) - 배열 생성

**장점**:
- 매우 직관적

**단점**:
- O(n) 공간 사용
- 새 노드를 생성 (원본 노드 재사용 안 함)
- 비효율적

---

## 성능 비교

| 방법 | 시간 복잡도 | 공간 복잡도 | 코드 간결성 | 추천도 |
|------|------------|------------|-----------|--------|
| 반복문 (당신의 풀이) | O(n) | O(1) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 재귀 | O(n) | O(n) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 스택 | O(n) | O(n) | ⭐⭐⭐ | ⭐⭐⭐ |
| 배열 변환 | O(n) | O(n) | ⭐⭐⭐⭐ | ⭐⭐ |

---

## 실행 결과

```
총 5개 중 5개 통과
평균 실행 시간: 0.0026ms
총 실행 시간: 0.0128ms
```

모든 테스트를 통과했고, 평균 **0.0026ms**의 매우 빠른 실행 시간을 기록했습니다!

---

## 엣지 케이스 처리

당신의 코드가 잘 처리한 엣지 케이스들:

### 1. 빈 리스트
```typescript
input: []
current = null
while (current) → 실행 안 됨
return null ✅
```

### 2. 단일 노드
```typescript
input: [1]
current = 1, prev = null

1단계:
  next = null
  1.next = null
  prev = 1, current = null

return prev (1) ✅
```

### 3. 두 노드
```typescript
input: [1,2]
1단계: 1.next = null, prev = 1, current = 2
2단계: 2.next = 1, prev = 2, current = null
return prev (2) ✅
결과: 2 → 1 → null
```

---

## 핵심 개념

### 1. 포인터 3개 사용
- **prev**: 이전 노드 (뒤집힌 리스트의 헤드 방향)
- **current**: 현재 처리 중인 노드
- **next**: 다음 노드 임시 저장 (잃어버리지 않도록)

### 2. 방향 뒤집기
```typescript
current.next = prev;  // 핵심!
```
현재 노드의 next를 이전 노드로 변경하여 방향을 뒤집습니다.

### 3. 포인터 이동
```typescript
prev = current;    // prev를 한 칸 앞으로
current = next;    // current를 한 칸 앞으로
```

### 4. 새로운 헤드
```typescript
return prev;  // 마지막 prev가 새로운 헤드!
```

---

## 실전 활용

연결 리스트 뒤집기 패턴은 많은 문제에서 활용됩니다:

### 1. 특정 구간만 뒤집기

```typescript
// m번째부터 n번째까지만 뒤집기
function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (!head || left === right) return head;

  const dummy = new ListNode(0, head);
  let prev = dummy;

  // left 이전까지 이동
  for (let i = 1; i < left; i++) {
    prev = prev.next!;
  }

  // left부터 right까지 뒤집기
  let current = prev.next;
  let next = null;

  for (let i = 0; i < right - left; i++) {
    next = current!.next;
    current!.next = next!.next;
    next!.next = prev.next;
    prev.next = next;
  }

  return dummy.next;
}
```

### 2. 회문(Palindrome) 확인

```typescript
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // 중간 찾기 (slow & fast pointers)
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // 후반부 뒤집기
  let prev = null;
  while (slow) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  // 앞부분과 뒤집힌 뒷부분 비교
  let left = head;
  let right = prev;

  while (right) {
    if (left.val !== right.val) return false;
    left = left.next!;
    right = right.next;
  }

  return true;
}
```

### 3. K개씩 그룹으로 뒤집기

```typescript
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // k개의 노드가 있는지 확인
  let current = head;
  let count = 0;

  while (current && count < k) {
    current = current.next;
    count++;
  }

  if (count < k) return head;  // k개 미만이면 뒤집지 않음

  // k개 뒤집기
  let prev = null;
  current = head;

  for (let i = 0; i < k; i++) {
    const next = current!.next;
    current!.next = prev;
    prev = current;
    current = next;
  }

  // 나머지 부분 재귀적으로 처리
  if (current) {
    head!.next = reverseKGroup(current, k);
  }

  return prev;
}
```

---

## 연결 리스트 vs 배열

### 연결 리스트의 장점
- 삽입/삭제가 O(1) (위치를 알 때)
- 동적 크기 조절

### 연결 리스트의 단점
- 인덱스 접근이 O(n)
- 추가 메모리 (next 포인터)

### 뒤집기 비교
```typescript
// 배열: 매우 간단
arr.reverse();  // O(n)

// 연결 리스트: 포인터 조작 필요
// 하지만 in-place로 O(1) 공간에 가능!
```

---

## 디버깅 팁

연결 리스트 문제를 풀 때:

1. **그림 그리기**: 포인터 이동을 시각화
2. **작은 예시로 테스트**: [1,2] 또는 [1,2,3]
3. **엣지 케이스 확인**: 빈 리스트, 단일 노드
4. **next 잃어버리지 않기**: 임시 변수에 저장!

```typescript
// ❌ 잘못된 예
current.next = prev;
current = current.next;  // 잃어버림!

// ✅ 올바른 예
const next = current.next;  // 임시 저장
current.next = prev;
current = next;  // 저장한 값 사용
```

---

## 결론

반복문을 사용한 O(n) 시간, O(1) 공간 복잡도로 효율적으로 문제를 해결했습니다!

**당신의 풀이 하이라이트:**
- ✅ 포인터 3개 (prev, current, next) 완벽 활용
- ✅ 반복문 조건 `while (current)` - 모든 노드 처리
- ✅ `return prev` - 새로운 헤드 정확히 반환
- ✅ 평균 실행 시간 **0.0026ms** - 매우 빠름!

연결 리스트 뒤집기는 많은 연결 리스트 문제의 기초가 되는 핵심 패턴입니다! 👏
