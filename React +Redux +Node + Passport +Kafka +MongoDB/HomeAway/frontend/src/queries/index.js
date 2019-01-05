import { gql } from "apollo-boost";
const loginQuery = gql`
  {
    login {
      username
      password
      type
    }
  }
`;

const searchQuery = gql`
  query searchQuery(
    $place: String
    $max_guests: String
    $available_from: String
    $available_to: String
  ) {
    search(
      location: $place
      max_guests: $max_guests
      available_to: $available_to
      available_from: $available_from
    ) {
      id
      headline
      description
      bedrooms
      bathrooms
      sqft
      price
      type
      available_from
      available_to
      max_guests
      location
    }
  }
`;

const listOfTrips = gql`
  query bookings($user_id: String) {
    bookings(user_id: $user_id) {
      headline
      location
      description
      id
      user_id
      guests
      from
      to
    }
  }
`;

const listOfTrips = gql`
  query listOfPropertied($user_id: String) {
    properties(user_id: $user_id) {
      headline
      location
      description
      id
      user_id
      guests
      from
      to
    }
  }
`;
export { loginQuery, searchQuery, listOfTrips };
