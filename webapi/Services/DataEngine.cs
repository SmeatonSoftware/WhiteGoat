﻿using webapi.Data;

namespace webapi.Services
{
    public class DataEngine<T> where T : DataClass
    {
        public Dictionary<int,T> values = new Dictionary<int,T>();

        public void Add(T item)
        {
            if (!item.Id.HasValue)
                throw new ArgumentNullException("Expected An ID!");

            if (values.ContainsKey(item.Id.Value))
                throw new ArgumentException("Data Engine Already Contains Key");

            values.Add(item.Id.Value, item);
        }

        public void Update(T item)
        {
            if (!item.Id.HasValue)
                throw new ArgumentNullException("Expected An ID!");

            if (values.TryGetValue(item.Id.Value, out _))
            {
                values[item.Id.Value] = item;
            }
            else
                throw new ArgumentException("Data Engine Does Not Contain Key");
        }

        public bool TryFind(Func<T, bool> filter, out T value)
        {
            foreach (var item in values)
            {
                if (filter(item.Value))
                {
                    value = item.Value;
                    return true;
                }
            }

            value = null;
            return false;
        }
    }
}