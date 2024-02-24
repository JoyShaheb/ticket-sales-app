import { IBookmarkProps } from "@/types/interface";
import {
  RootState,
  removeEvent,
  saveEvent,
  useAddOneBookmarkMutation,
  useDeleteOneBookmarkMutation,
} from "../store";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const BookmarkComponent = ({
  userID,
  eventID,
  id,
  isAuthenticated,
}: IBookmarkProps & { isAuthenticated: boolean }) => {
  const dispatch = useDispatch();
  const [addBookmark] = useAddOneBookmarkMutation();
  const [deleteBookmark] = useDeleteOneBookmarkMutation();

  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks[userID]?.savedEvents || []
  );

  const handleAddBookmark = async () => {
    try {
      await addBookmark({
        userID,
        eventID,
        id,
      });

      // Dispatch action to update bookmarks in Redux store
      dispatch(saveEvent({ userID, eventID }));
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const handleDeleteBookmark = async () => {
    try {
      await deleteBookmark({ id });

      // Dispatch action to update bookmarks in Redux store
      dispatch(removeEvent({ userID, eventID }));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <div>
      {isAuthenticated && bookmarks.includes(id) ? (
        <FaBookmark onClick={handleDeleteBookmark} />
      ) : (
        isAuthenticated && <FiBookmark onClick={handleAddBookmark} />
      )}
    </div>
  );
};

export default BookmarkComponent;
