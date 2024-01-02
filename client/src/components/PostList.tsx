import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

function PostItem(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

interface VirtualizedListProps {}

export const VirtualizedList: React.FC<VirtualizedListProps> = () => {
  return (
    <FixedSizeList
      height={400}
      width={360}
      itemSize={46}
      itemCount={200}
      overscanCount={5}
    >
      {PostItem}
    </FixedSizeList>
  );
};
