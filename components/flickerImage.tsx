import React, { useEffect, useRef, useState } from 'react';
import { FlickrImageData } from '../types';

import styles from '../styles/FlickrImage.module.css'

type FlickerImageProps = {
    data: FlickrImageData;
};

const FlickrImage: React.FC<FlickerImageProps> = (props: FlickerImageProps) => {

    const date = new Date(props.data.date_taken);
    const [tags, setTags] = useState<string>(props.data.tags);
    const allTagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (props.data.tags.length > 80)
            setTags(props.data.tags.substring(0, 79) + '...');

    }, [props.data.tags])

    const handleMouseOverTags = (e: React.MouseEvent) => {

        if (allTagesRef.current && props.data.tags.length > 80)
            allTagesRef.current.classList.add(styles.show);
    };

    const handleMouseOutTags = (e: React.MouseEvent) => {
        
        if (allTagesRef.current)
            allTagesRef.current.classList.remove(styles.show);
    }

    return <div className={styles.imageContainer} key={props.data.link}>
        <a href={props.data.link} target="_blank" rel="noreferrer">
            <img src={props.data.media.m} />
        </a>
        <div className={styles.author}>By: <span>{props.data.author}</span></div>
        <div className={styles.taken}>on {date.toLocaleDateString()} at {date.toLocaleTimeString()}</div>
        {
            tags.length > 0 
                ? <div className={styles.tags} onMouseOver={handleMouseOverTags}><strong>Tags: </strong>{tags}</div> 
                : null
        }
        <div className={styles.spacer}></div>
        <div className={styles.allTags} ref={ref => allTagesRef.current = ref} onMouseOut={handleMouseOutTags}><strong>Tags: </strong>{props.data.tags}</div>
    </div>;
};

export default FlickrImage;