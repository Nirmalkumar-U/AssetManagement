
SET IDENTITY_INSERT [DefaultValue] ON

MERGE INTO [DefaultValue] AS Target
USING (VALUES
  (1,100,N'AVBL',N'Available',NULL,NULL,NULL,1,'2024-01-15T01:39:52.333',N'Admin',0)
 ,(2,100,N'NUSB',N'Not Useble',NULL,NULL,NULL,2,'2024-01-15T01:39:52.333',N'Admin',0)
 ,(3,100,N'INUS',N'In Use',NULL,NULL,NULL,3,'2024-01-15T01:39:52.333',N'Admin',0)
 ,(4,100,N'NREC',N'New Record',NULL,NULL,NULL,4,'2024-01-15T01:39:52.333',N'Admin',0)
 ,(5,200,N'ACTV',N'Active',NULL,NULL,NULL,1,'2024-01-15T01:39:52.333',N'Admin',0)
 ,(6,200,N'IACT',N'In Active',NULL,NULL,NULL,2,'2024-01-15T01:39:52.333',N'Admin',0)
 ,(7,200,N'RESI',N'Resigned',NULL,NULL,NULL,3,'2024-01-15T01:39:52.333',N'Admin',0)
) AS Source ([DefaultValueId],[ValueCode],[ValueName],[ValueDescription],[Data1],[Data2],[Data3],[OrderNo],[CreatedDate],[CreatedBy],[IsDeleted])
ON (Target.[DefaultValueId] = Source.[DefaultValueId])
WHEN MATCHED AND (
	NULLIF(Source.[ValueCode], Target.[ValueCode]) IS NOT NULL OR NULLIF(Target.[ValueCode], Source.[ValueCode]) IS NOT NULL OR 
	NULLIF(Source.[ValueName], Target.[ValueName]) IS NOT NULL OR NULLIF(Target.[ValueName], Source.[ValueName]) IS NOT NULL OR 
	NULLIF(Source.[ValueDescription], Target.[ValueDescription]) IS NOT NULL OR NULLIF(Target.[ValueDescription], Source.[ValueDescription]) IS NOT NULL OR 
	NULLIF(Source.[Data1], Target.[Data1]) IS NOT NULL OR NULLIF(Target.[Data1], Source.[Data1]) IS NOT NULL OR 
	NULLIF(Source.[Data2], Target.[Data2]) IS NOT NULL OR NULLIF(Target.[Data2], Source.[Data2]) IS NOT NULL OR 
	NULLIF(Source.[Data3], Target.[Data3]) IS NOT NULL OR NULLIF(Target.[Data3], Source.[Data3]) IS NOT NULL OR 
	NULLIF(Source.[OrderNo], Target.[OrderNo]) IS NOT NULL OR NULLIF(Target.[OrderNo], Source.[OrderNo]) IS NOT NULL OR 
	NULLIF(Source.[CreatedDate], Target.[CreatedDate]) IS NOT NULL OR NULLIF(Target.[CreatedDate], Source.[CreatedDate]) IS NOT NULL OR 
	NULLIF(Source.[CreatedBy], Target.[CreatedBy]) IS NOT NULL OR NULLIF(Target.[CreatedBy], Source.[CreatedBy]) IS NOT NULL OR 
	NULLIF(Source.[IsDeleted], Target.[IsDeleted]) IS NOT NULL OR NULLIF(Target.[IsDeleted], Source.[IsDeleted]) IS NOT NULL) THEN
 UPDATE SET
  [ValueCode] = Source.[ValueCode], 
  [ValueName] = Source.[ValueName], 
  [ValueDescription] = Source.[ValueDescription], 
  [Data1] = Source.[Data1], 
  [Data2] = Source.[Data2], 
  [Data3] = Source.[Data3], 
  [OrderNo] = Source.[OrderNo], 
  [CreatedDate] = Source.[CreatedDate], 
  [CreatedBy] = Source.[CreatedBy], 
  [IsDeleted] = Source.[IsDeleted]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([DefaultValueId],[ValueCode],[ValueName],[ValueDescription],[Data1],[Data2],[Data3],[OrderNo],[CreatedDate],[CreatedBy],[IsDeleted])
 VALUES(Source.[DefaultValueId],Source.[ValueCode],Source.[ValueName],Source.[ValueDescription],Source.[Data1],Source.[Data2],Source.[Data3],Source.[OrderNo],Source.[CreatedDate],Source.[CreatedBy],Source.[IsDeleted])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [DefaultValue]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[DefaultValue] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [DefaultValue] OFF
GO