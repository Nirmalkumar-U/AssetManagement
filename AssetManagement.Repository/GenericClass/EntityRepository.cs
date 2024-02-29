using Microsoft.EntityFrameworkCore;

namespace AssetManagement.Repository
{
    public class EntityRepository<T1> : IEntityRepository<T1> where T1 : class, new()
    {
        protected readonly AMContext amContext;

        public EntityRepository(AMContext context)
        {
            amContext = context;
        }

        public bool Insert<T>(T entity, bool isSave = true) where T : class
        {
            
            amContext.Set<T>().Add(entity);
            if (isSave)
            {
                return SaveData();
            }
            else
            {
                return false;
            }
        }

        public void Insert<T>(IEnumerable<T> entities, bool isSave = true) where T : class
        {
            amContext.Set<T>().AddRange(entities);
            if (isSave) SaveData();
        }

        public void Insert<T>(List<T> entities, bool isSave = true) where T : class
        {
            amContext.Set<T>().AddRange(entities);
            if (isSave) SaveData();
        }

        public bool Delete<T>(T entity, bool isSave = true) where T : class
        {
            amContext.Set<T>().Remove(entity);
            if (isSave)
            {
                return SaveData();
            }
            else
            {
                return false;
            }
        }
        public void Delete<T>(IEnumerable<T> entities, bool isSave = true) where T : class
        {
            amContext.Set<T>().RemoveRange(entities);
            if (isSave) SaveData();
        }

        public void Delete<T>(List<T> entities, bool isSave = true) where T : class
        {
            amContext.Set<T>().RemoveRange(entities);
            if (isSave) SaveData();
        }

        public void Update<T>(T entity, bool isSave = true) where T : class
        {
            amContext.Set<T>().Update(entity);
            amContext.Entry(entity).State = EntityState.Modified;
            if (isSave) SaveData();
        }

        public void Update<T>(IEnumerable<T> entities, bool isSave = true) where T : class
        {
            amContext.Set<T>().UpdateRange(entities);
            if (isSave) SaveData();
        }

        public void Update<T>(List<T> entities, bool isSave = true) where T : class
        {
            amContext.Set<T>().UpdateRange(entities);
            if (isSave) SaveData();
        }

        public bool SaveData()
        {
            return amContext.SaveChanges() > 0;
        }
        
    }
}
