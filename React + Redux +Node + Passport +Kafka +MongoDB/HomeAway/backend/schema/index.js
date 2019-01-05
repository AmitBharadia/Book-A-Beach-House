const graphql = require("graphql");
const _ = require("lodash");

var { User } = require("../model/User");
var { Property } = require("../model/Property");
var { Trip } = require("../model/Trip");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email_address: { type: GraphQLString },
    password: { type: GraphQLString },
    type: { type: GraphQLString },
    first_name: {type: GraphQLString},
    last_name: {type:GraphQLString}
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    available_from: { type: GraphQLString },
    available_to: { type: GraphQLString },
    max_guests: { type: GraphQLString },
    price: { type: GraphQLString },
    bedrooms: { type: GraphQLString },
    bathrooms: { type: GraphQLString },
    sqft: { type: GraphQLString },
    location: { type: GraphQLString },
    headline: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});

const TripType = new GraphQLObjectType({
  name: "Trip",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    location: { type: GraphQLString },
    headline: { type: GraphQLString },
    description: { type: GraphQLString },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    guests: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    search: {
      type: new GraphQLList(PropertyType),
      args: {
        location: { type: GraphQLString },
        available_from: { type: GraphQLString },
        available_to: { type: GraphQLString },
        max_guests: { type: GraphQLString }
      },
      async resolve(parent, args) {
        var query = {};
        if (args.location != "" && args.location) {
          query["location"] = { $regex: args.location, $options: "i" };
        }

        if (args.available_from != "" && args.available_from) {
          query["available_from"] = {
            $lte: new Date(args.available_from.substring(0, 10))
          };
        }

        if (args.available_to != "" && args.available_to) {
          query["available_to"] = {
            $gte: new Date(args.available_to.substring(0, 10))
          };
        }

        if (args.max_guests != "" && args.max_guests) {
          query["max_guests"] = {
            $gte: Number(args.max_guests)
          };
        }

         console.log(query);

        let found_property = await Property.find(query, (err, res) => {
          //console.log(err);
        });
        console.log("Result: ", found_property)
        return found_property;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        let found_users = await User.find((err, res) => {
          //console.log("res", res);
          // return res;
        });
        console.log("Users :", found_users);
        return found_users;
      }
    },
    bookings: {
      type: new GraphQLList(TripType),
      args: {
        user_id: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let trips = await Trip.find(args, (err, res) => {
          console.log("Error", err);
          console.log("Trips", res);
        });
        console.log("Trips :", trips);
        return trips;
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      args: {
        user_id: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let propertyList = await Property.find({ user_id: args.user_id });
        return propertyList;
      }
    }
  }
});

var count = 10;
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: UserType,
      args: {
        email_address: { type: GraphQLString },
        password: { type: GraphQLString },
        type: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log(JSON.stringify(args));
        let found_users = await User.find(args, (err, res) => {
          console.log("Error :" + err);
        });
        console.log("found_users :", found_users);
        if (!found_users || found_users.length == 0) {
          throw errorObj({ _error: "User not found" });
        }
        return found_users[0];
      }
    },
    booking: {
      type: TripType,
      args: {
        user_id: { type: GraphQLString },
        from: {type:GraphQLString},
        to: {type: GraphQLString},
        guests:{type:GraphQLString},
        location:{type: GraphQLString},
        headline:{type:GraphQLString}
      },
      async resolve(parent, args) {
        console.log(JSON.stringify(args));
        const trip = new Trip({
          user_id: args.user_id,
          from:args.from,
          to:args.to,
          guests:args.guests,
          location:args.location,
          headline:args.headline
        });
        let newTrip = await trip.save();
        console.log("createTrip", newTrip);
        return newTrip;
      }
    },
    updateProfile: {
      type: UserType,
      args:{
          id : {type :GraphQLID },
          firstname : { type: GraphQLString  },
          lastname : { type: GraphQLString },
          aboutme : { type: GraphQLString },
          address : { type: GraphQLString },
          address2 : { type: GraphQLString }
      },
      async resolve(parent, args) {
          console.log("In Profile Update :",JSON.stringify(args));
          let found_users = await Users.findByIdAndUpdate(args.id,
                          {$set:{firstname : args.firstname,
                              lastname : args.lastname ,
                              aboutme : args.aboutme,
                              address : args.address,
                              address2 : args.address2
                              }
                          }, {new : true}, (err, res) => {
                      console.log("err : ",err);
                  console.log("res : ",res);
  
          })
  
          return found_users;
      }
  }
});

const errorObj = obj => {
  return new Error(JSON.stringify(obj));
};

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
