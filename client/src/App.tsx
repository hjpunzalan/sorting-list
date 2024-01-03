import { Posts } from "@/__generated__/graphql";
import { PostList } from "@/components/PostList";
import { Colours } from "@/constants/colours";
import { GET_POSTS_TITLE } from "@/constants/graphql";
import { LOCAL_STORAGE_KEY } from "@/constants/keys";
import reorderPostsFromObjectMap from "@/lib/reorderPostsFromObjectMap";
import { useQuery } from "@apollo/client";
import { Button, CircularProgress, Container, ContainerProps, Typography, styled } from "@mui/material";
import { LexoRank } from "lexorank";
import { useMemo, useState } from "react";

export type IListOrder = { [key: string]: string } | null;

function App() {
  // Fetch initial list order from storage.
  const initialListOrder = useMemo(() => {
    let listOrder = null;
    const savedListOrderJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedListOrderJSON) {
      const savedListOrder = JSON.parse(savedListOrderJSON);
      if (typeof savedListOrder === "object") listOrder = savedListOrder;
    }
    return listOrder;
  }, []);

  // State.
  const [posts, setPosts] = useState<Posts[]>([]);
  const [listOrder, setListOrder] = useState<IListOrder>(initialListOrder);

  // Query posts.
  const { loading } = useQuery(GET_POSTS_TITLE, {
    variables: { perPage: 500 },
    onCompleted: data => {
      if (data.postsPagination?.items) {
        const items = data.postsPagination.items;
        // Update state.
        setPosts(current => current.concat(items));
      }
    }
  });

  const sortedPosts = useMemo(() => {
    if (!listOrder || posts.length === 0) return posts;

    return reorderPostsFromObjectMap(posts, listOrder).sort((a, b) =>
      LexoRank.parse(a.order).compareTo(LexoRank.parse(b.order))
    );
  }, [listOrder, posts]);

  // Handlers.
  function handleChangeListOrder(next: IListOrder) {
    setListOrder(next);
  }

  function handleResetPostsOrder() {
    if (!confirm("This will reset the sorted order and all progress will be lost. Are you sure?")) return;
    setListOrder(null);
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
        <PostList posts={sortedPosts} onListOrderChange={handleChangeListOrder} />
        {loading && <CircularProgress />}
        <Button
          sx={{ width: "fit-content", mt: 2, ml: "auto" }}
          variant="contained"
          onClick={handleResetPostsOrder}
          disabled={!listOrder || loading}
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
