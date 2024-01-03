import { Posts } from "@/__generated__/graphql";
import { PostList } from "@/components/PostList";
import { Colours } from "@/constants/colours";
import { GET_POSTS_TITLE } from "@/constants/graphql";
import { LOCAL_STORAGE_KEY } from "@/constants/keys";
import reorderPostsFromObjectMap from "@/lib/reorderPostsFromObjectMap";
import { useQuery } from "@apollo/client";
import { Button, CircularProgress, Container, ContainerProps, Typography, styled } from "@mui/material";
import { LexoRank } from "lexorank";
import { useState } from "react";

function App() {
  // State.
  const [posts, setPosts] = useState<Posts[]>([]);
  const [sortedPosts, setSortedPosts] = useState<Posts[]>([]);
  const [hasSorted, setHasSorted] = useState(false);

  // Query posts.
  const { loading } = useQuery(GET_POSTS_TITLE, {
    variables: { perPage: 500 },
    onCompleted: data => {
      if (data.postsPagination?.items) {
        const items = data.postsPagination.items;
        let orderedItems = Array.from(items);

        // Sort order if sorting is saved in storage.
        const savedListOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedListOrder && items.length > 0) {
          orderedItems = reorderPostsFromObjectMap(orderedItems, JSON.parse(savedListOrder));

          // Indicate initial sorting has been applied.
          setHasSorted(true);
        }

        // Update state.
        setPosts(current => current.concat(items));
        setSortedPosts(current =>
          current.concat(orderedItems).sort((a, b) => LexoRank.parse(a.order).compareTo(LexoRank.parse(b.order)))
        );
      }
    }
  });

  // Handlers.
  function handleChangeSortedPosts(next: Posts[]) {
    if (!hasSorted) setHasSorted(true);
    next = next.sort((a, b) => LexoRank.parse(a.order).compareTo(LexoRank.parse(b.order)));
    setSortedPosts(next);
  }

  function handleResetPostsOrder() {
    if (!confirm("This will reset the sorted order and all progress will be lost. Are you sure?")) return;
    setSortedPosts(posts);
    setHasSorted(false);
    localStorage.clear();
  }

  return (
    <SectionsContainer>
      <Header>
        <Section>
          <Typography variant="h1">Sorting List</Typography>
        </Section>
      </Header>
      <Section>
        <IntroText>Sort the list of posts title by drag and drop!</IntroText>
      </Section>
      <Section>
        <PostList posts={sortedPosts} onChange={handleChangeSortedPosts} />
        {loading && <CircularProgress />}
        <Button
          sx={{ width: "fit-content", mt: 2, ml: "auto" }}
          variant="contained"
          onClick={handleResetPostsOrder}
          disabled={!hasSorted || loading}
        >
          Reset Changes
        </Button>
      </Section>
    </SectionsContainer>
  );
}

const SectionsContainer = styled("main")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2)
}));

const Header = styled("header")(({ theme }) => ({
  backgroundColor: Colours.VividGreenCyan,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

const IntroText = styled("p")(({ theme }) => ({
  ...theme.typography.h5,
  color: Colours.LuminousVividOrange,
  fontWeight: "bold"
}));

const Section = styled((props: ContainerProps) => <Container component="section" {...props} />)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2)
}));

export default App;
