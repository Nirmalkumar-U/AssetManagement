
SET IDENTITY_INSERT [branch] ON

MERGE INTO [branch] AS Target
USING (VALUES
  (1,N'Head Quarters',N'BC001',N'Coimbatore',N'TamilNadu','2024-01-15T01:37:29.780',N'Admin','2024-01-15T01:59:31.110',N'Admin Updated',0)
 ,(2,N'Main Branch',N'MB001',N'City1',N'State1','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(3,N'North Branch',N'NB002',N'City2',N'State2','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(4,N'South Branch',N'SB003',N'City3',N'State3','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(5,N'East Branch',N'EB004',N'City4',N'State4','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(6,N'West Branch',N'WB005',N'City5',N'State5','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(7,N'Central Branch',N'CB006',N'City6',N'State6','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(8,N'City Branch',N'CB007',N'City7',N'State7','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(9,N'Suburban Branch',N'SB008',N'City8',N'State8','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(10,N'Metro Branch',N'MB009',N'City9',N'State9','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(11,N'Rural Branch',N'RB010',N'City10',N'State10','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
) AS Source ([BranchId],[BranchName],[BranchCode],[BranchCity],[BranchState],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy],[IsDeleted])
ON (Target.[BranchId] = Source.[BranchId])
WHEN MATCHED AND (
	NULLIF(Source.[BranchName], Target.[BranchName]) IS NOT NULL OR NULLIF(Target.[BranchName], Source.[BranchName]) IS NOT NULL OR 
	NULLIF(Source.[BranchCode], Target.[BranchCode]) IS NOT NULL OR NULLIF(Target.[BranchCode], Source.[BranchCode]) IS NOT NULL OR 
	NULLIF(Source.[BranchCity], Target.[BranchCity]) IS NOT NULL OR NULLIF(Target.[BranchCity], Source.[BranchCity]) IS NOT NULL OR 
	NULLIF(Source.[BranchState], Target.[BranchState]) IS NOT NULL OR NULLIF(Target.[BranchState], Source.[BranchState]) IS NOT NULL OR 
	NULLIF(Source.[CreatedDate], Target.[CreatedDate]) IS NOT NULL OR NULLIF(Target.[CreatedDate], Source.[CreatedDate]) IS NOT NULL OR 
	NULLIF(Source.[CreatedBy], Target.[CreatedBy]) IS NOT NULL OR NULLIF(Target.[CreatedBy], Source.[CreatedBy]) IS NOT NULL OR 
	NULLIF(Source.[ModifiedDate], Target.[ModifiedDate]) IS NOT NULL OR NULLIF(Target.[ModifiedDate], Source.[ModifiedDate]) IS NOT NULL OR 
	NULLIF(Source.[ModifiedBy], Target.[ModifiedBy]) IS NOT NULL OR NULLIF(Target.[ModifiedBy], Source.[ModifiedBy]) IS NOT NULL OR 
	NULLIF(Source.[IsDeleted], Target.[IsDeleted]) IS NOT NULL OR NULLIF(Target.[IsDeleted], Source.[IsDeleted]) IS NOT NULL) THEN
 UPDATE SET
  [BranchName] = Source.[BranchName], 
  [BranchCode] = Source.[BranchCode], 
  [BranchCity] = Source.[BranchCity], 
  [BranchState] = Source.[BranchState], 
  [CreatedDate] = Source.[CreatedDate], 
  [CreatedBy] = Source.[CreatedBy], 
  [ModifiedDate] = Source.[ModifiedDate], 
  [ModifiedBy] = Source.[ModifiedBy], 
  [IsDeleted] = Source.[IsDeleted]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([BranchId],[BranchName],[BranchCode],[BranchCity],[BranchState],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy],[IsDeleted])
 VALUES(Source.[BranchId],Source.[BranchName],Source.[BranchCode],Source.[BranchCity],Source.[BranchState],Source.[CreatedDate],Source.[CreatedBy],Source.[ModifiedDate],Source.[ModifiedBy],Source.[IsDeleted])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [branch]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[branch] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [branch] OFF
GO