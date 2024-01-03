import { Posts } from "@/__generated__/graphql";
import { DraggableProvided } from "@hello-pangea/dnd";
import { ListItem, ListItemText, styled } from "@mui/material";
import React from "react";

interface PostItemProps {
  index: number;
  item: Posts;
  style?: React.CSSProperties;
  provided: DraggableProvided;
  isDragging?: boolean;
}

export const PostItem: React.FC<PostItemProps> = ({ index, item, style, provided, isDragging }) => {
  const combined = {
    ...style,
    ...provided.draggableProps.style
  };

  return (
    <StyledItem
      disablePadding
      key={item._id}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={combined}
    >
      <ListItemText
        primary={`${index + 1}. ${item.title}`}
        primaryTypographyProps={{
          fontWeight: "bold",
          color: isDragging ? theme => theme.palette.grey[300] : "inherit"
        }}
      />
    </StyledItem>
  );
};

const StyledItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.primary.main
}));
