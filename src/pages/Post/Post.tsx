import { Children } from "react";

const FlavourData = [
  {
    id: 0,
    name: "Aroma",
    selectedCount: 0,
    children: [
      {
        id: 1,
        name: "sap",
        selectedCount: 0,
        children: [
          { id: 5, name: "FreshWood", selectedCount: 0 },
          { id: 6, name: "WetWood", selectedCount: 0 },
        ],
      },
      {
        id: 2,
        name: "Cedar",
        selectedCount: 0,
        children: [
          { id: 7, name: "Sawdust", selectedCount: 0 },
          { id: 8, name: "Carton", selectedCount: 0 },
          { id: 9, name: "SharpenedPencil", selectedCount: 0 },
        ],
      },
      {
        id: 3,
        name: "Oak",
        selectedCount: 0,
        children: [
          { id: 10, name: "Resin", selectedCount: 0 },
          { id: 11, name: "Varnish", selectedCount: 0 },
        ],
      },
      {
        id: 4,
        name: "Pine",
        selectedCount: 0,
        children: [
          { id: 12, name: "Turpentine", selectedCount: 0 },
          { id: 13, name: "Retsina", selectedCount: 0 },
        ],
      },
    ],
  },
];

const Post = () => {
  return <h1>Post</h1>;
};
export default Post;
