# 코딩 테스트 #7: 애너그램 판별 - 답변

## 문제 요약
두 문자열이 애너그램인지 판별하기 (문자들을 재배열하여 만들 수 있는지)

---

## 당신의 풀이 (HashMap 사용)

```typescript
function solution(s: string, t: string): boolean {
  const map = new Map();

  // 1단계: s의 각 문자 개수를 Map에 저장
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map.set(s[i], map.get(s[i]) + 1);
      continue;
    }
    map.set(s[i], 1);
  }

  // 2단계: t의 각 문자를 Map에서 차감
  for (let i = 0; i < t.length; i++) {
    if (!map.has(t[i])) {
      return false;  // t에 있는 문자가 s에 없으면 false
    }

    if (map.get(t[i]) === 1) {
      map.delete(t[i]);  // 개수가 1이면 삭제
      continue;
    }

    map.set(t[i], map.get(t[i]) - 1);  // 개수 차감
  }

  // 3단계: Map이 비어있으면 애너그램
  return map.size === 0;
}
```

### 시간 복잡도
- **O(n)**: n은 문자열의 길이
- 첫 번째 루프: O(n) - s 순회
- 두 번째 루프: O(m) - t 순회
- Map 연산들은 모두 O(1)

### 공간 복잡도
- **O(k)**: k는 고유한 문자의 개수
- 영어 소문자만 사용하므로 최대 26개 → O(26) = O(1)

### 장점
- 효율적인 시간 복잡도 O(n)
- 각 문자의 개수를 정확히 추적
- 조기 종료 가능 (t에 없는 문자 발견 시)

---

## 다른 풀이 방법들

### 방법 1: 정렬 사용 (가장 간단)

```typescript
function solution(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const sortedS = s.split('').sort().join('');
  const sortedT = t.split('').sort().join('');

  return sortedS === sortedT;
}
```

**시간 복잡도**: O(n log n) - 정렬 때문
**공간 복잡도**: O(n) - 새로운 문자열 생성
**장점**: 코드가 매우 간단하고 읽기 쉬움
**단점**: 정렬로 인해 시간 복잡도가 O(n log n)

---

### 방법 2: 배열 카운터 (당신의 방법과 유사)

```typescript
function solution(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const count: number[] = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;  // 'a'의 ASCII 코드는 97
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(1) - 배열 크기가 고정 (26)
**장점**:
- 한 번의 루프로 처리
- 배열 인덱스 접근이 Map보다 약간 빠름
**단점**:
- ASCII 코드 계산 필요
- 영어 소문자만 가능

---

### 방법 3: Object 카운터

```typescript
function solution(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const count: Record<string, number> = {};

  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  for (const char of t) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
}
```

**시간 복잡도**: O(n)
**공간 복잡도**: O(k) - k는 고유 문자 개수
**장점**:
- Map 대신 일반 객체 사용
- 간단한 구조
**단점**:
- Object의 프로퍼티 접근이 Map보다 느릴 수 있음

---

## 성능 비교

| 방법 | 시간 복잡도 | 공간 복잡도 | 코드 간결성 | 성능 |
|------|------------|------------|-----------|------|
| 정렬 | O(n log n) | O(n) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| HashMap (당신의 풀이) | O(n) | O(k) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 배열 카운터 | O(n) | O(1) | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Object 카운터 | O(n) | O(k) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 실행 결과

```
총 6개 중 6개 통과
평균 실행 시간: 0.0081ms
총 실행 시간: 0.0484ms
```

모든 테스트를 통과했고, 실행 시간도 매우 빠릅니다!

---

## 핵심 개념

1. **애너그램의 조건**:
   - 두 문자열의 길이가 같아야 함
   - 각 문자의 개수가 정확히 일치해야 함

2. **HashMap을 사용한 문자 카운팅**:
   - 첫 번째 문자열의 각 문자 개수를 저장
   - 두 번째 문자열을 순회하며 개수 차감
   - 최종적으로 Map이 비어있으면 애너그램

3. **최적화 포인트**:
   - 길이가 다르면 조기 리턴
   - t에 없는 문자 발견 시 즉시 false 리턴
   - 불필요한 연산 최소화

---

## 개선 제안

현재 코드는 이미 매우 좋지만, 약간의 리팩토링으로 더 간결하게 만들 수 있습니다:

```typescript
function solution(s: string, t: string): boolean {
  if (s.length !== t.length) return false;  // 조기 리턴 추가

  const map = new Map<string, number>();

  // s의 문자 카운팅 (간결하게)
  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  // t의 문자 차감
  for (const char of t) {
    const count = map.get(char);
    if (!count) return false;

    if (count === 1) {
      map.delete(char);
    } else {
      map.set(char, count - 1);
    }
  }

  return map.size === 0;
}
```

변경 사항:
- `for...of` 루프 사용 (더 읽기 쉬움)
- 길이 체크를 맨 앞에 추가 (조기 최적화)
- `(map.get(char) || 0) + 1` 패턴 사용

---

## 결론

HashMap을 사용한 O(n) 풀이로 매우 효율적으로 문제를 해결했습니다!

문자 개수를 세고 비교하는 방식은 많은 문자열 문제에서 유용하게 사용되는 패턴입니다.
