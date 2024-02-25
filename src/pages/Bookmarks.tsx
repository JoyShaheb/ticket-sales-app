// import { useEffect } from "react";
// import { useGetAllBookmarksQuery } from "../../src/store/index";
// import { useSelector } from "react-redux";
// import { RootState } from "../../src/store";

const Bookmarks = () => {
  // const userID = useSelector((state: RootState) => state.user.uid);
  // const { data, error, isLoading } = useGetAllBookmarksQuery();

  // useEffect(() => {
  //   console.log("User ID:", userID);
  //   console.log("Data:", data);
  //   console.log("Error:", error);
  //   console.log("Loading:", isLoading);
  // }, [data, error, isLoading, userID]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  // }

  // if (!data || data.length === 0) {
  //   return <p>No bookmarks found.</p>;
  // }

  return (
    <div>
      <p>Data:</p>
      <ul>
        {/* {data.map((bookmark) => (
          <li key={bookmark.id}>{bookmark.eventID}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default Bookmarks;
