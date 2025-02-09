import { useState, useEffect } from "react";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <Card
        //card with post data i.e images genrated by ai if data is present
        key={post._id}
        //passing all of the post data to each individual Card
        //each entity (i.e post ._id,postt's photo)of data is being spreaded using ...post(spread Operator)
        //this method we used even in portfolio to simple be able to access all values (i.e all values and properties of post like name, _id, photo)
        {...post}
      />
    ));
  }
  //  otherwise if no data then simply show the title for no resullts or no posts from the title parameter in render Crds
  return (
    <h2 className="mt-5 font-bold text-[#F59E0B] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  //just to check loading and if we need to use Loader (the imported componenet)
  const [loading, setLoading] = useState(false);
  //all posts
  const [allPosts, setAllPosts] = useState(null);
  //searching
  const [searchText, setSearchtext] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  // The useEffect hook in React is used to perform side effects in functional components. Side effects refer to actions that are performed outside the scope of the component, such as fetching data from an API, subscribing to events, or manipulating the DOM.

  // The useEffect hook accepts two parameters: a callback function and a dependencies array. The callback function contains the code that should be executed when the component renders or when specific dependencies change. The dependencies array specifies the values that the effect depends on, and it is used to determine when the effect should be re-executed.

  //implemnting get route in the homepage

  // useEffect is called at the start once the component is called so since it is going to only get called at start meaning we going to leave the dependency array as empty

  useEffect(() => {
    // The useEffect hook allows you to perform tasks that cannot be done directly inside the return statement or need to be executed at specific times during the component's lifecycle.

    const fetchPosts = async () => {
      // setLodaing to true cause we are doing something and it's something which is kind of uk loading
      setLoading(true);

      try {
        //fetching
        const response = await fetch(
          "https://imaigem-4hbi.onrender.com/api/v1/post",

          {
            //method
            method: "GET",
            headers: {
              "Content-Type": "aapplication/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          //showing newsest posts at top that's why reversing
          console.log(result.data);
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
        console.log("error in get-1 of Home");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  //search

  const handleSearchChange = (event) => {
    // clear timeout everytime when we start searching something new
    clearTimeout(searchTimeout);
    setSearchtext(event.target.value);

    //set search time out state
    setSearchTimeout(
      //if multiple characters were typed within time limit of 500 milliseconds then we won't we making those multiple serach requets every time
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            //searching by the name of uploader or by the prompt of the post
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 200)
    );
  };

  return (
    // max-W-7xl means max width of about 80 rems
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#F59E0B] text-[32px]">
          The Communnity Showcase
        </h1>
        <p className="mt-2 text-[#596e80] text-[16px] max-w-[500px]  ">
          Browse Through a Collection of imgiantive and Visually stunnig Images
          by openaApi's DALL.E 2
        </p>
      </div>
      {/* Form field */}
      <div className="mt-16">
        <FormField
          LabelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10 ">
        {loading ? (
          <div className="flex justify-center items-center ">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-2xl text-[#F59E0B]">
                Showing results for{" "}
                <span className="text-[#F59E0B]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg-grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default Home;
