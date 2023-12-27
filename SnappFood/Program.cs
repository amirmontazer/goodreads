using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace SnappFood
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ReportComments();
            Console.ReadKey();
        }

        private static void ReportComments()
        {
            string json = "";
            const string URL = "https://snappfood.ir/mobile/v1/restaurant/vendor-comment";
            string urlParameters = "?lat=35.774&long=51.418&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.1&UDID=6fb32aa5-6813-46d2-9266-1f867fa1e3af&vendorCode=0qqwd9&page=0&sortType=score&locale=fa";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);

            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                DataObject result = response.Content.ReadAsAsync<DataObject>().Result;
                OutPut output = new OutPut();
                output.avarage = result.data.comments.Average(x => x.rate);
                output.comments = new List<OutPutComments>();
                foreach (var comment in result.data.comments)
                    output.comments.Add(new OutPutComments { commentText = comment.commentText });
                json = JsonConvert.SerializeObject(output);
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }
            client.Dispose();
            Console.WriteLine(json);
        }
    }
}
