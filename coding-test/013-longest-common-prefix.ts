/**
 * 코딩 테스트 #13: 가장 긴 공통 접두사
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 문자열 배열 strs가 주어집니다.
 * 배열의 모든 문자열에 공통으로 포함된 가장 긴 접두사(prefix)를 찾아 반환하세요.
 * 공통 접두사가 없으면 빈 문자열 ""을 반환하세요.
 *
 * 예시:
 * - ["flower","flow","flight"] → "fl"
 * - ["dog","racecar","car"] → ""
 * - ["interspecies","interstellar","interstate"] → "inters"
 *
 * 제약 조건:
 * - 1 ≤ strs.length ≤ 200
 * - 0 ≤ strs[i].length ≤ 200
 * - strs[i]는 영어 소문자로만 구성됩니다
 */

function solution(strs: string[]): string {
  let shortest = strs.reduce((min, current) =>
    current.length < min.length ? current : min
  );

  while (shortest.length) {
    if (strs.every((str) => str.includes(shortest))) {
      return shortest;
    } else {
      shortest = shortest.slice(0, -1);
    }
  }

  return "";
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: string[];
  expected: string;
  description: string;
}

const testCases: TestCase[] = [
  {
    input: ["flower", "flow", "flight"],
    expected: "fl",
    description: '예시 1: ["flower","flow","flight"] → "fl"',
  },
  {
    input: ["dog", "racecar", "car"],
    expected: "",
    description: '예시 2: ["dog","racecar","car"] → "" (공통 접두사 없음)',
  },
  {
    input: ["interspecies", "interstellar", "interstate"],
    expected: "inters",
    description:
      '예시 3: ["interspecies","interstellar","interstate"] → "inters"',
  },
  {
    input: ["a"],
    expected: "a",
    description: '예시 4: ["a"] → "a" (단일 문자열)',
  },
  {
    input: ["ab", "a"],
    expected: "a",
    description: '예시 5: ["ab","a"] → "a"',
  },
  {
    input: ["", "b"],
    expected: "",
    description: '예시 6: ["","b"] → "" (빈 문자열 포함)',
  },
  {
    input: ["same", "same", "same"],
    expected: "same",
    description: '예시 7: ["same","same","same"] → "same" (모두 동일)',
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #13: 가장 긴 공통 접두사 ===\n");

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
    console.log(`  입력: [${input.map((s) => `"${s}"`).join(", ")}]`);
    console.log(`  예상 출력: "${expected}"`);
    console.log(`  실제 출력: "${result}"`);
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
