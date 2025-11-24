# 코딩 테스트 #18: 주식 사고팔기 최적의 시점 - 답변

## 문제 요약
주식을 한 번 사고 한 번 팔아서 얻을 수 있는 최대 이익 구하기

---

## 당신의 풀이 (최소값 추적)

```typescript
function solution(prices: number[]): number {
  let sum: number = 0;
  let min: number = Infinity;

  for (const price of prices) {
    min = Math.min(min, price);
    sum = Math.max(price - min, sum);
  }

  return sum;
}
```

### 시간 복잡도
- **O(n)**: 배열을 한 번만 순회

### 공간 복잡도
- **O(1)**: 변수 2개만 사용

### 핵심 아이디어

각 날에서:
1. **지금까지의 최소 가격 갱신** → 여기서 샀다면?
2. **현재 가격과의 차이로 이익 계산** → 오늘 팔면?
3. **최대 이익 갱신**

### 동작 과정 (예시: [7, 1, 5, 3, 6, 4])

```
초기: min = Infinity, sum = 0

price = 7:
  min = Math.min(Infinity, 7) = 7
  sum = Math.max(7 - 7, 0) = 0

price = 1:
  min = Math.min(7, 1) = 1  ← 새로운 최소값!
  sum = Math.max(1 - 1, 0) = 0

price = 5:
  min = Math.min(1, 5) = 1
  sum = Math.max(5 - 1, 0) = 4  ← 이익 발생!

price = 3:
  min = Math.min(1, 3) = 1
  sum = Math.max(3 - 1, 4) = 4

price = 6:
  min = Math.min(1, 6) = 1
  sum = Math.max(6 - 1, 4) = 5  ← 최대 이익!

price = 4:
  min = Math.min(1, 4) = 1
  sum = Math.max(4 - 1, 5) = 5

return 5 ✅
```

---

## 다른 풀이 방법

### 방법 1: 브루트 포스 (비효율적)

```typescript
function solution(prices: number[]): number {
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const profit = prices[j] - prices[i];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}
```

**시간 복잡도**: O(n²) - 매우 느림!
**공간 복잡도**: O(1)

**문제점:**
- 모든 쌍을 비교하여 비효율적
- 큰 배열에서 타임아웃

---

### 방법 2: Kadane's Algorithm 변형

```typescript
function solution(prices: number[]): number {
  let maxProfit = 0;
  let currentProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    // 오늘과 어제의 가격 차이
    const diff = prices[i] - prices[i - 1];

    // 현재 이익 = 이전 이익 + 오늘 차이 (음수면 0으로 리셋)
    currentProfit = Math.max(0, currentProfit + diff);

    // 최대 이익 갱신
    maxProfit = Math.max(maxProfit, currentProfit);
  }

  return maxProfit;
}
```

**아이디어:**
- 연속된 가격 차이의 최대 부분 합 = 최대 이익
- Maximum Subarray 문제와 동일!

**예시:**
```
prices: [7, 1, 5, 3, 6, 4]
diffs:  [-6, 4, -2, 3, -2]

최대 부분 합: 4 + (-2) + 3 = 5 ✅
(1에서 6까지의 이익)
```

---

## 성능 비교

| 방법 | 시간 복잡도 | 공간 복잡도 | 추천도 |
|------|------------|------------|--------|
| 최소값 추적 (당신의 풀이) | O(n) | O(1) | ⭐⭐⭐⭐⭐ |
| Kadane 변형 | O(n) | O(1) | ⭐⭐⭐⭐ |
| 브루트 포스 | O(n²) | O(1) | ⭐ |

---

## 실행 결과

```
총 7개 중 7개 통과
평균 실행 시간: 0.0039ms
총 실행 시간: 0.0270ms
```

모든 테스트를 통과했고, 평균 **0.0039ms**의 빠른 실행 시간!

---

## 변수명 개선 제안

```typescript
function solution(prices: number[]): number {
  let maxProfit = 0;      // sum → maxProfit
  let minPrice = Infinity; // min → minPrice

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(price - minPrice, maxProfit);
  }

  return maxProfit;
}
```

의미가 더 명확해져서 코드 가독성이 향상됩니다!

---

## 엣지 케이스 처리

### 1. 계속 하락
```typescript
prices = [7, 6, 4, 3, 1]

price = 7: min = 7, sum = 0
price = 6: min = 6, sum = 0  (6-6=0)
price = 4: min = 4, sum = 0  (4-4=0)
price = 3: min = 3, sum = 0
price = 1: min = 1, sum = 0

return 0 ✅ (이익 없음)
```

### 2. 단일 요소
```typescript
prices = [1]

루프 한 번: min = 1, sum = 0
return 0 ✅
```

### 3. 모두 같은 가격
```typescript
prices = [3, 3, 3, 3]

모든 price - min = 0
return 0 ✅
```

---

## 관련 문제들

### 1. 여러 번 거래 가능 (Best Time to Buy and Sell Stock II)

```typescript
function maxProfit(prices: number[]): number {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    // 오르는 구간만 모두 더하기
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}
```

### 2. 최대 2번 거래 (Best Time to Buy and Sell Stock III)

```typescript
function maxProfit(prices: number[]): number {
  let buy1 = -Infinity, sell1 = 0;
  let buy2 = -Infinity, sell2 = 0;

  for (const price of prices) {
    buy1 = Math.max(buy1, -price);
    sell1 = Math.max(sell1, buy1 + price);
    buy2 = Math.max(buy2, sell1 - price);
    sell2 = Math.max(sell2, buy2 + price);
  }

  return sell2;
}
```

---

## 핵심 개념

1. **그리디 (Greedy)**
   - 매 순간 최적의 선택
   - 지금까지의 최소에서 사고, 현재에 팔기

2. **한 번의 순회로 해결**
   - 과거의 최소값만 기억
   - 현재와의 차이로 이익 계산

3. **Kadane's Algorithm과의 관계**
   - 가격 차이의 최대 부분 합 = 최대 이익
   - 둘 다 O(n) 시간, O(1) 공간

---

## 결론

최소값 추적 패턴을 사용하여 O(n) 시간, O(1) 공간으로 효율적으로 해결!

**당신의 풀이 하이라이트:**
- ✅ 최소값 갱신 + 최대 이익 갱신 패턴
- ✅ Infinity로 초기화하여 첫 값 자동 처리
- ✅ 간결하고 효율적인 코드
- ✅ 평균 실행 시간 **0.0039ms**

변수명을 `minPrice`, `maxProfit`으로 바꾸면 더 명확해지지만, 로직은 완벽해!
