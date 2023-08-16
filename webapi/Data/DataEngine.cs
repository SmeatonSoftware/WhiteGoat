using LiteDB;
using System.Linq.Expressions;

namespace webapi.Data
{
    public class DataEngine<T> where T : DataClass
    {
        public Dictionary<int, T> values = new Dictionary<int, T>();
        ILiteCollection<T> table;

        public DataEngine(ILiteCollection<T> _table) { 
            table = _table;
            table.EnsureIndex(x=>x.Id);
        }

        //private int GenerateId()
        //{
        //    int maxId = values.Count > 0 ? values.Keys.Max() + 3 : 1;
        //    return maxId;
        //}

        public void Add(T item)
        {
            table.Insert(item);
        }

        public void Update(T item)
        {
            if (item.Id == 0)
                throw new ArgumentNullException("Expected An ID!");

            if (!table.Update(item))
                throw new ArgumentException("Data Engine Does Not Contain Key");
        }

        public bool Remove(int id)
        {
            return table.Delete(id);
        }

        public bool Get(int id, out T value)
        {
            value = table.FindById(id);
            return value != null ;
        }

        public bool TryFind(Expression<Func<T, bool>> filter, out T value)
        {
            value = table.FindOne(filter);
            return value != null;
        }

        public void Search(Expression<Func<T, bool>> filter, out T[] values)
        {
            values = table.Query().Where(filter).ToArray();
        }
    }
}
