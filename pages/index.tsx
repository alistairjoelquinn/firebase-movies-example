import type { NextPage } from 'next';
import Head from 'next/head';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { useEffect, useState } from 'react';
import firebaseConfig from '../lib/firebase';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Home: NextPage = () => {
    const [movie, setMovie] = useState('');
    const [rating, setRating] = useState('');

    const submitHandler = () => set(ref(db, `movies/${movie}`), { rating });

    useEffect(() => {
        get(child(ref(db), `movies`)).then(response =>
            response.exists() ? console.log(response.val()) : console.log('error'),
        );
    });

    return (
        <>
            <Head>
                <title>Home Page</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center py-2">
                <input
                    className="border-2"
                    type="text"
                    value={movie}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMovie(e.target.value)}
                />
                <input
                    className="border-2"
                    type="text"
                    value={rating}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRating(e.target.value)}
                />
                <button type="button" onClick={submitHandler}>
                    Submit
                </button>
            </div>
        </>
    );
};

export default Home;
