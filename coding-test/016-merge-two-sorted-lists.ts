/**
 * 코딩 테스트 #16: 정렬된 두 연결 리스트 병합
 * 난이도: ⭐⭐ (중간)
 *
 * 문제:
 * 정렬된 두 연결 리스트 list1과 list2가 주어집니다.
 * 두 리스트를 하나의 정렬된 리스트로 병합하여 반환하세요.
 * 새로운 리스트는 두 리스트의 노드를 이어붙여 만들어야 합니다.
 *
 * 예시:
 * - [1,2,4] + [1,3,4] → [1,1,2,3,4,4]
 * - [] + [] → []
 * - [] + [0] → [0]
 * - [1,3,5] + [2,4,6] → [1,2,3,4,5,6]
 *
 * 제약 조건:
 * - 두 리스트의 노드 수는 [0, 50] 범위입니다
 * - -100 ≤ Node.val ≤ 100
 * - list1과 list2는 오름차순으로 정렬되어 있습니다
 *
 * 힌트: 더미 헤드 노드를 사용하면 편리합니다!
 */

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function solution(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // 더미 헤드: 결과 리스트의 시작점
  const dummy = new ListNode(0);
  let current = dummy;

  // 두 리스트 모두 노드가 있을 때
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // 남은 노드 연결
  current.next = list1 || list2;

  return dummy.next;
}

// ============================================
// 테스트 코드 (수정하지 마세요)
// ============================================

// 배열을 연결 리스트로 변환
function arrayToList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

// 연결 리스트를 배열로 변환
function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

interface TestCase {
  input1: number[];
  input2: number[];
  expected: number[];
  description: string;
}

const testCases: TestCase[] = [
  {
    input1: [1, 2, 4],
    input2: [1, 3, 4],
    expected: [1, 1, 2, 3, 4, 4],
    description: "예시 1: [1,2,4] + [1,3,4] → [1,1,2,3,4,4]",
  },
  {
    input1: [],
    input2: [],
    expected: [],
    description: "예시 2: [] + [] → [] (둘 다 빈 리스트)",
  },
  {
    input1: [],
    input2: [0],
    expected: [0],
    description: "예시 3: [] + [0] → [0] (하나가 빈 리스트)",
  },
  {
    input1: [1, 3, 5],
    input2: [2, 4, 6],
    expected: [1, 2, 3, 4, 5, 6],
    description: "예시 4: [1,3,5] + [2,4,6] → [1,2,3,4,5,6] (교차)",
  },
  {
    input1: [1, 2, 3],
    input2: [4, 5, 6],
    expected: [1, 2, 3, 4, 5, 6],
    description: "예시 5: [1,2,3] + [4,5,6] → [1,2,3,4,5,6] (연속)",
  },
  {
    input1: [5],
    input2: [1, 2, 4],
    expected: [1, 2, 4, 5],
    description: "예시 6: [5] + [1,2,4] → [1,2,4,5]",
  },
  {
    input1: [-10, -5, 0],
    input2: [-7, -3, 1],
    expected: [-10, -7, -5, -3, 0, 1],
    description: "예시 7: 음수 포함 정렬",
  },
];

function runTests() {
  console.log("=== 코딩 테스트 #16: 정렬된 두 연결 리스트 병합 ===\n");

  let passedCount = 0;
  const executionTimes: number[] = [];

  testCases.forEach((testCase, index) => {
    const { input1, input2, expected, description } = testCase;

    // 연결 리스트 생성
    const list1 = arrayToList(input1);
    const list2 = arrayToList(input2);

    // 실행 시간 측정
    const startTime = performance.now();
    const resultList = solution(list1, list2);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    executionTimes.push(executionTime);

    // 결과를 배열로 변환하여 비교
    const result = listToArray(resultList);
    const passed = JSON.stringify(result) === JSON.stringify(expected);

    console.log(`테스트 ${index + 1}: ${description}`);
    console.log(`  입력1: [${input1.join(", ")}]`);
    console.log(`  입력2: [${input2.join(", ")}]`);
    console.log(`  예상 출력: [${expected.join(", ")}]`);
    console.log(`  실제 출력: [${result.join(", ")}]`);
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
