// Create an object and an array which we will use in our facebook exercise. 

var facebook = {};

// 1. Create an object that has properties "username" and "password". Fill those values in with strings.

var user = {
    username: "mupfi",
    password: "mupfi-stinks"
}

// 2. Create an array which contains the object you have made above and name the array "database".

var database = [
    {
        username: "mupfi",
        password: "mupfi-stinks"
    },
    {
        username: "sdfng",
        password: "mupfi-stinks"
    },
    {
        username: "dnvök",
        password: "mupfi-stinks"
    },
    {
        username: "lksdn",
        password: "mupfi-stinks"
    }
];

// 3. Create an array called "newsfeed" which contains 3 objects with properties "username" and "timeline".

var newsfeed = [
    {
        username: "mupfi",
        timeline: "mucks da bucks",
    },
    {
        username: "octo",
        timeline: "octo procto",
    },
    {
        username: "grisu",
        timeline: "wuff",
    }
]

var userNamePrompt = prompt("What's your username?");
var passwordPrompt = prompt("What's your password?");

signIn(userNamePrompt, passwordPrompt);

function isUserValid(username, password) {
    for (var i = 0; i < database.length; i++) {
        if (username === database[i].username && password === database[i].password) {
            return true;
        }
    }
    return false;
}

function signIn(user, pass) {
    if (isUserValid(user, pass)) {
        console.log(newsfeed);
    } else {
        alert("Sorry, wrong username and password.");
    }
}