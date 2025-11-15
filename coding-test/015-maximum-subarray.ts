/**
 * 코딩 테스트 #15: 최대 부분 배열의 합
 * 난이도: ⭐⭐ (중간)
 *
 * 문제:
 * 정수 배열 nums가 주어집니다.
 * 연속된 부분 배열 중 합이 가장 큰 부분 배열의 합을 반환하세요.
 *
 * 예시:
 * - [-2,1,-3,4,-1,2,1,-5,4] → 6
 *   (부분 배열 [4,-1,2,1]의 합)
 * - [1] → 1
 * - [5,4,-1,7,8] → 23
 *   (전체 배열의 합)
 *
 * 제약 조건:
 * - 1 ≤ nums.length ≤ 10^5
 * - -10^4 ≤ nums[i] ≤ 10^4
 *
 * Follow-up: O(n) 시간에 해결할 수 있나요?
 * 힌트: Kadane's Algorithm
 */

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
    input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    expected: 6,
    description: "예시 1: [-2,1,-3,4,-1,2,1,-5,4] → 6 (부분 배열 [4,-1,2,1])",
  },
  {
    input: [1],
    expected: 1,
    description: "예시 2: [1] → 1 (단일 요소)",
  },
  {
    input: [5, 4, -1, 7, 8],
    expected: 23,
    description: "예시 3: [5,4,-1,7,8] → 23 (전체 배열)",
  },
  {
    input: [-1],
    expected: -1,
    description: "예시 4: [-1] → -1 (음수 단일 요소)",
  },
  {
    input: [-2, -1],
    expected: -1,
    description: "예시 5: [-2,-1] → -1 (모두 음수)",
  },
  {
    input: [1, 2, 3, 4, 5],
    expected: 15,
    description: "예시 6: [1,2,3,4,5] → 15 (모두 양수)",
  },
  {
    input: [-1, -2, -3, -4],
    expected: -1,
    description: "예시 7: [-1,-2,-3,-4] → -1 (모두 음수, 가장 큰 값)",
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #15: 최대 부분 배열의 합 ===\n");

  let passedCount = 0;
  const executionTimes: number[] = [];

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;

    // 실행 시간 측정
    const startTime = performance.now();
    const result = solution(input);
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
