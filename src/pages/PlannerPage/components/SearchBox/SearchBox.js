import { useState } from "react";
import { FormControl, TextInput } from '@primer/react';
import { SearchIcon } from '@primer/octicons-react'
import { searchCourses } from '../../../../api/CoursesApi.js';
import styles from './SearchBox.module.css'

function SearchBox({ onSearchResults }) {

    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async (searchQuery) => {
        const trimmedQuery = searchQuery.trim();

        if (!trimmedQuery || trimmedQuery.length < 2) {
            onSearchResults([]);
            setError(null);
            return;
        }

        setError(null);

        try {
            const results = await searchCourses(trimmedQuery);
            if (results.length === 0) setError('Kursuseid ei leitud!');
            onSearchResults(results);
        } catch (err) {
            setError('Kursuseid ei leitud!');
            onSearchResults([]);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        handleSearch(value);
    };

    return (
        <div className={styles.searchBox}>
            <FormControl>
                <FormControl.Label className={styles.formControlLabel}>
                    <div>Kursuse otsing</div>
                </FormControl.Label>
                <TextInput
                    block
                    trailingVisual={SearchIcon}
                    placeholder="LTAT.03.002"
                    value={query}
                    onChange={handleInputChange}
                />
                {error && <FormControl.Validation variant="error">{error}</FormControl.Validation>}
            </FormControl>
        </div>
    );
}

export default SearchBox;