-- insert DEPARTMENT
INSERT INTO DEPARTMENT(Title)
VALUES ("HEART"),
       ("BRAIN"),
       ("SPINE");
       
-- insert EMPLOYEE
INSERT INTO EMPLOYEE
VALUES ("110", "857492316240", "Lebron", "James", "1990-12-30", "M", "222 AP street", 2015, "Heart surgery", "2020-11-25", "1", "D", 5),
       ("102", "649802513721", "Mary", "Jane", "1985-05-15", "F", "22B Royal street", 2013, "Heart nurse", "2018-10-13", "1", "N", 6),
       ("112", "124569837890", "Brown", "Gates", "1978-08-22", "M", "50 Rolls street", 2009, "Brain surgery", "2014-08-05", "2", "D", 10),
       ("111", "935871246502", "Yeager", "Fleur", "1979-04-18", "M", "98A Wolf street", 2011, "Spine surgery", "2014-12-31", "3", "D", 10),
       ("105", "208346195783", "Kella", "Jous", "1994-12-30", "M", "201/R LEONS street", 2016, "Heart surgery", "2021-04-05", "1", "D", 4),
       ("108", "987654321012", "John", "Doe", "1990-06-15", "M", "456 XYZ street", 2014, "Spine nurse", "2020-07-15", "3", "N", 6),
       ("109", "123456789012", "Emily", "Johnson", "1985-11-22", "F", "789 LMN street", 2011, "Brain nurse", "2021-02-28", "2", "N", 8),
       ("101", "876543210987", "Michael", "Smith", "1993-03-10", "M", "29 jr. James street", 2014, "Heart nurse", "2020-11-10", "1", "N", 5);

-- insert dean DEPARTMENT
UPDATE DEPARTMENT
SET DeanDCode = (SELECT EmpCode FROM EMPLOYEE WHERE ESSN = '857492316240')
WHERE DCode = 1;
UPDATE DEPARTMENT
SET DeanDCode = (SELECT EmpCode FROM EMPLOYEE WHERE ESSN = '935871246502')
WHERE DCode = 2;
UPDATE DEPARTMENT
SET DeanDCode = (SELECT EmpCode FROM EMPLOYEE WHERE ESSN = '124569837890')
WHERE DCode = 3;

-- insert EMP_PHONE_NUM
INSERT INTO EMP_PHONE_NUM
VALUES ("105", "4859301762"),
       ("111", "7198463025"),
       ("112", "2685140379"),
       ("102", "5039281764"),
       ("110", "6152974803");

-- insert PATIENT
INSERT INTO PATIENT
VALUES ("724513890267", "Emma", "Thompson", "1995-08-20", "F", "123 Main Street", "1234567890"),
       ("569874201345", "Samuel", "Rodriguez", "1989-04-12", "M", "456 Elm Avenue", "9876543210"),
       ("123456789012", "Olivia", "Foster", "2002-11-30", "F", "789 Oak Boulevard", "5678901234"),
       ("987654321098", "Ethan", "Turner", "1976-07-08", "M", "101 Pine Lane", "1098765432"),
       ("456789012345", "Ava", "Mitchell", "1990-12-15", "F", "202 Maple Road", "4321098765"),
       ("890123456789", "Benjamin", "Walker", "1985-03-25", "M", "303 Cedar Court", "3210987654");

-- insert IPATIENT
INSERT INTO IPATIENT
VALUES ("IP123456789", "724513890267"),
       ("IP987654321", "569874201345"),
       ("IP567890123", "123456789012"),
       ("IP109876543", "987654321098");

-- insert OPATIENT
INSERT INTO OPATIENT
VALUES ("OP234567890", "123456789012"),
       ("OP876543210", "987654321098"),
       ("OP345678901", "456789012345"),
       ("OP345672132", "569874201345"),  
       ("OP210987654", "890123456789");

-- insert INFO
INSERT INTO INFO(IPID, AdmissionDate, InfoDiagnosis, Sickroom, DischargeDate, Fee, TCareNurseCode)
VALUES ("IP123456789", "2021-07-10", "Heart failure", "EMER01", NULL, 2000, "102"),
       ("IP987654321", "2020-04-25", "Open heart valve", "EMER02", "2021-06-15", 3000, "101"),
       ("IP567890123", "2022-11-15", "Spine displaced", "EMER03", NULL, NULL, "108"),
       ("IP109876543", "2021-02-03", "Brain tumor", "EMER01", NULL, 5000, "109");

-- insert TREATMENT
INSERT INTO TREATMENT
VALUES ("110", 1, "IP123456789", 1, FALSE, "2021-08-17", "2022-02-03", "Patient passed critical situation, still need special care 24/7"),
       ("105", 2, "IP987654321", 1, FALSE, "2020-11-05", "2020-12-30", "Patients' surgery went good"),
       ("105", 2, "IP987654321", 2, FALSE, "2020-12-31", "2020-12-31", "Another surgery went all good, nothing found so far"),
       ("111", 3, "IP567890123", 1, TRUE, "2019-03-12", "2019-12-24", "Patient's health recovered to normal, can be discharged"),
       ("105", 2, "IP987654321", 3, TRUE, "2020-12-31", "2021-1-30", "Patient's health recovered to normal, can be discharged"),
       ("112", 4, "IP109876543", 1, FALSE, "2022-09-08", "2023-04-30", "Patient's surgery went fine, should be improvised"),
       ("110", 1, "IP123456789", 2, FALSE, "2022-02-03", NULL, "Patient started to have some positive progression");

-- insert EXAMINATION
INSERT INTO EXAMINATION
VALUES ("111", "OP234567890", 1, "Just a normal headache", "2022-02-14", 80, NULL),
       ("112", "OP876543210", 1, "Need to check again after 2 weeks", "2022-05-23", 123, "2022-06-06"),
       ("105", "OP345678901", 1, "Need to drink medication and go check after a week", "2022-08-07", 95, "2022-08-14"),
       ("105", "OP210987654", 1, "Patient needs a more healthy lifestyle, more sleep", "2022-10-15", 50, NULL),
       ("105", "OP345672132", 1, "Patient needs more money", "2022-11-30", 75, "2022-12-5"),
       ("111", "OP345678901", 2, "Improve posture", "2022-12-29", 50, NULL);

-- insert PROVIDER
INSERT INTO PROVIDER (Name, Address, ProPhoneNumber)
VALUES ('ABC Healthcare', '123 Medical Street', '5551112233'),
       ('XYZ Pharmaceuticals', '456 Pharmacy Avenue', '4449998877'),
       ('MediCare Supplies', '789 Health Lane', '6663339999'),
       ('HealthHub Services', '789 Wellness Road', '7778885555');

-- insert PACKET
INSERT INTO PACKET (ImportPrice, ImportDate)
VALUES (200, '2023-01-10'),
       (150, '2023-02-05'),
       (180, '2023-03-20'),
       (250, '2023-04-15');

-- insert MEDICATION
INSERT INTO MEDICATION(MedProCode, MedPacketCode, Price, MedName, ExpDate, Quantity)
VALUES (1, 1, 50, 'Med1', '2024-01-01', 100),
       (1, 2, 75, 'Med2', '2023-12-01', 150),
       (2, 1, 100, 'Med3', '2023-11-01', 200),
       (3, 1, 120, 'Med4', '2023-10-01', 120);

-- insert MED_EFFECT
INSERT INTO MED_EFFECT(MedCode, MedProCode, MedPacketCode, Effect)
VALUES (1, 1, 1, 'Effect1'),
       (2, 1, 2, 'Effect2'),
       (3, 2, 1, 'Effect3'),
       (4, 3, 1, 'Effect4');

-- insert T_MEDICATION
INSERT INTO T_MEDICATION
VALUES (1, 1, 1, 110, 1, 'IP123456789', 1),
       (2, 1, 2, 105, 2, 'IP987654321', 1),
       (3, 2, 1, 112, 4, 'IP109876543', 1),
       (4, 3, 1, 110, 1, 'IP123456789', 2);

-- insert E_MEDICATION
INSERT INTO E_MEDICATION
VALUES (1, 1, 1, 111, 'OP234567890', 1),
       (2, 1, 2, 112, 'OP876543210', 1),
       (3, 2, 1, 105, 'OP345678901', 1),
       (4, 3, 1, 105, 'OP210987654', 1);


-- insert ACCOUNT
INSERT INTO ACCOUNT (username, password, privilege_level)
VALUES ('system', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1)