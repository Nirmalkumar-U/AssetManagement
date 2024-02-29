PRINT '*************************AssetManagement Scripts - STARTED**************************'

:setvar Path "D:\desktop files\AssetManagement\AssetManagement.Data"
:setvar AMDBName AssetManagement

SET NOCOUNT ON

PRINT '--------------AssetManagement START--------------'
GO
--------------AMC--------------
USE $(AMDBName) 
GO
:r  $(Path)\Schema\AssetManagementSchema.sql
PRINT 'AssetManagementSchema.sql Completed'
GO
:r  $(Path)\DefaultData\MergeDefaultValue.sql
PRINT 'MergeDefaultValue.sql Completed'
GO
:r  $(Path)\DefaultData\MergeBranch.sql
PRINT 'MergeBranch.sql Completed'
GO
:r  $(Path)\DefaultData\MergeEmployee.sql
PRINT 'MergeEmployee.sql Completed'
GO
:r  $(Path)\DefaultData\MergeAsset.sql
PRINT 'MergeAsset.sql Completed'
GO

SET NOCOUNT OFF

PRINT '*************************AssetManagement Scripts - COMPLETED**************************'