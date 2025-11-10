# CS 질문 #6: 데이터베이스 인덱스 (Index) - 답변

## 인덱스(Index)란?

**인덱스(Index)**는 데이터베이스 테이블의 검색 속도를 향상시키기 위한 자료구조입니다.

책의 맨 뒤에 있는 **색인(찾아보기)**과 같은 역할을 합니다:
- 책에서 특정 단어를 찾을 때, 처음부터 끝까지 읽지 않고 색인을 보고 바로 페이지로 이동
- 데이터베이스도 마찬가지로 인덱스를 사용하면 전체 테이블을 스캔하지 않고 빠르게 데이터를 찾을 수 있음

---

## 인덱스의 동작 원리

### 인덱스가 없는 경우 (Full Table Scan)
```sql
SELECT * FROM users WHERE email = 'john@example.com';
```

인덱스가 없으면:
1. 테이블의 첫 번째 행부터 시작
2. 모든 행을 하나씩 확인 (O(n))
3. 100만 개의 행이 있으면 100만 번 확인

### 인덱스가 있는 경우
```sql
CREATE INDEX idx_email ON users(email);
SELECT * FROM users WHERE email = 'john@example.com';
```

인덱스가 있으면:
1. 인덱스 구조(B-Tree)를 통해 빠르게 검색 (O(log n))
2. 100만 개의 행이 있어도 약 20번의 비교로 찾기 가능

---

## 인덱스의 장점

### 1. 조회 성능 향상
- **SELECT**: WHERE, JOIN, ORDER BY 절의 성능 대폭 향상
- 시간 복잡도: O(n) → O(log n)

```sql
-- 인덱스 없음: 1초 이상 소요
-- 인덱스 있음: 0.01초 소요
SELECT * FROM users WHERE age = 25;
```

### 2. 정렬 속도 향상
- ORDER BY 절이 인덱스 컬럼을 사용하면 별도 정렬 불필요

```sql
-- 인덱스가 있으면 이미 정렬된 상태
SELECT * FROM users ORDER BY created_at DESC;
```

### 3. 고유성 보장
- UNIQUE 인덱스로 중복 방지

```sql
CREATE UNIQUE INDEX idx_email ON users(email);
-- 이메일 중복 입력 시 에러 발생
```

---

## 인덱스의 단점

### 1. 추가 저장 공간 필요
- 인덱스는 별도의 자료구조로 디스크 공간 차지
- 테이블 크기의 10~20% 추가 공간 필요
- 컬럼이 많고 데이터가 많을수록 인덱스 크기 증가

```
테이블: 1GB
인덱스: 100~200MB 추가
```

### 2. 쓰기 성능 저하 (INSERT, UPDATE, DELETE)
- 데이터 삽입/수정/삭제 시 인덱스도 함께 업데이트 필요
- 인덱스가 많을수록 쓰기 작업이 느려짐

```sql
-- 데이터 삽입 시
INSERT INTO users (name, email, age) VALUES ('John', 'john@example.com', 25);

-- 실제로 일어나는 작업:
-- 1. 테이블에 데이터 삽입
-- 2. email 인덱스 업데이트
-- 3. age 인덱스 업데이트
-- 4. created_at 인덱스 업데이트
-- ... (인덱스 개수만큼 추가 작업)
```

### 3. 인덱스 유지 관리 비용
- 인덱스가 조각화(Fragmentation)되면 성능 저하
- 주기적인 재구축(Rebuild) 또는 재구성(Reorganize) 필요

---

## 언제 인덱스를 사용해야 하나?

### ✅ 인덱스를 사용하면 좋은 경우

1. **WHERE 절에 자주 사용되는 컬럼**
```sql
-- email로 자주 검색하는 경우
SELECT * FROM users WHERE email = 'john@example.com';
CREATE INDEX idx_email ON users(email);
```

2. **JOIN에 사용되는 컬럼**
```sql
-- 외래 키(Foreign Key)는 인덱스 필수
SELECT * FROM orders
JOIN users ON orders.user_id = users.id;
CREATE INDEX idx_user_id ON orders(user_id);
```

3. **ORDER BY, GROUP BY에 자주 사용되는 컬럼**
```sql
-- 최신 순으로 자주 정렬하는 경우
SELECT * FROM posts ORDER BY created_at DESC;
CREATE INDEX idx_created_at ON posts(created_at);
```

4. **고유성이 높은 컬럼 (Cardinality가 높음)**
```sql
-- 이메일, 주민등록번호, UUID 등
CREATE INDEX idx_email ON users(email);
```

5. **범위 검색이 필요한 컬럼**
```sql
-- 날짜, 숫자 범위 검색
SELECT * FROM orders WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';
CREATE INDEX idx_created_at ON orders(created_at);
```

### ❌ 인덱스를 사용하지 않는 것이 좋은 경우

1. **작은 테이블 (행이 적은 경우)**
```sql
-- 100개 이하의 행: Full Table Scan이 더 빠를 수 있음
```

2. **자주 변경되는 컬럼**
```sql
-- 매번 UPDATE 시 인덱스도 업데이트 → 성능 저하
UPDATE users SET login_count = login_count + 1;
```

3. **중복 값이 많은 컬럼 (Cardinality가 낮음)**
```sql
-- 성별(남/여), 상태(활성/비활성) 등
-- 인덱스 효과가 미미함
CREATE INDEX idx_gender ON users(gender); -- ❌ 비효율적
```

4. **INSERT가 매우 빈번한 테이블**
```sql
-- 로그 테이블, 이벤트 스트림 등
-- 쓰기 성능이 중요한 경우 인덱스 최소화
```

---

## 인덱스 자료구조

### 1. B-Tree 인덱스 (가장 일반적)
- 균형 잡힌 트리 구조
- 범위 검색, 정렬, 정확한 일치 검색 모두 빠름
- 대부분의 RDBMS에서 기본 인덱스

```
        [50]
       /    \
    [25]    [75]
    /  \    /  \
  [10][30][60][80]
```

**시간 복잡도**: O(log n)

### 2. Hash 인덱스
- 해시 함수를 사용한 키-값 구조
- **정확한 일치 검색**에 매우 빠름 (O(1))
- 범위 검색, 정렬 불가능

```sql
-- 정확한 일치만 빠름
SELECT * FROM users WHERE id = 123; -- ✅ 빠름
SELECT * FROM users WHERE id > 100; -- ❌ 느림 (Hash 인덱스 사용 불가)
```

### 3. Full-Text 인덱스
- 텍스트 검색에 특화
- LIKE '%keyword%' 같은 패턴 검색에 유용

```sql
CREATE FULLTEXT INDEX idx_content ON articles(content);
SELECT * FROM articles WHERE MATCH(content) AGAINST('database index');
```

---

## 실무 예시

### 예시 1: 이커머스 주문 테이블

```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY,           -- 자동으로 인덱스 생성
  user_id BIGINT,                  -- 외래 키 → 인덱스 필요
  product_id BIGINT,               -- 외래 키 → 인덱스 필요
  status VARCHAR(20),              -- 자주 검색 → 인덱스 고려
  created_at TIMESTAMP,            -- 정렬/범위 검색 → 인덱스 필요
  total_amount DECIMAL(10,2)       -- 집계에만 사용 → 인덱스 불필요
);

-- 추천 인덱스
CREATE INDEX idx_user_id ON orders(user_id);
CREATE INDEX idx_product_id ON orders(product_id);
CREATE INDEX idx_status ON orders(status);
CREATE INDEX idx_created_at ON orders(created_at);

-- 복합 인덱스 (여러 컬럼 조합)
CREATE INDEX idx_user_status ON orders(user_id, status);
-- "특정 사용자의 특정 상태 주문" 검색에 최적화
```

### 예시 2: 복합 인덱스 (Composite Index)

```sql
-- 잘못된 예
CREATE INDEX idx_name ON users(name);
CREATE INDEX idx_age ON users(age);

SELECT * FROM users WHERE name = 'John' AND age = 25;
-- 두 인덱스 중 하나만 사용됨 (비효율적)

-- 올바른 예
CREATE INDEX idx_name_age ON users(name, age);
-- 두 조건을 함께 빠르게 검색
```

**복합 인덱스 순서가 중요함:**
```sql
CREATE INDEX idx_name_age ON users(name, age);

-- ✅ 인덱스 사용 가능
SELECT * FROM users WHERE name = 'John';
SELECT * FROM users WHERE name = 'John' AND age = 25;

-- ❌ 인덱스 사용 불가 (첫 번째 컬럼인 name이 없음)
SELECT * FROM users WHERE age = 25;
```

---

## 인덱스 모니터링 및 최적화

### 1. 실행 계획 확인 (EXPLAIN)
```sql
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';

-- 결과 예시:
-- type: index (인덱스 사용)
-- key: idx_email
-- rows: 1 (검색할 행 수)
```

### 2. 사용되지 않는 인덱스 제거
```sql
-- MySQL: 인덱스 사용 통계 확인
SELECT * FROM sys.schema_unused_indexes;

-- 사용하지 않는 인덱스 삭제
DROP INDEX idx_unused ON users;
```

### 3. 인덱스 크기 확인
```sql
-- MySQL
SELECT
  table_name,
  index_name,
  ROUND(stat_value * @@innodb_page_size / 1024 / 1024, 2) AS size_mb
FROM mysql.innodb_index_stats
WHERE stat_name = 'size';
```

---

## 핵심 요약

| 항목 | 내용 |
|------|------|
| **정의** | 데이터베이스 검색 속도를 높이는 자료구조 (책의 색인과 유사) |
| **장점** | SELECT 성능 대폭 향상 (O(n) → O(log n)) |
| **단점** | 저장 공간 증가, 쓰기 성능 저하 (INSERT/UPDATE/DELETE) |
| **사용 시기** | WHERE, JOIN, ORDER BY에 자주 사용되는 컬럼 |
| **피해야 할 때** | 작은 테이블, 중복 값 많은 컬럼, 쓰기가 빈번한 테이블 |
| **자료구조** | B-Tree (범용), Hash (정확한 일치), Full-Text (텍스트 검색) |

---

## 당신의 답변 피드백

당신의 답변:
> "인덱스란 데이터베이스 컬럼을 바로 조회 가능한 key야. 이 덕분에 조회 시간을 단축할 수 있지만 인덱스에 저장공간을 할당해야하는 단점이 있어. 주로 데이터 조회를 할 때 인덱스를 사용해."

**잘한 점:**
- ✅ 핵심을 정확히 이해: 조회 속도 향상
- ✅ 단점 언급: 저장 공간 필요
- ✅ 사용 시기: 데이터 조회 시

**보완하면 좋은 점:**
- 쓰기 성능 저하도 중요한 단점 (INSERT/UPDATE/DELETE가 느려짐)
- 인덱스 자료구조 (B-Tree, Hash 등)
- 구체적인 사용 예시 (WHERE, JOIN, ORDER BY)

전반적으로 핵심을 잘 이해하고 있어요! 👍

---

## 프론트엔드 개발자를 위한 팁

**API 요청 시 고려사항:**
```javascript
// ❌ 비효율적: 인덱스 없는 필드로 검색
GET /api/users?nickname=john

// ✅ 효율적: 인덱스 있는 필드로 검색
GET /api/users?email=john@example.com

// 백엔드에 인덱스 추가 요청 시:
// "user_id로 자주 필터링하는데, 인덱스가 있나요?"
```

**페이지네이션 최적화:**
```javascript
// ❌ 오프셋 기반 (느림, 큰 오프셋일수록 비효율)
GET /api/posts?page=100&limit=20

// ✅ 커서 기반 (빠름, 인덱스 활용)
GET /api/posts?after_id=12345&limit=20
```

인덱스를 이해하면 백엔드와 협업할 때 더 효율적인 API 설계를 제안할 수 있습니다!
