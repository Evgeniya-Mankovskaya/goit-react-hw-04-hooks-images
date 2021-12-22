import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import "./App.css";
import Container from "./components/Container/Container";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Container>
        <Searchbar onSubmit={setSearchQuery} />
      </Container>
      <Container>
        <ImageGallery searchQuery={searchQuery} />
      </Container>
      <ToastContainer position="top-center" />
    </>
  );
}

// class App extends Component {
//   state = {
//     searchQuery: "",
//   };
//   handleFormSubmit = (searchQuery) => {
//     this.setState({ searchQuery });
//   };

//   render() {
//     const { searchQuery } = this.state;
//     return (
//       <>
//         <Container>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//         </Container>
//         <Container>
//           <ImageGallery searchQuery={searchQuery} />
//         </Container>
//         <ToastContainer position="top-center" />
//       </>
//     );
//   }
// }

// export default App;
