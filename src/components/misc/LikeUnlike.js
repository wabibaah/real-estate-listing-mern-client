import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";

function LikeUnlike({ ad }) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.post("/ad/wishlist", { adId: ad._id });
      setAuth({ ...auth, user: data });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Adding to wishlist failed, try again later");
    }
  };

  const handleUnlike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.delete(`/ad/wishlist/${ad._id}`);
      setAuth({ ...auth, user: data });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Removing from wishlist failed, try again later");
    }
  };

  return (
    <>
      {auth.user?.wishlist?.includes(ad?._id) ? (
        <span>
          <FcLike onClick={handleUnlike} className="h2 mt-3 pointer" />
        </span>
      ) : (
        <span>
          <FcLikePlaceholder onClick={handleLike} className="h2 mt-3 pointer" />
        </span>
      )}
    </>
  );
}

export default LikeUnlike;

// he wanted to give an arrow function in the onClick event handler so that he can pass information about the ad to the function to be defined, but he realised that the ad is already global since it is passed as a prop and therefore he only put the function call there without paranthesis as usual
