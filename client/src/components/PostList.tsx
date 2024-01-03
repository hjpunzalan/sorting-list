import { IListOrder } from "@/App";
import { Posts } from "@/__generated__/graphql";
import { PostItem } from "@/components/PostItem";
import { DROPPABLE_ID, LOCAL_STORAGE_KEY } from "@/constants/keys";
import { generateRank } from "@/lib/generateRank";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import React from "react";
import { FixedSizeList, ListChildComponentProps, areEqual } from "react-window";

const PostItemMemo = React.memo((props: ListChildComponentProps<Posts[]>) => {
  const { data: items, index, style } = props;
  const item = items[index];
  return (
    <Draggable draggableId={item._id} index={index} key={item._id}>
      {provided => <PostItem index={index} provided={provided} item={item} style={style} />}
    </Draggable>
  );
}, areEqual);

interface PostListProps {
  posts: Posts[];
  onListOrderChange: (next: IListOrder) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onListOrderChange }) => {
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
    const sourceItem = posts[result.source.index];
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
    const newLexorank = generateRank(posts, result.source.index, result.destination.index);
    newListOrder[sourceItem._id] = newLexorank.toString();

    // Update state.
    onListOrderChange(newListOrder);

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
            index={rubric.source.index}
            provided={provided}
            isDragging={snapshot.isDragging}
            item={posts[rubric.source.index]}
          />
        )}
      >
        {provided => (
          <FixedSizeList
            height={360}
            itemCount={posts.length}
            itemSize={80}
            outerRef={provided.innerRef}
            itemData={posts}
            width="100%"
          >
            {PostItemMemo}
          </FixedSizeList>
        )}
      </Droppable>
    </DragDropContext>
  );
};
