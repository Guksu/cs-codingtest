# 코딩 테스트 #9: 0을 배열의 끝으로 이동 - 답변

## 문제 요약
모든 0을 배열 끝으로 이동하되, 0이 아닌 요소들의 순서는 유지. in-place 수정 필수.

---

## 당신의 풀이 (Two Pointers - Swap 방식)

```typescript
function solution(nums: number[]): void {
  let zero = 0;
  let notZero = 0;

  while (zero !== nums.length && notZero !== nums.length) {
    if (nums[zero] === 0 && nums[notZero] !== 0) {
      [nums[zero], nums[notZero]] = [nums[notZero], nums[zero]];
      continue;
    }

    if (nums[zero] === 0 && nums[notZero] === 0) {
      notZero++;
      continue;
    }

    if (nums[zero] !== 0) {
      zero++;
      continue;
    }

    break;
  }
}
```

### 시간 복잡도
- **O(n)**: 배열을 한 번 순회

### 공간 복잡도
- **O(1)**: 추가 공간 사용 안 함 (in-place)

### 동작 과정 (예시: [0,1,0,3,12])

```
초기: [0, 1, 0, 3, 12]
      ↑     ↑
      zero  notZero

1단계: nums[0]=0, nums[1]=1 → swap
      [1, 0, 0, 3, 12]
       ↑     ↑
       zero  notZero

2단계: nums[0]=1 (not 0) → zero++
      [1, 0, 0, 3, 12]
          ↑     ↑
          zero  notZero

3단계: nums[1]=0, nums[2]=0 → notZero++
      [1, 0, 0, 3, 12]
          ↑        ↑
          zero     notZero

4단계: nums[1]=0, nums[3]=3 → swap
      [1, 3, 0, 0, 12]
          ↑        ↑
          zero     notZero

5단계: nums[1]=3 (not 0) → zero++
      [1, 3, 0, 0, 12]
             ↑        ↑
             zero     notZero

6단계: nums[2]=0, nums[4]=12 → swap
      [1, 3, 12, 0, 0]
             ↑         ↑
             zero      notZero

최종: [1, 3, 12, 0, 0] ✅
```

### 장점
- Two Pointers 기법을 정확하게 구현
- in-place 수정으로 메모리 효율적
- O(n) 시간 복잡도

### 개선 가능한 점
- 여러 조건문을 더 간결하게 통합 가능
- `notZero`가 항상 `zero`보다 앞서도록 보장하면 더 효율적

---

## 다른 풀이 방법들

### 방법 1: Two Pointers (최적화된 버전)

```typescript
function solution(nums: number[]): void {
  let insertPos = 0; // 0이 아닌 값을 넣을 위치

  // 1단계: 0이 아닌 값들을 앞으로 이동
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos] = nums[i];
      insertPos++;
    }
  }

  // 2단계: 나머지를 0으로 채우기
  for (let i = insertPos; i < nums.length; i++) {
    nums[i] = 0;
  }
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(1)
**장점**:
- 로직이 매우 명확
- 두 단계로 나누어 이해하기 쉬움
**단점**:
- 배열을 두 번 순회 (실제로는 O(2n) = O(n))

---

### 방법 2: Two Pointers (Swap - 최적화)

```typescript
function solution(nums: number[]): void {
  let left = 0; // 0이 아닌 값을 넣을 위치

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      // 현재 위치가 다르면 swap
      if (left !== right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
      }
      left++;
    }
  }
}
```

**시간 복잡도**: O(n) - 한 번만 순회
**공간 복잡도**: O(1)
**장점**:
- 한 번의 순회로 해결
- `left`는 항상 `right`보다 작거나 같음을 보장
- 불필요한 swap 최소화 (`left !== right` 체크)
**가장 효율적인 풀이!**

---

### 방법 3: 필터 + 0 채우기 (간단하지만 공간 사용)

```typescript
function solution(nums: number[]): void {
  const nonZeros = nums.filter(x => x !== 0);
  const zeros = new Array(nums.length - nonZeros.length).fill(0);

  const result = [...nonZeros, ...zeros];
  for (let i = 0; i < nums.length; i++) {
    nums[i] = result[i];
  }
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(n) - 새 배열 생성
**장점**:
- 코드가 매우 직관적
**단점**:
- in-place 수정이 아님 (추가 공간 O(n) 사용)
- 문제 요구사항 위반!

---

### 방법 4: Snowball (눈덩이 방식)

```typescript
function solution(nums: number[]): void {
  let snowballSize = 0; // 누적된 0의 개수

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      snowballSize++; // 0을 만나면 눈덩이 커짐
    } else if (snowballSize > 0) {
      // 0이 아닌 값을 만나면 눈덩이 크기만큼 앞으로 이동
      nums[i - snowballSize] = nums[i];
      nums[i] = 0;
    }
  }
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(1)
**장점**:
- 독특한 접근 방식
- 누적된 0의 개수를 추적
**설명**:
- 0을 만나면 "눈덩이"가 커짐
- 0이 아닌 값을 만나면 눈덩이 크기만큼 앞으로 당김

---

## 성능 비교

| 방법 | 시간 복잡도 | 공간 복잡도 | 순회 횟수 | 추천도 |
|------|------------|------------|---------|--------|
| 당신의 풀이 (Swap) | O(n) | O(1) | 1회 | ⭐⭐⭐⭐ |
| 두 단계 분리 | O(n) | O(1) | 2회 | ⭐⭐⭐⭐⭐ |
| 최적화된 Swap | O(n) | O(1) | 1회 | ⭐⭐⭐⭐⭐ |
| 필터 방식 | O(n) | O(n) | - | ⭐⭐ |
| Snowball | O(n) | O(1) | 1회 | ⭐⭐⭐⭐ |

---

## 실행 결과

```
총 6개 중 6개 통과
평균 실행 시간: 0.0131ms
총 실행 시간: 0.0787ms
```

모든 테스트를 통과했고, 평균 **0.0131ms**의 빠른 실행 시간을 기록했습니다!

---

## 개선된 코드 (권장)

### 방법 1: 가장 직관적 (두 단계 분리)

```typescript
function solution(nums: number[]): void {
  let insertPos = 0;

  // 0이 아닌 값들을 앞으로
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos++] = nums[i];
    }
  }

  // 나머지를 0으로
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }
}
```

### 방법 2: 가장 효율적 (한 번 순회 + 최소 swap)

```typescript
function solution(nums: number[]): void {
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      if (left !== right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
      }
      left++;
    }
  }
}
```

---

## 핵심 개념

1. **Two Pointers 패턴**:
   - `left`: 0이 아닌 값을 삽입할 위치
   - `right`: 현재 탐색 중인 위치
   - `left`는 항상 `right`보다 작거나 같음

2. **In-place 수정**:
   - 추가 배열 생성 없이 원본 배열 직접 수정
   - 공간 복잡도 O(1) 유지

3. **상대적 순서 유지**:
   - 0이 아닌 값들은 원래 순서 그대로
   - `left` 포인터가 순차적으로 증가하므로 자동 보장

---

## 실전 활용

이 패턴은 다양한 문제에서 활용됩니다:

1. **특정 조건의 요소를 뒤로 이동**
   - 음수를 뒤로, 양수를 앞으로
   - 짝수를 뒤로, 홀수를 앞으로

2. **중복 제거 (Sorted Array)**
   ```typescript
   // [1,1,2,2,3] → [1,2,3,_,_]
   function removeDuplicates(nums: number[]): number {
     let insertPos = 1;
     for (let i = 1; i < nums.length; i++) {
       if (nums[i] !== nums[i-1]) {
         nums[insertPos++] = nums[i];
       }
     }
     return insertPos; // 고유한 요소 개수
   }
   ```

3. **파티션 (Partition)**
   - 퀵소트의 파티션 알고리즘
   - pivot보다 작은 값 왼쪽, 큰 값 오른쪽

---

## 결론

Two Pointers 기법을 사용해 O(n) 시간, O(1) 공간으로 효율적으로 문제를 해결했습니다!

당신의 풀이는 정확하게 작동하며, 약간의 최적화로 더 간결하게 만들 수 있습니다. Two Pointers는 배열 문제에서 매우 자주 사용되는 패턴이니 잘 익혀두세요! 👍
