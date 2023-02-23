import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SingleAd() {
  const params = useParams();

  const [ad, setAd] = useState({});
  const [relatedAd, setRelatedAd] = useState([]);

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/get-ad/${params.slug}`);
      setAd(data?.ad);
      setRelatedAd(data?.related);
    } catch (err) {
      console.log(err);
    }
  };

  return <div>SingleAd</div>;
}

export default SingleAd;
