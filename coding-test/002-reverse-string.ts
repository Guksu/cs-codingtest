/**
 * 코딩 테스트 #2: 문자열 뒤집기
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 문자열 배열 s가 주어집니다.
 * 배열의 요소들을 역순으로 바꾸세요.
 *
 * 중요: 새로운 배열을 만들지 말고, 주어진 배열을 직접 수정해야 합니다. (in-place)
 * 함수는 수정된 배열을 반환하세요.
 *
 * 제약 조건:
 * - 1 ≤ s.length ≤ 10^5
 * - s[i]는 출력 가능한 ASCII 문자입니다
 * - O(1)의 추가 메모리만 사용해야 합니다 (배열 자체 제외)
 */

function solution(s: string[]): string[] {
  // 여기에 코드를 작성하세요
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }

  return s;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: string[];
  expected: string[];
  description: string;
}

const testCases: TestCase[] = [
  {
    input: ["h", "e", "l", "l", "o"],
    expected: ["o", "l", "l", "e", "h"],
    description: '예시 1: ["h","e","l","l","o"]',
  },
  {
    input: ["H", "a", "n", "n", "a", "h"],
    expected: ["h", "a", "n", "n", "a", "H"],
    description: '예시 2: ["H","a","n","n","a","h"]',
  },
  {
    input: ["A"],
    expected: ["A"],
    description: '예시 3: ["A"] (단일 요소)',
  },
  {
    input: ["a", "b"],
    expected: ["b", "a"],
    description: '예시 4: ["a","b"] (두 요소)',
  },
];

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

function runTests() {
  console.log("=== 코딩 테스트 #2: 문자열 뒤집기 ===\n");

  let passedCount = 0;

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;
    // 원본 배열을 복사해서 테스트
    const testInput = [...input];
    const result = solution(testInput);
    const passed = arraysEqual(result, expected);

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: [${input.map((c) => `"${c}"`).join(", ")}]`);
    console.log(`  예상 출력: [${expected.map((c) => `"${c}"`).join(", ")}]`);
    console.log(`  실제 출력: [${result.map((c) => `"${c}"`).join(", ")}]`);
    console.log(`  결과: ${passed ? "✅ 통과" : "❌ 실패"}\n`);

    if (passed) passedCount++;
  });

  console.log("=".repeat(50));
  console.log(`총 ${testCases.length}개 중 ${passedCount}개 통과`);
  console.log("=".repeat(50));
}

// 테스트 실행
runTests();
