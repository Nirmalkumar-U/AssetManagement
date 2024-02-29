
SET IDENTITY_INSERT [asset] ON

MERGE INTO [asset] AS Target
USING (VALUES
  (1,1,1,N'10000',N'dell laptop',N'test',N'laptop',N'CS001',40000,N'SN001',N'INUS','2024-01-15T01:38:35.690',N'Admin','2024-01-15T01:40:32.960',N'WEB',0)
 ,(2,1,NULL,N'10001',N'dell laptop',N'test',N'laptop',N'CS002',45000,N'SN002',N'AVBL','2024-01-15T01:38:35.710',N'Admin','2024-01-15T01:44:54.960',N'WEB',0)
 ,(3,1,NULL,N'10002',N'dell laptop',N'test',N'laptop',NULL,400,NULL,N'NREC','2024-01-15T01:38:35.720',N'Admin',NULL,NULL,0)
 ,(4,1,NULL,N'10001',N'Laptop',N'Dell Laptop',N'Electronics',N'Latitude',1200,N'SN011',N'NREC','2024-01-15T01:53:59.123',N'Admin','2024-01-15T02:00:31.577',N'WEB',0)
 ,(5,2,NULL,N'10002',N'Printer',N'HP Printer',N'Peripherals',N'LaserJet',500,N'SN012',N'NREC','2024-01-15T01:53:59.123',N'Admin','2024-01-15T02:01:11.423',N'WEB',0)
 ,(6,3,NULL,N'10003',N'Desk',N'Office Desk',N'Furniture',N'Executive',300,N'SN003',N'NREC','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(7,1,NULL,N'10004',N'Chair',N'Swivel Chair',N'Furniture',N'Ergonomic',150,N'SN004',N'NREC','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(8,2,NULL,N'10005',N'Projector',N'HD Projector',N'Electronics',N'Optoma',800,N'SN005',N'NREC','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(9,3,NULL,N'10006',N'Scanner',N'Document Scanner',N'Peripherals',N'Canon',250,N'SN006',N'NREC','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(10,1,NULL,N'10007',N'Server',N'Rackmount Server',N'IT Equipment',N'Dell PowerEdge',2000,N'SN007',N'NREC','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(11,2,NULL,N'10008',N'Monitor',N'LED Monitor',N'Electronics',N'Samsung',300,N'SN008',N'NREC','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(12,3,NULL,N'10009',N'Phone',N'Desk Phone',N'Communication',N'Cisco',100,N'SN009',N'AVBL','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
 ,(13,1,NULL,N'10010',N'Tablet',N'Android Tablet',N'Electronics',N'Samsung Galaxy',400,N'SN010',N'NREC','2024-01-15T01:53:59.123',N'Admin',NULL,NULL,0)
) AS Source ([AssetId],[BranchId],[EmployeeId],[AssetCode],[AssetName],[AssetDescription],[AssetType],[ModelName],[AssetCost],[SerialNumber],[AssetStatus],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy],[IsDeleted])
ON (Target.[AssetId] = Source.[AssetId])
WHEN MATCHED AND (
	NULLIF(Source.[BranchId], Target.[BranchId]) IS NOT NULL OR NULLIF(Target.[BranchId], Source.[BranchId]) IS NOT NULL OR 
	NULLIF(Source.[EmployeeId], Target.[EmployeeId]) IS NOT NULL OR NULLIF(Target.[EmployeeId], Source.[EmployeeId]) IS NOT NULL OR 
	NULLIF(Source.[AssetCode], Target.[AssetCode]) IS NOT NULL OR NULLIF(Target.[AssetCode], Source.[AssetCode]) IS NOT NULL OR 
	NULLIF(Source.[AssetName], Target.[AssetName]) IS NOT NULL OR NULLIF(Target.[AssetName], Source.[AssetName]) IS NOT NULL OR 
	NULLIF(Source.[AssetDescription], Target.[AssetDescription]) IS NOT NULL OR NULLIF(Target.[AssetDescription], Source.[AssetDescription]) IS NOT NULL OR 
	NULLIF(Source.[AssetType], Target.[AssetType]) IS NOT NULL OR NULLIF(Target.[AssetType], Source.[AssetType]) IS NOT NULL OR 
	NULLIF(Source.[ModelName], Target.[ModelName]) IS NOT NULL OR NULLIF(Target.[ModelName], Source.[ModelName]) IS NOT NULL OR 
	NULLIF(Source.[AssetCost], Target.[AssetCost]) IS NOT NULL OR NULLIF(Target.[AssetCost], Source.[AssetCost]) IS NOT NULL OR 
	NULLIF(Source.[SerialNumber], Target.[SerialNumber]) IS NOT NULL OR NULLIF(Target.[SerialNumber], Source.[SerialNumber]) IS NOT NULL OR 
	NULLIF(Source.[AssetStatus], Target.[AssetStatus]) IS NOT NULL OR NULLIF(Target.[AssetStatus], Source.[AssetStatus]) IS NOT NULL OR 
	NULLIF(Source.[CreatedDate], Target.[CreatedDate]) IS NOT NULL OR NULLIF(Target.[CreatedDate], Source.[CreatedDate]) IS NOT NULL OR 
	NULLIF(Source.[CreatedBy], Target.[CreatedBy]) IS NOT NULL OR NULLIF(Target.[CreatedBy], Source.[CreatedBy]) IS NOT NULL OR 
	NULLIF(Source.[ModifiedDate], Target.[ModifiedDate]) IS NOT NULL OR NULLIF(Target.[ModifiedDate], Source.[ModifiedDate]) IS NOT NULL OR 
	NULLIF(Source.[ModifiedBy], Target.[ModifiedBy]) IS NOT NULL OR NULLIF(Target.[ModifiedBy], Source.[ModifiedBy]) IS NOT NULL OR 
	NULLIF(Source.[IsDeleted], Target.[IsDeleted]) IS NOT NULL OR NULLIF(Target.[IsDeleted], Source.[IsDeleted]) IS NOT NULL) THEN
 UPDATE SET
  [BranchId] = Source.[BranchId], 
  [EmployeeId] = Source.[EmployeeId], 
  [AssetCode] = Source.[AssetCode], 
  [AssetName] = Source.[AssetName], 
  [AssetDescription] = Source.[AssetDescription], 
  [AssetType] = Source.[AssetType], 
  [ModelName] = Source.[ModelName], 
  [AssetCost] = Source.[AssetCost], 
  [SerialNumber] = Source.[SerialNumber], 
  [AssetStatus] = Source.[AssetStatus], 
  [CreatedDate] = Source.[CreatedDate], 
  [CreatedBy] = Source.[CreatedBy], 
  [ModifiedDate] = Source.[ModifiedDate], 
  [ModifiedBy] = Source.[ModifiedBy], 
  [IsDeleted] = Source.[IsDeleted]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([AssetId],[BranchId],[EmployeeId],[AssetCode],[AssetName],[AssetDescription],[AssetType],[ModelName],[AssetCost],[SerialNumber],[AssetStatus],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy],[IsDeleted])
 VALUES(Source.[AssetId],Source.[BranchId],Source.[EmployeeId],Source.[AssetCode],Source.[AssetName],Source.[AssetDescription],Source.[AssetType],Source.[ModelName],Source.[AssetCost],Source.[SerialNumber],Source.[AssetStatus],Source.[CreatedDate],Source.[CreatedBy],Source.[ModifiedDate],Source.[ModifiedBy],Source.[IsDeleted])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [asset]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[asset] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [asset] OFF
GO