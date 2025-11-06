# 코딩 테스트 #8: 중복된 숫자 찾기 - 답변

## 문제 요약
배열에 중복된 값이 하나라도 있으면 true, 모든 값이 고유하면 false 반환

---

## 당신의 풀이 (HashMap 사용)

```typescript
function solution(nums: number[]): boolean {
  const map = new Map<number, boolean>();

  for (const num of nums) {
    if (map.get(num)) {
      return true;  // 이미 본 숫자면 즉시 true 반환
    }
    map.set(num, true);
  }

  return false;  // 끝까지 중복 없으면 false
}
```

### 시간 복잡도
- **O(n)**: n은 배열의 길이
- 최선의 경우: O(1) - 첫 두 요소가 중복
- 최악의 경우: O(n) - 중복이 없거나 마지막에 발견

### 공간 복잡도
- **O(n)**: Map에 최대 n개의 숫자 저장
- 최악의 경우 모든 숫자가 고유하면 n개 저장

### 장점
- 조기 종료 가능: 중복 발견 즉시 true 반환
- O(n) 시간 복잡도로 효율적
- Map의 O(1) 조회/삽입 활용

---

## 다른 풀이 방법들

### 방법 1: Set 사용 (가장 간결)

```typescript
function solution(nums: number[]): boolean {
  return new Set(nums).size !== nums.length;
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(n)
**장점**:
- 한 줄로 해결 가능
- Set이 자동으로 중복 제거
- 매우 직관적
**단점**:
- 조기 종료 불가 (항상 전체 배열 순회)
- 중복을 찾아도 끝까지 Set 생성

---

### 방법 2: Set + 조기 종료 (당신의 방법 개선)

```typescript
function solution(nums: number[]): boolean {
  const set = new Set<number>();

  for (const num of nums) {
    if (set.has(num)) {
      return true;  // 중복 발견 즉시 반환
    }
    set.add(num);
  }

  return false;
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(n)
**장점**:
- Set 사용으로 의도가 더 명확
- 조기 종료 가능
- `has()` 메서드가 boolean 전용이라 더 직관적
**참고**:
- 당신의 Map 풀이와 거의 동일한 성능
- Set이 boolean 값을 저장할 필요 없어서 약간 더 간결

---

### 방법 3: 정렬 후 비교

```typescript
function solution(nums: number[]): boolean {
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) {
      return true;
    }
  }

  return false;
}
```

**시간 복잡도**: O(n log n) - 정렬 때문
**공간 복잡도**: O(n) - 새 배열 생성
**장점**:
- 공간 복잡도를 O(1)로 줄일 수 있음 (원본 배열 수정 허용 시)
- 정렬된 데이터가 필요할 때 유용
**단점**:
- 정렬로 인해 시간 복잡도가 O(n log n)
- 불필요하게 느림

---

### 방법 4: Brute Force (비효율적)

```typescript
function solution(nums: number[]): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  return false;
}
```

**시간 복잡도**: O(n²)
**공간 복잡도**: O(1)
**장점**:
- 추가 공간 사용 안 함
- 구현이 단순
**단점**:
- O(n²) 시간 복잡도로 매우 느림
- 큰 배열에서는 사용 불가

---

## 성능 비교

| 방법 | 시간 복잡도 | 공간 복잡도 | 조기 종료 | 코드 간결성 | 추천도 |
|------|------------|------------|---------|-----------|--------|
| HashMap (당신의 풀이) | O(n) | O(n) | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Set (한 줄) | O(n) | O(n) | ❌ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Set + 조기 종료 | O(n) | O(n) | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 정렬 | O(n log n) | O(n) | ✅ | ⭐⭐⭐ | ⭐⭐⭐ |
| Brute Force | O(n²) | O(1) | ✅ | ⭐⭐⭐⭐ | ⭐ |

---

## 실행 결과

```
총 6개 중 6개 통과
평균 실행 시간: 0.0045ms
총 실행 시간: 0.0272ms
```

모든 테스트를 통과했고, 평균 실행 시간이 **0.0045ms**로 매우 빠릅니다!

---

## Map vs Set 비교

### Map을 사용한 경우 (당신의 풀이)
```typescript
const map = new Map<number, boolean>();
if (map.get(num)) return true;
map.set(num, true);
```

### Set을 사용한 경우
```typescript
const set = new Set<number>();
if (set.has(num)) return true;
set.add(num);
```

**차이점:**
- **Map**: 키-값 쌍 저장 (`set(key, value)`, `get(key)`)
- **Set**: 고유한 값만 저장 (`add(value)`, `has(value)`)

**이 문제에서는:**
- Set이 더 적합: 값의 존재 여부만 확인하면 됨
- Map은 불필요한 boolean 값 저장
- 하지만 성능 차이는 거의 없음!

---

## 개선된 코드 (Set 사용)

```typescript
function solution(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}
```

**변경 사항:**
- Map → Set (더 직관적)
- `map.get(num)` → `seen.has(num)` (의도가 더 명확)
- 변수명 `seen`으로 "이미 본 숫자들"이라는 의미 명확히 전달

---

## 핵심 개념

1. **중복 검사의 핵심**: "이미 본 것인가?"
   - Set/Map으로 O(1) 조회 달성
   - 조기 종료로 불필요한 연산 방지

2. **자료구조 선택**:
   - 값의 존재만 확인 → **Set**
   - 값과 연관 데이터 필요 → **Map**

3. **최적화 포인트**:
   - 조기 종료: 중복 발견 즉시 리턴
   - O(1) 조회: 해시 기반 자료구조 사용
   - 공간-시간 트레이드오프: O(n) 공간으로 O(n) 시간 달성

---

## 실전 활용

이 패턴은 많은 문제에서 사용됩니다:
- 중복 찾기
- 고유한 요소 세기
- 두 배열의 교집합/합집합
- 캐싱 (메모이제이션)

---

## 결론

HashMap을 사용한 효율적인 풀이로 문제를 해결했습니다!

조기 종료 전략과 O(n) 시간 복잡도로 최적의 성능을 달성했고, 평균 **0.0045ms**의 빠른 실행 시간을 기록했습니다.

Set으로 바꾸면 코드의 의도가 더 명확해지지만, 현재 풀이도 완전히 정답입니다! 👍
