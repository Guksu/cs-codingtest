# CS 질문 #5: OSI 7계층 모델 - 답변

## OSI 7계층 모델이란?

**OSI (Open Systems Interconnection) 7계층 모델**은 네트워크 통신을 7개의 계층으로 나눈 개념적 프레임워크입니다. 각 계층은 독립적인 역할을 수행하며, 상위 계층은 하위 계층의 서비스를 이용합니다.

## 계층별 설명 (7계층 → 1계층)

### 7계층: Application Layer (응용 계층)
- **역할**: 사용자와 직접 상호작용하는 계층. 네트워크 서비스를 사용자에게 제공
- **프로토콜/기술**: HTTP, HTTPS, FTP, SMTP, DNS, SSH
- **예시**: 웹 브라우저, 이메일 클라이언트, 파일 전송 프로그램
- **데이터 단위**: Data/Message

### 6계층: Presentation Layer (표현 계층)
- **역할**: 데이터의 형식 변환, 암호화/복호화, 압축/압축 해제
- **프로토콜/기술**: SSL/TLS, JPEG, MPEG, ASCII, EBCDIC
- **예시**: 데이터 인코딩, 문자 집합 변환 (UTF-8, ASCII)
- **데이터 단위**: Data/Message

### 5계층: Session Layer (세션 계층)
- **역할**: 통신 세션의 생성, 유지, 종료를 관리
- **프로토콜/기술**: NetBIOS, RPC, PPTP
- **예시**: 로그인 세션 유지, 화상 회의 연결 관리
- **데이터 단위**: Data/Message

### 4계층: Transport Layer (전송 계층)
- **역할**: 종단 간(end-to-end) 데이터 전송의 신뢰성 보장
- **프로토콜/기술**:
  - **TCP**: 신뢰성 있는 연결 지향 통신 (3-way handshake)
  - **UDP**: 빠르지만 신뢰성 없는 비연결 통신
- **주요 기능**:
  - 포트 번호를 통한 프로세스 식별
  - 흐름 제어 (Flow Control)
  - 오류 제어 (Error Control)
  - 순서 제어 (Sequencing)
- **데이터 단위**: Segment (TCP), Datagram (UDP)

### 3계층: Network Layer (네트워크 계층)
- **역할**: 서로 다른 네트워크 간의 경로 설정(라우팅)과 논리적 주소 지정
- **프로토콜/기술**:
  - **IP** (IPv4, IPv6): 논리적 주소 지정
  - **ICMP**: 오류 보고 및 진단 (ping, traceroute)
  - **ARP**: IP 주소를 MAC 주소로 변환
  - **Router**: 이 계층에서 동작
- **주요 기능**:
  - IP 주소 관리
  - 패킷 라우팅
  - 패킷 분할 및 재조립
- **데이터 단위**: Packet

### 2계층: Data Link Layer (데이터 링크 계층)
- **역할**: 직접 연결된 노드 간의 신뢰성 있는 데이터 전송
- **프로토콜/기술**:
  - **Ethernet**: 유선 LAN
  - **Wi-Fi** (802.11): 무선 LAN
  - **PPP**: Point-to-Point Protocol
  - **Switch**, **Bridge**: 이 계층에서 동작
- **주요 기능**:
  - MAC 주소를 통한 물리적 주소 지정
  - 프레임 구성
  - 오류 검출 (CRC)
  - 흐름 제어
- **데이터 단위**: Frame
- **하위 계층**:
  - **LLC (Logical Link Control)**: 논리적 연결 제어
  - **MAC (Media Access Control)**: 매체 접근 제어

### 1계층: Physical Layer (물리 계층)
- **역할**: 물리적 매체를 통한 비트 전송
- **프로토콜/기술**:
  - **케이블**: UTP, 광섬유, 동축 케이블
  - **신호**: 전기 신호, 광 신호, 무선 신호
  - **Hub**, **Repeater**: 이 계층에서 동작
- **주요 기능**:
  - 비트를 전기/광/무선 신호로 변환
  - 전송 속도, 전압, 케이블 규격 정의
- **데이터 단위**: Bit

---

## 계층별 정리 (1계층 → 7계층)

| 계층 | 이름 | 데이터 단위 | 주요 프로토콜/장비 | 역할 |
|------|------|-------------|-------------------|------|
| 1 | Physical | Bit | Hub, Repeater, 케이블 | 물리적 신호 전송 |
| 2 | Data Link | Frame | Switch, Bridge, MAC, Ethernet | 직접 연결 노드 간 전송 |
| 3 | Network | Packet | Router, IP, ICMP | 경로 설정 및 라우팅 |
| 4 | Transport | Segment/Datagram | TCP, UDP | 종단 간 신뢰성 보장 |
| 5 | Session | Data | NetBIOS, RPC | 세션 관리 |
| 6 | Presentation | Data | SSL/TLS, 인코딩 | 데이터 형식 변환 |
| 7 | Application | Data | HTTP, FTP, DNS | 사용자 인터페이스 |

---

## 암기법

**"All People Seem To Need Data Processing"**
- **A**pplication
- **P**resentation
- **S**ession
- **T**ransport
- **N**etwork
- **D**ata Link
- **P**hysical

또는 역순으로: **"Please Do Not Throw Sausage Pizza Away"**
- **P**hysical
- **D**ata Link
- **N**etwork
- **T**ransport
- **S**ession
- **P**resentation
- **A**pplication

---

## 실제 통신 과정 예시

웹 브라우저에서 `https://www.example.com`에 접속할 때:

1. **Application (7계층)**: 브라우저가 HTTPS 요청 생성
2. **Presentation (6계층)**: SSL/TLS로 데이터 암호화
3. **Session (5계층)**: 세션 연결 생성 및 유지
4. **Transport (4계층)**: TCP로 데이터를 Segment로 분할, 포트 번호 추가 (443)
5. **Network (3계층)**: IP 헤더 추가 (출발지/목적지 IP 주소)
6. **Data Link (2계층)**: Ethernet 프레임 생성, MAC 주소 추가
7. **Physical (1계층)**: 전기 신호로 변환하여 네트워크 케이블로 전송

수신 측에서는 **반대 순서 (1→7계층)**로 처리합니다.

---

## OSI vs TCP/IP 모델

실제 인터넷은 **TCP/IP 4계층 모델**을 사용합니다:

| OSI 7계층 | TCP/IP 4계층 |
|-----------|-------------|
| Application | Application |
| Presentation | Application |
| Session | Application |
| Transport | Transport |
| Network | Internet |
| Data Link | Network Access |
| Physical | Network Access |

- **OSI 모델**: 이론적, 교육적 목적의 개념 모델
- **TCP/IP 모델**: 실제 인터넷에서 사용되는 실용적 모델

---

## 핵심 요약

1. **계층화의 장점**:
   - 각 계층이 독립적으로 동작
   - 특정 계층만 수정 가능 (유지보수 용이)
   - 표준화된 인터페이스 제공

2. **상위 계층 (5-7)**: 사용자와 가까운 소프트웨어 중심
3. **하위 계층 (1-4)**: 데이터 전송과 관련된 하드웨어/네트워크 중심

4. **각 계층의 주요 장비**:
   - 1계층: Hub, Repeater
   - 2계층: Switch, Bridge
   - 3계층: Router
   - 4계층 이상: 소프트웨어 (프로토콜)

OSI 7계층 모델을 이해하면 네트워크 문제를 진단하고 해결하는 데 큰 도움이 됩니다!
