import { Posts } from "@/__generated__/graphql";
import { generateRank } from "@/lib/generateRank";
import reorderPostsFromObjectMap from "@/lib/reorderPostsFromObjectMap";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DropResult,
  Droppable
} from "@hello-pangea/dnd";
import { ListItem, ListItemText } from "@mui/material";
import { LexoRank } from "lexorank";
import React, { useMemo, useState } from "react";
import { FixedSizeList, ListChildComponentProps, areEqual } from "react-window";

// Constants.
const LOCAL_STORAGE_KEY = "strata-town-post-list-order";
const DROPPABLE_ID = "posts-title-droppable";

function PostItem(props: {
  item: Posts;
  style?: React.CSSProperties;
  provided: DraggableProvided;
  isDragging?: boolean;
}) {
  const { item, style, provided } = props;

  const combined = {
    ...style,
    ...provided.draggableProps.style
  };

  return (
    <ListItem
      disablePadding
      key={item._id}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={combined}
    >
      <ListItemText primary={item.title} />
    </ListItem>
  );
}

const PostItemMemo = React.memo((props: ListChildComponentProps<Posts[]>) => {
  const { data: items, index, style } = props;
  const item = items[index];
  return (
    <Draggable draggableId={item._id} index={index} key={item._id}>
      {provided => <PostItem provided={provided} item={item} style={style} />}
    </Draggable>
  );
}, areEqual);

interface PostListProps {
  posts: Posts[] | null | undefined;
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  // Get initial posts.
  const initialItems = useMemo(() => {
    let orderedPosts = Array.from(posts || []);

    // Get order from local storage.
    const savedListOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedListOrder && posts) {
      orderedPosts = reorderPostsFromObjectMap(orderedPosts, JSON.parse(savedListOrder));
    }
    return orderedPosts;
  }, [posts]);

  // State.
  const [items, setItems] = useState(initialItems);

  // Get ordered posts.
  const orderedItems = useMemo(
    () =>
      items.sort((a, b) => LexoRank.parse(a.order).compareTo(LexoRank.parse(b.order))),
    [items]
  );

  // Handlers.
  function handleDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    // Check if not moved.
    if (result.source.index === result.destination.index) {
      return;
    }
    // Save to local storage.
    const sourceItem = items[result.source.index];
    const savedListOrder = localStorage.getItem(LOCAL_STORAGE_KEY);

    // Track user list sort by order.
    let newListOrder: { [key: string]: string } = {};
    if (savedListOrder) {
      const parsed = JSON.parse(savedListOrder);
      if (typeof parsed === "object") {
        newListOrder = { ...parsed };
      }
    }
    // Update list order.
    const newLexorank = generateRank(
      items,
      result.source.index,
      result.destination.index
    );
    newListOrder[sourceItem._id] = newLexorank.toString();

    // Update state.
    setItems(current => {
      const update = Array.from(current);
      update[result.source.index] = {
        ...update[result.source.index],
        order: newLexorank.toString()
      };
      return update;
    });

    // Save in storage.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newListOrder));
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId={DROPPABLE_ID}
        mode="virtual"
        renderClone={(provided, snapshot, rubric) => (
          <PostItem
            provided={provided}
            isDragging={snapshot.isDragging}
            item={orderedItems[rubric.source.index]}
          />
        )}
      >
        {provided => (
          <FixedSizeList
            height={400}
            itemCount={orderedItems.length}
            itemSize={100}
            width={300}
            outerRef={provided.innerRef}
            itemData={orderedItems}
          >
            {PostItemMemo}
          </FixedSizeList>
        )}
      </Droppable>
    </DragDropContext>
  );
};
