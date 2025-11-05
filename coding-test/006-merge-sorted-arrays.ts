/**
 * 코딩 테스트 #6: 정렬된 두 배열 합치기
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 오름차순으로 정렬된 두 배열 nums1과 nums2가 주어집니다.
 * 두 배열을 합쳐서 하나의 정렬된 배열로 반환하세요.
 *
 * 제약 조건:
 * - 0 ≤ nums1.length, nums2.length ≤ 200
 * - 1 ≤ nums1.length + nums2.length ≤ 200
 * - -10^9 ≤ nums1[i], nums2[i] ≤ 10^9
 * - nums1과 nums2는 오름차순으로 정렬되어 있습니다
 */

function solution(nums1: number[], nums2: number[]): number[] {
  return [...nums1, ...nums2].sort((a, b) => a - b);
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  nums1: number[];
  nums2: number[];
  expected: number[];
  description: string;
}

const testCases: TestCase[] = [
  {
    nums1: [1, 2, 3],
    nums2: [2, 5, 6],
    expected: [1, 2, 2, 3, 5, 6],
    description: "예시 1: [1,2,3] + [2,5,6]",
  },
  {
    nums1: [],
    nums2: [1],
    expected: [1],
    description: "예시 2: [] + [1] (빈 배열)",
  },
  {
    nums1: [1],
    nums2: [],
    expected: [1],
    description: "예시 3: [1] + [] (빈 배열)",
  },
  {
    nums1: [1, 3, 5],
    nums2: [2, 4, 6],
    expected: [1, 2, 3, 4, 5, 6],
    description: "예시 4: [1,3,5] + [2,4,6] (교차)",
  },
  {
    nums1: [1, 2, 3],
    nums2: [4, 5, 6],
    expected: [1, 2, 3, 4, 5, 6],
    description: "예시 5: [1,2,3] + [4,5,6] (연속)",
  },
];

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

function runTests() {
  console.log("=== 코딩 테스트 #6: 정렬된 두 배열 합치기 ===\n");

  let passedCount = 0;

  testCases.forEach((testCase, index) => {
    const { nums1, nums2, expected, description } = testCase;
    const result = solution(nums1, nums2);
    const passed = arraysEqual(result, expected);

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: [${nums1.join(", ")}] + [${nums2.join(", ")}]`);
    console.log(`  예상 출력: [${expected.join(", ")}]`);
    console.log(`  실제 출력: [${result.join(", ")}]`);
    console.log(`  결과: ${passed ? "✅ 통과" : "❌ 실패"}\n`);

    if (passed) passedCount++;
  });

  console.log("=".repeat(50));
  console.log(`총 ${testCases.length}개 중 ${passedCount}개 통과`);
  console.log("=".repeat(50));
}

// 테스트 실행
runTests();
