import React from 'react';
import CategoryPage from '../components/layout/CategoryPage';

const WhatsNew = () => {
    return (
        <CategoryPage
            category={null} //null for all, maybe add a 'new' flag filter later
            title="What's New"
            description="The latest masterpieces from the Bastrika atelier. Fresh arrivals of heritage weaves and modern silhouettes."
            bannerImage="https://imgs.search.brave.com/MjcZdy2kfnmiF2WGhiR-HtVlhnQBxt7-5S1RFNDLGTs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzkzLzIxLzI4/LzM2MF9GXzI5MzIx/MjgxNl9IWVVUQzla/SWtEVE56T05FeUFV/TUR6T3R1QnhQak9I/cS5qcGc"
        />
    );
};

export default WhatsNew;
