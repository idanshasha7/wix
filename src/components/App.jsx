import React from 'react';
import Pagination from './Pagination';




class App extends React.Component {
    constructor(props) {
        super(props);

        // an example array of items to be paged

        var exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: [],
            posts: [],
            search: 'cats'
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    // Http call by axios
    componentDidMount() {
        axios.get(`http://www.reddit.com/r/${this.state.search}.json`)
          .then(res => {
            const posts = res.data.data.children.map(obj => obj.data);
            console.log(posts);
            this.setState({ posts });
          }).catch(function (error) {
            console.log(error);
          });
    }

    // When user fill up the search input
    handleChange(e) {
          this.setState({ search :  e.target.value });
          this.componentDidMount();
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div className='gallery_box'>
                <div className="container">
                    <div className="text-center">

                        <h1>Gallery {this.state.search}</h1>

                                  <div className='searchField'>
                                    <input type='text' id='search'
                                    value={this.inputSearch} onChange={ this.handleChange.bind(this)} placeholder='Type subreddit'/>
                                  </div>

                        <ul>
                          {this.state.pageOfItems.map(post =>
                              <li key={post.id}>
                                  <a href={'http://www.reddit.com/' + post.permalink}>
                                  <img src={post.url} alt=''  title={post.title}/>
                                  </a>
                              </li>
                          )}
                        </ul>
                        <Pagination items={this.state.posts}
                         onChangePage={this.onChangePage}
                          />
                    </div>
                </div>
                <hr/>

            </div>

        );
    }
}

export default App;
