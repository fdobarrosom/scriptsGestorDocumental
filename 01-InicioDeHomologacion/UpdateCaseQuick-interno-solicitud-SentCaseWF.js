var vCase = IndexData.GetField("nExpediente");

var myobj = {
    "DocNo":vCase,
    "ProcessNo": 20
};


RESTCall.BodyJsonContent = JSON.stringify(myobj);