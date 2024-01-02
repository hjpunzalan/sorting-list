import { Container, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container component="main">
      <Typography variant="h1">Vite + React</Typography>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <Typography>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </Container>
  );
}

export default App;
