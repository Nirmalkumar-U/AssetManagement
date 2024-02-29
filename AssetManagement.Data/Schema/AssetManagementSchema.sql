--CREATE DATABASE AssetManagement

If(OBJECT_ID('[FK_Employee_BranchId]') Is Not Null)
BEGIN
	ALTER TABLE [Employee] DROP CONSTRAINT [FK_Employee_BranchId]
END
GO

If(OBJECT_ID('[FK_Asset_BranchId]') Is Not Null)
BEGIN
	ALTER TABLE [Asset] DROP CONSTRAINT [FK_Asset_BranchId]
END
GO

If(OBJECT_ID('[FK_Asset_EmployeeId]') Is Not Null)
BEGIN
	ALTER TABLE [Asset] DROP CONSTRAINT [FK_Asset_EmployeeId]
END
GO

If(OBJECT_ID('[FK_AssetHistoryLog_AssetId]') Is Not Null)
BEGIN
	ALTER TABLE [AssetHistoryLog] DROP CONSTRAINT [FK_AssetHistoryLog_AssetId]
END
GO

If(OBJECT_ID('[FK_AssetHistoryLog_EmployeeId]') Is Not Null)
BEGIN
	ALTER TABLE [AssetHistoryLog] DROP CONSTRAINT [FK_AssetHistoryLog_EmployeeId]
END
GO

--If(OBJECT_ID('[FK_EmployeeAsset_AssetId]') Is Not Null)
--BEGIN
--	ALTER TABLE [EmployeeAsset] DROP CONSTRAINT [FK_EmployeeAsset_AssetId]
--END
--GO

--If(OBJECT_ID('[FK_EmployeeAsset_EmployeeId]') Is Not Null)
--BEGIN
--	ALTER TABLE [EmployeeAsset] DROP CONSTRAINT [FK_EmployeeAsset_EmployeeId]
--END
--GO

--If(OBJECT_ID('[FK_AssetCost_AssetId]') Is Not Null)
--BEGIN
--	ALTER TABLE [AssetCost] DROP CONSTRAINT [FK_AssetCost_AssetId]
--END
--GO

--If(OBJECT_ID('[FK_AssetCost_BranchId]') Is Not Null)
--BEGIN
--	ALTER TABLE [AssetCost] DROP CONSTRAINT [FK_AssetCost_BranchId]
--END
--GO

IF EXISTS (SELECT * FROM sys.tables where name = N'Branch')
BEGIN
	DROP TABLE [Branch]
END
GO

IF EXISTS (SELECT * FROM sys.tables where name = N'Asset')
BEGIN
	DROP TABLE [Asset]
END
GO

IF EXISTS (SELECT * FROM sys.tables where name = N'Employee')
BEGIN
	DROP TABLE [Employee]
END
GO

IF EXISTS (SELECT * FROM sys.tables where name = N'AssetHistoryLog')
BEGIN
	DROP TABLE [AssetHistoryLog]
END
GO

IF EXISTS (SELECT * FROM sys.tables where name = N'DefaultValue')
BEGIN
	DROP TABLE [DefaultValue]
END
GO

--IF EXISTS (SELECT * FROM sys.tables where name = N'EmployeeAsset')
--BEGIN
--	DROP TABLE [EmployeeAsset]
--END
--GO

--IF EXISTS (SELECT * FROM sys.tables where name = N'AssetCost')
--BEGIN
--	DROP TABLE [AssetCost]
--END
--GO

CREATE TABLE [Branch] (
	BranchId INT CONSTRAINT [PK_Branch_Id] PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	BranchName VARCHAR(100) NOT NULL,
	BranchCode VARCHAR(10) NOT NULL,
	BranchCity VARCHAR(30) NOT NULL,
	BranchState VARCHAR(30) NOT NULL,
	CreatedDate DATETIME NOT NULL,
	CreatedBy VARCHAR(30) NOT NULL,
	ModifiedDate DATETIME NULL,
	ModifiedBy VARCHAR(30) NULL,
	IsDeleted BIT DEFAULT 0)

CREATE TABLE [Employee] (
	EmployeeId INT CONSTRAINT [PK_Employee_Id] PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	BranchId INT NULL CONSTRAINT [FK_Employee_BranchId] FOREIGN KEY REFERENCES Branch(BranchId),
	EmployeeName VARCHAR(100) NOT NULL,
	EmployeeCode VARCHAR(20) NOT NULL,
	Department VARCHAR(30) NULL,
	Gender BIT DEFAULT 0,
	DateOfBirth DATETIME NOT NULL,
	EmailId VARCHAR(30) NULL,
	PhoneNumber VARCHAR(15) NULL,
	EmployeeCity VARCHAR(30) NOT NULL,
	EmployeeState VARCHAR(30) NOT NULL,
	EmployeeStatus VARCHAR(5) NOT NULL,
	CreatedDate DATETIME NOT NULL,
	CreatedBy VARCHAR(30) NOT NULL,
	ModifiedDate DATETIME NULL,
	ModifiedBy VARCHAR(30) NULL,
	IsDeleted BIT DEFAULT 0)

CREATE TABLE [Asset] (
	AssetId INT CONSTRAINT [PK_Asset_Id] PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	BranchId INT NULL CONSTRAINT [FK_Asset_BranchId] FOREIGN KEY REFERENCES Branch(BranchId),
	EmployeeId INT NULL CONSTRAINT [FK_Asset_EmployeeId] FOREIGN KEY REFERENCES Employee(EmployeeId),
	AssetCode VARCHAR(10) NOT NULL,
	AssetName VARCHAR(100) NOT NULL,
	AssetDescription VARCHAR(100) NOT NULL,
	AssetType VARCHAR(100) NULL,
	ModelName VARCHAR(30) NULL,
	AssetCost INT NOT NULL,
	SerialNumber VARCHAR(20) NULL,
	AssetStatus VARCHAR(5) NOT NULL,
	CreatedDate DATETIME NOT NULL,
	CreatedBy VARCHAR(30) NOT NULL,
	ModifiedDate DATETIME NULL,
	ModifiedBy VARCHAR(30) NULL,
	IsDeleted BIT DEFAULT 0)

CREATE TABLE [AssetHistoryLog] (
	AssetHistoryLogId INT CONSTRAINT [PK_AssetHistoryLog_Id] PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	AssetId INT NULL CONSTRAINT [FK_AssetHistoryLog_AssetId] FOREIGN KEY REFERENCES Asset(AssetId),
	EmployeeId INT NULL CONSTRAINT [FK_AssetHistoryLog_EmployeeId] FOREIGN KEY REFERENCES Employee(EmployeeId),
	LogMessage VARCHAR(500) NULL,
	CreatedDate DATETIME NOT NULL,
	CreatedBy VARCHAR(30) NOT NULL)

--CREATE TABLE [EmployeeAsset] (
--	AssetId INT NOT NULL CONSTRAINT [FK_EmployeeAsset_AssetId] FOREIGN KEY REFERENCES Asset(AssetId),
--	EmployeeId INT NOT NULL CONSTRAINT [FK_EmployeeAsset_EmployeeId] FOREIGN KEY REFERENCES Employee(EmployeeId))

--CREATE TABLE [AssetCost] (
--	AssetCostId INT CONSTRAINT [PK_AssetCost_Id] PRIMARY KEY IDENTITY(1, 1) NOT NULL,
--	AssetId INT NOT NULL CONSTRAINT [FK_AssetCost_AssetId] FOREIGN KEY REFERENCES Asset(AssetId),
--	BranchId INT NULL CONSTRAINT [FK_AssetCost_BranchId] FOREIGN KEY REFERENCES Branch(BranchId),
--	NoOfItem INT NOT NULL,
--	TotalCost INT NOT NULL,
--	CreatedDate DATETIME NOT NULL,
--	CreatedBy VARCHAR(30) NOT NULL)

CREATE TABLE [DefaultValue] (
	DefaultValueId INT CONSTRAINT [PK_DefaultValueId] PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	ValueCode INT NOT NULL,
	ValueName VARCHAR(100) NULL,
	ValueDescription VARCHAR(100) NULL,
	Data1 VARCHAR(100) NULL,
	Data2 VARCHAR(100) NULL,
	Data3 VARCHAR(100) NULL,
	OrderNo INT NOT NULL,
	CreatedDate DATETIME NOT NULL,
	CreatedBy VARCHAR(30) NOT NULL,
	IsDeleted BIT DEFAULT 0)