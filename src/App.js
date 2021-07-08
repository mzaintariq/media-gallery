import './App.scss';
import React from 'react';
import Header from './components/header/Header';
import MediaGallery from './components/mediaGallery/MediaGallery';
import LoadMore from './components/loadMore/LoadMore';

const API_KEY = '563492ad6f917000010000018456eb52f2e243fdb90ea3c50ec4dc53';
// const API_KEY = '563492ad6f91700001000001edc02e0857624907be2b3a05c4ccdb6a';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaItems: [],
      isPhoto: true,
      nextPage: '',
      search: ''
    };
  }

  componentDidMount = async () => {
    try {
      const data = await this.fetchMedia(`https://api.pexels.com/v1/curated?page=1&per_page=12`);
      this.setState({ mediaItems: data.photos, nextPage: data.next_page, isPhoto: true });
    } catch (err) {
      console.error(err);
    }
  }

  onSearchSubmit = async (searchValue) => {
    try {
      this.setState({ mediaItems: [] });
      if (searchValue === '') {
        this.getMedia(`https://api.pexels.com/v1/curated?page=1&per_page=12`);
      } else {
        if (this.state.isPhoto) {
          const data = await this.fetchMedia(`https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`);      
          this.setState({ mediaItems: data.photos, nextPage: data.next_page, isPhoto: true, search: searchValue });
        } else {
          const data = await this.fetchMedia(`https://api.pexels.com/videos/search?query=${searchValue}&page=1&per_page=12`);
          this.setState({ mediaItems: data.videos, nextPage: data.next_page, isPhoto: false, search: searchValue });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  appendMedia = async (url) => {
    try {
      const data = await this.fetchMedia(url);
      if (data.photos) {
        this.setState({ mediaItems: [...this.state.mediaItems, ...data.photos], nextPage: data.next_page, isPhoto: true });
      } else {
        this.setState({ mediaItems: [...this.state.mediaItems, ...data.videos], nextPage: data.next_page, isPhoto: false });
      }
    } catch (err) {
      console.error(err);
    }
  }

  getMedia = async (url) => {
    try {
      const data = await this.fetchMedia(url);
      this.setState({ mediaItems: [], search: document.getElementById("search").value });
      if (data.photos) {
        this.setState({ mediaItems: data.photos, nextPage: data.next_page, isPhoto: true });
      } else {
        this.setState({ mediaItems: data.videos, nextPage: data.next_page, isPhoto: false });
      }
    } catch (err) {
      console.error(err);
    }
  }

  fetchMedia = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: API_KEY
        }
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div className="body">
        <div className="container" id="container">
          <Header onSubmit={this.onSearchSubmit} onClick={this.getMedia} searchValue={this.state.search} />
          <MediaGallery media={this.state.mediaItems} isPhoto={this.state.isPhoto} />
          <LoadMore onAction={this.appendMedia} nextURL={this.state.nextPage}/>
        </div>
      </div>
    );
  };
}

export default App;