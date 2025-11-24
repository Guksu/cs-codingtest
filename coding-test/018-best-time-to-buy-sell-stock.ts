/**
 * 코딩 테스트 #18: 주식 사고팔기 최적의 시점
 * 난이도: ⭐⭐ (중간)
 *
 * 문제:
 * 주식 가격이 담긴 배열 prices가 주어집니다.
 * prices[i]는 i번째 날의 주식 가격입니다.
 * 주식을 한 번 사고 한 번 팔아서 얻을 수 있는 최대 이익을 반환하세요.
 * 이익을 얻을 수 없다면 0을 반환하세요.
 *
 * 예시:
 * - [7,1,5,3,6,4] → 5
 *   (1에 사서 6에 팔면 이익 = 6 - 1 = 5)
 * - [7,6,4,3,1] → 0
 *   (가격이 계속 하락하여 이익 불가)
 *
 * 제약 조건:
 * - 1 ≤ prices.length ≤ 10^5
 * - 0 ≤ prices[i] ≤ 10^4
 * - 사기 전에 팔 수 없음 (i < j여야 함)
 *
 * 힌트: 최소 가격을 추적하면서 현재 가격과의 차이를 계산해보세요!
 */

function solution(prices: number[]): number {
  let sum: number = 0;
  let min: number = Infinity;

  for (const price of prices) {
    min = Math.min(min, price);
    sum = Math.max(price - min, sum);
  }

  return sum;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: number[];
  expected: number;
  description: string;
}

const testCases: TestCase[] = [
  {
    input: [7, 1, 5, 3, 6, 4],
    expected: 5,
    description: "예시 1: [7,1,5,3,6,4] → 5 (1에 사서 6에 팔기)",
  },
  {
    input: [7, 6, 4, 3, 1],
    expected: 0,
    description: "예시 2: [7,6,4,3,1] → 0 (계속 하락)",
  },
  {
    input: [1, 2],
    expected: 1,
    description: "예시 3: [1,2] → 1 (1에 사서 2에 팔기)",
  },
  {
    input: [2, 1],
    expected: 0,
    description: "예시 4: [2,1] → 0 (이익 불가)",
  },
  {
    input: [3, 3, 3, 3],
    expected: 0,
    description: "예시 5: [3,3,3,3] → 0 (가격 변동 없음)",
  },
  {
    input: [1],
    expected: 0,
    description: "예시 6: [1] → 0 (하루만 있음)",
  },
  {
    input: [2, 4, 1, 7],
    expected: 6,
    description: "예시 7: [2,4,1,7] → 6 (1에 사서 7에 팔기)",
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #18: 주식 사고팔기 최적의 시점 ===\n");

  let passedCount = 0;
  const executionTimes: number[] = [];

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;

    // 실행 시간 측정
    const startTime = performance.now();
    const result = solution([...input]);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    executionTimes.push(executionTime);

    const passed = result === expected;

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(
      `  입력: [${
        input.length <= 10
          ? input.join(", ")
          : `${input.slice(0, 10).join(", ")}, ...`
      }]`
    );
    console.log(`  예상 출력: ${expected}`);
    console.log(`  실제 출력: ${result}`);
    console.log(`  실행 시간: ${executionTime.toFixed(4)}ms`);
    console.log(`  결과: ${passed ? "✅ 통과" : "❌ 실패"}\n`);

    if (passed) passedCount++;
  });

  const avgExecutionTime =
    executionTimes.reduce((sum, time) => sum + time, 0) / executionTimes.length;
  const totalExecutionTime = executionTimes.reduce(
    (sum, time) => sum + time,
    0
  );

  console.log("=".repeat(50));
  console.log(`총 ${testCases.length}개 중 ${passedCount}개 통과`);
  console.log(`평균 실행 시간: ${avgExecutionTime.toFixed(4)}ms`);
  console.log(`총 실행 시간: ${totalExecutionTime.toFixed(4)}ms`);
  console.log("=".repeat(50));
}

// 테스트 실행
runTests();
