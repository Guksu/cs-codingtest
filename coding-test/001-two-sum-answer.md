# 코딩 테스트 #1: 두 수의 합 - 정답 및 해설

**날짜**: 2025-11-01

## 당신의 풀이

```typescript
function solution(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
```

**결과**: ✅ 모든 테스트 통과!

## 코드 분석

### 접근 방법: Brute Force (완전 탐색)

당신의 풀이는 **이중 for문**을 사용한 완전 탐색 방식입니다.

**장점:**
- 직관적이고 이해하기 쉬운 코드
- 추가 메모리 사용 없음
- 모든 케이스에서 정확하게 동작

**시간 복잡도:** O(n²)
- 외부 루프: n번
- 내부 루프: 평균 n/2번
- 최악의 경우 n * (n-1) / 2번 비교

**공간 복잡도:** O(1)
- 추가 메모리 사용 없음

### 동작 원리

```
nums = [2, 7, 11, 15], target = 9

i=0, j=1: 2 + 7 = 9 ✅ 발견! [0, 1] 반환
```

## 더 효율적인 풀이: Hash Map 사용

시간 복잡도를 O(n)으로 개선할 수 있습니다.

```typescript
function solutionOptimized(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return [];
}
```

**시간 복잡도:** O(n)
- 배열을 한 번만 순회
- Map의 조회/삽입은 O(1)

**공간 복잡도:** O(n)
- Map에 최대 n개의 요소 저장

### 동작 원리

```
nums = [2, 7, 11, 15], target = 9

i=0: nums[0]=2, complement=7
     map에 7이 없음 → map에 {2: 0} 저장

i=1: nums[1]=7, complement=2
     map에 2가 있음! → [0, 1] 반환
```

**핵심 아이디어:**
- `nums[i] + nums[j] = target` 이면
- `nums[j] = target - nums[i]`
- 따라서 `target - nums[i]`가 이전에 나왔는지만 확인하면 됨

## 두 풀이 비교

| 항목 | Brute Force (당신의 풀이) | Hash Map |
|------|-------------------------|----------|
| 시간 복잡도 | O(n²) | O(n) |
| 공간 복잡도 | O(1) | O(n) |
| 가독성 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 성능 (큰 데이터) | 느림 | 빠름 |

**언제 어떤 풀이를 사용할까?**
- **작은 배열 (n < 100)**: 두 방법 모두 괜찮음, Brute Force가 더 간단
- **큰 배열 (n > 1000)**: Hash Map 방식 추천
- **메모리 제약**: Brute Force 추천
- **실제 코딩 테스트**: Hash Map 방식이 더 인상적

## 학습 포인트

1. **완전 탐색 → 최적화**
   - 먼저 동작하는 코드를 작성 (당신이 한 것처럼!)
   - 그 다음 시간 복잡도 개선 고려

2. **공간-시간 트레이드오프**
   - 메모리를 더 사용해서 시간을 절약할 수 있음
   - Hash Map은 이런 트레이드오프의 대표적 예시

3. **Hash Map/Object 활용**
   - 빠른 조회가 필요할 때 매우 유용
   - JavaScript/TypeScript에서는 `Map` 또는 일반 객체 사용

## 추가 연습 문제

비슷한 유형의 문제들:
- Three Sum (세 수의 합)
- Four Sum (네 수의 합)
- Two Sum II (정렬된 배열)

---

**총평**: 첫 문제를 완벽하게 해결하셨습니다! 👍
Brute Force 접근은 코딩 테스트에서 항상 좋은 시작점입니다.
