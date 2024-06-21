/*
This creates a faceless website that has 5-6 users with information in users.json, 
i have added functionality for:
        Viewing user
        Viewing follower list
        Adding followers
        Removing followers
        deleting followers

I used get to add and remove followers which i dont think that is what i am meant to use but its easier to see with messages. 
 */


const express = require('express');
const app = express();

//Listing 13: Adding body parser to out Express APL
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// To show that this file can access the users.json file
const data = require('./users.json');
const users = data.users;
console.log(users);

//Listing 11: Listing all users endpoints
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

//Listing 12: GET specific user endpoint
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let response = `No user with id ${id}`;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            response = user;
            break;
        }
    }
    res.status(200).send(response);
});

//Listing 17 ex8: GET following list from ID
app.get('/users/:id/following', (req, res) => {
    const id = req.params.id;
    let response = `No user with id ${id}`;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            response = user.following || [];
            break;
        }
    }

    res.status(200).send(response);
})

//Listing 14: POST user endpoint
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201)
        .send(users);
});

//Listing 15: PUT user endpoint
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            const index = users.indexOf(user);
            users[index] = updatedUser;
            break;
        }
    }
    res.status(200).send(updatedUser);
});

//Listing 17 ex8: PUT adds follower to user 
app.get('/users/:id/following/:newId', (req, res) => {
    const follower = req.params.id;
    const following = req.params.newId;
    let followerProfile;
    let response = `No user with id ${follower}`;
    let foundUser = false;
    let foundToFollow = false;

    for (const user of users) {
        if (parseInt(follower, 10) === user.id && foundUser == false) {
            foundUser = true;
            followerProfile = user
        }
        if (parseInt(following, 10) === user.id && foundToFollow == false) {
            foundToFollow = true;
        }
        if (foundUser && foundToFollow) {
            break;
        }
    }
    if (foundUser == false || foundToFollow == false) {
        response = `No user with id ${follower}`;

    } else {
        if (followerProfile.following.includes(parseInt(following))) {
            response = `User ${follower} is already following ${following}`;
        } else {
            followerProfile.following.push(parseInt(following))
            response = `User ${follower} is now following ${following}`;
        }
    }
    res.status(200).send(response);

});


//Listing 19 EX8: Delete a follower
app.get('/users/:id/unfollowing/:newId', (req, res) => {
    const follower = req.params.id;
    const following = req.params.newId;
    let followerProfile;
    let response = `No user with id ${follower}`;
    let foundUser = false;
    let foundToFollow = false;

    for (const user of users) {
        if (parseInt(follower, 10) === user.id && foundUser == false) {
            foundUser = true;
            followerProfile = user
        }
        if (parseInt(following, 10) === user.id && foundToFollow == false) {
            foundToFollow = true;
        }
        if (foundUser && foundToFollow) {
            break;
        }
    }
    if (foundUser == false || foundToFollow == false) {
        response = `No user with id ${follower}`;

    } else {
        if (followerProfile.following.includes(parseInt(following))) {
            followerProfile.following.pop(parseInt(following))
            response = `User ${follower} has unfollowed ${following}`;
        } else {
            response = `User ${follower} is already not following ${following}`;
        }
    }
    res.status(200).send(response);

});



// Listing 16: PUT user endpoint
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            const index = users.indexOf(user);
            users.splice(index, 1); // Remove 1 user from the array at this index
        }
    }
    res.send(users);
});

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


// run these commands to test the code with curl
// curl http://localhost:3000 -Method GET
// curl http://localhost:3000 -Method POST
// curl http://localhost:3000 -Method PUT
// curl http://localhost:3000 -Method DELETE
