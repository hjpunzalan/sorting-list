import { PostList } from "@/components/PostList";
import { Colours } from "@/constants/colours";
import { GET_POSTS_TITLE } from "@/constants/graphql";
import { useSuspenseQuery } from "@apollo/client";
import { Box, Container, Typography } from "@mui/material";
import { Suspense } from "react";

function App() {
  const { data } = useSuspenseQuery(
    GET_POSTS_TITLE,
    // variables are also typed!
    { variables: { page: 1 } }
  );

  return (
    <Container component="main">
      <Box sx={{ backgroundColor: Colours.VividGreenCyan, ml: -2, pl: 2 }}>
        <Typography variant="h1">Strata Town</Typography>
      </Box>
      {/* Component does not support strict mode */}
      <Suspense fallback={<div>Loading...</div>}>
        <PostList posts={data.postsPagination?.items} />
      </Suspense>
    </Container>
  );
}

export default App;
