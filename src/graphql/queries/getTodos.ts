import { gql } from '@apollo/client';
import { Todo, GetTodosInput, GetTodosData } from '../../types/todo';

export const GET_TODOS = gql`
  query GetTodos($status: String!, $page: Int!, $perPage: Int!) {
    tasks(status: $status, page: $page, perPage: $perPage) {
      id
      title
      description
      status
      dueOn
      createdAt
      updatedAt
    }
  }
`;

export type { Todo, GetTodosInput, GetTodosData };

