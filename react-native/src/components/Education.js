import React,{ Fragment,useEffect,useState } from 'react';
import { FlatList } from 'react-native';
import Panel from './Panel';
import {Book} from './Book';
import Loader from './Loader';

const Education = (props) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=languages';
    const [books,addBooks] = useState([]);
    
    useEffect(() => {
        (async () => {
            const res = await fetch(url);
            const {items} = await res.json();
            addBooks(items);
        })()
    },[]);

    return (
        <Fragment>
           <Loader exist={!books.length} />
           <FlatList 
              data={books} 
              keyExtractor={(_el,i) => i.toString()} 
              renderItem={({item: {volumeInfo}}) => (
              <Book 
                author={volumeInfo.authors[0]} 
                name={volumeInfo.title} 
                date={volumeInfo.publishedDate} 
                pages={volumeInfo.pageCount} 
                desc={volumeInfo.description} 
                image={volumeInfo.imageLinks.thumbnail} />)}/>
           <Panel />
        </Fragment>
    )
}

export default Education;