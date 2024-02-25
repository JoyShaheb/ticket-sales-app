import { IBookmarkProps } from "@/types/interface";
import {
  useAddOneBookmarkMutation,
  useDeleteOneBookmarkMutation,
} from "../store";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { useGetAllBookmarksQuery } from "../store";
import { Loader2 } from "lucide-react";

const BookmarkComponent = ({
  userID,
  eventID,
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
    return (
      <Loader2 className="h-[20px] w-[20px] animate-spin text-[#26AC9B]" />
    );
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
