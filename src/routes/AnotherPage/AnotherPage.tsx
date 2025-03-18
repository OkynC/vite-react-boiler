import { useNavigate } from "react-router-dom";

const AnotherPage = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <>
      <div>Hello User</div>
      <h1>This is another page</h1>
      <button onClick={handleOnClick}>go to home</button>
    </>
  );
};

export default AnotherPage;
