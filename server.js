var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var colors = [
    {
        "id" : "1", 
        "text" : "Blue"
    }, 
    {
        "id" : "2", 
        "text" : "Red"
    },
    {
        "id" : "3", 
        "text" : "Yellow"
    },
    {
        "id" : "4", 
        "text" : "Orange"
    },
    {
        "id" : "5", 
        "text" : "Green"
    }
];

app.get("/", function(request, response)
{
    response.send("Test API");
});

app.get("/testPage", function(request, response)
{
    response.send("Test page of the test API.");
});

app.get("/colors", function(request, response)
{
    response.send(colors);
});

app.post("/colors", function(request, response)
{
    var addedColor = request.body;
    if (!addedColor || addedColor.text === "")
    {
        response.status(500).send({error : "You must specify a color."});
    }
    else
    {
        colors.push(addedColor);
        response.status(200).send(addedColor);
    }
});

app.put("/colors/:colorId", function(request, response)
{
    var colorId = request.params.colorId;
    var text = request.body.text;
    var objectFound = false;
    
    if (!text || text === "")
    {
        response.status(500).send({error : "Please provide color text."});
    }
    else
    {
        for (var i = 0; i < colors.length; i++)
        {
            var color = colors[i];
            if (color.id === request.params.colorId)
            {
                colors[i].text = text;
                objectFound = true;
            }
        }
        
        if (!objectFound)
        {
            response.status(500).send({error : "Color ID was not found."});
        }
        else
        {
            response.status(200).send(colors);
        }        
    }
});

app.delete("/colors/:colorId", function(request, response)
{
    var colorId = request.params.colorId;
    var objectFound = false;
    
    if (!colorId || colorId === "")
    {
        response.status(500).send({error : "Please provide color ID."});
    }
    else
    {
        for (var i = 0; i < colors.length; i++)
        {
            var color = colors[i];
            if (color.id === request.params.colorId)
            {
                colors.splice(i, 1);
                objectFound = true;
            }
        }
        
        if (!objectFound)
        {
            response.status(500).send({error : "Color ID was not found."});
        }
        else
        {
            response.status(200).send(colors);
        }        
    }
});

app.listen(3000, function()
{
    console.log("Test API is running on port 3000.");
});
