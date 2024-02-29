
SET IDENTITY_INSERT [Employee] ON

MERGE INTO [Employee] AS Target
USING (VALUES
  (1,1,N'Luminous Labyrinth',N'FM00',N'Marketing',1,'2024-01-14T20:27:27.877',N'LuminousLabyrinth@email.com',N'9012345678',N'1',N'1',N'ACTV','2024-01-15T01:36:31.927',N'Admin','2024-01-15T01:57:28.073',N'Admin Updated',0)
 ,(2,1,N'John Doe',N'JD001',N'IT',0,'1990-01-15T00:00:00',N'john.doe@email.com',N'1234567890',N'City1',N'State1',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(3,2,N'Jane Doe',N'JD002',N'HR',1,'1988-05-20T00:00:00',N'jane.doe@email.com',N'9876543210',N'City2',N'State2',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(4,3,N'Bob Smith',N'BS003',N'Finance',0,'1995-08-10T00:00:00',N'bob.smith@email.com',N'5678901234',N'City3',N'State3',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(5,1,N'Alice Johnson',N'AJ004',N'Marketing',1,'1987-12-05T00:00:00',N'alice.johnson@email.com',N'3456789012',N'City1',N'State1',N'IACT','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(6,2,N'Charlie Brown',N'CB005',N'IT',0,'1992-03-25T00:00:00',N'charlie.brown@email.com',N'2345678901',N'City2',N'State2',N'IACT','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(7,3,N'Eva Green',N'EG006',N'HR',1,'1998-06-18T00:00:00',N'eva.green@email.com',N'6789012345',N'City3',N'State3',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(8,1,N'David Clark',N'DC007',N'Finance',0,'1993-09-30T00:00:00',N'david.clark@email.com',N'7890123456',N'City1',N'State1',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(9,2,N'Grace Turner',N'GT008',N'Marketing',1,'1985-02-14T00:00:00',N'grace.turner@email.com',N'8901234567',N'City2',N'State2',N'IACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(10,3,N'Frank Miller',N'FM009',N'IT',0,'1996-11-08T00:00:00',N'frank.miller@email.com',N'9012345678',N'City3',N'State3',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(11,1,N'Helen White',N'HW010',N'HR',1,'1991-04-22T00:00:00',N'helen.white@email.com',N'0123456789',N'City1',N'State1',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(12,4,N'Harry Pottor',N'JD001',N'IT',0,'1990-01-15T00:00:00',N'Harry.Pottor@email.com',N'1234567890',N'City1',N'State1',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(13,5,N'Chris Evens',N'JD002',N'HR',1,'1988-05-20T00:00:00',N'Chris.Evens@email.com',N'9876543210',N'City2',N'State2',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(14,6,N'John Smith',N'BS003',N'Finance',0,'1995-08-10T00:00:00',N'john.smith@email.com',N'5678901234',N'City3',N'State3',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(15,7,N'Alice black',N'AJ004',N'Marketing',1,'1987-12-05T00:00:00',N'alice.black@email.com',N'3456789012',N'City1',N'State1',N'IACT','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(16,7,N'Hemma Brown',N'CB005',N'IT',0,'1992-03-25T00:00:00',N'hemma.brown@email.com',N'2345678901',N'City2',N'State2',N'IACT','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(17,6,N'Ron Green',N'EG006',N'HR',1,'1998-06-18T00:00:00',N'Ron.green@email.com',N'6789012345',N'City3',N'State3',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(18,4,N'David Miller',N'DC007',N'Finance',0,'1993-09-30T00:00:00',N'david.Miller@email.com',N'7890123456',N'City1',N'State1',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(19,3,N'Boat Turner',N'GT008',N'Marketing',1,'1985-02-14T00:00:00',N'boat.turner@email.com',N'8901234567',N'City2',N'State2',N'IACT','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(20,4,N'Franklin',N'FM009',N'IT',0,'1996-11-08T00:00:00',N'franklin@email.com',N'9012345678',N'City3',N'State3',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(21,5,N'Helen killer',N'HW010',N'HR',1,'1991-04-22T00:00:00',N'helen.killer@email.com',N'0123456789',N'City1',N'State1',N'ACTV','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
) AS Source ([EmployeeId],[BranchId],[EmployeeName],[EmployeeCode],[Department],[Gender],[DateOfBirth],[EmailId],[PhoneNumber],[EmployeeCity],[EmployeeState],[EmployeeStatus],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy],[IsDeleted])
ON (Target.[EmployeeId] = Source.[EmployeeId])
WHEN MATCHED AND (
	NULLIF(Source.[BranchId], Target.[BranchId]) IS NOT NULL OR NULLIF(Target.[BranchId], Source.[BranchId]) IS NOT NULL OR 
	NULLIF(Source.[EmployeeName], Target.[EmployeeName]) IS NOT NULL OR NULLIF(Target.[EmployeeName], Source.[EmployeeName]) IS NOT NULL OR 
	NULLIF(Source.[EmployeeCode], Target.[EmployeeCode]) IS NOT NULL OR NULLIF(Target.[EmployeeCode], Source.[EmployeeCode]) IS NOT NULL OR 
	NULLIF(Source.[Department], Target.[Department]) IS NOT NULL OR NULLIF(Target.[Department], Source.[Department]) IS NOT NULL OR 
	NULLIF(Source.[Gender], Target.[Gender]) IS NOT NULL OR NULLIF(Target.[Gender], Source.[Gender]) IS NOT NULL OR 
	NULLIF(Source.[DateOfBirth], Target.[DateOfBirth]) IS NOT NULL OR NULLIF(Target.[DateOfBirth], Source.[DateOfBirth]) IS NOT NULL OR 
	NULLIF(Source.[EmailId], Target.[EmailId]) IS NOT NULL OR NULLIF(Target.[EmailId], Source.[EmailId]) IS NOT NULL OR 
	NULLIF(Source.[PhoneNumber], Target.[PhoneNumber]) IS NOT NULL OR NULLIF(Target.[PhoneNumber], Source.[PhoneNumber]) IS NOT NULL OR 
	NULLIF(Source.[EmployeeCity], Target.[EmployeeCity]) IS NOT NULL OR NULLIF(Target.[EmployeeCity], Source.[EmployeeCity]) IS NOT NULL OR 
	NULLIF(Source.[EmployeeState], Target.[EmployeeState]) IS NOT NULL OR NULLIF(Target.[EmployeeState], Source.[EmployeeState]) IS NOT NULL OR 
	NULLIF(Source.[EmployeeStatus], Target.[EmployeeStatus]) IS NOT NULL OR NULLIF(Target.[EmployeeStatus], Source.[EmployeeStatus]) IS NOT NULL OR 
	NULLIF(Source.[CreatedDate], Target.[CreatedDate]) IS NOT NULL OR NULLIF(Target.[CreatedDate], Source.[CreatedDate]) IS NOT NULL OR 
	NULLIF(Source.[CreatedBy], Target.[CreatedBy]) IS NOT NULL OR NULLIF(Target.[CreatedBy], Source.[CreatedBy]) IS NOT NULL OR 
	NULLIF(Source.[ModifiedDate], Target.[ModifiedDate]) IS NOT NULL OR NULLIF(Target.[ModifiedDate], Source.[ModifiedDate]) IS NOT NULL OR 
	NULLIF(Source.[ModifiedBy], Target.[ModifiedBy]) IS NOT NULL OR NULLIF(Target.[ModifiedBy], Source.[ModifiedBy]) IS NOT NULL OR 
	NULLIF(Source.[IsDeleted], Target.[IsDeleted]) IS NOT NULL OR NULLIF(Target.[IsDeleted], Source.[IsDeleted]) IS NOT NULL) THEN
 UPDATE SET
  [BranchId] = Source.[BranchId], 
  [EmployeeName] = Source.[EmployeeName], 
  [EmployeeCode] = Source.[EmployeeCode], 
  [Department] = Source.[Department], 
  [Gender] = Source.[Gender], 
  [DateOfBirth] = Source.[DateOfBirth], 
  [EmailId] = Source.[EmailId], 
  [PhoneNumber] = Source.[PhoneNumber], 
  [EmployeeCity] = Source.[EmployeeCity], 
  [EmployeeState] = Source.[EmployeeState], 
  [EmployeeStatus] = Source.[EmployeeStatus], 
  [CreatedDate] = Source.[CreatedDate], 
  [CreatedBy] = Source.[CreatedBy], 
  [ModifiedDate] = Source.[ModifiedDate], 
  [ModifiedBy] = Source.[ModifiedBy], 
  [IsDeleted] = Source.[IsDeleted]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([EmployeeId],[BranchId],[EmployeeName],[EmployeeCode],[Department],[Gender],[DateOfBirth],[EmailId],[PhoneNumber],[EmployeeCity],[EmployeeState],[EmployeeStatus],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy],[IsDeleted])
 VALUES(Source.[EmployeeId],Source.[BranchId],Source.[EmployeeName],Source.[EmployeeCode],Source.[Department],Source.[Gender],Source.[DateOfBirth],Source.[EmailId],Source.[PhoneNumber],Source.[EmployeeCity],Source.[EmployeeState],Source.[EmployeeStatus],Source.[CreatedDate],Source.[CreatedBy],Source.[ModifiedDate],Source.[ModifiedBy],Source.[IsDeleted])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Employee]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Employee] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Employee] OFF
GO