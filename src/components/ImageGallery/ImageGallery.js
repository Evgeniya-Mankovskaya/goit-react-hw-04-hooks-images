import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Api from "../../services/api";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
export default function ImageGallery({ searchQuery }) {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [alt, setAlt] = useState("");
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus(Status.PENDING);
    Api.fetchImages(searchQuery, page)
      .then((gallery) => {
        if (gallery.hits.length === 0) {
          return Promise.reject(
            new Error(`Nothing were found with ${searchQuery}`)
          );
        } else {
          setGallery((prevState) => [...prevState, ...gallery.hits]);
          setStatus(Status.RESOLVED);
          handleScroll();
        }
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
        toast("Someting went wrong");
      });
  }, [page, searchQuery]);

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };
  const onOpen = (largeImageURL, alt) => {
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    window.addEventListener("keydown", handleKeyDown);
    toggleModal();
  };
  const onClose = () => {
    setLargeImageURL("");
    setAlt("");
    window.removeEventListener("keydown", handleKeyDown);
    toggleModal();
  };

  if (status === Status.IDLE) {
    return <div>Enter search query</div>;
  }
  if (status === Status.PENDING) {
    return (
      <Loader
        className={s.loader}
        type="Hearts"
        color="#cea8d67a"
        height={80}
        width={80}
      />
    );
  }
  if (status === Status.REJECTED) {
    return <div>Nothing were found</div>;
  }

  if (status === Status.RESOLVED) {
    return (
      <div>
        {showModal && (
          <Modal onClose={onClose} src={largeImageURL} tags={alt} />
        )}
        <ul className={s.imageGallery}>
          {gallery.map(({ largeImageURL, tags, id }) => {
            return (
              <ImageGalleryItem
                key={id}
                src={largeImageURL}
                alt={tags}
                onClick={onOpen}
              />
            );
          })}
        </ul>
        <Button onClick={loadMore} />
      </div>
    );
  }
}
// class ImageGallery extends Component {
//   state = {
//     gallery: [],
//     status: "idle",
//     error: null,
//     page: 1,
//     showModal: false,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.searchQuery !== this.props.searchQuery) {
//       this.setState(() => ({ gallery: [] }), this.getItems);
//     }
// //
//   getItems = () => {
//     this.setState({ status: "pending" });
//     ImageAPI(this.props.searchQuery, this.state.page)
//       .then((gallery) => {
//         if (gallery.hits.length === 0) {
//           return Promise.reject(
//             new Error(`Nothing were found with ${this.props.searchQuery}`)
//           );
//         } else {
//           this.setState({
//             gallery: [...this.state.gallery, ...gallery.hits],
//             status: "resolved",
//             searchQuery: this.props.searchQuery,
//           });
//         }
//       })
//       .catch((error) => {
//         this.setState({ error, status: "rejected" });
//         toast("Someting went wrong");
//       });
//   };

//   handleScroll = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: "smooth",
//     });
//   };

//   loadMore = () => {
//     this.setState({
//       page: this.state.page + 1,
//     });
//   };
//   images(arr) {
//     const newImgArr = [];
//     arr.forEach(({ id, largeImageURL, tags }) => {
//       newImgArr.push({ id, largeImageURL, tags });
//     });
//     return newImgArr;
//   }

//   toggleModal = () => {
//     this.setState((prevState) => ({ showModal: !prevState.showModal }));
//   };

//   onOpen = (src, alt) => {
//     this.setState({
//       largeImageURL: src,
//       alt: alt,
//     });
//     this.toggleModal();
//   };
//   onClose = () => {
//     this.setState({
//       largeImageURL: "",
//       alt: "",
//     });
//   };
//   render() {
//     const { gallery, status, largeImageURL, alt, showModal } = this.state;

//     if (status === "idle") {
//       return <div>Enter search query</div>;
//     }

//     if (status === "pending") {
//       return (
//         <Loader
//           className={s.loader}
//           type="Hearts"
//           color="#cea8d67a"
//           height={80}
//           width={80}
//         />
//       );
//     }

//     if (status === "rejected") {
//       return <div>Nothing were found</div>;
//     }

//     if (status === "resolved") {
//       return (
//         <div>
//           {showModal && (
//             <Modal onClose={this.toggleModal} src={largeImageURL} tags={alt} />
//           )}
//           <ul className={s.imageGallery}>
//             {gallery.map(({ largeImageURL, tags, id }) => {
//               return (
//                 <ImageGalleryItem
//                   key={id}
//                   src={largeImageURL}
//                   alt={tags}
//                   onClick={this.onOpen}
//                 />
//               );
//             })}
//           </ul>
//           <Button onClick={this.loadMore} />
//         </div>
//       );
//     }
//   }
// }

// export default ImageGallery;
