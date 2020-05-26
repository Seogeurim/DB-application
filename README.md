# DB-application
데이터베이스 응용 수업 (2020 Spring)

## 실행방법

### Precondition
- MySQL, MongoDB, node 설치 완료
- localhost에 H대학 데이터 저장할 데이터베이스 생성되어 있음 (코드에는 : huniv)
- localhost의 MySQL 데이터베이스에 데이터 insert 되어 있음

### 실행
HUNIV_migration/.env 파일 내 설정에 따라 수정
- MYSQL > HOST, USER, PASSWORD, DATABASE 설정 (패스워드 없다면 설정해야 함)
- MONGODB > URI, DATABASE

```bash
cd HUNIV_migration
npm install
npm start
```

### 실행 후 데이터베이스 
몽고디비 확인해보면 데이터가 migration 되어 있을 것.
linked는 아직 구현하지 않음.
