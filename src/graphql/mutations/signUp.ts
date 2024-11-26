import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation signUpUser($input: SignUpUserInput!) {
    signUpUser(input: $input) {
      user {
        id
        email
      }
      errors
    }
  }
`;

