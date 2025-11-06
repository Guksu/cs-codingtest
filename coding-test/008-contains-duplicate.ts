/**
 * 코딩 테스트 #8: 중복된 숫자 찾기
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 정수 배열 nums가 주어집니다.
 * 배열에 중복된 값이 하나라도 있으면 true를, 모든 값이 고유하면 false를 반환하세요.
 *
 * 예시:
 * - [1,2,3,1] → true (1이 중복)
 * - [1,2,3,4] → false (모두 고유)
 * - [1,1,1,3,3,4,3,2,4,2] → true (여러 숫자가 중복)
 *
 * 제약 조건:
 * - 1 ≤ nums.length ≤ 10^5
 * - -10^9 ≤ nums[i] ≤ 10^9
 */

function solution(nums: number[]): boolean {
  // 여기에 코드를 작성하세요
  const map = new Map<number, boolean>();

  for (const num of nums) {
    if (map.get(num)) {
      return true;
    }
    map.set(num, true);
  }

  return false;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: number[];
  expected: boolean;
  description: string;
}

const testCases: TestCase[] = [
  {
    input: [1, 2, 3, 1],
    expected: true,
    description: "예시 1: [1,2,3,1] → 1이 중복",
  },
  {
    input: [1, 2, 3, 4],
    expected: false,
    description: "예시 2: [1,2,3,4] → 모두 고유",
  },
  {
    input: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
    expected: true,
    description: "예시 3: [1,1,1,3,3,4,3,2,4,2] → 여러 숫자 중복",
  },
  {
    input: [1],
    expected: false,
    description: "예시 4: [1] → 단일 요소는 중복 없음",
  },
  {
    input: [1, 5, 9, 3, 6, 2, 7],
    expected: false,
    description: "예시 5: [1,5,9,3,6,2,7] → 모두 고유",
  },
  {
    input: [0, 0],
    expected: true,
    description: "예시 6: [0,0] → 0이 중복",
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #8: 중복된 숫자 찾기 ===\n");

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
