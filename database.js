db.createCollection("locations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "locations",
      required: ["city", "country", "altitude", "longitude", "latitude"],
      properties: {
        city: {
          bsonType: "string",
        },
        country: {
          bsonType: "string",
        },
        altitude: {
          bsonType: "double",
        },
        longitude: {
          bsonType: "double",
        },
        latitude: {
          bsonType: "double",
        },
      },
    },
  },
});

db.createCollection("pins", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "pins",
      required: ["name", "image", "level"],
      properties: {
        name: {
          bsonType: "string",
        },
        image: {
          bsonType: "string",
        },
        level: {
          bsonType: "double",
        },
      },
    },
  },
});
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "users",
      required: [
        "email",
        "authProvider",
        "authId",
        "foundObjects",
        "rewardPins",
        "role",
        "phone",
        "password",
        "name",
        "surname",
        "picture",
        "description",
        "time",
        "pines",
        "contributor",
        "location",
      ],
      properties: {
        email: {
          bsonType: "string",
        },
        authProvider: {
          bsonType: "string",
        },
        authId: {
          bsonType: "string",
        },
        foundObjects: {
          bsonType: "object",
        },
        rewardPins: {
          bsonType: "double",
        },
        email: {
          bsonType: "string",
        },
        role: {
          bsonType: "string",
        },
        phone: {
          bsonType: "string",
        },
        password: {
          bsonType: "string",
        },
        name: {
          bsonType: "string",
        },
        surname: {
          bsonType: "string",
        },
        picture: {
          bsonType: "string",
        },
        description: {
          bsonType: "string",
        },
        time: {
          bsonType: "date",
        },
        pines: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
          },
        },
        contributor: {
          bsonType: "double",
        },
        lost: {
          bsonType: "bool",
        },
        location: {
          bsonType: "objectId",
        },
      },
    },
  },
});
