# 코딩 테스트 #17: 중복 요소 확인 - 답변

## 문제 요약
배열에 중복된 요소가 있는지 확인하기

---

## 당신의 풀이 (Set 활용)

```typescript
function solution(nums: number[]): boolean {
  const set: Set<number> = new Set([...nums]);
  return nums.length !== set.size;
}
```

### 시간 복잡도
- **O(n)**: Set 생성 시 모든 요소를 한 번씩 순회

### 공간 복잡도
- **O(n)**: Set에 최대 n개 요소 저장

### 핵심 아이디어

**Set의 특성 활용:**
- Set은 중복을 허용하지 않음
- 배열을 Set으로 변환하면 중복이 자동 제거됨
- 원본 배열 길이와 Set 크기가 다르면 중복이 있었다는 뜻!

### 동작 과정

```
예시: [1, 2, 3, 1]

1. Set 생성: new Set([1, 2, 3, 1])
   → Set { 1, 2, 3 } (중복된 1 제거)

2. 길이 비교:
   nums.length = 4
   set.size = 3

3. 4 !== 3 → true (중복 있음) ✅
```

---

## 다른 풀이 방법

### 방법 1: 조기 종료 (더 효율적)

```typescript
function solution(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;  // 중복 발견 즉시 종료
    }
    seen.add(num);
  }

  return false;
}
```

**장점:**
- 중복이 앞쪽에 있으면 빨리 종료
- 최악의 경우만 O(n)

---

### 방법 2: 정렬 후 인접 비교

```typescript
function solution(nums: number[]): boolean {
  nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      return true;
    }
  }

  return false;
}
```

**시간 복잡도**: O(n log n) - 정렬
**공간 복잡도**: O(1) - 추가 공간 없음 (원본 수정)

**장점:**
- 공간 효율적
- 인접 요소만 비교하면 됨

**단점:**
- 정렬로 인한 시간 증가
- 원본 배열 수정

---

### 방법 3: 객체(Map) 활용

```typescript
function solution(nums: number[]): boolean {
  const count: Record<number, boolean> = {};

  for (const num of nums) {
    if (count[num]) {
      return true;
    }
    count[num] = true;
  }

  return false;
}
```

**특징:**
- Set과 유사한 접근
- 조기 종료 가능

---

## 성능 비교

| 방법 | 시간 복잡도 | 공간 복잡도 | 조기 종료 | 추천도 |
|------|------------|------------|----------|--------|
| Set 크기 비교 (당신의 풀이) | O(n) | O(n) | ❌ | ⭐⭐⭐⭐ |
| Set + 조기 종료 | O(n) | O(n) | ✅ | ⭐⭐⭐⭐⭐ |
| 정렬 후 비교 | O(n log n) | O(1) | ✅ | ⭐⭐⭐ |
| 객체(Map) | O(n) | O(n) | ✅ | ⭐⭐⭐⭐ |

---

## 실행 결과

```
총 7개 중 7개 통과
평균 실행 시간: 0.0020ms
총 실행 시간: 0.0141ms
```

모든 테스트를 통과했고, 평균 **0.0020ms**의 매우 빠른 실행 시간!

---

## Set 자료구조 정리

### 특징
- **중복 불허**: 같은 값을 여러 번 추가해도 하나만 저장
- **순서 유지**: 삽입 순서대로 저장 (ES6+)
- **빠른 조회**: has() 메서드 O(1)

### 주요 메서드

```typescript
const set = new Set<number>();

set.add(1);           // 추가
set.has(1);           // 존재 확인 → true
set.delete(1);        // 삭제
set.size;             // 크기
set.clear();          // 전체 삭제

// 배열 → Set
const set = new Set([1, 2, 3]);

// Set → 배열
const arr = [...set];
const arr = Array.from(set);
```

### 활용 사례

```typescript
// 배열 중복 제거
const unique = [...new Set(arr)];

// 두 배열의 교집합
const intersection = [...setA].filter(x => setB.has(x));

// 두 배열의 합집합
const union = new Set([...setA, ...setB]);

// 두 배열의 차집합
const difference = [...setA].filter(x => !setB.has(x));
```

---

## 결론

Set의 중복 제거 특성을 활용한 간결한 풀이!

**당신의 풀이 하이라이트:**
- ✅ Set의 특성을 정확히 이해
- ✅ 2줄로 깔끔하게 해결
- ✅ O(n) 시간 복잡도
- ✅ 평균 실행 시간 **0.0020ms**

조기 종료를 추가하면 평균적으로 더 빨라질 수 있지만, 현재 코드도 충분히 효율적이야!
