require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

let morganToken = morgan((tokens, req, res) => {
  if (req.method === "POST") {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.req(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  }
});

// Middleware
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(morganToken);

const Entry = require("./models/entry");

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  next();
};

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Get all entries
app.get("/api/persons", (req, res) => {
  Entry.find({}).then((entries) => {
    // Returns an object of all entries
    res.json(entries);
  });
});

// Get a specific entry
app.get("/api/persons/:id", (req, res, next) => {
  Entry.findById(req.params.id)
    .then((entry) => {
      if (entry) res.json(entry);
      else {
        res.status(404).json({ message: "ID does not exist!" });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Delete a specific entry
app.delete("/api/persons/:id", (req, res, next) => {
  Entry.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log("Delete: ", result);
      if (result) res.status(204).end();
      else res.status(404).end();
    })
    .catch((error) => next(error));
});

// Create a new entry
app.post("/api/persons", (req, res, next) => {
  const name = req.body.name;
  const number = req.body.number;
  // 400 === bad request
  if (!name) return res.status(400).json({ message: "Name is missing" });
  if (!number) {
    return res.status(400).json({ message: "Phone number is missing" });
  }

  // Check if name is already in the phonebook
  Entry.find({ name }, (err, docs) => {
    if (err) {
      console.log(err);
    } else if (docs.length) {
      // 409 === conflict
      res.status(409).json({ message: "Name already exists" });
    } else {
      const entry = new Entry({
        name,
        number,
      });

      entry
        .save()
        .then((savedEntry) => {
          res.json(savedEntry);
          res.status(200).end();
        })
        .catch((error) => {
          next(error);
        });
    }
  });
});

// Update an existing entry
app.put("/api/persons/:id", (req, res, next) => {
  const entry = {
    number: req.body.number,
  };

  Entry.findByIdAndUpdate(req.params.id, entry, {
    new: true,
    runValidators: true,
  })
    .then((updatedEntry) => {
      if (updatedEntry) res.json(updatedEntry);
      else
        res.status(404).json({
          message: `Information for ${req.body.name} has already been removed from the server`,
        });
    })
    .catch((error) => {
      next(error);
    });
});

// Get phonebook info
app.get("/info", (req, res) => {
  const currentDate = new Date();
  Entry.find({}).then((entries) => {
    let totalEntries = entries.length;
    res.send(`
    <div>
      <p>Phonebook has info for ${totalEntries} people</p>
      <p>${currentDate}</p>
    </div>
    `);
  });
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ message: "Unknown endpoint" });
  next();
};

app.use(unknownEndpoint);

// Note that the error handling middleware has to be the last loaded middleware!
const errorHandler = (error, req, res, next) => {
  console.log("Error message: ", error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ message: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
