import { Posts } from "@/__generated__/graphql";
import { PostList } from "@/components/PostList";
import { Colours } from "@/constants/colours";
import { GET_POSTS_TITLE } from "@/constants/graphql";
import { LOCAL_STORAGE_KEY } from "@/constants/keys";
import reorderPostsFromObjectMap from "@/lib/reorderPostsFromObjectMap";
import { useSuspenseQuery } from "@apollo/client";
import {
  CircularProgress,
  Container,
  ContainerProps,
  Typography,
  styled
} from "@mui/material";
import { Suspense, useMemo, useState } from "react";

function App() {
  const { data } = useSuspenseQuery(
    GET_POSTS_TITLE,
    // variables are also typed!
    { variables: { page: 1 } }
  );

  // Get initial posts.
  const items = data.postsPagination?.items;
  const initialItems = useMemo(() => {
    let orderedPosts = Array.from(items || []);

    // Get order from local storage.
    const savedListOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedListOrder && orderedPosts.length > 0) {
      orderedPosts = reorderPostsFromObjectMap(orderedPosts, JSON.parse(savedListOrder));
    }
    return orderedPosts;
  }, [items]);

  // State.
  const [posts, setPosts] = useState(initialItems);

  // Handlers.
  function handleChangePosts(values: Posts[]) {
    setPosts(values);
  }

  return (
    <SectionsContainer>
      <Header>
        <Section>
          <Typography variant="h1">Strata Town</Typography>
        </Section>
      </Header>
      <Section>
        <IntroText>Sort the list of posts title by drag and drop!</IntroText>
      </Section>
      <Section>
        <Suspense fallback={<CircularProgress />}>
          <PostList posts={posts} onChange={handleChangePosts} />
        </Suspense>
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

const Section = styled((props: ContainerProps) => (
  <Container component="section" {...props} />
))();

export default App;
