import { IBookmarkProps } from "@/types/interface";
import {
  useAddOneBookmarkMutation,
  useDeleteOneBookmarkMutation,
} from "../store";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { useGetAllBookmarksQuery } from "../store";

const BookmarkComponent = ({
  userID,
  eventID,
  id,
  isAuthenticated,
}: IBookmarkProps & { isAuthenticated: boolean }) => {
  const [addBookmark] = useAddOneBookmarkMutation();
  const [deleteBookmark] = useDeleteOneBookmarkMutation();

  const { data, isLoading, isFetching } = useGetAllBookmarksQuery({
    userID,
  });

  const handleAddBookmark = async () =>
    await addBookmark({
      userID,
      eventID,
    });

  const handleDeleteBookmark = async () =>
    await deleteBookmark({ userID, eventID });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated && (data as string[]).includes(eventID) ? (
        <FaBookmark onClick={handleDeleteBookmark} />
      ) : (
        isAuthenticated && <FiBookmark onClick={handleAddBookmark} />
      )}
    </div>
  );
};

export default BookmarkComponent;
