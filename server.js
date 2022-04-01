const express = require("express");
const Database = require('./Database.js');

var db = Database("mongodb+srv://admin:spycatadmin@cluster0.p2llx.mongodb.net/database?retryWrites=true&w=majority", "database");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded());


/*
 * get list of all users and their friendship points
 *
 * @return Array<{string username, int friendship_points}>
 */
app.route("/users")
  .get((req, res) => {
    db.getAllUsers()
      .then(results => {
        console.log(results);
        res.status(200).send(JSON.stringify(results));
      });
  });


  /*
   * get pet colour for one user
   *
   * @param string username
   * @return int pet_colour
   */
app.route("/user")
  .get((req, res) => {
    let username = req.query;

    if (username) {
    db.getUserByUsername(username)
      .then(results => {
        console.log(results);
        res.status(200).send(JSON.stringify(results));
      });
    } else {
      res.status(400).send('empty request body found')
    }
  })
  /*
   * post new user
   *
   * @param {string username, int pet_colour}
   */
  .post((req, res) => {
    let user = req.body;
    console.log(req);

    if (user) {
      db.postUser(user)
        .then(results => {
          console.log(results);
          res.status(200).send(JSON.stringify(results))
        }).catch(err => {
          res.status(400).send(JSON.stringify(err))
        });
    } else {
      res.status(400).send('empty request body found')
    }
  });

/*
 * increment user friendship_points by 1
 *
 * @param string username
 * @return int 1 if user modified, 0 if nothing changed
 */
app.route("/increment")
  .post((req, res) => {
    let user = req.body;

    if (user) {
      db.incrementFriendship(user)
        .then(results => {
          console.log(results);
          res.status(200).send(JSON.stringify(results.modifiedCount));
        }).catch(err => {
          console.log(err)
          res.sendStatus(400);
        });
    } else {
      console.log('empty request body found');
      res.sendStatus(400);
    }
  });

app.route("/chat")
  .get((req, res) => {
    let users = req.query;

    if (users) {
    db.getChatHistory(users)
      .then(results => {
        console.log(results);
        res.status(200).send(JSON.stringify(results));
      });
    } else {
      res.status(400).send('empty request body found')
    }
  })
  .post((req, res) => {
    let chat = req.body;

    if (chat) {
      db.postChat(chat)
        .then(results => {
          console.log(results);
          res.status(200).send(JSON.stringify(results))
        }).catch(err => {
          res.status(400).send(JSON.stringify(err))
        });
    } else {
      res.status(400).send('empty request body found')
    }
  });

app.route("/friendship")
  .get((req, res) => {
    let user = req.query;

    if (user) {
    db.getFriendsForUser(user)
      .then(results => {
        console.log(results);
        res.status(200).send(JSON.stringify(results));
      });
    } else {
      res.status(400).send('empty request body found')
    }
  })
  .post((req, res) => {
    let friendship = req.body;

    if (friendship) {
      db.postFriendship(friendship)
        .then(results => {
          console.log(results);
          res.status(200).send(JSON.stringify(results))
        }).catch(err => {
          res.status(400).send(JSON.stringify(err))
        });
    } else {
      res.status(400).send('empty request body found')
    }
  })
  .delete((req, res) => {
    let friendship = req.query;

    if (friendship) {
      db.deleteFriendship(friendship)
        .then(results => {
          console.log(results);
          res.status(200).send(JSON.stringify(results))
        }).catch(err => {
          res.status(400).send(JSON.stringify(err))
        });
    } else {
      res.status(400).send('empty request body found')
    }
  });
  
app.route("/game")
  .get((req, res) => {
    let data = req.query;

    if (data) {
      db.getGameData(data)
        .then(results => {
          console.log(results);
          res.status(200).send(JSON.stringify(results))
        }).catch(err => {
          res.status(400).send(JSON.stringify(err))
        });
    } else {
      res.status(400).send('empty request body found')
    }
  })
  .post((req, res) => {
    let data = req.body;

    if (data) {
      db.enterGameData(data)
        .then(results => {
          console.log(results);
          res.status(200).send(JSON.stringify(results))
        }).catch(err => {
          res.status(400).send(JSON.stringify(err))
        });
    } else {
      res.status(400).send('empty request body found')
    }
  })
  .delete((req, res) => {
    let data = req.query;

    if (data) {
      db.deleteGameData(data)
        .then(results => {
          console.log(results);
          res.status(200).send(JSON.stringify(results))
        }).catch(err => {
          res.status(400).send(JSON.stringify(err))
        });
    } else {
      res.status(400).send('empty request body found')
    }
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
