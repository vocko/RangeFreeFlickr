import { useEffect, useRef, useState } from "react";
import FlickrImage from "./flickerImage";
import { FlickrImageData } from '../types';
import styles from '../styles/Flickr.module.css'

var windowRef: any = null;

if (typeof window !== 'undefined')
    windowRef = window;

const Flickr = () => {

    const flickrBaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tagmode=all';
    const [feed, setFeed] = useState<any>();
    const [filter, setFilter] = useState<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        if (timeoutRef.current)
            clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(
            () => {
                timeoutRef.current = null;
                loadFeed(flickrBaseUrl, processData);
            },
            1000
        );

        return () => {

            if (timeoutRef.current)
                clearTimeout(timeoutRef.current)
        };

    }, [filter]);

    const processData = (data: any) => { 
        setFeed(data);
    };

    const loadFeed = (feedUrl: string, callback: (data: any) => void) => {
        if (!windowRef)
            return;
        
        const registeredCallbackName: string = 'jsonp_callback_' + Math.ceil(100000 * Math.random());
        const filterFormatted = filter.split(' ').join(',');

        const script = document.createElement('script');
        script.src = feedUrl + (feedUrl.indexOf('?') >= 0 ? '&' : '?') + 'jsoncallback=' + registeredCallbackName + '&tags=' + filterFormatted;
        document.body.appendChild(script);

        windowRef[registeredCallbackName] = (data: any) => {
            delete windowRef[registeredCallbackName];
            document.body.removeChild(script);
            callback(data);
        };
    };

    return <div className={styles.flickrContainer}>
        <div className={styles.filterContainer}>
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter results" />
        </div>
        <div className={styles.resultsContainer}>
        {
            !feed?.items || feed.items.length === 0 
                ? <span>No pictures found for <strong>{filter}</strong></span>
                :feed?.items?.map((item: FlickrImageData) => <FlickrImage data={item} key={item.link} />)
        }
        </div>
    </div>;
}
  
export default Flickr;