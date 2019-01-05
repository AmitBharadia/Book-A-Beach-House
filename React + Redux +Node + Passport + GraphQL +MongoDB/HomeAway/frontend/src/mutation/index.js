import { gql } from "apollo-boost";

const loginMutation = gql`
  mutation Login($email_address: String, $password: String, $type: String) {
    login(email_address: $email_address, password: $password, type: $type) {
      id
      first_name
      type
    }
  }
`;

const bookPropertyMutation = gql`
  mutation booking(
    $user_id: String!
    $to: String!
    $from: String!
    $guests: String!
    $location: String!
    $headline: String!
  ) {
    booking(
      user_id: $user_id
      from: $from
      to: $to
      guests: $guests
      location: $location
      headline: $headline
    ) {
      id
    }
  }
`;

const updateProfile = gql`
  mutation updateProfile(
    $id: ID
    $firstname: String
    $lastname: String
    $aboutme: String
    $address: String
    $address2: String
  ) {
    updateProfile(
      id: $id
      firstname: $firstname
      lastname: $lastname
      aboutme: $aboutme
      address: $address
      address2: $address2
    ) {
      id
      firstname
      lastname
      aboutme
      address
      address2
    }
  }
`;

export { loginMutation, bookPropertyMutation };
