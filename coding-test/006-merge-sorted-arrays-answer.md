# 코딩 테스트 #6: 정렬된 두 배열 합치기 - 정답 및 해설

**날짜**: 2025-11-04

## 당신의 풀이

```typescript
function solution(nums1: number[], nums2: number[]): number[] {
  return [...nums1, ...nums2].sort((a, b) => a - b);
}
```

**결과**: ✅ 모든 테스트 통과!

## 코드 분석

### 접근 방법: 합친 후 정렬

당신의 풀이는 **스프레드 연산자**와 **sort()**를 사용한 매우 간결한 솔루션입니다!

**핵심 아이디어:**
1. 두 배열을 스프레드 연산자로 합치기
2. sort()로 정렬하기

**시간 복잡도:** O((m+n) log(m+n))
- 합치기: O(m+n)
- 정렬: O((m+n) log(m+n))
- 전체: O((m+n) log(m+n))

**공간 복잡도:** O(m+n)
- 새 배열 생성

### 장점
- ✅ 매우 간결하고 읽기 쉬움
- ✅ 한 줄로 해결
- ✅ 실수할 여지가 적음
- ✅ 실무에서 자주 사용하는 방식

## 더 효율적인 풀이: Two Pointers (Merge)

이미 정렬된 배열의 특성을 활용하면 O(m+n)으로 최적화 가능!

```typescript
function solutionTwoPointers(nums1: number[], nums2: number[]): number[] {
  const result: number[] = [];
  let i = 0;  // nums1 포인터
  let j = 0;  // nums2 포인터

  // 두 배열을 비교하면서 작은 것부터 추가
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      result.push(nums1[i]);
      i++;
    } else {
      result.push(nums2[j]);
      j++;
    }
  }

  // 남은 요소들 추가
  while (i < nums1.length) {
    result.push(nums1[i]);
    i++;
  }

  while (j < nums2.length) {
    result.push(nums2[j]);
    j++;
  }

  return result;
}
```

**시간 복잡도:** O(m+n)
- 각 배열을 한 번씩만 순회
- 정렬 과정 불필요

**공간 복잡도:** O(m+n)
- 결과 배열

### Two Pointers 동작 원리

```
nums1 = [1, 3, 5]
nums2 = [2, 4, 6]

초기 상태:
nums1: [1, 3, 5]
        ↑
        i=0
nums2: [2, 4, 6]
        ↑
        j=0
result: []

1단계: nums1[0]=1 < nums2[0]=2
  result: [1]
  i=1, j=0

2단계: nums1[1]=3 > nums2[0]=2
  result: [1, 2]
  i=1, j=1

3단계: nums1[1]=3 < nums2[1]=4
  result: [1, 2, 3]
  i=2, j=1

4단계: nums1[2]=5 > nums2[1]=4
  result: [1, 2, 3, 4]
  i=2, j=2

5단계: nums1[2]=5 < nums2[2]=6
  result: [1, 2, 3, 4, 5]
  i=3, j=2

6단계: nums1 끝! nums2 남은 요소 추가
  result: [1, 2, 3, 4, 5, 6]
```

## 두 풀이 비교

| 항목 | 합친 후 정렬 (당신의 풀이) | Two Pointers |
|------|-------------------------|--------------|
| 시간 복잡도 | O((m+n) log(m+n)) | O(m+n) |
| 공간 복잡도 | O(m+n) | O(m+n) |
| 가독성 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 코드 길이 | 매우 짧음 | 조금 김 |
| 면접 적합도 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 실무 사용 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**언제 어떤 풀이를 사용할까?**
- **실무**: 당신의 방식 (간결하고 실수 적음)
- **면접**: Two Pointers 설명 (알고리즘 이해도 보여줌)
- **작은 배열**: 당신의 방식
- **매우 큰 배열**: Two Pointers (성능 차이)

## 학습 포인트

### 1. 스프레드 연산자 (Spread Operator)

```typescript
// 배열 합치기
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 방법 1: 스프레드 (추천)
const merged = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// 방법 2: concat
const merged2 = arr1.concat(arr2);

// 방법 3: push + spread
const merged3 = arr1.slice();
merged3.push(...arr2);

// 스프레드가 가장 간결하고 읽기 쉬움!
```

### 2. Array.sort() 주의사항

```typescript
// ❌ 잘못된 정렬 (문자열로 비교)
[3, 1, 10, 2].sort();
// [1, 10, 2, 3] - 문자열 정렬!

// ✅ 올바른 숫자 정렬
[3, 1, 10, 2].sort((a, b) => a - b);
// [1, 2, 3, 10] - 숫자 정렬!

// 오름차순
arr.sort((a, b) => a - b);

// 내림차순
arr.sort((a, b) => b - a);
```

### 3. Two Pointers 패턴

```typescript
// 패턴: 두 개의 정렬된 배열 합치기
function merge(arr1: number[], arr2: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  // 두 배열 모두 남아있을 때
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }

  // 남은 요소들 추가
  result.push(...arr1.slice(i));
  result.push(...arr2.slice(j));

  return result;
}
```

## 다양한 풀이 방법

### 방법 1: concat + sort (당신의 방식 변형)

```typescript
function solution1(nums1: number[], nums2: number[]): number[] {
  return nums1.concat(nums2).sort((a, b) => a - b);
}
```

### 방법 2: push + sort

```typescript
function solution2(nums1: number[], nums2: number[]): number[] {
  const result = [...nums1];
  result.push(...nums2);
  result.sort((a, b) => a - b);
  return result;
}
```

### 방법 3: Two Pointers (간결한 버전)

```typescript
function solution3(nums1: number[], nums2: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < nums1.length && j < nums2.length) {
    result.push(nums1[i] <= nums2[j] ? nums1[i++] : nums2[j++]);
  }

  return result.concat(nums1.slice(i), nums2.slice(j));
}
```

### 방법 4: 재귀

```typescript
function solution4(
  nums1: number[],
  nums2: number[],
  i: number = 0,
  j: number = 0
): number[] {
  // 기저 조건
  if (i >= nums1.length) return nums2.slice(j);
  if (j >= nums2.length) return nums1.slice(i);

  // 재귀
  if (nums1[i] <= nums2[j]) {
    return [nums1[i], ...solution4(nums1, nums2, i + 1, j)];
  } else {
    return [nums2[j], ...solution4(nums1, nums2, i, j + 1)];
  }
}

// 주의: 큰 배열에서 스택 오버플로우 위험
```

## 변형 문제들

### 변형 1: K개의 정렬된 배열 합치기

```typescript
function mergeKArrays(arrays: number[][]): number[] {
  // 방법 1: 간단하게
  return arrays.flat().sort((a, b) => a - b);

  // 방법 2: 효율적으로 (힙 사용)
  // Min Heap을 사용한 최적화 - O(N log k)
}
```

### 변형 2: 제자리 합치기 (In-place)

```typescript
// nums1의 뒤쪽에 충분한 공간이 있다고 가정
function mergeInPlace(
  nums1: number[],
  m: number,  // nums1의 실제 요소 개수
  nums2: number[],
  n: number   // nums2의 요소 개수
): void {
  let i = m - 1;      // nums1의 마지막 요소
  let j = n - 1;      // nums2의 마지막 요소
  let k = m + n - 1;  // 합쳐진 배열의 마지막 위치

  // 뒤에서부터 채우기
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
}

// LeetCode #88 "Merge Sorted Array"와 동일
```

### 변형 3: 중복 제거하며 합치기

```typescript
function mergeUnique(nums1: number[], nums2: number[]): number[] {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  return [...new Set(merged)];

  // 또는
  return Array.from(new Set([...nums1, ...nums2])).sort((a, b) => a - b);
}
```

### 변형 4: 교집합 찾기

```typescript
function intersection(nums1: number[], nums2: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      // 중복 제거
      if (result.length === 0 || result[result.length - 1] !== nums1[i]) {
        result.push(nums1[i]);
      }
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}
```

## 실전 팁

### 1. 면접에서 이렇게 말하세요

**문제 이해:**
- "두 배열이 이미 정렬되어 있다는 게 맞나요?"
- "새 배열을 만들어도 되나요, 아니면 제자리 합치기인가요?"

**접근 방법 설명:**
```
1단계: 간단한 방법
"스프레드 연산자로 합친 후 정렬하면 간단합니다.
 O((m+n)log(m+n))이지만 코드가 매우 간결합니다."

2단계: 최적화 제안
"하지만 이미 정렬된 특성을 활용하면
 Two Pointers로 O(m+n)에 해결할 수 있습니다."

3단계: 트레이드오프
"실무에서는 간결한 첫 방법을 선호하지만,
 큰 데이터나 성능이 중요한 경우 Two Pointers를 사용합니다."
```

### 2. 엣지 케이스 확인

```typescript
// 엣지 케이스 1: 빈 배열
solution([], [1, 2, 3])  // [1, 2, 3]
solution([1, 2, 3], [])  // [1, 2, 3]
solution([], [])         // []

// 엣지 케이스 2: 겹치지 않는 범위
solution([1, 2, 3], [4, 5, 6])  // [1, 2, 3, 4, 5, 6]

// 엣지 케이스 3: 완전히 겹침
solution([1, 2, 3], [1, 2, 3])  // [1, 1, 2, 2, 3, 3]

// 엣지 케이스 4: 한 배열이 다른 배열 안에 포함
solution([1, 5, 9], [2, 3, 4, 6, 7, 8])
```

### 3. 성능 비교

```typescript
// 벤치마크 예시
const large1 = Array.from({ length: 10000 }, (_, i) => i * 2);
const large2 = Array.from({ length: 10000 }, (_, i) => i * 2 + 1);

console.time('concat + sort');
const result1 = [...large1, ...large2].sort((a, b) => a - b);
console.timeEnd('concat + sort');
// 약 5-10ms

console.time('two pointers');
const result2 = mergeTwoPointers(large1, large2);
console.timeEnd('two pointers');
// 약 1-2ms

// Two Pointers가 3-5배 빠름!
```

## 실무 활용

### 1. 데이터 병합

```typescript
interface User {
  id: number;
  name: string;
  timestamp: Date;
}

// 두 정렬된 사용자 목록 합치기
function mergeUsers(users1: User[], users2: User[]): User[] {
  const result: User[] = [];
  let i = 0, j = 0;

  while (i < users1.length && j < users2.length) {
    if (users1[i].timestamp <= users2[j].timestamp) {
      result.push(users1[i++]);
    } else {
      result.push(users2[j++]);
    }
  }

  return result.concat(users1.slice(i), users2.slice(j));
}
```

### 2. 로그 파일 병합

```typescript
interface LogEntry {
  timestamp: number;
  message: string;
}

function mergeLogs(log1: LogEntry[], log2: LogEntry[]): LogEntry[] {
  return [...log1, ...log2].sort((a, b) => a.timestamp - b.timestamp);
}
```

### 3. 페이지네이션 결과 병합

```typescript
interface SearchResult {
  items: Array<{ id: number; score: number }>;
}

function mergeSearchResults(
  result1: SearchResult,
  result2: SearchResult
): SearchResult {
  const merged = [...result1.items, ...result2.items]
    .sort((a, b) => b.score - a.score)  // 점수 내림차순
    .slice(0, 10);  // 상위 10개만

  return { items: merged };
}
```

## 정리

**문제 핵심:**
```
이미 정렬된 두 배열을 합쳐서
정렬된 하나의 배열로 만들기
```

**당신의 풀이 (Concat + Sort):**
- ✅ 매우 간결
- ✅ 읽기 쉬움
- ✅ 실수 가능성 낮음
- ✅ 실무에서 선호
- ⚠️ O((m+n)log(m+n))

**최적화 풀이 (Two Pointers):**
- ✅ 더 효율적 O(m+n)
- ✅ 정렬된 특성 활용
- ✅ Merge Sort의 Merge 과정과 동일
- ⚠️ 코드가 조금 더 김

**면접 전략:**
1. 당신의 방식으로 먼저 해결
2. "정렬된 특성을 활용하면 더 빠르게 할 수 있습니다" 언급
3. Two Pointers 방식 설명
4. 트레이드오프 논의

**실무에서는:**
- 당신의 방식 (간결함 > 성능)
- 코드 리뷰를 통과하기 쉬움
- 유지보수하기 좋음

---

**총평**: 실용적이고 간결한 풀이입니다! 🎉

한 줄로 문제를 해결하는 멋진 솔루션입니다.
실무에서는 이런 간결한 코드를 선호하며,
면접에서는 Two Pointers로 최적화할 수 있다는 것을
보여주면 완벽합니다!

Merge Sort의 핵심 부분인 "병합(Merge)" 과정을
이해하는 데 중요한 문제입니다. 잘 기억해두세요! 👍
