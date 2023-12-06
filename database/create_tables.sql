-- CONSTRAINT "fk"_(TABLE a - current table)_(a attribute)_(TABLE b)_(b attribute)
-- create DEPARTMENT table
CREATE TABLE DEPARTMENT (
  DCode INT AUTO_INCREMENT PRIMARY KEY,
  Title TEXT NOT NULL,
  DeanDCode INT UNIQUE    -- FK EmpCode from EMPLOYEE table for DeanDCode
);

-- create EMPLOYEE table
CREATE TABLE EMPLOYEE (
  EmpCode INT AUTO_INCREMENT PRIMARY KEY,
  ESSN VARCHAR(12) UNIQUE,
  FName TEXT NOT NULL,
  LName TEXT NOT NULL,
  BirthDate DATE NOT NULL,
  Gender CHAR,
  Address TEXT,
  SpecialityYear INT NOT NULL,
  SpecialityName TEXT NOT NULL,
  StartDate DATE NOT NULL,
  DNo INT DEFAULT NULL,                  -- FK DNo from DEPARTMENT table for DNo, cannot set NOT NULL because constraint?
  EmpType CHAR NOT NULL,
  YearDegree INT NOT NULL,
  CONSTRAINT fk_EMPLOYEE_DNo_DEPARTMENT_DCode FOREIGN KEY (DNo)
             REFERENCES DEPARTMENT(DCode)
             ON DELETE SET NULL
);

-- create table for multivalue attribute Phone number of EMPLOYEE
CREATE TABLE EMP_PHONE_NUM (
  EmpCode INT NOT NULL,
  EmpPhoneNumber VARCHAR(10) NOT NULL,
  PRIMARY KEY(EmpCode, EmpPhoneNumber),
  CONSTRAINT fk_EMPPHONENUM_EmpCode_EMPLOYEE_EmpCode FOREIGN KEY (EmpCode)
             REFERENCES EMPLOYEE(EmpCode)
             ON DELETE CASCADE
);

-- add FK from EmpCode of EMPLOYEE table to DeanDCode of DEPARTMENT table
ALTER TABLE DEPARTMENT
ADD CONSTRAINT fk_DEPARTMENT_DeanDCode_EMPLOYEE_EmpCode FOREIGN KEY (DeanDCode)
               REFERENCES EMPLOYEE(EmpCode)
               ON DELETE SET NULL;

-- create PATIENT table
CREATE TABLE PATIENT (
  PSSN VARCHAR(12) PRIMARY KEY,
  FName TEXT NOT NULL,
  LName TEXT NOT NULL,
  BirthDate DATE NOT NULL,
  Gender CHAR NOT NULL,
  Address TEXT NOT NULL,
  PatPhoneNumber VARCHAR(10) UNIQUE
);

-- create IPATIENT table
CREATE TABLE IPATIENT (
  IPCode VARCHAR(11) PRIMARY KEY,
  PSSN VARCHAR(12) NOT NULL,
  CONSTRAINT fk_IPATIENT_PSSN_PATIENT_PSSN FOREIGN KEY (PSSN)
             REFERENCES PATIENT(PSSN)
             ON DELETE CASCADE
);

-- create OPATIENT table
CREATE TABLE OPATIENT (
  OPCode VARCHAR(11) PRIMARY KEY,
  PSSN VARCHAR(12) NOT NULL,
  CONSTRAINT fk_OPATIENT_PSSN_PATIENT_PSSN FOREIGN KEY (PSSN)
             REFERENCES PATIENT(PSSN)
             ON DELETE CASCADE
);

-- create INFO table
CREATE TABLE INFO (
  InfoSeq INT AUTO_INCREMENT NOT NULL,
  IPID VARCHAR(11) NOT NULL,
  AdmissionDate DATE NOT NULL,
  InfoDiagnosis TEXT NOT NULL,
  Sickroom VARCHAR(10) DEFAULT NULL,
  DischargeDate DATE DEFAULT NULL,
  Fee INT DEFAULT NULL,
  TCareNurseCode INT UNIQUE,
  PRIMARY KEY(InfoSeq, IPID),
  CONSTRAINT fk_INFO_IPID_IPATIENT_IPCode FOREIGN KEY (IPID)
             REFERENCES IPATIENT(IPCode)
             ON DELETE CASCADE,
  CONSTRAINT fk_INFO_TCareNurseCode_EMPLOYEE_EmpCode FOREIGN KEY (TCareNurseCode)
             REFERENCES EMPLOYEE(EmpCode)
             ON DELETE CASCADE
);

-- create TREATMENT TABLE
CREATE TABLE TREATMENT (
  TreatmentDoctorCode INT NOT NULL,
  TreatmentInfoSeq INT NOT NULL,
  TreatmentIPID VARCHAR(11) NOT NULL,
  TreatmentSeq INT NOT NULL,
  IsRecovered BOOLEAN DEFAULT FALSE,
  StartDate DATE NOT NULL,
  EndDate DATE DEFAULT NULL,
  Result TEXT DEFAULT NULL,
  PRIMARY KEY(TreatmentDoctorCode, TreatmentInfoSeq, TreatmentIPID, TreatmentSeq),
  CONSTRAINT fk_TREATMENT_TreatmentDoctorCode_EMPLOYEE_EmpCode FOREIGN KEY (TreatmentDoctorCode)
             REFERENCES EMPLOYEE(EmpCode)
             ON DELETE CASCADE,
  CONSTRAINT fk_TREATMENT_TreatmentInfoSeq_INFO_InfoSeq FOREIGN KEY (TreatmentInfoSeq)
             REFERENCES INFO(InfoSeq)
             ON DELETE CASCADE,
  CONSTRAINT fk_TREATMENT_TreatmentIPID_INFO_IPID FOREIGN KEY (TreatmentIPID)
             REFERENCES INFO(IPID)
             ON DELETE CASCADE
);

-- create EXAMINATION TABLE
CREATE TABLE EXAMINATION (
  ExaminationDoctorCode INT NOT NULL,
  ExaminationOPID VARCHAR(11) NOT NULL,
  ExaminationSeq INT NOT NULL,
  ExaminationDiagnosis TEXT NOT NULL,
  Date DATE NOT NULL,
  Fee INT DEFAULT NULL,
  NextDate DATE DEFAULT NULL,
  PRIMARY KEY(ExaminationDoctorCode, ExaminationOPID, ExaminationSeq),
  CONSTRAINT fk_EXAMINATION_ExaminationDoctorCode_EMPLOYEE_EmpCode FOREIGN KEY (ExaminationDoctorCode)
             REFERENCES EMPLOYEE(EmpCode)
             ON DELETE CASCADE,
  CONSTRAINT fk_EXAMINATION_OPID_OPATIENT_OPCode FOREIGN KEY (ExaminationOPID)
             REFERENCES OPATIENT(OPCode)
             ON DELETE CASCADE
);

-- create PROVIDER TABLE
CREATE TABLE PROVIDER (
  ProviderCode INT AUTO_INCREMENT PRIMARY KEY,
  Name TEXT NOT NULL,
  Address TEXT NOT NULL,
  ProPhoneNumber VARCHAR(10) NOT NULL
);

-- create PACKET TABLE
CREATE TABLE PACKET (
  PacketCode INT AUTO_INCREMENT PRIMARY KEY,
  ImportPrice INT NOT NULL,
  ImportDate DATE NOT NULL
);

-- create MEDICATION TABLE
CREATE TABLE MEDICATION (
  MedCode INT AUTO_INCREMENT NOT NULL,
  MedProCode INT NOT NULL,
  MedPacketCode INT NOT NULL,
  Price INT NOT NULL,
  MedName TEXT NOT NULL,
  ExpDate DATE NOT NULL,
  OutOfDate BOOLEAN DEFAULT FALSE,
  Quantity INT NOT NULL,
  PRIMARY KEY(MedCode, MedProCode, MedPacketCode),
  CONSTRAINT fk_MEDICATION_MedProCode_PROVIDER_ProviderCode FOREIGN KEY (MedProCode)
             REFERENCES PROVIDER(ProviderCode)
             ON DELETE CASCADE,
  CONSTRAINT fk_MEDICATION_MedPacketCode_PACKET_PacketCode FOREIGN KEY (MedPacketCode)
             REFERENCES PACKET(PacketCode)
             ON DELETE CASCADE
);

-- create MED_EFFECT TABLE
CREATE TABLE MED_EFFECT (
  MedCode INT NOT NULL,
  MedProCode INT NOT NULL,
  MedPacketCode INT NOT NULL,
  Effect TEXT NOT NULL,
  PRIMARY KEY(MedCode, MedProCode, MedPacketCode, Effect(255)),
  CONSTRAINT fk_MEDEFFECT_MEDICATION FOREIGN KEY (MedCode, MedProCode, MedPacketCode)
             REFERENCES MEDICATION(MedCode, MedProCode, MedPacketCode)
             ON DELETE CASCADE
);

-- create T_MEDICATION TABLE
CREATE TABLE T_MEDICATION (
  TreatMedCode INT NOT NULL,
  TreatMedProCode INT NOT NULL,
  TreatMedPacketCode INT NOT NULL,
  TreatTreatmentDoctorCode INT NOT NULL,
  TreatTreatmentInfoSeq INT NOT NULL,
  TreatTreatmentIPID VARCHAR(11) NOT NULL,
  TreatTreatmentSeq INT NOT NULL,
  PRIMARY KEY(TreatMedCode, TreatMedProCode, TreatMedPacketCode, TreatTreatmentDoctorCode, TreatTreatmentInfoSeq, TreatTreatmentIPID, TreatTreatmentSeq),
  CONSTRAINT fk_TMED_MEDICATION FOREIGN KEY (TreatMedCode, TreatMedProCode, TreatMedPacketCode)
             REFERENCES MEDICATION(MedCode, MedProCode, MedPacketCode)
             ON DELETE CASCADE,
  CONSTRAINT fk_TMED_TREATMENT FOREIGN KEY (TreatTreatmentDoctorCode, TreatTreatmentInfoSeq, TreatTreatmentIPID, TreatTreatmentSeq)
             REFERENCES TREATMENT(TreatmentDoctorCode, TreatmentInfoSeq, TreatmentIPID, TreatmentSeq)
             ON DELETE CASCADE
);

-- create E_MEDICATION TABLE
CREATE TABLE E_MEDICATION (
  ExamMedCode INT NOT NULL,
  ExamMedProCode INT NOT NULL,
  ExamMedPacketCode INT NOT NULL,
  ExamExaminationDoctorCode INT NOT NULL,
  ExamExaminationOPID VARCHAR(11) NOT NULL,
  ExamExaminationSeq INT NOT NULL,
  PRIMARY KEY(ExamMedCode, ExamMedProCode, ExamMedPacketCode, ExamExaminationDoctorCode, ExamExaminationOPID, ExamExaminationSeq),
  CONSTRAINT fk_EMED_MEDICATION FOREIGN KEY (ExamMedCode, ExamMedProCode, ExamMedPacketCode)
             REFERENCES MEDICATION(MedCode, MedProCode, MedPacketCode)
             ON DELETE CASCADE,
  CONSTRAINT fk_EMED_EXAMINATION FOREIGN KEY (ExamExaminationDoctorCode, ExamExaminationOPID, ExamExaminationSeq)
             REFERENCES EXAMINATION(ExaminationDoctorCode, ExaminationOPID, ExaminationSeq)
             ON DELETE CASCADE
);

CREATE TABLE account (
  user_id int not null unique primary key AUTO_INCREMENT,
  username varchar(32) not null,
  password varchar(256) not null,
  privilege_level int not null
);




