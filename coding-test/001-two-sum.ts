/**
 * 코딩 테스트 #1: 두 수의 합
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 정수 배열 nums와 목표 값 target이 주어집니다.
 * 배열에서 두 수를 선택했을 때, 그 합이 target이 되는 두 수의 인덱스를 배열로 반환하세요.
 *
 * 제약 조건:
 * - 2 ≤ nums.length ≤ 10^4
 * - -10^9 ≤ nums[i] ≤ 10^9
 * - -10^9 ≤ target ≤ 10^9
 * - 정확히 하나의 유효한 답이 존재합니다
 * - 같은 원소를 두 번 사용할 수 없습니다
 */

function solution(nums: number[], target: number): number[] {
  // 여기에 코드를 작성하세요
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  nums: number[];
  target: number;
  expected: number[];
  description: string;
}

const testCases: TestCase[] = [
  {
    nums: [2, 7, 11, 15],
    target: 9,
    expected: [0, 1],
    description: "예시 1: [2, 7, 11, 15], target = 9",
  },
  {
    nums: [3, 2, 4],
    target: 6,
    expected: [1, 2],
    description: "예시 2: [3, 2, 4], target = 6",
  },
  {
    nums: [3, 3],
    target: 6,
    expected: [0, 1],
    description: "예시 3: [3, 3], target = 6",
  },
];

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

function runTests() {
  console.log("=== 코딩 테스트 #1: 두 수의 합 ===\n");

  let passedCount = 0;

  testCases.forEach((testCase, index) => {
    const { nums, target, expected, description } = testCase;
    const result = solution(nums, target);
    const passed = arraysEqual(result, expected);

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: nums = [${nums}], target = ${target}`);
    console.log(`  예상 출력: [${expected}]`);
    console.log(`  실제 출력: [${result}]`);
    console.log(`  결과: ${passed ? "✅ 통과" : "❌ 실패"}\n`);

    if (passed) passedCount++;
  });

  console.log("=".repeat(50));
  console.log(`총 ${testCases.length}개 중 ${passedCount}개 통과`);
  console.log("=".repeat(50));
}

// 테스트 실행
runTests();
