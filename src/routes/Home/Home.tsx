import { useNavigate } from "react-router-dom";

import { useCharactersQuery } from "../../data/characters/queries.ts";

const Home = () => {
  const navigate = useNavigate();
  const { characters, isLoading, isError } = useCharactersQuery();

  const handleOnClick = () => {
    navigate("/another-page");
  };

  if (isError) return <div>Error while fetching characters</div>;
  if (isLoading) return <div>Loading characters</div>;

  return (
    <>
      <div>Hello User</div>
      <h1>Characters:</h1>
      <h2>Loyal:</h2>
      {characters
        .filter((c) => c.alignment === "loyal")
        .map((c) => (
          <div key={c.id}>{c.name}</div>
        ))}
      <h2>Chaotic:</h2>
      {characters
        .filter((c) => c.alignment === "chaotic")
        .map((c) => (
          <div key={c.id}>{c.name}</div>
        ))}
      <button onClick={handleOnClick}>go to another page</button>
    </>
  );
};

export default Home;
