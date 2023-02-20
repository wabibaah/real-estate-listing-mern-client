import { useAuth } from "../context/auth";

function Home() {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth)}</pre>
    </div>
  );
}

export default Home;
