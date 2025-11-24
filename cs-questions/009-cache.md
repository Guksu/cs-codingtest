# CS 지식 #9: 캐시 (Cache)

## 개념
**자주 사용하는 데이터를 임시 저장소에 보관**하여 빠르게 접근할 수 있게 하는 기술

---

## 캐시의 종류

| 종류 | 위치 | 예시 |
|------|------|------|
| **브라우저 캐시** | 클라이언트 | 이미지, CSS, JS 파일 |
| **CDN 캐시** | 네트워크 엣지 | 정적 자원 |
| **서버 캐시** | 서버 메모리 | Redis, Memcached |
| **DB 캐시** | 데이터베이스 | 쿼리 결과 |

---

## 캐시의 장단점

### 장점
- 네트워크 비용 절약
- 빠른 로딩 (UX 향상)
- 서버 부하 감소

### 단점
- **데이터 일관성 문제**: 오래된 데이터를 보여줄 수 있음
- **저장 공간 필요**: 브라우저/서버 메모리 사용
- **캐시 무효화 복잡성**: 언제 갱신할지 전략 필요

---

## HTTP 캐시 헤더

### Cache-Control

```http
Cache-Control: max-age=3600    # 3600초 동안 캐시 사용
Cache-Control: no-cache        # 매번 서버에 검증 요청
Cache-Control: no-store        # 캐시 저장 자체를 안 함
```

### ETag

각 캐시된 데이터의 고유 ID

**동작 과정:**
```
1. 서버 응답: ETag: "abc123"
2. 다음 요청: If-None-Match: "abc123"
3. 변경 없으면: 304 Not Modified (캐시 사용)
4. 변경 있으면: 200 OK + 새 데이터
```

### Last-Modified

해당 데이터가 마지막으로 언제 수정됐는지 표시

---

## 캐시 무효화 방법

### 쿼리 스트링 방식
```typescript
fetch(`/api/data?v=${Date.now()}`)
```

### 헤더 방식
```typescript
fetch('/api/data', {
  headers: {
    'Cache-Control': 'no-cache'
  }
})
```

---

## Cache Busting (정적 파일 버전 관리)

배포 시 브라우저 캐시로 인해 새 버전을 못 받는 문제 해결

### 해시 기반 (Webpack, Vite 등)
```html
<script src="main.a1b2c3d4.js"></script>
<link href="style.x9y8z7w6.css">
```

### 버전 기반
```html
<script src="main.js?v=1.2.3"></script>
```

**빌드 도구가 자동으로:**
- 파일 내용이 바뀌면 → 새 해시
- 파일 내용이 같으면 → 같은 해시 (캐시 활용)

---

## 핵심 정리

1. **캐시는 성능 최적화의 핵심**
2. **Cache-Control로 캐시 정책 설정**
3. **ETag/Last-Modified로 변경 여부 확인**
4. **Cache Busting으로 배포 시 캐시 문제 해결**
