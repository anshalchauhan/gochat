import { useEffect } from "react";
import { useDispatch } from "react-redux";

// List Component
import ListComponent from "./ListComponent";

const List = ({ thunk, list, type }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunk());
  }, [dispatch, thunk]);

  console.log(list);

  return (
    <>
      {list.map((element) => {
        // Render UserComponent
        return (
          <ListComponent
            type={type}
            key={element._id}
            id={element._id}
            {...element.sender}
            {...element}
          />
        );
      })}
    </>
  );
};

export default List;
