# 코딩 테스트 #5: 주식을 사고팔기 가장 좋은 시점 - 정답 및 해설

**날짜**: 2025-11-04

## 당신의 풀이

```typescript
function solution(prices: number[]): number {
  let max = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      max = Math.max(max, prices[j] - prices[i]);
    }
  }

  return max;
}
```

**결과**: ✅ 모든 테스트 통과!

## 코드 분석

### 접근 방법: Brute Force (완전 탐색)

당신의 풀이는 **이중 for문**을 사용한 완전 탐색 방식입니다.

**핵심 아이디어:**
1. 모든 (사는 날, 파는 날) 조합을 확인
2. 각 조합의 이익을 계산
3. 최대 이익을 추적

**시간 복잡도:** O(n²)
- 외부 루프: n번
- 내부 루프: 평균 n/2번
- 총 n * (n-1) / 2번 비교

**공간 복잡도:** O(1)
- 추가 배열 사용 없음
- 변수 2개만 사용

### 동작 원리

```
prices = [7, 1, 5, 3, 6, 4]

i=0 (가격 7):
  j=1: 1-7 = -6
  j=2: 5-7 = -2
  j=3: 3-7 = -4
  j=4: 6-7 = -1
  j=5: 4-7 = -3
  max = 0 (음수는 무시)

i=1 (가격 1):
  j=2: 5-1 = 4 → max = 4
  j=3: 3-1 = 2
  j=4: 6-1 = 5 → max = 5 ✨
  j=5: 4-1 = 3

i=2 (가격 5):
  j=3: 3-5 = -2
  j=4: 6-5 = 1
  j=5: 4-5 = -1

... 계속

최종: max = 5
```

## 더 효율적인 풀이: One Pass (한 번 순회)

시간 복잡도를 O(n)으로 개선할 수 있습니다!

```typescript
function solutionOptimized(prices: number[]): number {
  let minPrice = Infinity;  // 지금까지의 최저 가격
  let maxProfit = 0;        // 최대 이익

  for (let i = 0; i < prices.length; i++) {
    // 현재 가격이 최저가보다 낮으면 업데이트
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
    // 현재 가격에 팔았을 때의 이익 계산
    else {
      const profit = prices[i] - minPrice;
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}
```

**시간 복잡도:** O(n)
- 배열을 한 번만 순회
- 각 요소마다 O(1) 연산

**공간 복잡도:** O(1)
- 변수 2개만 사용

### 최적화 풀이 동작 원리

```
prices = [7, 1, 5, 3, 6, 4]

i=0: 가격=7
  minPrice = 7
  maxProfit = 0

i=1: 가격=1
  minPrice = 1 (업데이트!)
  maxProfit = 0

i=2: 가격=5
  minPrice = 1
  profit = 5-1 = 4
  maxProfit = 4 (업데이트!)

i=3: 가격=3
  minPrice = 1
  profit = 3-1 = 2
  maxProfit = 4

i=4: 가격=6
  minPrice = 1
  profit = 6-1 = 5
  maxProfit = 5 (업데이트!) ✨

i=5: 가격=4
  minPrice = 1
  profit = 4-1 = 3
  maxProfit = 5

최종: maxProfit = 5
```

**핵심 인사이트:**
- 각 날짜에서 "지금까지의 최저가에 샀다면?" 계산
- 최저가를 계속 업데이트하면서 최대 이익 추적
- 이중 루프 불필요!

## 두 풀이 비교

| 항목 | Brute Force (당신의 풀이) | One Pass (최적화) |
|------|-------------------------|------------------|
| 시간 복잡도 | O(n²) | O(n) |
| 공간 복잡도 | O(1) | O(1) |
| 가독성 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 성능 (큰 데이터) | 느림 | 빠름 |
| 면접 적합도 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**언제 어떤 풀이를 사용할까?**
- **작은 배열 (n < 100)**: 두 방법 모두 괜찮음
- **큰 배열 (n > 1000)**: One Pass 필수
- **실제 코딩 테스트**: One Pass 방식이 더 인상적
- **먼저 Brute Force로 풀고 → 최적화하는 게 좋은 전략**

## 학습 포인트

### 1. Math.max() 활용

```typescript
// 방법 1: Math.max()
let max = 0;
max = Math.max(max, newValue);

// 방법 2: 조건문
let max = 0;
if (newValue > max) {
  max = newValue;
}

// 방법 3: 삼항 연산자
let max = 0;
max = newValue > max ? newValue : max;

// Math.max()가 가장 간결하고 명확!
```

### 2. Infinity 활용

```typescript
// 최소값 찾기 초기화
let min = Infinity;  // 어떤 수보다 큰 값으로 초기화

// 최대값 찾기 초기화
let max = -Infinity;  // 어떤 수보다 작은 값으로 초기화

// 또는 배열의 첫 요소로 초기화
let min = prices[0];
let max = prices[0];
```

### 3. 탐욕 알고리즘 (Greedy)

최적화된 풀이는 **탐욕 알고리즘**의 예시입니다.

```
탐욕 알고리즘:
"현재 시점에서 가장 좋은 선택을 한다"

이 문제:
- 각 시점에서 "지금까지의 최저가"를 기록
- 현재 가격에 팔았을 때 최대 이익 계산
```

## 변형 문제들

### 변형 1: 사고 팔 수 있는 날짜 반환

```typescript
// 최대 이익뿐만 아니라 사는 날/파는 날도 반환
function solutionWithDays(prices: number[]): [number, number, number] {
  let minPrice = prices[0];
  let minDay = 0;
  let maxProfit = 0;
  let buyDay = 0;
  let sellDay = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      minDay = i;
    } else {
      const profit = prices[i] - minPrice;
      if (profit > maxProfit) {
        maxProfit = profit;
        buyDay = minDay;
        sellDay = i;
      }
    }
  }

  return [maxProfit, buyDay, sellDay];
}

// 사용
const [profit, buy, sell] = solutionWithDays([7, 1, 5, 3, 6, 4]);
console.log(`${buy}일에 사서 ${sell}일에 팔면 이익 ${profit}`);
// "1일에 사서 4일에 팔면 이익 5"
```

### 변형 2: 여러 번 거래 가능 (무제한)

```typescript
// 여러 번 사고 팔 수 있음
function maxProfitMultiple(prices: number[]): number {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    // 가격이 오를 때마다 이익 챙김
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}

// 예시
maxProfitMultiple([7, 1, 5, 3, 6, 4]);
// 1일에 사서 2일에 팔기 (이익 4)
// 3일에 사서 4일에 팔기 (이익 3)
// 총 이익: 7
```

### 변형 3: 최대 k번 거래 가능 (동적 프로그래밍)

```typescript
// 최대 k번 거래 가능
function maxProfitKTransactions(prices: number[], k: number): number {
  if (k === 0 || prices.length === 0) return 0;

  // k번 거래 = 2k번의 행동 (사기/팔기)
  const actions = new Array(2 * k).fill(-Infinity);
  actions[0] = -prices[0];  // 첫 매수

  for (let i = 1; i < prices.length; i++) {
    actions[0] = Math.max(actions[0], -prices[i]);

    for (let j = 1; j < 2 * k; j++) {
      if (j % 2 === 1) {
        // 홀수 = 매도
        actions[j] = Math.max(actions[j], actions[j - 1] + prices[i]);
      } else {
        // 짝수 = 매수
        actions[j] = Math.max(actions[j], actions[j - 1] - prices[i]);
      }
    }
  }

  return Math.max(0, actions[2 * k - 1]);
}
```

### 변형 4: 쿨다운 기간 있음

```typescript
// 팔고 나서 1일 쉬어야 함
function maxProfitWithCooldown(prices: number[]): number {
  if (prices.length <= 1) return 0;

  let sold = 0;        // 방금 팔았을 때 이익
  let held = -prices[0];  // 주식 보유 중 상태
  let reset = 0;       // 쿨다운 상태

  for (let i = 1; i < prices.length; i++) {
    const prevSold = sold;
    sold = held + prices[i];
    held = Math.max(held, reset - prices[i]);
    reset = Math.max(reset, prevSold);
  }

  return Math.max(sold, reset);
}
```

## 실전 팁

### 1. 문제 이해 확인

**면접에서 물어볼 것들:**
- "한 번만 거래 가능한 게 맞나요?"
- "같은 날 사고 팔 수 없죠?"
- "이익이 없으면 0을 반환하는 게 맞나요?"

### 2. 접근 방법 설명

```
1단계: Brute Force 설명
"모든 (매수일, 매도일) 조합을 확인할 수 있습니다.
 O(n²)이지만 구현이 간단합니다."

2단계: 최적화 제안
"하지만 각 날짜마다 '지금까지의 최저가'만 추적하면
 O(n)으로 해결할 수 있습니다."

3단계: 트레이드오프 언급
"Brute Force는 직관적이지만 큰 데이터에서 느립니다.
 One Pass는 효율적이지만 이해하는 데 시간이 걸립니다."
```

### 3. 엣지 케이스 확인

```typescript
// 엣지 케이스 1: 계속 하락
solution([5, 4, 3, 2, 1])  // 0

// 엣지 케이스 2: 계속 상승
solution([1, 2, 3, 4, 5])  // 4

// 엣지 케이스 3: 단일 요소
solution([1])  // 0

// 엣지 케이스 4: 두 요소
solution([2, 1])  // 0
solution([1, 2])  // 1

// 엣지 케이스 5: 같은 가격
solution([3, 3, 3, 3])  // 0
```

### 4. 단계적 최적화

```typescript
// 1단계: 동작하는 코드 (O(n²))
function step1(prices: number[]): number {
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      max = Math.max(max, prices[j] - prices[i]);
    }
  }
  return max;
}

// 2단계: 최적화 (O(n))
function step2(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
}

// 면접에서는 둘 다 보여주는 게 좋음!
```

## 실무 활용

### 1. 주식 트레이딩 앱

```typescript
interface Trade {
  buyDate: Date;
  sellDate: Date;
  buyPrice: number;
  sellPrice: number;
  profit: number;
}

function findBestTrade(prices: number[]): Trade | null {
  if (prices.length < 2) return null;

  let minPrice = prices[0];
  let minIndex = 0;
  let maxProfit = 0;
  let bestTrade: Trade | null = null;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      minIndex = i;
    } else {
      const profit = prices[i] - minPrice;
      if (profit > maxProfit) {
        maxProfit = profit;
        bestTrade = {
          buyDate: new Date(2024, 0, minIndex + 1),
          sellDate: new Date(2024, 0, i + 1),
          buyPrice: minPrice,
          sellPrice: prices[i],
          profit: profit
        };
      }
    }
  }

  return bestTrade;
}
```

### 2. 가격 트렌드 분석

```typescript
function analyzePriceTrend(prices: number[]) {
  let increasingDays = 0;
  let decreasingDays = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      increasingDays++;
    } else if (prices[i] < prices[i - 1]) {
      decreasingDays++;
    }
  }

  return {
    trend: increasingDays > decreasingDays ? 'bullish' : 'bearish',
    increasingDays,
    decreasingDays,
    maxProfit: maxProfit(prices)
  };
}
```

### 3. 시뮬레이션

```typescript
// 다양한 전략 시뮬레이션
function simulateStrategies(prices: number[]) {
  return {
    buyAndHold: prices[prices.length - 1] - prices[0],
    bestSingleTrade: maxProfit(prices),
    multipleT rades: maxProfitMultiple(prices)
  };
}
```

## 코드 개선 제안

당신의 코드는 정확하지만, 최적화 버전도 알아두세요:

```typescript
// 당신의 풀이 (O(n²)) - 정확함! ✅
function solution(prices: number[]): number {
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      max = Math.max(max, prices[j] - prices[i]);
    }
  }
  return max;
}

// 최적화 버전 (O(n)) - 더 효율적! ✅
function solutionOptimized(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
}

// 또는 더 명확하게
function solutionOptimized2(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;  // 최저가 업데이트
    } else {
      const profit = price - minPrice;
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}
```

## 비슷한 문제들

### LeetCode 스타일 문제들

1. **Best Time to Buy and Sell Stock II**
   - 여러 번 거래 가능
   - 난이도: ⭐⭐

2. **Best Time to Buy and Sell Stock III**
   - 최대 2번 거래
   - 난이도: ⭐⭐⭐

3. **Best Time to Buy and Sell Stock IV**
   - 최대 k번 거래
   - 난이도: ⭐⭐⭐

4. **Best Time to Buy and Sell Stock with Cooldown**
   - 쿨다운 기간 있음
   - 난이도: ⭐⭐

## 정리

**문제 핵심:**
```
가장 낮은 가격에 사서
그 이후 가장 높은 가격에 팔기
```

**당신의 풀이 (Brute Force):**
- ✅ 정확함
- ✅ 이해하기 쉬움
- ⚠️ O(n²) - 큰 데이터에서 느림

**최적화 풀이 (One Pass):**
- ✅ 효율적 O(n)
- ✅ 최소 메모리 사용
- ✅ 탐욕 알고리즘
- 💡 최저가 추적하며 한 번 순회

**면접 전략:**
1. Brute Force로 먼저 풀이
2. 동작 확인 후 최적화 제안
3. 트레이드오프 설명
4. 엣지 케이스 확인

---

**총평**: 정확한 풀이입니다! 🎉

Brute Force로 문제를 완벽하게 해결하셨습니다.
실제 면접에서는 이 풀이를 보여준 후,
"O(n)으로 최적화할 수 있습니다"라고 말하고
One Pass 방식을 설명하면 완벽합니다!

탐욕 알고리즘과 동적 프로그래밍의 기초가 되는
매우 중요한 문제입니다. 잘 이해하고 넘어가세요! 👍
