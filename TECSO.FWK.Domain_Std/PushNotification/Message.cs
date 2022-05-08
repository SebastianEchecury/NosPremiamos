using System;
using System.Collections.Generic;
using System.Text;

namespace TECSO.FWK.Domain_Std.PushNotification
{
    public class Message
    {
        public Notification notification { get; set; }
        public object data { get; set; }
        public string to { get; set; }
    }

    public class Notification
    {
        public string title { get; set; }
        public string text { get; set; }
    }
}
