# 코딩 테스트 #15: 최대 부분 배열의 합 - 답변

## 문제 요약
연속된 부분 배열 중 합이 가장 큰 부분 배열의 합 구하기

---

## 정답 코드 (Kadane's Algorithm)

```typescript
function solution(nums: number[]): number {
  let currentSum = nums[0];  // 현재 부분 배열의 합
  let maxSum = nums[0];      // 지금까지 본 최대 합

  for (let i = 1; i < nums.length; i++) {
    // 현재 값부터 새로 시작 vs 이전 합에 현재 값 더하기
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // 최대값 업데이트
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

### 시간 복잡도
- **O(n)**: 배열을 한 번만 순회

### 공간 복잡도
- **O(1)**: 변수 2개만 사용

### 핵심 아이디어: Kadane's Algorithm

각 위치에서 두 가지 선택을 해야 합니다:
1. **현재 값부터 새로 시작할까?** → `nums[i]`
2. **이전 합에 현재 값을 더할까?** → `currentSum + nums[i]`

둘 중 더 큰 값을 선택하고, 매번 최대값을 갱신합니다!

### 동작 과정 (예시: [-2, 1, -3, 4, -1, 2, 1, -5, 4])

```
초기값:
currentSum = -2
maxSum = -2

i=1, nums[1]=1:
  currentSum = Math.max(1, -2 + 1) = Math.max(1, -1) = 1
  maxSum = Math.max(-2, 1) = 1

i=2, nums[2]=-3:
  currentSum = Math.max(-3, 1 + (-3)) = Math.max(-3, -2) = -2
  maxSum = Math.max(1, -2) = 1

i=3, nums[3]=4:
  currentSum = Math.max(4, -2 + 4) = Math.max(4, 2) = 4  ✨ 여기서 새로 시작!
  maxSum = Math.max(1, 4) = 4

i=4, nums[4]=-1:
  currentSum = Math.max(-1, 4 + (-1)) = Math.max(-1, 3) = 3
  maxSum = Math.max(4, 3) = 4

i=5, nums[5]=2:
  currentSum = Math.max(2, 3 + 2) = Math.max(2, 5) = 5
  maxSum = Math.max(4, 5) = 5

i=6, nums[6]=1:
  currentSum = Math.max(1, 5 + 1) = Math.max(1, 6) = 6
  maxSum = Math.max(5, 6) = 6  ✅ 최대값!

i=7, nums[7]=-5:
  currentSum = Math.max(-5, 6 + (-5)) = Math.max(-5, 1) = 1
  maxSum = Math.max(6, 1) = 6

i=8, nums[8]=4:
  currentSum = Math.max(4, 1 + 4) = Math.max(4, 5) = 5
  maxSum = Math.max(6, 5) = 6

반환: 6 ✅
부분 배열: [4, -1, 2, 1]
```

### 핵심 포인트

**왜 `Math.max(nums[i], currentSum + nums[i])`를 사용할까?**

- `currentSum + nums[i] < nums[i]`인 경우
  - 즉, `currentSum < 0`이면
  - 이전까지의 합이 음수라는 뜻!
  - 그러면 **버리고 새로 시작**하는 게 이득

예시:
```
currentSum = -5, nums[i] = 3

이전 합에 더하기: -5 + 3 = -2
새로 시작:       3

→ 3이 더 크므로 새로 시작!
```

---

## 다른 풀이 방법들

### 방법 1: 브루트 포스 (비효율적)

```typescript
function solution(nums: number[]): number {
  let maxSum = -Infinity;

  // 모든 시작점
  for (let i = 0; i < nums.length; i++) {
    let currentSum = 0;

    // 모든 끝점
    for (let j = i; j < nums.length; j++) {
      currentSum += nums[j];
      maxSum = Math.max(maxSum, currentSum);
    }
  }

  return maxSum;
}
```

**시간 복잡도**: O(n²) - 매우 느림!
**공간 복잡도**: O(1)

**문제점:**
- 모든 부분 배열을 직접 계산
- 중복 계산이 많음
- 큰 배열에서는 타임아웃

---

### 방법 2: 분할 정복 (Divide and Conquer)

```typescript
function solution(nums: number[]): number {
  return maxSubarrayDC(nums, 0, nums.length - 1);
}

function maxSubarrayDC(
  nums: number[],
  left: number,
  right: number
): number {
  // 베이스 케이스
  if (left === right) {
    return nums[left];
  }

  const mid = Math.floor((left + right) / 2);

  // 3가지 경우의 최대값
  const leftMax = maxSubarrayDC(nums, left, mid);
  const rightMax = maxSubarrayDC(nums, mid + 1, right);
  const crossMax = maxCrossingSum(nums, left, mid, right);

  return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossingSum(
  nums: number[],
  left: number,
  mid: number,
  right: number
): number {
  // 왼쪽에서 mid까지의 최대 합
  let leftSum = -Infinity;
  let sum = 0;
  for (let i = mid; i >= left; i--) {
    sum += nums[i];
    leftSum = Math.max(leftSum, sum);
  }

  // mid+1에서 오른쪽까지의 최대 합
  let rightSum = -Infinity;
  sum = 0;
  for (let i = mid + 1; i <= right; i++) {
    sum += nums[i];
    rightSum = Math.max(rightSum, sum);
  }

  return leftSum + rightSum;
}
```

**시간 복잡도**: O(n log n)
**공간 복잡도**: O(log n) - 재귀 스택

**아이디어:**
배열을 반으로 나누면 최대 부분 배열은:
1. 왼쪽 절반에만 있거나
2. 오른쪽 절반에만 있거나
3. 중간을 가로지르거나

이 세 가지 중 최대값!

---

### 방법 3: 동적 프로그래밍 (배열 사용)

```typescript
function solution(nums: number[]): number {
  const dp: number[] = new Array(nums.length);
  dp[0] = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // dp[i] = i번째 요소를 포함하는 최대 부분 배열 합
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    maxSum = Math.max(maxSum, dp[i]);
  }

  return maxSum;
}
```

**시간 복잡도**: O(n)
**공간 복杂度**: O(n) - 배열 사용

**특징:**
- Kadane's Algorithm과 같은 로직
- DP 배열로 명시적으로 표현
- 공간이 더 필요하지만 이해하기 쉬움

---

## 성능 비교

| 방법 | 시간 복잡도 | 공간 복잡도 | 코드 간결성 | 추천도 |
|------|------------|------------|-----------|--------|
| Kadane's Algorithm | O(n) | O(1) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| DP 배열 | O(n) | O(n) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 분할 정복 | O(n log n) | O(log n) | ⭐⭐⭐ | ⭐⭐⭐ |
| 브루트 포스 | O(n²) | O(1) | ⭐⭐⭐⭐⭐ | ⭐ |

---

## 실행 결과

```
총 7개 중 7개 통과
평균 실행 시간: 0.0029ms
총 실행 시간: 0.0201ms
```

모든 테스트를 통과했고, 평균 **0.0029ms**의 매우 빠른 실행 시간을 기록했습니다!

---

## 엣지 케이스 처리

### 1. 단일 요소
```typescript
input: [1]
currentSum = 1, maxSum = 1
return 1 ✅
```

### 2. 모두 음수
```typescript
input: [-1, -2, -3, -4]

i=1: currentSum = Math.max(-2, -1 + (-2)) = -2
     maxSum = Math.max(-1, -2) = -1

i=2: currentSum = Math.max(-3, -2 + (-3)) = -3
     maxSum = Math.max(-1, -3) = -1

i=3: currentSum = Math.max(-4, -3 + (-4)) = -4
     maxSum = Math.max(-1, -4) = -1

return -1 ✅ (가장 큰 값)
```

### 3. 모두 양수
```typescript
input: [1, 2, 3, 4, 5]
계속 더해나가므로 전체 합 = 15 ✅
```

### 4. 혼합 (양수와 음수)
```typescript
input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
부분 배열 [4, -1, 2, 1] = 6 ✅
```

---

## Kadane's Algorithm 시각화

```
배열: [-2,  1, -3,  4, -1,  2,  1, -5,  4]
       ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓
cur:  -2   1  -2   4   3   5   6   1   5
max:  -2   1   1   4   4   5   6   6   6
             ↑       ↑       ↑   ↑
             새시작  새시작   최대값!

각 단계에서:
- currentSum: 현재까지의 최적 부분 배열 합
- maxSum: 전체에서 본 최대값
```

**핵심:**
- `currentSum`이 음수가 되면 버리고 새로 시작
- `maxSum`은 매번 갱신하여 최대값 유지

---

## 실전 활용

### 1. 주식 최대 수익 구간 찾기

```typescript
// 일별 수익률에서 최대 수익 구간
const dailyReturns = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const maxProfit = solution(dailyReturns); // 6
```

### 2. 센서 데이터 이상치 탐지

```typescript
// 센서 값의 변화량에서 가장 큰 변화 구간
const sensorChanges = [0.5, -0.2, 1.3, -0.8, 2.1, -1.5];
const maxChange = solution(sensorChanges);
```

### 3. 게임 점수 최적 구간

```typescript
// 라운드별 점수에서 최고 연속 득점 구간
const scores = [10, -5, 20, -10, 30, 5, -15];
const bestStreak = solution(scores);
```

---

## 변형 문제

### 1. 최대 부분 배열의 시작/끝 인덱스 반환

```typescript
function maxSubarrayIndices(nums: number[]): [number, number, number] {
  let currentSum = nums[0];
  let maxSum = nums[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    // 새로 시작하는 경우
    if (nums[i] > currentSum + nums[i]) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      currentSum = currentSum + nums[i];
    }

    // 최대값 갱신
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return [maxSum, start, end];
}

// [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// → [6, 3, 6]  (인덱스 3~6: [4, -1, 2, 1])
```

### 2. 최대 부분 배열 자체 반환

```typescript
function maxSubarray(nums: number[]): number[] {
  const [maxSum, start, end] = maxSubarrayIndices(nums);
  return nums.slice(start, end + 1);
}

// [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// → [4, -1, 2, 1]
```

### 3. 순환 배열에서 최대 부분 배열

```typescript
function maxCircularSubarray(nums: number[]): number {
  // 케이스 1: 일반 최대 부분 배열
  const normalMax = kadane(nums);

  // 케이스 2: 순환하는 최대 부분 배열
  // = 전체 합 - 최소 부분 배열
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  const invertedNums = nums.map((num) => -num);
  const minSubarray = kadane(invertedNums);
  const circularMax = totalSum + minSubarray; // minSubarray는 음수

  // 모두 음수인 경우 처리
  if (circularMax === 0) return normalMax;

  return Math.max(normalMax, circularMax);
}

function kadane(nums: number[]): number {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// [5, -3, 5]
// 일반: 5 + (-3) + 5 = 7
// 순환: 5 + 5 = 10 ✅
```

---

## 핵심 개념

1. **Greedy 전략**:
   - 각 위치에서 최적의 선택 (새로 시작 vs 계속)
   - 지역 최적해가 전역 최적해로 이어짐

2. **동적 프로그래밍**:
   - `dp[i] = i번째를 포함하는 최대 부분 배열`
   - 점화식: `dp[i] = max(nums[i], dp[i-1] + nums[i])`

3. **공간 최적화**:
   - DP 배열 전체가 필요 없음
   - 이전 값 하나만 필요 → 변수로 대체

---

## 디버깅 팁

**잘못된 코드 (초기 코드):**
```typescript
let max = nums[0];

for (let i = 1; i < nums.length; i++) {
  max = Math.max(max, max + nums[i]);  // ❌
}
```

**문제점:**
- `max` 변수가 두 가지 역할을 동시에 수행
- 현재 합과 최대값을 구분 못함

**올바른 코드:**
```typescript
let currentSum = nums[0];  // 현재 부분 배열 합
let maxSum = nums[0];      // 전체 최대값

for (let i = 1; i < nums.length; i++) {
  currentSum = Math.max(nums[i], currentSum + nums[i]);  // ✅
  maxSum = Math.max(maxSum, currentSum);  // ✅
}
```

---

## 결론

Kadane's Algorithm을 사용하여 O(n) 시간, O(1) 공간으로 문제를 완벽히 해결했습니다!

**하이라이트:**
- ✅ 두 변수로 현재 합과 최대값 분리
- ✅ 각 위치에서 최적 선택 (새로 시작 vs 계속)
- ✅ 평균 실행 시간 **0.0029ms** - 매우 빠름!
- ✅ 모든 엣지 케이스 완벽 처리

이 알고리즘은 **동적 프로그래밍의 고전 문제**이며, 많은 변형 문제의 기초가 됩니다!

잘했어! 👏
