using System.Collections.Generic;

namespace SnappFood
{
    public class OutPut
    {
        public double avarage { get; set; }
        public List<OutPutComments> comments { get; set; }
    }

    public class OutPutComments
    {
        public string commentText { get; set; }
    }

    public class DataObject
    {
        public bool status { get; set; }
        public Data data { get; set; }
    }

    public class Data
    {
        public int count { get; set; }
        public int pageSize { get; set; }
        public List<Comment> comments { get; set; }
        public Sort sort { get; set; }
    }

    public class Comment
    {
        public int commentId { get; set; }
        public string date { get; set; }
        public string createdDate { get; set; }
        public string sender { get; set; }
        public string customerId { get; set; }
        public string commentText { get; set; }
        public object deliveryComment { get; set; }
        public int rating { get; set; }
        public int rate { get; set; }
        public string feeling { get; set; }
        public int status { get; set; }
        public string expeditionType { get; set; }
        public List<Food> foods { get; set; }
        public List<object> replies { get; set; }
    }

    public class Food
    {
        public string title { get; set; }
    }

    public class Param
    {
        public string key { get; set; }
        public string title { get; set; }
    }

    public class Sort
    {
        public string method { get; set; }
        public string key { get; set; }
        public List<Param> @params { get; set; }
        public string selected { get; set; }
    }
}
