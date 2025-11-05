/**
 * 코딩 테스트 #5: 주식을 사고팔기 가장 좋은 시점
 * 난이도: ⭐⭐ (중간)
 *
 * 문제:
 * 주식 가격이 담긴 배열 prices가 주어집니다.
 * prices[i]는 i번째 날의 주식 가격입니다.
 *
 * 한 번의 거래(매수 + 매도)로 얻을 수 있는 최대 이익을 반환하세요.
 * 이익을 낼 수 없다면 0을 반환하세요.
 *
 * 규칙:
 * - 주식을 산 날보다 나중에 팔아야 합니다
 * - 한 번만 사고 팔 수 있습니다
 *
 * 제약 조건:
 * - 1 ≤ prices.length ≤ 10^5
 * - 0 ≤ prices[i] ≤ 10^4
 */

function solution(prices: number[]): number {
  // 여기에 코드를 작성하세요
  let max = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      max = Math.max(max, prices[j] - prices[i]);
    }
  }

  return max;
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
    description: "예시 1: [7,1,5,3,6,4] → 1일에 사서 4일에 팔면 이익 5",
  },
  {
    input: [7, 6, 4, 3, 1],
    expected: 0,
    description: "예시 2: [7,6,4,3,1] → 가격이 계속 하락하므로 이익 0",
  },
  {
    input: [2, 4, 1],
    expected: 2,
    description: "예시 3: [2,4,1] → 0일에 사서 1일에 팔면 이익 2",
  },
  {
    input: [3, 2, 6, 5, 0, 3],
    expected: 4,
    description: "예시 4: [3,2,6,5,0,3] → 1일에 사서 2일에 팔면 이익 4",
  },
  {
    input: [1, 2, 3, 4, 5],
    expected: 4,
    description: "예시 5: [1,2,3,4,5] → 0일에 사서 4일에 팔면 이익 4",
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #5: 주식을 사고팔기 가장 좋은 시점 ===\n");

  let passedCount = 0;

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;
    const result = solution(input);
    const passed = result === expected;

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: [${input.join(", ")}]`);
    console.log(`  예상 출력: ${expected}`);
    console.log(`  실제 출력: ${result}`);
    console.log(`  결과: ${passed ? "✅ 통과" : "❌ 실패"}\n`);

    if (passed) passedCount++;
  });

  console.log("=".repeat(50));
  console.log(`총 ${testCases.length}개 중 ${passedCount}개 통과`);
  console.log("=".repeat(50));
}

// 테스트 실행
runTests();
