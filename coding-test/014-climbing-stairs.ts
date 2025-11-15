/**
 * 코딩 테스트 #14: 계단 오르기
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * n개의 계단을 올라가려고 합니다.
 * 한 번에 1계단 또는 2계단을 오를 수 있습니다.
 * n개의 계단을 오르는 방법의 수를 구하세요.
 *
 * 예시:
 * - n = 2 → 2가지
 *   (1계단 + 1계단, 2계단)
 * - n = 3 → 3가지
 *   (1+1+1, 1+2, 2+1)
 * - n = 4 → 5가지
 *   (1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2)
 *
 * 제약 조건:
 * - 1 ≤ n ≤ 45
 *
 * 힌트: 피보나치 수열과 관련이 있습니다!
 */

function solution(n: number): number {
  const arr: Array<number> = Array.from({ length: n });
  (arr[0] = 1), (arr[1] = 2);

  for (let i = 2; i < arr.length; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  return arr[n - 1];
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: number;
  expected: number;
  description: string;
}

const testCases: TestCase[] = [
  {
    input: 1,
    expected: 1,
    description: "예시 1: n=1 → 1가지 (1)",
  },
  {
    input: 2,
    expected: 2,
    description: "예시 2: n=2 → 2가지 (1+1, 2)",
  },
  {
    input: 3,
    expected: 3,
    description: "예시 3: n=3 → 3가지 (1+1+1, 1+2, 2+1)",
  },
  {
    input: 4,
    expected: 5,
    description: "예시 4: n=4 → 5가지",
  },
  {
    input: 5,
    expected: 8,
    description: "예시 5: n=5 → 8가지",
  },
  {
    input: 10,
    expected: 89,
    description: "예시 6: n=10 → 89가지",
  },
  {
    input: 20,
    expected: 10946,
    description: "예시 7: n=20 → 10946가지",
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #14: 계단 오르기 ===\n");

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
    console.log(`  입력: n = ${input}`);
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
