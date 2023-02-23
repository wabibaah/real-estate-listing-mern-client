import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

import ImageGallery from "../../components/misc/ImageGallery";
import img6 from "../../img/image11.jpg";
import AdFeatures from "../../components/cards/AdFeatures";
import { formatNumber } from "../../helpers/ad";
import LikeUnlike from "../../components/misc/LikeUnlike";

dayjs.extend(relativeTime);

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

  const generatePhotosArray = (photos) => {
    if (photos?.length > 0) {
      const x = photos.length === 1 ? 2 : 4;
      let arr = [];
      photos.map((photo) =>
        arr.push({
          src: photo.Location,
          width: x,
          height: x,
        })
      );
      return arr;
    } else {
      return [
        {
          src: img6,
          height: 1,
          width: 2,
        },
      ];
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-4">
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary mt-2 disabled">
                {ad.type} for {ad.action}
              </button>
              <LikeUnlike ad={ad} />
            </div>
            <div className="my-4">
              {ad?.sold ? "Off Market" : "In Market"}
              <h1>{ad.address}</h1>
              <AdFeatures ad={ad} />
              <h3 className="mt-2 h2">{formatNumber(ad.price)}</h3>
              <p className="muted">{dayjs(ad?.createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="col-lg-8">
            <ImageGallery photos={generatePhotosArray(ad?.photos)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleAd;
