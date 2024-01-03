import { Posts } from "@/__generated__/graphql";
import { DraggableProvided } from "@hello-pangea/dnd";
import { ListItem, ListItemText } from "@mui/material";
import React from "react";

interface PostItemProps {
  item: Posts;
  style?: React.CSSProperties;
  provided: DraggableProvided;
  isDragging?: boolean;
}

export const PostItem: React.FC<PostItemProps> = ({ item, style, provided }) => {
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
};
