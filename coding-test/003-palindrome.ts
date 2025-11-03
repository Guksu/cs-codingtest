/**
 * 코딩 테스트 #3: 유효한 팰린드롬
 * 난이도: ⭐ (쉬움)
 *
 * 문제:
 * 주어진 문자열이 팰린드롬(회문)인지 확인하세요.
 * 팰린드롬이란 앞에서 읽으나 뒤에서 읽으나 같은 문자열을 말합니다.
 *
 * 중요:
 * - 알파벳과 숫자만 고려합니다 (공백, 특수문자 무시)
 * - 대소문자를 구분하지 않습니다
 *
 * 제약 조건:
 * - 1 ≤ s.length ≤ 2 * 10^5
 * - s는 출력 가능한 ASCII 문자로만 구성됩니다
 */

function solution(s: string): boolean {
  // 여기에 코드를 작성하세요

  let left: number = 0;
  let right: number = s.length - 1;

  function isAlphanumeric(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char);
  }

  while (left < right) {
    const leftStr: string | number = s[left].toLowerCase();
    const rightStr: string | number = s[right].toLowerCase();

    if (!isAlphanumeric(leftStr)) {
      left++;
      continue;
    }

    if (!isAlphanumeric(rightStr)) {
      right--;
      continue;
    }

    if (leftStr !== rightStr) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

interface TestCase {
  input: string;
  expected: boolean;
  description: string;
}

const testCases: TestCase[] = [
  {
    input: "A man, a plan, a canal: Panama",
    expected: true,
    description: '예시 1: "A man, a plan, a canal: Panama"',
  },
  {
    input: "race a car",
    expected: false,
    description: '예시 2: "race a car"',
  },
  {
    input: " ",
    expected: true,
    description: '예시 3: " " (공백만 있는 경우)',
  },
  {
    input: "Was it a car or a cat I saw?",
    expected: true,
    description: '예시 4: "Was it a car or a cat I saw?"',
  },
  {
    input: "Madam",
    expected: true,
    description: '예시 5: "Madam"',
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #3: 유효한 팰린드롬 ===\n");

  let passedCount = 0;

  testCases.forEach((testCase, index) => {
    const { input, expected, description } = testCase;
    const result = solution(input);
    const passed = result === expected;

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력: "${input}"`);
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
