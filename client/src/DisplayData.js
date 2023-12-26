import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation} from "@apollo/client"

const QUERY_ALL_USERS = gql`
  query GetAllUsers{
    users{
        id
        name
        age
        username
    }
  }
`
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {

  const [movieSearched, setMovieSearched] = React.useState("");


  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [
    fetchMovie,
    { data: movieSearchedData, error: movieError },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);
  
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }
  return <div>
        <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>

    <h1>List Users</h1>
    {data && data.users.map((user) => {
      return <div key={user.name}>
        <h4>Name: {user.name}</h4>
        <h4>Username: {user.username}</h4>
        <h4>Age: {user.age}</h4>
      </div>
    })}
    <h1>List Movies</h1>
    {movieData &&
      movieData.movies.map((movie) => {
        return <h4 key={movie.name}>Movie Name: {movie.name}</h4>;
      })}
    <div>
      <input
        type="text"
        placeholder="Interstellar..."
        onChange={(event) => {
          setMovieSearched(event.target.value);
        }}
      />
      <button
        onClick={() => {
          fetchMovie({
            variables: {
              name: movieSearched,
            },
          });
        }}
      >
        Fetch Data
      </button>
      <div>
        {movieSearchedData && (
          <div>
            <h1>MovieName: {movieSearchedData.movie.name}</h1>
            <h1>
              Year Of Publication: {movieSearchedData.movie.yearOfPublication}
            </h1>{" "}
          </div>
        )}
        {movieError && <h1> There was an error fetching the data</h1>}
      </div>
    </div>

  </div>
}

export default DisplayData;
