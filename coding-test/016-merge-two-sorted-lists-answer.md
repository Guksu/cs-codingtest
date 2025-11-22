# 코딩 테스트 #16: 정렬된 두 연결 리스트 병합 - 답변

## 문제 요약
정렬된 두 연결 리스트를 하나의 정렬된 리스트로 병합하기

---

## 정답 코드 (더미 헤드 패턴)

```typescript
function solution(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // 더미 헤드: 결과 리스트의 시작점
  const dummy = new ListNode(0);
  let current = dummy;

  // 두 리스트 모두 노드가 있을 때
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // 남은 노드 연결
  current.next = list1 || list2;

  return dummy.next;
}
```

### 시간 복잡도
- **O(n + m)**: 두 리스트의 모든 노드를 한 번씩 방문

### 공간 복잡도
- **O(1)**: 추가 공간 없이 기존 노드 재사용

---

## 핵심 개념: 더미 헤드 패턴

### 왜 더미 헤드를 사용할까?

더미 헤드 없이 구현하면:
```typescript
// 첫 노드 처리를 위한 조건문 필요
let head: ListNode | null = null;

if (list1.val <= list2.val) {
  head = list1;
  list1 = list1.next;
} else {
  head = list2;
  list2 = list2.next;
}

let current = head;
// ... 나머지 로직
```

더미 헤드를 사용하면:
```typescript
const dummy = new ListNode(0);  // 더미 노드
let current = dummy;

// 모든 노드를 동일하게 처리
while (list1 && list2) {
  current.next = ...;
  current = current.next;
}

return dummy.next;  // 실제 첫 노드 반환
```

**장점:**
- 첫 노드 특별 처리 불필요
- 코드가 간결하고 일관됨
- 빈 리스트 처리도 자연스러움

---

## 동작 과정

### 예시: [1, 2, 4] + [1, 3, 4]

```
초기 상태:
list1: 1 → 2 → 4 → null
list2: 1 → 3 → 4 → null
dummy: 0 → null
current: dummy

Step 1: list1.val(1) <= list2.val(1) ✅
  current.next = list1(1)
  list1 = list1.next(2)
  current = current.next(1)

  dummy: 0 → 1 → 2 → 4

Step 2: list1.val(2) > list2.val(1)
  current.next = list2(1)
  list2 = list2.next(3)
  current = current.next(1)

  dummy: 0 → 1 → 1 → 3 → 4

Step 3: list1.val(2) <= list2.val(3) ✅
  current.next = list1(2)
  list1 = list1.next(4)
  current = current.next(2)

  dummy: 0 → 1 → 1 → 2 → 4

Step 4: list1.val(4) > list2.val(3)
  current.next = list2(3)
  list2 = list2.next(4)
  current = current.next(3)

  dummy: 0 → 1 → 1 → 2 → 3 → 4

Step 5: list1.val(4) <= list2.val(4) ✅
  current.next = list1(4)
  list1 = list1.next(null)
  current = current.next(4)

  dummy: 0 → 1 → 1 → 2 → 3 → 4 → null

Step 6: list1 = null, 루프 종료
  current.next = list2(4)

  dummy: 0 → 1 → 1 → 2 → 3 → 4 → 4 → null

return dummy.next = [1, 1, 2, 3, 4, 4] ✅
```

---

## 초기 시도의 문제점 분석

```typescript
// 문제가 있던 코드
while (firstP?.next || secondP?.next) {
  if (!firstP?.val || !secondP?.val) break;

  if (firstP?.val >= secondP?.val) {
    // ...
  }
}
```

### 문제 1: 루프 조건
```typescript
while (firstP?.next || secondP?.next)  // ❌
```
- `next`가 null인 마지막 노드를 처리 못함
- 올바른 조건: `while (firstP && secondP)`

### 문제 2: val이 0일 때
```typescript
if (!firstP?.val || !secondP?.val) break;  // ❌
```
- `val`이 0이면 falsy로 평가됨
- 올바른 조건: `if (firstP === null || secondP === null)`

### 문제 3: 비교 방향
```typescript
if (firstP?.val >= secondP?.val)  // ❌
```
- 작은 값을 먼저 넣어야 하므로 `<=` 사용

### 문제 4: current 포인터 미이동
```typescript
answer.next = firstP;  // answer는 항상 첫 위치
```
- `current = current.next`로 이동해야 함

### 문제 5: 남은 노드 미처리
- 한 리스트가 끝나면 나머지를 연결해야 함
- `current.next = list1 || list2`

---

## 다른 풀이 방법

### 방법 1: 재귀

```typescript
function solution(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // 베이스 케이스
  if (!list1) return list2;
  if (!list2) return list1;

  // 작은 값을 헤드로, 나머지는 재귀
  if (list1.val <= list2.val) {
    list1.next = solution(list1.next, list2);
    return list1;
  } else {
    list2.next = solution(list1, list2.next);
    return list2;
  }
}
```

**시간 복잡도**: O(n + m)
**공간 복잡도**: O(n + m) - 재귀 호출 스택

**장점:**
- 코드가 매우 간결
- 직관적인 로직

**단점:**
- 스택 오버플로우 위험 (긴 리스트)
- 공간 복잡도 높음

---

### 방법 2: 배열 변환 (비권장)

```typescript
function solution(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // 리스트를 배열로 변환
  const arr1 = listToArray(list1);
  const arr2 = listToArray(list2);

  // 배열 병합 및 정렬
  const merged = [...arr1, ...arr2].sort((a, b) => a - b);

  // 배열을 리스트로 변환
  return arrayToList(merged);
}
```

**시간 복잡도**: O((n + m) log(n + m)) - 정렬
**공간 복잡도**: O(n + m)

**단점:**
- 이미 정렬된 특성을 활용하지 않음
- 불필요한 변환과 정렬

---

## 실행 결과

```
총 7개 중 7개 통과
평균 실행 시간: 0.0038ms
총 실행 시간: 0.0265ms
```

모든 테스트를 통과했고, 평균 **0.0038ms**의 빠른 실행 시간!

---

## 엣지 케이스 처리

### 1. 둘 다 빈 리스트
```typescript
list1 = null, list2 = null

while (null && null) → false, 루프 실행 안 됨
current.next = null || null = null

return dummy.next = null ✅
```

### 2. 하나가 빈 리스트
```typescript
list1 = null, list2 = [0]

while (null && [0]) → false, 루프 실행 안 됨
current.next = null || [0] = [0]

return dummy.next = [0] ✅
```

### 3. 모두 같은 값
```typescript
list1 = [1, 1], list2 = [1, 1]

결과: [1, 1, 1, 1] ✅
(<=로 비교하므로 list1 먼저)
```

---

## 연결 리스트 병합 패턴

이 문제는 **Merge Sort의 병합 단계**와 동일합니다!

```
Merge Sort:
1. 분할 (Divide): 배열을 반으로 나눔
2. 정복 (Conquer): 재귀적으로 정렬
3. 병합 (Merge): 정렬된 두 배열을 합침  ← 이 문제!
```

### 병합 정렬에서의 활용

```typescript
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);  // 이 부분이 오늘 문제!
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}
```

---

## 변형 문제

### 1. K개의 정렬된 리스트 병합

```typescript
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];

  // 분할 정복
  const mid = Math.floor(lists.length / 2);
  const left = mergeKLists(lists.slice(0, mid));
  const right = mergeKLists(lists.slice(mid));

  return mergeTwoLists(left, right);
}
```

### 2. 정렬된 두 배열 병합

```typescript
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  // 뒤에서부터 채우기
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
}
```

---

## 핵심 포인트 정리

1. **더미 헤드 패턴**
   - 첫 노드 처리 간소화
   - 코드 일관성 유지

2. **투 포인터**
   - 각 리스트의 현재 위치 추적
   - 작은 값 선택 후 이동

3. **남은 노드 처리**
   - `current.next = list1 || list2`
   - 한 줄로 나머지 전체 연결

4. **null 체크**
   - `while (list1 && list2)`
   - 노드 존재 여부로 확인 (val이 0일 수 있으므로)

---

## 결론

더미 헤드 패턴을 활용하여 O(n + m) 시간, O(1) 공간으로 효율적으로 해결!

**하이라이트:**
- 더미 헤드로 깔끔한 코드
- 투 포인터로 효율적 비교
- 남은 노드 한 줄 처리
- 평균 실행 시간 **0.0038ms**

이 패턴은 Merge Sort의 핵심이며, K개 리스트 병합 등 다양한 변형 문제에 활용됩니다!
